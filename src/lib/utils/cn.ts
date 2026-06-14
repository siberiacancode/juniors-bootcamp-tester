import type { ClassValue } from '@siberiacancode/reactuse';

import { cn as _cn } from '@siberiacancode/reactuse';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: unknown[]) => twMerge(_cn(inputs as ClassValue[]));
