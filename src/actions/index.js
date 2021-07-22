export const THEME_CHANGE = "THEME_CHANGE";
export function changeTheme(currentTheme) {
  return {
    type: THEME_CHANGE,
    dark:!currentTheme,
  };
}
