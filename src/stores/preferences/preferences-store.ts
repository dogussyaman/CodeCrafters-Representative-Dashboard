import { createStore } from "zustand/vanilla";
import { createJSONStorage, persist } from "zustand/middleware";

import type { ThemeMode, ThemePreset } from "@/types/preferences/theme";

export type PreferencesState = {
  themeMode: ThemeMode;
  themePreset: ThemePreset;
  setThemeMode: (mode: ThemeMode) => void;
  setThemePreset: (preset: ThemePreset) => void;
  onboardingCompleted: boolean;
  setOnboardingCompleted: (completed: boolean) => void;
};

export const createPreferencesStore = (init?: Partial<PreferencesState>) =>
  createStore<PreferencesState>()(
    persist(
      (set) => ({
        themeMode: init?.themeMode ?? "light",
        themePreset: init?.themePreset ?? "default",
        setThemeMode: (mode) => set({ themeMode: mode }),
        setThemePreset: (preset) => set({ themePreset: preset }),
        onboardingCompleted: init?.onboardingCompleted ?? false,
        setOnboardingCompleted: (completed) => set({ onboardingCompleted: completed }),
      }),
      {
        name: "preferences-storage", // localStorage key
        storage: createJSONStorage(() => localStorage),
      }
    )
  );
