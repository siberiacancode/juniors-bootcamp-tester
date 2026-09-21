import type { Page } from '@playwright/test';

import { expect, test } from '@playwright/test';
import { cookie, snapshot, waitRequest, waitResponse } from '@siberiacancode/playwright';
import { randomUUID } from 'node:crypto';

import type { GetCardsResponse } from '@/generated/api';

import { TESTIDS } from '@/generated/tests/index.gen';

import { HTTP_CODES } from '../../../utils/constants';
import { testCase } from '../../../utils/helpers';
import { CASE_IDS } from './(helpers)';

const setupTest = async (page: Page, { caseId }: { caseId: string }) => {
  await testCase(page, caseId);
  await cookie.setItem(page, 'token', randomUUID(), {
    domain: 'localhost',
    path: '/'
  });

  const [, cardsResponse] = await Promise.all([
    waitResponse(page, {
      path: '/api/tester/users/profile',
      method: 'GET',
      status: HTTP_CODES.OK
    }),
    waitResponse(page, {
      path: '/api/tester/cards/cards',
      method: 'GET',
      status: HTTP_CODES.OK
    }),
    waitResponse(page, {
      path: '/api/tester/games/orders',
      method: 'GET',
      status: HTTP_CODES.OK
    }),
    page.goto('./profile')
  ]);
  const cardsData = (await cardsResponse.json()) as GetCardsResponse;

  await page.getByTestId(TESTIDS.CLICKABLE.TAB.CARDS).click();

  return cardsData;
};

const openDeleteConfirmation = async (page: Page, cardId: string) => {
  await page.getByTestId(`${TESTIDS.CLICKABLE.BUTTON.DELETE_PAYMENT_CARD}-${cardId}`).click();
  await expect(page.getByTestId(TESTIDS.STATIC.MODAL.DELETE_PAYMENT_CARD)).toBeVisible();
};

const waitDeleteResponse = (page: Page, cardId: string) =>
  waitResponse(page, {
    path: `/api/tester/cards/cards/${cardId}`,
    method: 'DELETE',
    status: HTTP_CODES.OK,
    body: {
      success: true,
      id: cardId
    }
  });

