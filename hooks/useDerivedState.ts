import { useCallback } from 'react';

/**
 * A hook that manages a derived state from a parent state.
 * @param currentState The current state object
 * @param setState The state setter function
 * @param getter A function that extracts the derived state from the current state
 * @param updater A function that updates the current state with a new derived state value
 * @returns A tuple containing the derived state and a setter function
 */
export function useDerivedState<O, S>(
  currentState: O,
  setState: (updater: (state: O) => O) => void,
  getter: (state: O) => S,
  updater: (state: O, newValue: S) => O
): [S, (newValue: S) => void] {
  // Get the current derived state
  const derivedState = getter(currentState);
  // Create a setter function that updates the parent state
  const setDerivedState = useCallback(
    (newValue: S) => {
      setState((o: O) => updater(o, newValue));
    },
    [currentState, setState, updater]
  );

  return [derivedState, setDerivedState];
} 

/**
 * A hook that manages a derived state from a parent state.
 * @param currentState The current state object
 * @param setState The state setter function
 * @param getter A function that extracts the derived state from the current state
 * @param updater A function that updates the current state with a new derived state value
 * @returns A tuple containing the derived state and a setter function
 */
export function useDerivedStateField<O, K extends keyof O>(
    currentState: O,
    setState: (updater: (state: O) => O) => void,
    field: K,
  ): [O[K], (newValue: O[K]) => void] {
    // Get the current derived state
    return useDerivedState(currentState, setState, (state: O) => state[field], (state, newValue) => ({ ...state, [field]: newValue }));
  } 