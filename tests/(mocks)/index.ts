import otpMocks from '../autotests/authorization/otp/(mocks)';
import phoneMocks from '../autotests/authorization/phone/(mocks)';
import cardsMocks from '../autotests/profile/cards/(mocks)';
import deleteCardMocks from '../autotests/profile/delete-card/(mocks)';
import editProfileMocks from '../autotests/profile/edit-profile/(mocks)';
import errorMocks from '../autotests/system/error/(mocks)';
import logoutMocks from '../autotests/system/logout/(mocks)';

export default [
  ...otpMocks,
  ...phoneMocks,
  ...cardsMocks,
  ...deleteCardMocks,
  ...editProfileMocks,
  ...errorMocks,
  ...logoutMocks
];
