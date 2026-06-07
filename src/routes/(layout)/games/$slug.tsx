// import { createFileRoute, Link } from '@tanstack/react-router';
// import { ChevronLeftIcon } from 'lucide-react';

import { createFileRoute } from '@tanstack/react-router';

// import { useGetGamesInfoBySlugQuery, useGetGamesInfoQuery } from '@/shared/api/generated';
// import { MetacriticIcon } from '@/shared/components/icons/MetacriticIcon';
// import { Badge } from '@/shared/components/ui/badge';
// import { Button } from '@/shared/components/ui/button';
// import { Card } from '@/shared/components/ui/card';
// import { Input } from '@/shared/components/ui/input';
// import { Typography } from '@/shared/components/ui/typography';

export const Route = createFileRoute('/(layout)/games/$slug')({
  // component: RouteComponent
  component: () => <div>Game</div>
});

// TODO (WIP)
// function RouteComponent() {
//   const slug = Route.useParams({
//     select: (s) => s.slug
//   });

//   // eslint-disable-next-line unused-imports/no-unused-vars
//   const gamesQuery = useGetGamesInfoQuery();

//   const gameQuery = useGetGamesInfoBySlugQuery({
//     request: {
//       path: {
//         slug
//       }
//     }
//   });

//   const game = gameQuery.data?.data.data;

//   return (
//     <main className='flex flex-col items-start gap-6'>
//       <Button asChild variant='ghost'>
//         <Link to='/'>
//           <ChevronLeftIcon />
//           Назад
//         </Link>
//       </Button>

//       {gameQuery.isLoading && <div>Loading...</div>}

//       {gameQuery.isSuccess && (
//         <div className='flex gap-6'>
//           <div className='flex flex-col gap-6'>
//             <img
//               alt={game!.name}
//               className='aspect-video h-52 object-cover object-center grayscale'
//               src={`https://juniorsbootcamp.ru/api${game!.image}`}
//             />

//             <Card className='flex flex-col gap-4 px-6'>
//               <div className='flex items-center'>
//                 <Typography as='span' className='w-46 text-muted-fg' variant='body-sm'>
//                   Дата выхода:
//                 </Typography>
//                 <Typography as='span' variant='body-md'>
//                   {new Date(game!.releaseDate).toLocaleDateString('ru-RU')}
//                 </Typography>
//               </div>

//               {game!.rating && (
//                 <div className='flex items-center'>
//                   <Typography as='span' className='w-46 text-muted-fg' variant='body-sm'>
//                     Рейтинг metacritic:
//                   </Typography>

//                   <div className='flex items-center gap-2'>
//                     <Typography as='span' variant='body-md'>
//                       {game?.rating.toFixed(0)}
//                     </Typography>
//                     <MetacriticIcon className='size-3.5' />
//                   </div>
//                 </div>
//               )}

//               {game!.externalId && (
//                 <div className='flex items-center'>
//                   <Typography as='span' className='w-46 text-muted-fg' variant='body-sm'>
//                     Steam ID:
//                   </Typography>

//                   <Typography as='span' variant='body-md'>
//                     {game?.externalId}
//                   </Typography>
//                 </div>
//               )}
//             </Card>
//           </div>

//           <div className='flex flex-col gap-4'>
//             <Typography as='h1' variant='title-lg'>
//               {game!.name}
//             </Typography>

//             <div className='flex gap-2'>
//               {game!.genres.map((genre) => (
//                 <Badge key={genre}>{genre}</Badge>
//               ))}
//             </div>

//             <Typography as='p' className='text-pretty' variant='body-md'>
//               {game!.description}
//             </Typography>
//           </div>

//           <Card className='w-full max-w-88 justify-between gap-6 px-6'>
//             <Input placeholder='Email' />

//             <div className='flex flex-col gap-4'>
//               <Button size='lg'>Купить</Button>
//               <Typography className='text-center' variant='caption'>
//                 Нажимая «Купить», вы принимаете{' '}
//                 <Typography asChild variant='link'>
//                   <Link to='/'>Правила пользования сайтом</Link>
//                 </Typography>{' '}
//                 и{' '}
//                 <Typography asChild variant='link'>
//                   <Link to='/'>Договор публичной оферты</Link>
//                 </Typography>
//               </Typography>
//             </div>
//           </Card>
//         </div>
//       )}
//     </main>
//   );
// }
