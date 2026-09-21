import type { Page } from '@playwright/test';

import { expect, test } from '@playwright/test';
import { cookie, snapshot, waitResponse } from '@siberiacancode/playwright';

import type { GetCardsResponse } from '@/generated/api';

import { createSignInResponseFake } from '@/generated/api';
import { TESTIDS } from '@/generated/tests/index.gen';

import { HTTP_CODES } from '../../../utils/constants';
import { testCase } from '../../../utils/helpers';
import { CASE_IDS } from './(helpers)';

const setupTest = async (page: Page, { caseId }: { caseId: string }) => {
  await testCase(page, caseId);
  await cookie.setItem(page, 'token', createSignInResponseFake().token, {
    domain: 'localhost',
    path: '/'
  });

  const [cardsResponse] = await Promise.all([
    waitResponse(page, {
      path: '/api/tester/cards/cards',
      method: 'GET',
      status: HTTP_CODES.OK
    }),
    waitResponse(page, {
      path: '/api/tester/users/profile',
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
  await expect(page.getByTestId(TESTIDS.STATIC.SECTION.PAYMENT_CARDS)).toBeVisible();

  return { cardsData };
};

test.describe('Профиль. Карты', () => {
  test('Дизайн', async ({ page }) => {
    await setupTest(page, { caseId: CASE_IDS.CARDS_DESIGN });

    await snapshot(page, 'design');
  });

  test('Данные', async ({ page }) => {
    const { cardsData } = await setupTest(page, { caseId: CASE_IDS.CARDS_DATA });

    const cards = page.getByTestId(new RegExp(`^${TESTIDS.STATIC.CARD.PAYMENT}`));

    await expect(cards).toHaveCount(cardsData.cards.length);

    for (const [index, card] of cardsData.cards.entries()) {
      await expect(cards.nth(index)).toContainText(card.panMasked);
      await expect(cards.nth(index)).toHaveAttribute('aria-label', card.panMasked);
    }
  });

  test('Удалить карту', async ({ page }) => {
    const { cardsData } = await setupTest(page, { caseId: CASE_IDS.CARDS_DELETE });
    const card = cardsData.cards[1];

    await page.getByTestId(`${TESTIDS.CLICKABLE.BUTTON.DELETE_PAYMENT_CARD}-${card._id}`).click();

    await expect(page.getByTestId(TESTIDS.STATIC.MODAL.DELETE_PAYMENT_CARD)).toBeVisible();
  });
});
