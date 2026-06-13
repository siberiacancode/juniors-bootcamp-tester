import type { Region } from '../api/generated';

export const REGION_LABELS: Record<Region, string> = {
  all_world: 'Мир',
  asia: 'Азия',
  by: 'Беларусь',
  europe: 'Европа',
  kz: 'Казахстан',
  pl: 'Польша',
  ru: 'Россия',
  tr: 'Турция',
  ua: 'Украина'
};

export const REGION_KEYS = Object.keys(REGION_LABELS) as Region[];
