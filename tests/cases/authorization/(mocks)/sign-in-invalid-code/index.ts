import type { MockServerComponent } from 'mock-config-server';

import { CASE_ID } from './constants';
import { postAuthSignInInvalidCode, postOtpsOtp } from './requests';

export const signInInvalidCodeCase: MockServerComponent = {
  baseUrl: '/api/tester',
  name: `file/${CASE_ID}`,
  configs: [postOtpsOtp, postAuthSignInInvalidCode]
};
