import { getCardsCardsSuccess, getGamesOrdersSuccess, getUsersProfileInitial } from '../(shared)';
import { CASE_IDS } from '../../(helpers)';
import { createTestCaseMock } from '../../../../../utils/helpers/createTestCaseMock';

export default createTestCaseMock({
  caseId: CASE_IDS.EDIT_PROFILE_VALIDATION,
  configs: [getUsersProfileInitial, getCardsCardsSuccess, getGamesOrdersSuccess]
});
