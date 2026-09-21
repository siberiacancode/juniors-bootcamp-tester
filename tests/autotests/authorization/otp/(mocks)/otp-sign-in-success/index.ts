import {
  getCardsCardsSuccess,
  getUsersProfileSuccess,
  getUsersProfileUnauthorized,
  postAuthSignInSuccess,
  postOtpsOtpSuccess
} from '../(shared)';
import { CASE_IDS } from '../../(helpers)/case-ids';
import { createTestCaseMock } from '../../../../../utils/helpers/createTestCaseMock';

export default createTestCaseMock({
  caseId: CASE_IDS.OTP_SIGN_IN_SUCCESS,
  configs: [
    postOtpsOtpSuccess,
    postAuthSignInSuccess,
    getUsersProfileSuccess,
    getUsersProfileUnauthorized,
    getCardsCardsSuccess
  ]
});
