import { Button, Typography } from '@siberiacancode/uikit';
import { createFileRoute } from '@tanstack/react-router';
import { SendIcon } from 'lucide-react';

import { LINKS } from '@/utils/constants';
import { IntlText } from '@/utils/lib/intl';

const INFORMATION_SECTIONS = [
  {
    id: 'support',
    descriptionPath: 'page.information.support.description',
    titlePath: 'navigation.support'
  },
  {
    id: 'email',
    descriptionPath: 'page.information.email.description',
    titlePath: 'navigation.email'
  },
  {
    id: 'advertising',
    descriptionPath: 'page.information.advertising.description',
    titlePath: 'navigation.advertising'
  },
  {
    id: 'contacts',
    descriptionPath: 'page.information.contacts.description',
    linklabel: 'page.information.contacts.link',
    titlePath: 'navigation.contacts'
  }
] as const;

const InformationPage = () => (
  <main className='flex flex-col gap-8 py-10 sm:py-16'>
    <header className='flex max-w-3xl flex-col gap-3'>
      <Typography as='h1' variant='title-md'>
        <IntlText path='page.information.title' />
      </Typography>
    </header>

    <div className='flex flex-col gap-6'>
      {INFORMATION_SECTIONS.map((section) => (
        <section
          key={section.id}
          className='scroll-mt-24 rounded-24 bg-secondary p-6 ring-1 ring-foreground/5'
          id={section.id}
        >
          <div className='mb-4 flex items-center gap-3'>
            <Typography as='h2' className='text-[20px]/7' variant='body-md'>
              <IntlText path={section.titlePath} />
            </Typography>
          </div>
          <Typography as='p' className='text-foreground/70' variant='body-sm'>
            <IntlText path={section.descriptionPath} />
          </Typography>
          {section.id === 'contacts' && (
            <Button asChild className='mt-5 w-fit'>
              <a href={LINKS.TELEGRAM} rel='noopener noreferrer' target='_blank'>
                <IntlText path={section.linklabel} />
                <SendIcon />
              </a>
            </Button>
          )}
        </section>
      ))}
    </div>
  </main>
);

export const Route = createFileRoute('/(layout)/information/')({
  component: InformationPage
});
