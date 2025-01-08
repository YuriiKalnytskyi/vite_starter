type Theme = 'light' | 'dark';
interface ThemeState {
  theme: Theme;
  setTheme: (value: Theme) => void;
}
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useThemeStore = create<ThemeState>()(
  devtools((set) => ({
    theme: 'light',
    setTheme: (value) => {
      set({ theme: value });
    }
  }))
);
