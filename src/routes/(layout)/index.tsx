import { useDebounceCallback, useDebounceValue } from '@siberiacancode/reactuse';
import { useInfiniteQuery } from '@tanstack/react-query';
import { createFileRoute, Link, stripSearchParams } from '@tanstack/react-router';
import { Loader2Icon, LoaderIcon, SearchIcon, XIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { Fragment } from 'react/jsx-runtime';
import z from 'zod';

import type { Game, GameGenre } from '@/shared/api/generated';

import { getGamesInfo, getGamesInfoQueryKey, useGetGamesSearchQuery } from '@/shared/api/generated';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxSeparator,
  ComboboxStatus
} from '@/shared/components/ui/combobox';
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
  FieldTitle
} from '@/shared/components/ui/field';
import { InputGroupAddon, InputGroupIconButton } from '@/shared/components/ui/input-group';
import { Slider } from '@/shared/components/ui/slider';
import { Typography } from '@/shared/components/ui/typography';
import { cn } from '@/shared/utils';

const MIN_YEAR = 2006;
const MAX_YEAR = new Date().getFullYear();

const GENRES = [
  'action',
  'adventure',
  'rpg',
  'strategy',
  'shooter',
  'simulation',
  'survival',
  'sports',
  'racing',
  'indie',
  'horror'
] as const satisfies GameGenre[];

const gameSearchSchema = z.object({
  genre: z.array(z.enum(GENRES)).default([]),
  minYear: z.number().default(MIN_YEAR),
  maxYear: z.number().default(MAX_YEAR)
});

type GameSearch = z.infer<typeof gameSearchSchema>;

const DEFAULT_SEARCH: GameSearch = {
  genre: [],
  minYear: MIN_YEAR,
  maxYear: MAX_YEAR
};

export const Route = createFileRoute('/(layout)/')({
  // component: RouteComponent,
  component: () => <div>Главная</div>,
  validateSearch: gameSearchSchema,
  search: {
    middlewares: [stripSearchParams(DEFAULT_SEARCH)]
  }
});

