import { otpBackPhoneCase } from './otp-back-phone';
import { otpBackResetCase } from './otp-back-reset';
import { otpDesignCase } from './otp-design';
import { otpLegalCase } from './otp-legal';
import { otpMaskCase } from './otp-mask';
import { otpRedirectCase } from './otp-redirect';
import { otpRetryCase } from './otp-retry';
import { otpSignInSuccessCase } from './otp-sign-in-success';
import { otpTimerCase } from './otp-timer';
import { otpValidationCase } from './otp-validation';
import { phoneSubmitSuccessCase } from './phone-submit-success';
import { signInInvalidCodeCase } from './sign-in-invalid-code';

export const authorizationMocks = [
  phoneSubmitSuccessCase,
  otpBackResetCase,
  otpBackPhoneCase,
  otpDesignCase,
  otpLegalCase,
  otpMaskCase,
  otpRedirectCase,
  otpRetryCase,
  otpSignInSuccessCase,
  otpTimerCase,
  otpValidationCase,
  signInInvalidCodeCase
];
