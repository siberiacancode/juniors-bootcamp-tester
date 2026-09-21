import { postOtpsOtpSuccess } from '../(shared)';
import { CASE_IDS } from '../../(helpers)/case-ids';
import { createTestCaseMock } from '../../../../../utils/helpers/createTestCaseMock';

export default createTestCaseMock({
  caseId: CASE_IDS.OTP_BACK_RESET,
  configs: [postOtpsOtpSuccess]
});
