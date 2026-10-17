import type { GamesPaginatedResponse } from '../../../generated/api/types.gen';

import { getGameImageUrl } from '../../lib/catalog';
import { Logo } from './logo';

interface CatalogProps {
  catalog?: GamesPaginatedResponse;
  error?: string;
  searchParams: URLSearchParams;
}

const GENRES = [
  ['action', 'Экшены'],
  ['adventure', 'Приключенческие игры'],
  ['rpg', 'Ролевые игры'],
  ['strategy', 'Стратегии'],
  ['shooter', 'Шутеры']
] as const;

const VIEWS = [
  ['', 'Весь каталог'],
  ['popular', 'Популярные'],
  ['new', 'Новинки']
] as const;

const moneyFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0
});

const getCatalogHref = (searchParams: URLSearchParams) => {
  const query = searchParams.toString();
  return query ? `/?${query}` : '/';
};

const getViewHref = (searchParams: URLSearchParams, view: string) => {
  const nextSearchParams = new URLSearchParams(searchParams);
  nextSearchParams.delete('page');
  nextSearchParams.delete('limit');

  if (view) nextSearchParams.set('view', view);
  else nextSearchParams.delete('view');

  return getCatalogHref(nextSearchParams);
};

const getNextPageHref = (searchParams: URLSearchParams, page: number) => {
  const nextSearchParams = new URLSearchParams(searchParams);
  nextSearchParams.set('page', String(page));
  return getCatalogHref(nextSearchParams);
};

export const Catalog = ({ catalog, error, searchParams }: CatalogProps) => {
  const selectedFilters = searchParams.getAll('filter');
  const selectedGenres = searchParams.getAll('genre');
  const selectedView = searchParams.get('view') ?? '';

  return (
    <div className='shell'>
      <header className='header'>
        <a href='/'>
          <Logo />
        </a>
      </header>

      <main className='catalog'>
        <h1>Магазин игр</h1>

        <label className='search'>
          <svg aria-hidden='true' viewBox='0 0 24 24'>
            <circle cx='11' cy='11' r='7' />
            <path d='m16.5 16.5 4 4' />
          </svg>
          <span className='visually-hidden'>Поиск</span>
          <input placeholder='Название игры' type='search' />
        </label>

        <nav aria-label='Вид каталога' className='views'>
          {VIEWS.map(([value, label]) => (
            <a
              key={value}
              aria-current={selectedView === value ? 'page' : undefined}
              className={selectedView === value ? 'view view-active' : 'view'}
              href={getViewHref(searchParams, value)}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className='catalog-grid'>
          <aside>
            <form className='filters'>
              {selectedView ? <input name='view' type='hidden' value={selectedView} /> : null}

              <label className='switch-row'>
                <span>Только со скидкой</span>
                <input
                  defaultChecked={selectedFilters.includes('discount')}
                  name='filter'
                  type='checkbox'
                  value='discount'
                />
              </label>
              <label className='switch-row'>
                <span>Показывать DLC</span>
                <input
                  defaultChecked={selectedFilters.includes('dlc')}
                  name='filter'
                  type='checkbox'
                  value='dlc'
                />
              </label>

              <fieldset>
                <legend>Жанр</legend>
                <div className='genre-search'>Название жанра</div>
                <div className='genre-list'>
                  {GENRES.map(([value, label]) => (
                    <label key={value} className='check-row'>
                      <input
                        defaultChecked={selectedGenres.includes(value)}
                        name='genre'
                        type='checkbox'
                        value={value}
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <button className='apply-button' type='submit'>
                Найти
              </button>
              <a className='reset-link' href='/'>
                Сбросить фильтры
              </a>
            </form>

            <section className='sale-banner'>
              <h2>Распродажа игр</h2>
              <p>Только до 10 июля</p>
              <strong>-50%</strong>
              <span aria-hidden='true' className='sale-art'>
                🎮
              </span>
            </section>
          </aside>

          <section aria-live='polite' className='content'>
            {error ? <div className='message'>{error}</div> : null}
            {!error && !catalog?.games.length ? (
              <div className='message'>Ничего не найдено</div>
            ) : null}
            {catalog?.games.length ? (
              <div className='games'>
                {catalog.games.map((game) => {
                  const { oldPrice, price } = game.priceVariant;
                  const hasDiscount = oldPrice !== undefined && oldPrice !== price;
                  const discount = hasDiscount ? Math.round((1 - price / oldPrice) * 100) : 0;

                  return (
                    <article key={game.slug} className='game-card'>
                      <div className='game-cover'>
                        {/* The plain img keeps this demo independent from a remote image allowlist. */}
                        <img alt={game.name} src={getGameImageUrl(game.image)} />
                      </div>
                      <div className='price-row'>
                        <strong>{moneyFormatter.format(price)}</strong>
                        {price === 0 ? <span className='badge'>Бесплатно</span> : null}
                        {hasDiscount ? <span className='badge'>{discount}%</span> : null}
                        {hasDiscount ? (
                          <span className='old-price'>{moneyFormatter.format(oldPrice)}</span>
                        ) : null}
                      </div>
                      <h2>{game.name}</h2>
                    </article>
                  );
                })}
              </div>
            ) : null}

            {catalog && catalog.meta.page < catalog.meta.totalPages ? (
              <a
                className='more-button'
                href={getNextPageHref(searchParams, catalog.meta.page + 1)}
              >
                Показать ещё
              </a>
            ) : null}

            <section className='sale-banner sale-banner-mobile'>
              <h2>Распродажа игр</h2>
              <p>Только до 10 июля</p>
              <strong>-50%</strong>
              <span aria-hidden='true' className='sale-art'>
                🎮
              </span>
            </section>
          </section>
        </div>
      </main>

      <footer className='footer'>
        <div>
          <Logo />
          <p>магазин игр</p>
        </div>
        <div>
          <strong>Игры</strong>
          <a href='/'>Весь каталог</a>
          <a href='/?view=new'>Новинки</a>
          <a href='/?view=popular'>Популярные</a>
        </div>
        <div>
          <strong>Связаться с нами</strong>
          <span>Поддержка клиентов</span>
          <span>Контакты</span>
        </div>
      </footer>
    </div>
  );
};
