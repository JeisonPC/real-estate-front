import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Theme = "light" | "dark";

interface ThemeState {
  current: Theme;
}
const initialState: ThemeState = { current: "dark" };

const slice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.current = action.payload;
    },
    toggleTheme: (state) => {
      state.current = state.current === "dark" ? "light" : "dark";
    },
  },
});

export const { setTheme, toggleTheme } = slice.actions;
export default slice.reducer;
