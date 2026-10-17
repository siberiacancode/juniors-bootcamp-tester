import { getGamesInfoBySlugError } from '../(shared)';
import { CASE_IDS } from '../../(helpers)';
import { createTestCaseMock } from '../../../../../utils/helpers/createTestCaseMock';

export default createTestCaseMock({
  caseId: CASE_IDS.ERROR_DESIGN,
  configs: [getGamesInfoBySlugError]
});
