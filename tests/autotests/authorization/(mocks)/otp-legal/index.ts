import type { MockServerComponent } from 'mock-config-server';

import { CASE_ID } from './constants';
import { postOtpsOtp } from './requests';

export const otpLegalCase: MockServerComponent = {
  baseUrl: '/api/tester',
  name: `file/${CASE_ID}`,
  configs: [postOtpsOtp]
};
