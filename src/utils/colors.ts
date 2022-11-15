import { darken, emphasize } from '@mui/material';

const ELEVATION_LIGHT = 0.025;

export function elevate(color: string, level: number): string {
  if(level > 0) return emphasize(color, level * ELEVATION_LIGHT);
  if(level < 0) return darken(color, -level * ELEVATION_LIGHT);
  return color;
}
