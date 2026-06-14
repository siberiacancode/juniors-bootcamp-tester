import { SearchIcon, XIcon } from 'lucide-react';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupIconButton,
  InputGroupInput
} from '@/components/ui/input-group';

interface CatalogSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const CatalogSearch = ({ onChange, value }: CatalogSearchProps) => (
  <div className='flex flex-1 flex-col gap-2.5 lg:gap-1.5'>
    <label
      className='font-nunito text-[18px]/6.5 font-medium tracking-normal lg:text-[12px]/4'
      htmlFor='catalog-search'
    >
      Поиск
    </label>
    <InputGroup>
      <InputGroupAddon align='start'>
        <SearchIcon className='text-input lg:size-4' />
      </InputGroupAddon>
      <InputGroupInput
        id='catalog-search'
        placeholder='Название игры'
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {value && (
        <InputGroupAddon align='end'>
          <InputGroupIconButton aria-label='Очистить поиск' onClick={() => onChange('')}>
            <XIcon />
          </InputGroupIconButton>
        </InputGroupAddon>
      )}
    </InputGroup>
  </div>
);