function RouteComponent() {
  const searchParams = Route.useSearch();
  const navigate = Route.useNavigate();

  const gamesInfoQuery = useInfiniteQuery({
    queryKey: [getGamesInfoQueryKey, searchParams],
    queryFn: ({ pageParam }) =>
      getGamesInfo({
        query: {
          page: pageParam,
          genre: searchParams.genre,
          minYear: searchParams.minYear,
          maxYear: searchParams.maxYear
        }
      }),
    initialPageParam: 1,
    getNextPageParam: ({ data }) =>
      data.meta.page < data.meta.totalPages ? data.meta.page + 1 : null
  });

  const [years, setYears] = useState([searchParams.minYear, searchParams.maxYear]);

  const debouncedSetYearsSearchParams = useDebounceCallback(
    (value: [number, number]) =>
      navigate({
        search: {
          ...searchParams,
          minYear: value[0],
          maxYear: value[1]
        }
      }),
    500
  );

  const onYearsChange = (value: [number, number]) => {
    setYears(value);
    debouncedSetYearsSearchParams(value);
  };

  const [genres, setGenres] = useState(searchParams.genre ?? []);

  const debouncedSetGenresSearchParams = useDebounceCallback(
    (genre: GameGenre[]) =>
      navigate({
        search: {
          ...searchParams,
          genre
        }
      }),
    500
  );

  const onCheckGenre = (checked: boolean, genre: GameGenre) => {
    const update = checked ? [...(genres ?? []), genre] : genres?.filter((g) => g !== genre);
    setGenres(update);

    debouncedSetGenresSearchParams(update);
  };

  const [searchValue, setSearchValue] = useState('');

  const debouncedSearchValue = useDebounceValue(searchValue, 500);

  const gamesSearchQuery = useGetGamesSearchQuery({
    request: {
      query: {
        search: debouncedSearchValue
      }
    },
    params: {
      enabled: !!debouncedSearchValue,
      staleTime: Infinity
    }
  });

  const comboboxAnchorRef = useRef<HTMLDivElement>(null);

  const searchGames = gamesSearchQuery.data?.data.data;

  const isNotEmpty =
    gamesSearchQuery.isLoading ||
    (gamesSearchQuery.isSuccess && searchGames!.length > 0) ||
    debouncedSearchValue.length === 0;

  return (
    <div className='flex gap-10'>
      <aside className='flex w-full max-w-56 shrink-0 flex-col gap-6'>
        <FieldGroup>
          {/* <Field orientation='horizontal'>
            <FieldLabel htmlFor='only-discount'>Только со скидкой</FieldLabel>
            <Switch id='only-discount' />
          </Field>

          <FieldSeparator /> */}

          {/* <Field>
            <FieldTitle>Рейтинг</FieldTitle>
            <Slider className='mt-2' defaultValue={[60, 100]} max={100} step={10} />
          </Field>

          <FieldSeparator /> */}

          <Field>
            <FieldTitle>Год выпуска</FieldTitle>
            <div>
              <div className='flex justify-between'>
                <span>{years[0]}</span>
                <span>—</span>
                <span>{years[1]}</span>
              </div>
              <Slider
                className='mt-2'
                max={MAX_YEAR}
                min={MIN_YEAR}
                step={1}
                value={years}
                onValueChange={onYearsChange}
              />
            </div>
          </Field>

          <FieldSeparator />

          <FieldSet>
            <FieldTitle>Жанр</FieldTitle>
            <FieldGroup data-slot='checkbox-group'>
              {GENRES.map((genre) => (
                <Field key={genre} orientation='horizontal'>
                  <Checkbox
                    checked={genres.includes(genre)}
                    id={genre}
                    name={genre}
                    onCheckedChange={(checked: boolean) => onCheckGenre(checked, genre)}
                  />
                  <FieldLabel htmlFor={genre}>{genre}</FieldLabel>
                </Field>
              ))}
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </aside>

      <main className='flex w-full flex-col gap-6'>
        <Combobox
          items={searchGames}
          itemToStringValue={(game: Game) => game.name}
          openOnInputClick={false}
          onInputValueChange={setSearchValue}
        >
          <ComboboxInput inputGroupRef={comboboxAnchorRef} placeholder='Поиск' showTrigger={false}>
            <InputGroupAddon align='start'>
              <SearchIcon />
            </InputGroupAddon>
            {!!searchValue && (
              <InputGroupAddon align='end'>
                <InputGroupIconButton onClick={() => setSearchValue('')}>
                  <XIcon />
                </InputGroupIconButton>
              </InputGroupAddon>
            )}
          </ComboboxInput>
          <ComboboxContent anchor={comboboxAnchorRef}>
            <ComboboxEmpty className={cn(isNotEmpty && 'hidden')}>Ничего не нашлось</ComboboxEmpty>
            <ComboboxStatus className={cn(!gamesSearchQuery.isLoading && 'hidden')}>
              <Loader2Icon className='animate-spin' />
            </ComboboxStatus>
            <ComboboxList>
              {(game: Game, index) => {
                const priceVariant = game.priceVariants.reduce(
                  (min, current) => (current.price < min.price ? current : min),
                  game.priceVariants[0]
                );
                return (
                  <Fragment key={game.slug}>
                    <ComboboxItem value={game.slug}>
                      <Link
                        params={{
                          slug: game.slug
                        }}
                        className='flex h-12 w-full items-center justify-between gap-4'
                        to='/games/$slug'
                      >
                        <div className='flex flex-1 items-center gap-2'>
                          <img
                            alt={game.name}
                            className='aspect-video h-10 object-cover object-center grayscale'
                            src={`https://juniorsbootcamp.ru/api${game.image}`}
                          />
                          <Typography as='span' variant='body-md'>
                            {game.name}
                          </Typography>
                        </div>

                        <div className='flex items-center gap-2'>
                          {priceVariant.oldPrice && (
                            <Badge className='px-2 py-1' variant='accent'>
                              -
                              {(
                                ((priceVariant.oldPrice - priceVariant.price) /
                                  priceVariant.oldPrice) *
                                100
                              ).toFixed(0)}
                              %
                            </Badge>
                          )}
                          <div className='flex flex-col items-end'>
                            {priceVariant.oldPrice && (
                              <Typography
                                as='span'
                                className='text-muted-fg line-through'
                                variant='caption'
                              >
                                {priceVariant.oldPrice} ₽
                              </Typography>
                            )}
                            <Typography as='span' variant='body-sm'>
                              {priceVariant.price} ₽
                            </Typography>
                          </div>
                        </div>
                      </Link>
                    </ComboboxItem>
                    {index + 1 < Number(searchGames?.length) && <ComboboxSeparator />}
                  </Fragment>
                );
              }}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>

        <Typography as='h1' variant='title-md'>
          Магазин игр
        </Typography>

        {gamesInfoQuery.isLoading && (
          <div className='grid w-full place-items-center self-stretch'>
            <Loader2Icon className='size-8 animate-spin' />
          </div>
        )}

        {gamesInfoQuery.isError && gamesInfoQuery.error.message}

        {!gamesInfoQuery.isLoading && (
          <>
            <div className='grid w-full grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4'>
              {gamesInfoQuery.data?.pages.map((group, i) => (
                <Fragment key={i}>
                  {group.data.data.map((game) => {
                    const priceVariant = game.priceVariants.reduce(
                      (min, current) => (current.price < min.price ? current : min),
                      game.priceVariants[0]
                    );
                    return (
                      <Link
                        key={game.slug}
                        className='flex flex-col gap-2 rounded-24'
                        params={{ slug: game.slug }}
                        to='/games/$slug'
                      >
                        <img
                          alt={game.name}
                          className='aspect-video object-cover object-center grayscale'
                          src={`https://juniorsbootcamp.ru/api${game.image}`}
                        />

                        <div className='flex flex-col'>
                          <div className='flex items-center gap-1'>
                            <Typography as='span'>{priceVariant.price} ₽</Typography>

                            {priceVariant.oldPrice && (
                              <>
                                <Badge className='px-2 py-1' variant='accent'>
                                  -
                                  {(
                                    ((priceVariant.oldPrice - priceVariant.price) /
                                      priceVariant.oldPrice) *
                                    100
                                  ).toFixed(0)}
                                  %
                                </Badge>

                                <Typography
                                  as='span'
                                  className='text-muted-fg line-through'
                                  variant='body-sm'
                                >
                                  {priceVariant.oldPrice} ₽
                                </Typography>
                              </>
                            )}
                          </div>
                          <Typography as='h3' className='font-semibold'>
                            {game.name}
                          </Typography>
                        </div>
                      </Link>
                    );
                  })}
                </Fragment>
              ))}
            </div>

            <div className='flex justify-center'>
              {gamesInfoQuery.hasNextPage && (
                <Button
                  disabled={gamesInfoQuery.isFetching}
                  onClick={() => gamesInfoQuery.fetchNextPage()}
                >
                  {gamesInfoQuery.isFetchingNextPage && <LoaderIcon className='animate-spin' />}
                  Показать ещё
                </Button>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
