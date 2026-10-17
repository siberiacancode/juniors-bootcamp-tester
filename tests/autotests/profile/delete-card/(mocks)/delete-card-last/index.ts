import { getGamesOrdersSuccess, getUsersProfileSuccess } from '../(shared)';
import { CASE_IDS } from '../../(helpers)';
import { createTestCaseMock } from '../../../../../utils/helpers/createTestCaseMock';
import { deleteCardsCardById } from './deleteCardsCardById';
import { getCardsCards } from './getCardsCards';

export default createTestCaseMock({
  caseId: CASE_IDS.DELETE_CARD_LAST,
  configs: [getUsersProfileSuccess, getCardsCards, getGamesOrdersSuccess, deleteCardsCardById]
});
