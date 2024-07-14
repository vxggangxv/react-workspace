import { useCallback, useContext, useRef, useSyncExternalStore } from "react";

export function useContextData(initialState) {
  const store = useRef(initialState);

  const get = useCallback(() => store.current, []);

  const subscribers = useRef(new Set());

  const set = useCallback((value) => {
    store.current = { ...store.current, ...value };
    subscribers.current.forEach((callback) => callback());
  }, []);

  const subscribe = useCallback((callback) => {
    subscribers.current.add(callback);
    return () => subscribers.current.delete(callback);
  }, []);

  return {
    get,
    set,
    subscribe,
  };
}

// export type UseContextDataReturnType = ReturnType<typeof useContextData>;

export function useContextStore(Context, selector) {
  const store = useContext(Context);

  if (!store) {
    throw new Error("Store not found");
  }

  const state = useSyncExternalStore(store.subscribe, () => {
    if (typeof selector === "function") return selector(store.get());
    return store.get();
  });

  return [state, store.set];
}
