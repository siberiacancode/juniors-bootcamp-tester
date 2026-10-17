import { getCardsCardsSuccess, getGamesOrdersSuccess, getUsersProfileSuccess } from '../(shared)';
import { CASE_IDS } from '../../(helpers)';
import { createTestCaseMock } from '../../../../../utils/helpers/createTestCaseMock';
import { postAuthSignOut } from './postAuthSignOut';

export default createTestCaseMock({
  caseId: CASE_IDS.LOGOUT_LOADING,
  configs: [getUsersProfileSuccess, getCardsCardsSuccess, getGamesOrdersSuccess, postAuthSignOut]
});
