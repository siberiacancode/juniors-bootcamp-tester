interface TestCaseParams {
  id: string;
  name: string;
  preconditions?: string[][];
  status: string;
  steps: {
    action: string;
    expected: string[];
  }[];
}

export const createTestCases = (params: TestCaseParams[]) => params;

export const createPreconditions = <T extends Record<string, string[]>>(params: T): T => params;
