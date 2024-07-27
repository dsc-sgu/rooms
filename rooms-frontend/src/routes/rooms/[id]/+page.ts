import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  return {
    id: params.id,
    name: `Комната ${params.id}`,
    desks: [
      { isFree: true, num: 1, posX: 150, posY: 50 },
      { isFree: false, num: 2, posX: 60, posY: 420 },
      { isFree: false, num: 3, posX: 1200, posY: 420 }
    ],
    imgUrl: '/room.png'
  };
};
