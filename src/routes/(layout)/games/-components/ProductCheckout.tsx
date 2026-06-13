import { Controller } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';

import type { PriceVariant } from '@/shared/api/generated';

import { MascotIcon } from '@/shared/components/icons/MascotIcon';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { Typography } from '@/shared/components/ui/typography';

import type { ProductGame } from '../-types';

import { paymentMethods, PRODUCT_DELIVERY_OPTIONS, PRODUCT_REGION_OPTIONS } from '../-constants';
import { formatProductPrice } from '../-helpers';
import { useProductCheckoutForm } from '../-hooks/useProductCheckoutForm';
import { SelectionMark } from './SelectionMark';

export const ProductCheckout = ({
  game,
  priceVariant
}: {
  game: ProductGame;
  priceVariant: PriceVariant;
}) => {
  const { form, handleSubmit } = useProductCheckoutForm();
  const isInviteLinkAvailable = priceVariant.deliveryType === 'steam_gift';

  const deliveryLabel =
    PRODUCT_DELIVERY_OPTIONS.find((option) => option.value === priceVariant.deliveryType)?.label ??
    'Steam ключ';

  const regionLabel =
    PRODUCT_REGION_OPTIONS.find((option) => option.value === priceVariant.region)?.label ??
    'Россия';

  return (
    <Card asChild className='mt-6 gap-4 border-none bg-secondary p-6 lg:mt-0'>
      <form onSubmit={handleSubmit}>
        <div className='flex gap-3'>
          <div className='aspect-square size-14 overflow-hidden rounded-8'>
            <img alt={game.name} className='size-full object-cover' src={game.image} />
          </div>
          <div className='flex-1'>
            <Typography as='p' className='truncate' variant='body-md'>
              {game.name}
            </Typography>
            <Typography as='p' className='truncate text-muted-fg' variant='caption'>
              {priceVariant.edition}
            </Typography>
          </div>
        </div>

        <div className='flex flex-wrap gap-2 px-1'>
          <Badge className='bg-background px-4 py-2 text-[12px]/4'>Регион {regionLabel}</Badge>
          <Badge className='bg-background px-4 py-2 text-[12px]/4'>{deliveryLabel}</Badge>
        </div>

        <div className='flex flex-col gap-4'>
          {isInviteLinkAvailable && (
            <Controller
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    className='h-10 bg-background text-[16px]/6 placeholder:text-muted-fg'
                    id={field.name}
                    placeholder='Инвайт-ссылка *'
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
              control={form.control}
              name='inviteLink'
            />
          )}
          <Controller
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  className='text-[16px]/6 font-medium text-foreground'
                  htmlFor={field.name}
                >
                  Почта
                </FieldLabel>
                <Input
                  {...field}
                  className='h-10 bg-background text-[16px]/6 placeholder:text-muted-fg'
                  id={field.name}
                  placeholder='E-mail'
                  type='email'
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
            control={form.control}
            name='email'
          />
          <Controller
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  className='text-[16px]/6 font-medium text-foreground'
                  htmlFor={field.name}
                >
                  Номер телефона
                </FieldLabel>
                <Input
                  asChild
                  className='h-10 bg-background text-[16px]/6 placeholder:text-muted-fg'
                  id={field.name}
                  placeholder='+7'
                >
                  <PatternFormat
                    format='+7 ### ### ## ##'
                    getInputRef={field.ref}
                    value={field.value.substring(1)}
                    onBlur={field.onBlur}
                    onValueChange={({ value }) => field.onChange(value ? `7${value}` : '')}
                  />
                </Input>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
            control={form.control}
            name='phone'
          />
        </div>

        <div className='flex flex-col gap-3'>
          <Typography as='p' variant='body-md'>
            Способ оплаты
          </Typography>
          <Controller
            render={({ field }) => (
              <div className='grid grid-cols-2 gap-2'>
                {paymentMethods.map((method) => (
                  <button
                    key={method.value}
                    className='relative flex min-h-20 items-start gap-2 overflow-hidden rounded-16 bg-background p-4 text-left transition'
                    type='button'
                    onClick={() => field.onChange(method.value)}
                  >
                    <span className='flex flex-1 flex-col gap-1'>
                      <span className='w-fit rounded-full bg-primary px-3 py-0.5 font-pixelify-sans text-[20px]/5 font-bold tracking-wide text-primary-fg'>
                        jb
                      </span>
                      <Typography as='p' variant='body-sm'>
                        {method.label}
                      </Typography>
                    </span>
                    {method.value === 'jb-pay' && (
                      <MascotIcon className='pointer-events-none absolute -bottom-px left-27 size-14 -translate-x-1/2' />
                    )}
                    <SelectionMark active={field.value === method.value} />
                  </button>
                ))}
              </div>
            )}
            control={form.control}
            name='paymentMethod'
          />
        </div>

        <div className='flex flex-col gap-2 rounded-16 bg-background p-3'>
          <Controller
            render={({ field }) => (
              <label className='flex items-center gap-2 text-[16px]/6 font-medium'>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(value) => field.onChange(value === true)}
                />
                <span>Привязать счёт JB Pay</span>
              </label>
            )}
            control={form.control}
            name='bindJbPay'
          />
          <Controller
            render={({ field }) => (
              <label className='flex items-center gap-2 text-[16px]/6 font-medium'>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(value) => field.onChange(value === true)}
                />
                <span>Оплатить без привязки</span>
              </label>
            )}
            control={form.control}
            name='payWithoutBinding'
          />
        </div>

        <div className='rounded-16 bg-background p-3'>
          <div className='flex items-center justify-between gap-4'>
            <Typography as='p' variant='body-sm'>
              Итого
            </Typography>
            <Typography as='span' variant='body-lg'>
              {formatProductPrice(priceVariant.price)}
            </Typography>
          </div>
        </div>

        <Button className='h-13 w-full' type='submit'>
          Оплатить
        </Button>
      </form>
    </Card>
  );
};
