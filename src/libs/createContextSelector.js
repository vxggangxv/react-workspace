import React, {
  createContext as createContextOriginal,
  useCallback,
  useEffect,
  useRef,
} from "react";

export const ORIGINAL_PROVIDER = Symbol();

function createProvider(ProviderOriginal) {
  return ({ value, children }) => {
    const store = useRef(value);
    const listeners = useRef(new Set());

    const set = useCallback((newValue) => {
      const nextValue =
        typeof newValue === "function" ? newValue(store.current) : newValue;

      if (nextValue !== store.current) {
        // console.log('listners call', 'prev: ', state, 'next: ', nextValue)
        store.current = nextValue;
        listeners.current.forEach((listener) => listener(store.current));
      }
    }, []);

    const subscribe = useCallback((listener) => {
      listeners.current.add(listener);
      return () => listeners.current.delete(listener);
    }, []);

    const contextValue = useRef({
      value: store.current,
      set,
      subscribe,
      listeners,
    });

    useEffect(() => {
      set(value);
    }, [set, value]);

    return (
      <ProviderOriginal value={contextValue.current}>
        {children}
      </ProviderOriginal>
    );
  };
}

export default function createContextSelector(defaultValue) {
  const context = createContextOriginal({
    value: {
      current: defaultValue,
    },
    register: () => {
      return () => {};
    },
  });

  delete context.Consumer;

  context.Provider = createProvider(context.Provider);

  return context;
}
