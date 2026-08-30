import { otpBackPhoneCase } from './otp-back-phone';
import { otpDesignCase } from './otp-design';
import { otpRetryCase } from './otp-retry';
import { otpSignInSuccessCase } from './otp-sign-in-success';
import { otpTimerCase } from './otp-timer';
import { otpValidationCase } from './otp-validation';
import { phoneSubmitSuccessCase } from './phone-submit-success';
import { signInInvalidCodeCase } from './sign-in-invalid-code';

export const authorizationMocks = [
  phoneSubmitSuccessCase,
  otpBackPhoneCase,
  otpDesignCase,
  otpRetryCase,
  otpSignInSuccessCase,
  otpTimerCase,
  otpValidationCase,
  signInInvalidCodeCase
];
