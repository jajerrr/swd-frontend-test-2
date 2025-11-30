// src/lib/store.ts
import { configureStore } from "@reduxjs/toolkit";
import personReducer, {
  initialState as personInitialState,
  Person,
} from "../features/personSlice";

const STORAGE_KEY = "person-list-v1";

function loadPreloadedState() {
  if (typeof window === "undefined") return undefined;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;

    const list = JSON.parse(raw) as Person[];

    return {
      person: {
        ...personInitialState,
        list,
      },
    };
  } catch (e) {
    console.error("Failed to load state from localStorage", e);
    return undefined;
  }
}

export const store = configureStore({
  reducer: {
    person: personReducer,
  },
  preloadedState: loadPreloadedState(),
});

store.subscribe(() => {
  if (typeof window === "undefined") return;

  try {
    const state = store.getState();
    const list: Person[] = state.person.list;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error("Failed to save state to localStorage", e);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
