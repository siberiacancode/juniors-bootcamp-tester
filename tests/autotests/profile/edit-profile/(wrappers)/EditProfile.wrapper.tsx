import { Suspense, useEffect } from 'react';

import { AppOverlays, appOverlaysStore } from '@/app/components/overlays';
import { ProfileInfo } from '@/routes/(layout)/_authenticated/profile/-components';

export const EditProfileWrapper = () => {
  useEffect(
    () => () => {
      appOverlaysStore.get().close();
    },
    []
  );

  return (
    <>
      <Suspense fallback={null}>
        <ProfileInfo />
      </Suspense>
      <AppOverlays />
    </>
  );
};
