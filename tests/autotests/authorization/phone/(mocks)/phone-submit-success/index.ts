import { getUsersProfileUnauthorized } from '../(shared)';
import { CASE_IDS } from '../../(helpers)/case-ids';
import { createTestCaseMock } from '../../../../../utils/helpers/createTestCaseMock';
import { postOtpsOtp } from './postOtpsOtp';

export default createTestCaseMock({
  caseId: CASE_IDS.PHONE_SUBMIT_SUCCESS,
  configs: [getUsersProfileUnauthorized, postOtpsOtp]
});
