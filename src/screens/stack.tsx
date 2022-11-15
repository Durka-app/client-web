import styled from '@emotion/styled';
import {
  Children, createContext, Dispatch, FC, ReactElement, ReactNode, ReducerState, useContext, useEffect, useRef
} from 'react';
import { CSSTransition } from 'react-transition-group';

import { Action, State } from '../App';

const ScreenContainer = styled.div`
  position: fixed;

  width: 100%;
  height: 100%;

  top: 0;
  left: 0;
`;

const ScreenWrapper = styled.div`
  position: fixed;
  display: flex;

  width: 100%;
  height: 100%;

  top: 0;
  left: 0;
`;

type Props = {
  children: ReactNode
};

export const ScreenStackContext = createContext<[ReducerState<(
  state: State,
  action: Action
) => State>, Dispatch<Action>] | null>(null);

const Screen: FC<{ element: ReactElement, visible: boolean; onMount: () => void; onExited: () => void }> = ({
  element, visible,
  onMount, onExited
}) => {
  const ref = useRef(null);

  useEffect(onMount, []); // TODO: Infinite loop if onMount is in dependencies array

  return <CSSTransition
    nodeRef={ref}
    in={visible}
    timeout={300}
    unmountOnExit={true}
    classNames={'screen-wrapper'}
    onExited={onExited}>
    <ScreenWrapper ref={ref}>{element}</ScreenWrapper>
  </CSSTransition>;
};

export const ScreenStack: FC<Props> = ({ children }) => {
  const [screens, dispatch] = useContext(ScreenStackContext)!;

  return <ScreenContainer>
    {Children.map(children, (node) => (
      <ScreenWrapper>{node}</ScreenWrapper>
    ))}

    {screens.map((node, index) => (
      <Screen element={node.element}
              visible={node.visible}
              onMount={() => dispatch({ type: 'activate' })}
              onExited={() => dispatch({ type: 'delete' })} />
    ))}
  </ScreenContainer>;
};
