import {
  MOVIE_LIST_REQUEST,
  MOVIE_LIST_SUCCESS,
  MOVIE_LIST_FAIL,
  ADD_NOMINATION,
  REMOVE_NOMINATION,
} from "../constants/Constants";

export const ListMovies = (keyword) => async (dispatch) => {
  try {
    dispatch({ type: MOVIE_LIST_REQUEST });

    //typically api key should be stored as environment variable
    // Here for easier review of the code and considering this apikey <isindex />
    //not super secret I simply put it in the code.
    const url = `https://www.omdbapi.com/?s=${keyword}&apikey=83da170e`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.Response === "True") {
      dispatch({ type: MOVIE_LIST_SUCCESS, payload: data });
    } else {
      throw new Error(data.Error);
    }
  } catch (error) {
    dispatch({
      type: MOVIE_LIST_FAIL,
      payload: error,
    });
  }
};

export const NominateMovie = (movie) => async (dispatch, getState) => {
  dispatch({ type: ADD_NOMINATION, payload: movie });
  localStorage.setItem(
    "nominatedMovies",
    JSON.stringify(getState().nominatedMovieList.nominatedMovies)
  );
};

export const DeNominateMovie = (id) => async (dispatch, getState) => {
  dispatch({ type: REMOVE_NOMINATION, payload: id });

  localStorage.setItem(
    "nominatedMovies",
    JSON.stringify(getState().nominatedMovieList.nominatedMovies)
  );
};
