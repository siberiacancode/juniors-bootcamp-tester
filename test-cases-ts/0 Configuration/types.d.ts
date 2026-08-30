type Status = 'actual' | 'needRework';

type Precondition =
  | 'authorizedUser'
  | 'desktop'
  | 'historyDetailsPage'
  | 'historyPage'
  | 'loginPage'
  | 'loginPage'
  | 'loginPageOtpStep'
  | 'loginPageOtpStep'
  | 'mobile'
  | 'mobile'
  | 'profileWithEmail'
  | 'profileWithFullName'
  | 'profileWithOrders'
  | 'profileWithoutEmail'
  | 'profileWithoutFullName'
  | 'profileWithoutOrders'
  | 'profileWithoutSavedCards'
  | 'profileWithSavedCards'
  | 'unauthorizedUser';

interface TestCase {
  name: string;
  preconditions?: string[][];
  status: string;
  steps: {
    action: string;
    expected: string[];
  }[];
}
