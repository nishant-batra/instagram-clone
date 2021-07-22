import { THEME_CHANGE } from "../actions";

const initialState = {
  dark: null,
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case THEME_CHANGE:
      return {
        ...state,
        dark: action.dark,
      };
    default:
      return state;
  }
}
