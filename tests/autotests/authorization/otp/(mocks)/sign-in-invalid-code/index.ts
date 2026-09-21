import { postOtpsOtpSuccess } from '../(shared)';
import { CASE_IDS } from '../../(helpers)/case-ids';
import { createTestCaseMock } from '../../../../../utils/helpers/createTestCaseMock';
import { postAuthSignIn } from './postAuthSignIn';

export default createTestCaseMock({
  caseId: CASE_IDS.OTP_SIGN_IN_INVALID_CODE,
  configs: [postOtpsOtpSuccess, postAuthSignIn]
});
