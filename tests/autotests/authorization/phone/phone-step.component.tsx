import { expect, test } from '@playwright/experimental-ct-react';

import { TESTIDS } from '@/generated/tests/index.gen';

import { testCase } from '../../../utils/helpers';
import { CASE_IDS } from './(helpers)';
import { LoginPageWrapper } from './(wrappers)';

const setupTest: ComponentSetupTest<{ caseId: string }> = async ({ page, mount }, { caseId }) => {
  await testCase(page, caseId);
  await mount<HooksConfig>(<LoginPageWrapper />, {
    hooksConfig: {
      routerConfig: {
        historyPath: '/login/',
        routePath: '/login/'
      }
    }
  });
};

test.describe('Авторизация. Телефон', () => {
  test('Валидация', async ({ page, mount }) => {
    await setupTest({ page, mount }, { caseId: CASE_IDS.PHONE_VALIDATION });

    const phoneInput = page.getByTestId(TESTIDS.CHANGEABLE.INPUT.PHONE);
    const phoneField = page.getByTestId(`${TESTIDS.CHANGEABLE.INPUT.PHONE}-field`);
    const phoneError = page.getByTestId(`${TESTIDS.CHANGEABLE.INPUT.PHONE}-error`);

    await test.step('Показывает ошибку обязательного поля', async () => {
      await page.getByTestId(TESTIDS.CLICKABLE.BUTTON.SUBMIT).click();

      await expect(phoneError).toHaveText('Поле обязательно');
      await expect(phoneField).toHaveAttribute('data-invalid', 'true');
    });

    await test.step('Игнорирует нецифровые символы и очищает ошибку', async () => {
      await phoneInput.fill('abc');

      await expect(phoneInput).toHaveValue('');
      await expect(phoneError).toBeHidden();
      await expect(phoneField).toHaveAttribute('data-invalid', 'false');
    });

    await test.step('Показывает ошибку неполного номера', async () => {
      await phoneInput.fill('777');
      await page.getByTestId(TESTIDS.CLICKABLE.BUTTON.SUBMIT).click();

      await expect(phoneError).toHaveText('Заполните поле полностью');
      await expect(phoneField).toHaveAttribute('data-invalid', 'true');
    });
  });

  test('Маска', async ({ page, mount }) => {
    await setupTest({ page, mount }, { caseId: CASE_IDS.PHONE_MASK });

    await page.getByTestId(TESTIDS.CHANGEABLE.INPUT.PHONE).fill('9998887766');

    await expect(page.getByTestId(TESTIDS.CHANGEABLE.INPUT.PHONE)).toHaveValue('+7 999 888 77 66');
  });

  test('Вставка номера', async ({ page, mount }) => {
    await setupTest({ page, mount }, { caseId: CASE_IDS.PHONE_MASK_PASTE_PREFIX });

    const phoneInput = page.getByTestId(TESTIDS.CHANGEABLE.INPUT.PHONE);

    await test.step('Удаляет 8 в начале вставленного номера', async () => {
      await phoneInput.fill('89998887766');

      await expect(phoneInput).toHaveValue('+7 999 888 77 66');
    });

    await phoneInput.clear();

    await test.step('Удаляет 7 в начале вставленного номера', async () => {
      await phoneInput.fill('79998887766');

      await expect(phoneInput).toHaveValue('+7 999 888 77 66');
    });
  });
});