test.describe('Профиль. Карты. Подтверждение удаления карты', () => {
  test('Дизайн', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name.includes('mobile'), 'В тест-кейсе нет мобильного дизайна');

    const cardsResponse = await setupTest(page, { caseId: CASE_IDS.DELETE_CARD_DESIGN });
    await openDeleteConfirmation(page, cardsResponse.cards[1]._id);

    await snapshot(page, 'design');
  });

  test('Отмена', async ({ page }) => {
    const cardsResponse = await setupTest(page, { caseId: CASE_IDS.DELETE_CARD_CANCEL });
    await openDeleteConfirmation(page, cardsResponse.cards[1]._id);

    await page.getByTestId(TESTIDS.CLICKABLE.BUTTON.CANCEL).click();

    await expect(page.getByTestId(TESTIDS.STATIC.MODAL.DELETE_PAYMENT_CARD)).toBeHidden();
  });

  test('Кнопка закрытия', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name.includes('mobile'), 'На мобильном дизайне нет кнопки закрытия');

    const cardsResponse = await setupTest(page, { caseId: CASE_IDS.DELETE_CARD_CLOSE });
    await openDeleteConfirmation(page, cardsResponse.cards[1]._id);

    await page.getByRole('button', { name: 'Close' }).click();

    await expect(page.getByTestId(TESTIDS.STATIC.MODAL.DELETE_PAYMENT_CARD)).toBeHidden();
  });

  test('Удалить. Лоадер', async ({ page }) => {
    const cardsResponse = await setupTest(page, { caseId: CASE_IDS.DELETE_CARD_LOADING });
    const card = cardsResponse.cards[1];
    await openDeleteConfirmation(page, card._id);

    const deleteButton = page.getByTestId(TESTIDS.CLICKABLE.BUTTON.DELETE);
    const deleteResponse = waitDeleteResponse(page, card._id);
    const updatedCardsResponse = waitResponse(page, {
      path: '/api/tester/cards/cards',
      method: 'GET',
      status: HTTP_CODES.OK
    });

    await Promise.all([
      waitRequest(page, {
        path: `/api/tester/cards/cards/${card._id}`,
        method: 'DELETE'
      }),
      deleteButton.click()
    ]);

    await expect(deleteButton).toBeDisabled();
    await expect(page.getByTestId(TESTIDS.CLICKABLE.BUTTON.CANCEL)).toBeDisabled();
    await expect(deleteButton.locator('svg')).toBeVisible();

    await Promise.all([deleteResponse, updatedCardsResponse]);
  });

  test('Удалить. Успех', async ({ page }) => {
    const cardsResponse = await setupTest(page, { caseId: CASE_IDS.DELETE_CARD_SUCCESS });
    const card = cardsResponse.cards[1];
    await openDeleteConfirmation(page, card._id);

    const remainingCards = cardsResponse.cards.filter(({ _id }) => _id !== card._id);
    const deleteResponse = waitDeleteResponse(page, card._id);
    const updatedCardsResponse = waitResponse(page, {
      path: '/api/tester/cards/cards',
      method: 'GET',
      status: HTTP_CODES.OK,
      body: {
        success: true,
        cards: remainingCards
      }
    });

    await Promise.all([
      waitRequest(page, {
        path: `/api/tester/cards/cards/${card._id}`,
        method: 'DELETE'
      }),
      page.getByTestId(TESTIDS.CLICKABLE.BUTTON.DELETE).click()
    ]);
    await Promise.all([deleteResponse, updatedCardsResponse]);

    await expect(page.getByTestId(TESTIDS.STATIC.MODAL.DELETE_PAYMENT_CARD)).toBeHidden();
    await expect(page).toHaveURL(/\/profile\/?$/);
    await expect(page.getByTestId(TESTIDS.CLICKABLE.TAB.CARDS)).toHaveAttribute(
      'data-state',
      'active'
    );
    await expect(page.getByTestId(`${TESTIDS.STATIC.CARD.PAYMENT}-${card._id}`)).toBeHidden();

    for (const card of remainingCards) {
      await expect(page.getByTestId(`${TESTIDS.STATIC.CARD.PAYMENT}-${card._id}`)).toBeVisible();
    }
  });

  test('Удалить. Последняя карта', async ({ page }) => {
    const initialCardsResponse = await setupTest(page, { caseId: CASE_IDS.DELETE_CARD_LAST });
    const card = initialCardsResponse.cards[0];
    await openDeleteConfirmation(page, card._id);

    const deleteResponse = waitDeleteResponse(page, card._id);
    const cardsResponse = waitResponse(page, {
      path: '/api/tester/cards/cards',
      method: 'GET',
      status: HTTP_CODES.OK,
      body: {
        success: true,
        cards: []
      }
    });

    await Promise.all([
      waitRequest(page, {
        path: `/api/tester/cards/cards/${card._id}`,
        method: 'DELETE'
      }),
      page.getByTestId(TESTIDS.CLICKABLE.BUTTON.DELETE).click()
    ]);
    await Promise.all([deleteResponse, cardsResponse]);

    await expect(page.getByTestId(TESTIDS.STATIC.MODAL.DELETE_PAYMENT_CARD)).toBeHidden();
    await expect(page).toHaveURL(/\/profile\/?$/);
    await expect(page.getByTestId(TESTIDS.CLICKABLE.TAB.ORDERS)).toBeHidden();
    await expect(page.getByTestId(TESTIDS.CLICKABLE.TAB.CARDS)).toBeHidden();
    await expect(page.getByTestId(TESTIDS.STATIC.SECTION.PROFILE_ORDER_HISTORY)).toBeVisible();
  });
});
