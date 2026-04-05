import { createSignal } from "solid-js";
import { storage } from "./storage";

export function createStorageSignal<T>(key: string, initialValue: T) {
  const [value, _setValue] = createSignal<T>(storage.get(key, initialValue));

  function setValue(next: T | ((prev: T) => T)) {
    _setValue(next as any);
    storage.set(key, value());
  }

  return [value, setValue] as const;
}