import type { DetailedGame, SystemRequirements } from '@/generated/api';

import { intl } from '@/lib';

export const getRequirementSections = ({
  minimumSystemRequirements,
  recommendedSystemRequirements
}: Pick<DetailedGame, 'minimumSystemRequirements' | 'recommendedSystemRequirements'>) =>
  [
    {
      key: 'minimum',
      requirements: minimumSystemRequirements,
      title: intl.formatMessage({ id: 'page.gameProduct.minimumRequirements' })
    },
    {
      key: 'recommended',
      requirements: recommendedSystemRequirements,
      title: intl.formatMessage({ id: 'page.gameProduct.recommendedRequirements' })
    }
  ] as const;

export const getRequirementRows = (requirements: SystemRequirements) => [
  {
    label: intl.formatMessage({ id: 'page.gameProduct.requirement.os' }),
    value: requirements.oc
  },
  {
    label: intl.formatMessage({ id: 'page.gameProduct.requirement.processor' }),
    value: requirements.processor
  },
  {
    label: intl.formatMessage({ id: 'page.gameProduct.requirement.memory' }),
    value: requirements.memory
  },
  {
    label: intl.formatMessage({ id: 'page.gameProduct.requirement.graphics' }),
    value: requirements.graphics
  },
  {
    label: intl.formatMessage({ id: 'page.gameProduct.requirement.storage' }),
    value: requirements.storage
  }
];
