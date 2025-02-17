import { ref, watch } from "vue";
import type { Ref } from "vue";
import Cookies from "js-cookie";

export function useCookie<T extends Record<string, string>>(
  key: string,
  defaultValue: T | null = null
): Ref<T | null> {
  const cookieValue = ref<T | null>(null);

  // Initialize the value
  const existingCookie = Cookies.get(key);
  if (existingCookie) {
    try {
      cookieValue.value = JSON.parse(existingCookie);
    } catch {
      cookieValue.value = defaultValue;
    }
  } else {
    cookieValue.value = defaultValue;
  }

  // Watch for changes and update cookie
  watch(cookieValue, (newValue) => {
    if (newValue === null) {
      Cookies.remove(key);
    } else {
      Cookies.set(key, JSON.stringify(newValue));
    }
  });

  return cookieValue as Ref<T | null>;
}
