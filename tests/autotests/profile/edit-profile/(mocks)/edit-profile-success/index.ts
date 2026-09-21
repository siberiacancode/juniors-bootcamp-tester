import { getCardsCardsSuccess, getGamesOrdersSuccess, getUsersProfileInitial } from '../(shared)';
import { CASE_IDS } from '../../(helpers)';
import { createTestCaseMock } from '../../../../../utils/helpers/createTestCaseMock';
import { getUsersProfile } from './getUsersProfile';
import { patchUsersProfile } from './patchUsersProfile';

export default createTestCaseMock({
  caseId: CASE_IDS.EDIT_PROFILE_SUCCESS,
  configs: [
    getUsersProfile,
    getUsersProfileInitial,
    getCardsCardsSuccess,
    getGamesOrdersSuccess,
    patchUsersProfile
  ]
});
