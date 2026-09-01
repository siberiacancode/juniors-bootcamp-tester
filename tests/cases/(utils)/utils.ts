interface TestCaseParams {
  name: string;
  preconditions?: string[][];
  status: string;
  steps: {
    action: string;
    expected: string[];
  }[];
}

export const testCase = (params: TestCaseParams[]) => params;
