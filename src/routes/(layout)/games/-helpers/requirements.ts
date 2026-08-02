import type { GameDetailed, GameSystemRequirements } from '@/generated/api';

export const getRequirementSections = (game: GameDetailed) =>
  [
    {
      key: 'minimum',
      requirements: game.minimumSystemRequirements,
      titlePath: 'page.gameProduct.minimumRequirements'
    },
    {
      key: 'recommended',
      requirements: game.recommendedSystemRequirements,
      titlePath: 'page.gameProduct.recommendedRequirements'
    }
  ] as const;

export const getRequirementRows = (requirements: GameSystemRequirements) =>
  [
    {
      labelPath: 'page.gameProduct.requirement.os',
      value: requirements.oc
    },
    {
      labelPath: 'page.gameProduct.requirement.processor',
      value: requirements.processor
    },
    {
      labelPath: 'page.gameProduct.requirement.memory',
      value: requirements.memory
    },
    {
      labelPath: 'page.gameProduct.requirement.graphics',
      value: requirements.graphics
    },
    {
      labelPath: 'page.gameProduct.requirement.storage',
      value: requirements.storage
    }
  ] as const;
