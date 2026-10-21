import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** false при статической сборке и первой отрисовке, true в браузере — для всего, что зависит от «сегодня» */
export function useMounted(): boolean {
  return useSyncExternalStore(noop, () => true, () => false);
}
