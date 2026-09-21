import { getCardsCardsSuccess, getGamesOrdersSuccess, getUsersProfileSuccess } from '../(shared)';
import { CASE_IDS } from '../../(helpers)';
import { createTestCaseMock } from '../../../../../utils/helpers/createTestCaseMock';

export default createTestCaseMock({
  caseId: CASE_IDS.DELETE_CARD_CLOSE,
  configs: [getUsersProfileSuccess, getCardsCardsSuccess, getGamesOrdersSuccess]
});
