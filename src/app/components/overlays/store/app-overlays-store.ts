import { createStore } from '@siberiacancode/reactuse';

interface DeletePaymentCardData {
  cardId: string;
}

type AppOverlaysStoreValue = {
  close: () => void;
  open: {
    (type: 'deletePaymentCard', data: DeletePaymentCardData): void;
    (type: 'editProfile'): void;
    (type: 'logout'): void;
  };
} & (
  | { active: 'deletePaymentCard'; data: DeletePaymentCardData }
  | { active: 'editProfile'; data: undefined }
  | { active: 'logout'; data: undefined }
  | {
      active: undefined;
      data: undefined;
    }
);

export const appOverlaysStore = createStore<AppOverlaysStoreValue>((set) => ({
  active: undefined,
  data: undefined,
  open: ((active, data) =>
    set({ active, data } as Partial<AppOverlaysStoreValue>)) as AppOverlaysStoreValue['open'],
  close: () => set({ active: undefined, data: undefined })
}));
