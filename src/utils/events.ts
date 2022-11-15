import { BaseSyntheticEvent } from 'react';

export function stopPropagation(event: Event | BaseSyntheticEvent) {
  event.stopPropagation();
}
