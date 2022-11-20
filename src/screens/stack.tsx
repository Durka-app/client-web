import styled from '@emotion/styled';
import {
  Children, createContext, Dispatch, FC, ReactElement, ReactNode, ReducerState, useCallback, useContext, useEffect,
  useRef
} from 'react';
import { CSSTransition } from 'react-transition-group';

import { Action, ScreenState, State, useScreenStack } from '../App';

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

export const ScreenStackContext = createContext<
  [
    ReducerState<(state: State, action: Action) => State>,
    Dispatch<Action>
  ] | null
>(null);

export type ScreenProps = {
  id: string;
  element: ReactElement;
  visible: boolean;
};

export const ScreenContext = createContext<Nullable<ScreenState>>(null);

export function useScreen(): [ScreenState, () => void] {
  const stack = useScreenStack();
  const screen = useContext(ScreenContext);
  if(!screen) throw new Error('Missing screen context');

  return [screen, () => stack.pop(screen.key)];
}

const Screen: FC<ScreenProps> = ({
  id, element, visible
}) => {
  const [, dispatch] = useContext(ScreenStackContext)!;
  const ref = useRef(null);

  useEffect(() => dispatch({ type: 'show', key: id }), [dispatch]);

  const onExited = useCallback(() => dispatch({ type: 'delete', key: id }), [dispatch]);

  return <CSSTransition nodeRef={ref}
                        in={visible}
                        timeout={300}
                        unmountOnExit={true}
                        classNames={'screen-wrapper'}
                        onExited={onExited}>
    <ScreenWrapper ref={ref}>{element}</ScreenWrapper>
  </CSSTransition>;
};

export const ScreenStack: FC<Props> = ({ children }) => {
  const [screens] = useContext(ScreenStackContext)!;

  return <ScreenContainer>
    {Children.map(children, (node) => (
      <ScreenWrapper>{node}</ScreenWrapper>
    ))}

    {Object.values(screens).map((screen) => (
      <ScreenContext.Provider value={screen}>
        <Screen key={screen.key}
                id={screen.key}
                element={screen.element}
                visible={screen.visible} />
      </ScreenContext.Provider>
    ))}
  </ScreenContainer>;
};
