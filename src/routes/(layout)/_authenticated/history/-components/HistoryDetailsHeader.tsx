import { Link } from '@tanstack/react-router';
import { ChevronLeftIcon } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { IconButton } from '@/shared/components/ui/icon-button';
import { Typography } from '@/shared/components/ui/typography';

export const HistoryDetailsHeader = () => (
  <>
    <div className='flex items-center gap-4 sm:hidden'>
      <IconButton asChild rounded size='sm' variant='ghost'>
        <Link to='/history'>
          <ChevronLeftIcon />
        </Link>
      </IconButton>
      <Typography as='h1' variant='title-md'>
        Подробности покупки
      </Typography>
    </div>

    <div className='hidden items-center gap-4 sm:flex'>
      <Button asChild size='md' variant='secondary'>
        <Link to='/history'>
          <ChevronLeftIcon />
          Назад
        </Link>
      </Button>
      <Typography as='h1' variant='title-lg'>
        Подробности покупки
      </Typography>
    </div>
  </>
);
