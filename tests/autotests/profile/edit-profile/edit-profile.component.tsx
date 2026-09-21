import { expect, test } from '@playwright/experimental-ct-react';
import { cookie, waitResponse } from '@siberiacancode/playwright';

import { TESTIDS } from '@/generated/tests/index.gen';

import { HTTP_CODES } from '../../../utils/constants';
import { testCase } from '../../../utils/helpers';
import { AUTHORIZATION_TOKEN, CASE_IDS } from './(helpers)';
import { EditProfileWrapper } from './(wrappers)';

const setupTest: ComponentSetupTest<{ caseId: string }> = async ({ page, mount }, { caseId }) => {
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
    mount<HooksConfig>(<EditProfileWrapper />)
  ]);

  await page.getByTestId(TESTIDS.CLICKABLE.BUTTON.EDIT_PROFILE).click();
  await expect(page.getByTestId(TESTIDS.STATIC.EDIT_PROFILE_DRAWER)).toBeVisible();
};

test.describe('Профиль. Редактирование данных', () => {
  test('Валидация', async ({ page, mount }) => {
    await setupTest({ page, mount }, { caseId: CASE_IDS.EDIT_PROFILE_VALIDATION });

    const lastnameField = page.getByTestId(TESTIDS.CHANGEABLE.FIELD.LASTNAME);
    const firstnameField = page.getByTestId(TESTIDS.CHANGEABLE.FIELD.FIRSTNAME);
    const middlenameField = page.getByTestId(TESTIDS.CHANGEABLE.FIELD.MIDDLENAME);
    const emailField = page.getByTestId(TESTIDS.CHANGEABLE.FIELD.EMAIL);
    const lastnameInput = page.getByTestId(`${TESTIDS.CHANGEABLE.FIELD.LASTNAME}-input`);
    const firstnameInput = page.getByTestId(`${TESTIDS.CHANGEABLE.FIELD.FIRSTNAME}-input`);
    const middlenameInput = page.getByTestId(`${TESTIDS.CHANGEABLE.FIELD.MIDDLENAME}-input`);
    const emailInput = page.getByTestId(`${TESTIDS.CHANGEABLE.FIELD.EMAIL}-input`);
    const lastnameError = page.getByTestId(`${TESTIDS.CHANGEABLE.FIELD.LASTNAME}-error`);
    const emailError = page.getByTestId(`${TESTIDS.CHANGEABLE.FIELD.EMAIL}-error`);
    const submitButton = page.getByTestId(TESTIDS.CLICKABLE.BUTTON.UPDATE_DATA);

    await test.step('Показывает ошибку пустого email', async () => {
      await lastnameInput.clear();
      await firstnameInput.clear();
      await middlenameInput.clear();
      await emailInput.clear();
      await submitButton.click();

      await expect(emailField).toHaveAttribute('data-invalid', 'true');
      await expect(emailError).toHaveText('Введите корректную почту');
    });

    await test.step('Отклоняет цифры и спецсимволы в фамилии', async () => {
      await lastnameInput.fill('Иванов-123');

      await expect(lastnameField).toHaveAttribute('data-invalid', 'true');
      await expect(lastnameError).toHaveText('Недопустимые символы');
    });

    await test.step('Отклоняет фамилию длиннее 50 символов', async () => {
      await lastnameInput.fill('А'.repeat(51));

      await expect(lastnameField).toHaveAttribute('data-invalid', 'true');
      await expect(lastnameError).toHaveText('Максимальная длина 50 символов');
    });

    await test.step('Принимает пустые ФИО и корректный email', async () => {
      await lastnameInput.clear();
      await emailInput.fill('valid@example.com');

      await expect(lastnameField).toHaveAttribute('data-invalid', 'false');
      await expect(firstnameField).toHaveAttribute('data-invalid', 'false');
      await expect(middlenameField).toHaveAttribute('data-invalid', 'false');
      await expect(emailField).toHaveAttribute('data-invalid', 'false');
    });

    await test.step('Отклоняет некорректный email', async () => {
      await emailInput.fill('invalid-email');
      await submitButton.click();

      await expect(emailField).toHaveAttribute('data-invalid', 'true');
      await expect(emailError).toHaveText('Введите корректную почту');
    });

    await test.step('Снимает ошибку после ввода корректного email', async () => {
      await emailInput.fill('valid@example.com');

      await expect(emailField).toHaveAttribute('data-invalid', 'false');
      await expect(emailError).toBeHidden();
    });
  });
});
