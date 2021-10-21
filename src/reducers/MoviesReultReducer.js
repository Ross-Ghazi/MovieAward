import {
  MOVIE_LIST_REQUEST,
  MOVIE_LIST_SUCCESS,
  MOVIE_LIST_FAIL,
  REMOVE_NOMINATION,
  ADD_NOMINATION,
  REMOVE_ERROR,
} from "../constants/Constants";

export const MoviesReultReducer = (state = { searchedMovies: [] }, action) => {
  switch (action.type) {
    case MOVIE_LIST_REQUEST:
      return { ...state, loading: true, searchError: undefined };
    case MOVIE_LIST_SUCCESS:
      return {
        loading: false,
        searchedMovies: action.payload,
        searchError: undefined,
      };
    case MOVIE_LIST_FAIL:
      return { ...state, loading: false, searchError: action.payload };

    case REMOVE_ERROR:
      return {
        ...state,
        searchError: null,
      };

    default:
      return state;
  }
};

export const MoviesNominationReducer = (
  state = { nominatedMovies: [] },
  action
) => {
  switch (action.type) {
    case ADD_NOMINATION:
      const item = action.payload;

      if (state.nominatedMovies.length >= 5) {
        return {
          ...state,
          nominationError: "MoreThanLimit",
        };
      }

      if (state.nominatedMovies.length === 4) {
        return {
          ...state,
          ...state,
          nominatedMovies: [...state.nominatedMovies, item],
          nominationError: "upToLimit",
        };
      }

      return { ...state, nominatedMovies: [...state.nominatedMovies, item] };

    case REMOVE_NOMINATION:
      return {
        ...state,
        nominatedMovies: state.nominatedMovies.filter(
          (x) => x.imdbID !== action.payload
        ),
      };

    case REMOVE_ERROR:
      return {
        ...state,
        nominationError: null,
      };
    default:
      return state;
  }
};
