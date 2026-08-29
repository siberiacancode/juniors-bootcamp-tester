type Status = 'actual' | 'needRework';

type Precondition =
  | 'authorizedUser'
  | 'desktop'
  | 'historyDetailsPage'
  | 'historyPage'
  | 'loginPage'
  | 'loginPageOtpStep'
  | 'mobile'
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
