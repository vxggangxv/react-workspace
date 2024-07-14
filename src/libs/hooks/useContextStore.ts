import {
  Context,
  useCallback,
  useContext,
  useRef,
  useSyncExternalStore,
} from "react";

export function useContextData<Value>(initialState: Value) {
  const store = useRef(initialState);

  const get = useCallback(() => store.current, []);

  const subscribers = useRef(new Set<() => void>());

  const set = useCallback((value: Partial<Value>) => {
    store.current = { ...store.current, ...value };
    subscribers.current.forEach((callback) => callback());
  }, []);

  const subscribe = useCallback((callback: () => void) => {
    subscribers.current.add(callback);
    return () => subscribers.current.delete(callback);
  }, []);

  return {
    get,
    set,
    subscribe,
  };
}

export type UseContextDataReturnType = ReturnType<typeof useContextData>;

export function useContextStore<Value, SelectorOutput>(
  Context: Context<Value>,
  selector?: (value: Value) => SelectorOutput
) {
  const store = useContext(Context) as UseContextDataReturnType;

  if (!store) {
    throw new Error("Store not found");
  }

  const state = useSyncExternalStore(store.subscribe, () => {
    if (typeof selector === "function") return selector(store.get() as Value);
    return store.get();
  });

  return [state, store.set];
}
