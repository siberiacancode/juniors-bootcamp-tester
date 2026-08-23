import { useDidUpdate } from '@siberiacancode/reactuse';
import { Suspense, useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetCardsCardsSuspenseQuery } from '@/generated/api';
import { IntlText } from '@/utils/lib/intl';

import { PaymentCards } from '../PaymentCards';
import { ProfileOrderHistory } from '../ProfileOrderHistory';
import { ProfileContentSkeleton } from './ProfileContentSkeleton';

type ProfileContentTab = 'cards' | 'orders';

export const ProfileContent = () => {
  const getCardsCardsSuspenseQuery = useGetCardsCardsSuspenseQuery();
  const cards = getCardsCardsSuspenseQuery.data.data.cards;
  const [activeTab, setActiveTab] = useState<ProfileContentTab>('orders');

  useDidUpdate(() => {
    if (!cards.length) setActiveTab('orders');
  }, [cards.length]);

  return (
    <Tabs
      className='w-full lg:flex-1'
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as ProfileContentTab)}
    >
      {!!cards.length && (
        <TabsList className='self-start sm:self-end'>
          <TabsTrigger value='orders'>
            <IntlText path='page.profile.tabs.orders' />
          </TabsTrigger>
          <TabsTrigger value='cards'>
            <IntlText path='page.profile.tabs.cards' />
          </TabsTrigger>
        </TabsList>
      )}

      <div>
        <TabsContent value='orders'>
          <Suspense fallback={<ProfileContentSkeleton />}>
            <ProfileOrderHistory />
          </Suspense>
        </TabsContent>
        <TabsContent value='cards'>
          <PaymentCards cards={cards} />
        </TabsContent>
      </div>
    </Tabs>
  );
};
