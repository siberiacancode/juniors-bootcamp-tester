type Status = 'actual' | 'needRework';

type Precondition = 'authorizedUser' | 'desktop' | 'mobile' | 'unauthorizedUser';

interface TestCase {
  name: string;
  preconditions?: string[][];
  status: string;
  steps: {
    action: string;
    expected: string[];
  }[];
}
