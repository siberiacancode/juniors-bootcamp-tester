import type { Page } from '@playwright/test';

import { expect, test } from '@playwright/test';
import { cookie, snapshot, waitRequest, waitResponse } from '@siberiacancode/playwright';

import { TESTIDS } from '@/generated/tests/index.gen';

import { HTTP_CODES } from '../../../utils/constants';
import { testCase } from '../../../utils/helpers';
import {
  AUTHORIZATION_TOKEN,
  CASE_IDS,
  INITIAL_USER,
  UPDATED_PROFILE,
  UPDATED_USER
} from './(helpers)';

const setupTest: BrowserSetupTest<{ caseId: string }> = async (page, { caseId }) => {
  await testCase(page, caseId);
  await cookie.setItem(page, 'token', AUTHORIZATION_TOKEN, {
    domain: 'localhost',
    path: '/'
  });

  await Promise.all([
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

  await expect(page.getByTestId(TESTIDS.CLICKABLE.BUTTON.EDIT_PROFILE)).toBeVisible();
};

const openEditProfile = async (page: Page) => {
  await page.getByTestId(TESTIDS.CLICKABLE.BUTTON.EDIT_PROFILE).click();
  await expect(page.getByTestId(TESTIDS.STATIC.EDIT_PROFILE_DRAWER)).toBeVisible();
};

const fillUpdatedProfile = async (page: Page) => {
  await page
    .getByTestId(`${TESTIDS.CHANGEABLE.FIELD.LASTNAME}-input`)
    .fill(UPDATED_PROFILE.lastname);
  await page
    .getByTestId(`${TESTIDS.CHANGEABLE.FIELD.FIRSTNAME}-input`)
    .fill(UPDATED_PROFILE.firstname);
  await page
    .getByTestId(`${TESTIDS.CHANGEABLE.FIELD.MIDDLENAME}-input`)
    .fill(UPDATED_PROFILE.middlename);
  await page.getByTestId(`${TESTIDS.CHANGEABLE.FIELD.EMAIL}-input`).fill(UPDATED_PROFILE.email);
};

test.describe('Профиль. Редактирование данных', () => {
  test('Дизайн', async ({ page }) => {
    await setupTest(page, { caseId: CASE_IDS.EDIT_PROFILE_DESIGN });
    await openEditProfile(page);

    await snapshot(page, 'design');
  });

  test('Данные', async ({ page }) => {
    await setupTest(page, { caseId: CASE_IDS.EDIT_PROFILE_DATA });
    await openEditProfile(page);

    await expect(page.getByTestId(`${TESTIDS.CHANGEABLE.FIELD.LASTNAME}-input`)).toHaveValue(
      INITIAL_USER.lastname
    );
    await expect(page.getByTestId(`${TESTIDS.CHANGEABLE.FIELD.FIRSTNAME}-input`)).toHaveValue(
      INITIAL_USER.firstname
    );
    await expect(page.getByTestId(`${TESTIDS.CHANGEABLE.FIELD.MIDDLENAME}-input`)).toHaveValue(
      INITIAL_USER.middlename
    );
    await expect(page.getByTestId(`${TESTIDS.CHANGEABLE.FIELD.EMAIL}-input`)).toHaveValue(
      INITIAL_USER.email
    );
    await expect(page.getByTestId(`${TESTIDS.CHANGEABLE.FIELD.PHONE}-input`)).toHaveValue(
      '+7 777 777 77 77'
    );
  });

  test('Телефон', async ({ page }) => {
    await setupTest(page, { caseId: CASE_IDS.EDIT_PROFILE_PHONE });
    await openEditProfile(page);

    await expect(page.getByTestId(`${TESTIDS.CHANGEABLE.FIELD.PHONE}-input`)).toBeDisabled();
  });

  test('Обновить данные', async ({ page }) => {
    await setupTest(page, { caseId: CASE_IDS.EDIT_PROFILE_UPDATE_DISABLED });
    await openEditProfile(page);

    await expect(page.getByTestId(TESTIDS.CLICKABLE.BUTTON.UPDATE_DATA)).toBeDisabled();
  });

  test('Обновить данные. Успех', async ({ page }) => {
    await setupTest(page, { caseId: CASE_IDS.EDIT_PROFILE_SUCCESS });
    await openEditProfile(page);
    await fillUpdatedProfile(page);

    const submitButton = page.getByTestId(TESTIDS.CLICKABLE.BUTTON.UPDATE_DATA);
    const patchResponse = waitResponse(page, {
      path: '/api/tester/users/profile',
      method: 'PATCH',
      status: HTTP_CODES.OK,
      body: {
        success: true,
        user: UPDATED_USER
      }
    });
    const profileResponse = waitResponse(page, {
      path: '/api/tester/users/profile',
      method: 'GET',
      status: HTTP_CODES.OK,
      body: {
        success: true,
        user: UPDATED_USER
      }
    });

    await Promise.all([
      waitRequest(page, {
        path: '/api/tester/users/profile',
        method: 'PATCH',
        body: UPDATED_PROFILE
      }),
      submitButton.click()
    ]);

    for (const fieldTestId of Object.values(TESTIDS.CHANGEABLE.FIELD)) {
      await expect(page.getByTestId(`${fieldTestId}-input`)).toBeDisabled();
    }
    await expect(submitButton).toBeDisabled();
    await expect(page.getByTestId(TESTIDS.STATIC.LOADER.UPDATE_DATA)).toBeVisible();

    await Promise.all([patchResponse, profileResponse]);

    await expect(page.getByTestId(TESTIDS.STATIC.EDIT_PROFILE_DRAWER)).toBeHidden();
    await expect(page.getByTestId(TESTIDS.STATIC.TEXT.PROFILE_NAME)).toHaveText(
      'Петров Пётр Петрович'
    );
    await expect(page.getByTestId(TESTIDS.STATIC.TEXT.PROFILE_EMAIL)).toHaveText(
      UPDATED_PROFILE.email
    );

    //todo notif
    await expect(page.getByText('Данные обновлены', { exact: true })).toBeVisible();
    await expect(page.getByText('Профиль успешно сохранен', { exact: true })).toBeVisible();
  });

  test('Отмена', async ({ page }) => {
    await setupTest(page, { caseId: CASE_IDS.EDIT_PROFILE_CANCEL });
    await openEditProfile(page);

    await page.getByTestId(TESTIDS.CLICKABLE.BUTTON.CANCEL).click();

    await expect(page.getByTestId(TESTIDS.STATIC.EDIT_PROFILE_DRAWER)).toBeHidden();
  });
});
