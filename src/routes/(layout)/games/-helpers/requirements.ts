import type { SystemRequirements } from '@/generated/api';

export const getRequirementRows = (requirements: SystemRequirements) => [
  {
    label: 'ОС:',
    value: requirements.oc
  },
  {
    label: 'Процессор',
    value: requirements.processor
  },
  {
    label: 'Оперативная память',
    value: requirements.memory
  },
  {
    label: 'Видеокарта',
    value: requirements.graphics
  },
  {
    label: 'Место на диске:',
    value: requirements.storage
  },
  {
    label: 'Дополнительно:',
    value:
      '*1080p основное разрешение / 720p разрешение прорисовки, низкие настройки графики, 30 кадров в секунду, требуется SSD'
  }
];
