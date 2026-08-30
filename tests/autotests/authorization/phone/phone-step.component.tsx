import { expect, test } from '@playwright/experimental-ct-react';

import { TESTIDS } from '@/generated/tests/ids.gen';

import { CASE_IDS } from '../(helpers)';
import { PHONE_STEP_FILE } from '../(helpers)/constants';
import { LoginPageWrapper } from '../(wrappers)';
import { annotation, testCase } from '../../../utils/helpers';

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
  test(
    'Валидация',
    annotation(PHONE_STEP_FILE, 'Авторизация. Телефон. Валидация'),
    async ({ page, mount }) => {
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
    }
  );
});
