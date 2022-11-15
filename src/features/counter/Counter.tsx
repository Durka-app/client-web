import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCount } from './counterSlice';

export function Counter() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
    </div>
  );
}
