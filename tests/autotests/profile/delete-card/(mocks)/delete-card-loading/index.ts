import { getCardsCardsSuccess, getGamesOrdersSuccess, getUsersProfileSuccess } from '../(shared)';
import { CASE_IDS } from '../../(helpers)';
import { createTestCaseMock } from '../../../../../utils/helpers/createTestCaseMock';
import { deleteCardsCardByIdLoading } from './deleteCardsCardById';

export default createTestCaseMock({
  caseId: CASE_IDS.DELETE_CARD_LOADING,
  configs: [
    getUsersProfileSuccess,
    getCardsCardsSuccess,
    getGamesOrdersSuccess,
    deleteCardsCardByIdLoading
  ]
});
