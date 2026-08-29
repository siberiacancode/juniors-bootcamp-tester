import { appOverlaysStore } from '../store';
import { DeletePaymentCardConfirmation } from './DeletePaymentCardConfirmation';
import { EditProfileDrawer } from './EditProfileDrawer';
import { LogoutConfirmation } from './LogoutConfirmation';

export const AppOverlays = () => {
  const activeOverlay = appOverlaysStore.use();

  if (activeOverlay.active === 'editProfile') return <EditProfileDrawer />;
  if (activeOverlay.active === 'logout') return <LogoutConfirmation />;
  if (activeOverlay.active === 'deletePaymentCard')
    return <DeletePaymentCardConfirmation cardId={activeOverlay.data.cardId} />;

  return null;
};
