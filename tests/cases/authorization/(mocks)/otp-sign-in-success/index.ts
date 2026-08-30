import type { MockServerComponent } from 'mock-config-server';

import { CASE_ID } from './constants';
import { getCardsCards, getUsersProfile, postAuthSignIn, postOtpsOtp } from './requests';

export const otpSignInSuccessCase: MockServerComponent = {
  baseUrl: '/api/tester',
  name: `file/${CASE_ID}`,
  configs: [postOtpsOtp, postAuthSignIn, ...getUsersProfile, getCardsCards]
};
