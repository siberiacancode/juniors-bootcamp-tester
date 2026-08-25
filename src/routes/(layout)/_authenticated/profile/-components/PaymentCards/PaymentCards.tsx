import { Button, SavedPaymentCard, Typography } from '@siberiacancode/uikit';

import type { Card } from '@/generated/api';

import { appOverlaysStore } from '@/app/components/overlays';
import { IntlText } from '@/utils/lib/intl';

interface PaymentCardsProps {
  cards: Card[];
}

export const PaymentCards = ({ cards }: PaymentCardsProps) => (
  <section className='flex w-full flex-col gap-4'>
    <Typography as='h2' className='hidden md:block' variant='title-md'>
      <IntlText path='page.profile.cards.title' />
    </Typography>

    <div className='grid w-full grid-cols-2 gap-4 sm:flex sm:flex-wrap'>
      {cards.map((card) => (
        <div key={card._id} className='flex w-full max-w-[130px] flex-col gap-2'>
          <SavedPaymentCard
            aria-label={card.panMasked}
            className='w-full'
            panSuffix={card.panMasked}
          />
          <Button
            className='h-9 w-full'
            size='sm'
            type='button'
            variant='secondary'
            onClick={() =>
              appOverlaysStore.get().open('deletePaymentCard', {
                cardId: card._id
              })
            }
          >
            <IntlText path='button.deletePaymentCard' />
          </Button>
        </div>
      ))}
    </div>
  </section>
);
