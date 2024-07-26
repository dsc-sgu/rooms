export type CoordSystem = {
  actualImgSize: number;
  originalImgSize: number;
  imgPos: number;
};

export function defaultCoordSystem(): CoordSystem {
  return {
    actualImgSize: 1,
    originalImgSize: 1,
    imgPos: 0
  };
}

export function transformCoordSystem({
  pos,
  actualImgSize,
  originalImgSize,
  imgPos
}: { pos: number } & CoordSystem): number {
  return Math.round(pos * (actualImgSize / originalImgSize) + imgPos);
}

export function transformCoordSystemBack({
  pos,
  actualImgSize,
  originalImgSize,
  imgPos
}: { pos: number } & CoordSystem): number {
  return Math.round((pos - imgPos) * (originalImgSize / actualImgSize));
}
