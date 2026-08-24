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
      label: 'page.gameProduct.requirement.os',
      value: requirements.oc
    },
    {
      label: 'page.gameProduct.requirement.processor',
      value: requirements.processor
    },
    {
      label: 'page.gameProduct.requirement.memory',
      value: requirements.memory
    },
    {
      label: 'page.gameProduct.requirement.graphics',
      value: requirements.graphics
    },
    {
      label: 'page.gameProduct.requirement.storage',
      value: requirements.storage
    }
  ] as const;
