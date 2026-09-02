import { preconditions, statuses } from '../0 Configuration';
import { profilePreconditions } from './preconditions';

export const profileLogout: TestCase[] = [
  {
    name: 'Профиль. Выйти',
    status: statuses.actual,
    preconditions: [preconditions.authorizedUser, profilePreconditions.profilePageOpened],
    steps: [
      {
        action: 'Нажать кнопку "Выйти"',
        expected: ['Открылось подтверждение выхода']
      }
    ]
  }
];
