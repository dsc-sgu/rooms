export type Desk = {
  isFree: boolean;
  num: number;
  posX: number;
  posY: number;
};

export type Room = {
  id: string;
  name: string;
  imgUrl: string;
  desks: Desk[];
};
