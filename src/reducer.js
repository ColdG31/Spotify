export const initialState = {
  user: null,
  playlists: [],
  playing: false,
  item: null,
  // REMOVE AFTER FINISHING DEVELOPING
  token:
    "BQCXucUuWUuKqVELK8o0hEZ_c3-kYrLmM0CYnIclnE-KI-jHpPiVxWBZs20tMM31pOOy3LrMBIBi-wDaPUJV3sUpl9w6YiudLjHdunHrCANF30mYbrX4ixy_2HOcdpFrg4c90j1i9tBMefbZUBhdB6MLMUPHjFikrhDl2ZFBf-8a56dAXoTuq3V73AiADCzuTH5bAcDaYKyiUPUKWpu-WquvlVp0zlVVzGgKRlXVmg7yYdOJmDt1OlTZAddyhAC1YkaKG4wj_4VfpbkFgRXHsP-SkuS6CkBYLWo8U99S4zdYEwohXmG8Y0Wraj65UajyLgRqIeMufDmM144Rk6n2",
};

const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };

    default:
      return state;
  }
};

export default reducer;
