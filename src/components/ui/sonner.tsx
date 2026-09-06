import type { ComponentProps } from 'react';

import { useTheme } from '@siberiacancode/uikit/theme';
import { Toaster as SonnerToaster } from 'sonner';

type ToasterProps = ComponentProps<typeof SonnerToaster>;

const TOAST_STYLES = {
  '--normal-bg': 'var(--color-background)',
  '--normal-border': 'var(--color-input)',
  '--normal-text': 'var(--color-foreground)',
  '--border-radius': '16px'
} as ToasterProps['style'];

export const Toaster = ({ className, ...props }: ToasterProps) => {
  const theme = useTheme();

  return (
    <SonnerToaster
      closeButton
      toastOptions={{
        classNames: {
          content: 'flex min-w-0 flex-1 flex-col justify-center gap-0',
          icon: '!m-0 !flex !size-6 !items-center !justify-center text-foreground [&>svg]:!size-5',
          toast:
            'group toast !box-border !flex !min-h-[78px] !w-[calc(100vw-32px)] !max-w-[387px] !items-center !gap-4 !rounded-16 !border !border-muted-fg/20 !bg-background !py-4 !pr-16 !pl-4 !font-nunito !shadow-[0_8px_11.9px_rgb(0_0_0_/_0.04)] sm:!w-[387px]',
          title: 'truncate text-[16px]/6 font-medium tracking-normal text-foreground',
          description: 'truncate text-[14px]/5.5 font-medium tracking-normal text-foreground/50',
          actionButton:
            '!ml-auto !h-8 !shrink-0 !rounded-full !border !border-input !bg-secondary !px-3 text-[14px]/[21px] font-medium tracking-normal !text-foreground',
          closeButton:
            '!top-1/2 !right-4 !left-auto !flex !size-8 !-translate-y-1/2 !translate-x-0 !items-center !justify-center !rounded-8 !border-0 !bg-transparent !text-foreground [&>svg]:!size-5'
        }
      }}
      className={className}
      mobileOffset={16}
      offset={24}
      position='bottom-right'
      richColors={false}
      style={TOAST_STYLES}
      theme={theme.value as ToasterProps['theme']}
      {...props}
    />
  );
};
