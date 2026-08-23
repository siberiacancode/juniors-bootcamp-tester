import { Button, Typography } from '@siberiacancode/uikit';
import { createFileRoute } from '@tanstack/react-router';
import {
  ContactIcon,
  HeadphonesIcon,
  MailIcon,
  MessageCircleQuestionIcon,
  SendIcon
} from 'lucide-react';

import { LINKS } from '@/utils/constants';
import { IntlText } from '@/utils/lib/intl';

const INFORMATION_SECTIONS = [
  {
    id: 'support',
    descriptionPath: 'page.information.support.description',
    icon: HeadphonesIcon,
    titlePath: 'navigation.support'
  },
  {
    id: 'email',
    descriptionPath: 'page.information.email.description',
    icon: MailIcon,
    titlePath: 'navigation.email'
  },
  {
    id: 'advertising',
    descriptionPath: 'page.information.advertising.description',
    icon: MessageCircleQuestionIcon,
    titlePath: 'navigation.advertising'
  },
  {
    id: 'contacts',
    descriptionPath: 'page.information.contacts.description',
    icon: ContactIcon,
    linklabel: 'page.information.contacts.link',
    titlePath: 'navigation.contacts'
  }
] as const;

const InformationPage = () => (
  <main className='flex flex-col gap-6 py-6 sm:py-10'>
    <div className='flex items-center'>
      <Typography as='h1' variant='title-md'>
        <IntlText path='page.information.title' />
      </Typography>
    </div>

    <div className='flex flex-col gap-4'>
      {INFORMATION_SECTIONS.map((section) => (
        <section
          key={section.id}
          className='flex scroll-mt-24 flex-col gap-4 rounded-24 bg-secondary p-6'
          id={section.id}
        >
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <section.icon className='size-5 shrink-0' strokeWidth={2} />
              <Typography as='h2' className='text-[18px]/[26px]' variant='body-md'>
                <IntlText path={section.titlePath} />
              </Typography>
            </div>
            <Typography as='p' className='text-[16px]/6 text-muted-fg' variant='body-sm'>
              <IntlText path={section.descriptionPath} />
            </Typography>
          </div>
          {section.id === 'contacts' && (
            <Button asChild className='w-fit'>
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
