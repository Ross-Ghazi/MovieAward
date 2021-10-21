import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  MoviesReultReducer,
  MoviesNominationReducer,
} from "./reducers/MoviesReultReducer";
import data from "./reference/data";

const reducer = combineReducers({
  searchMovieList: MoviesReultReducer,
  nominatedMovieList: MoviesNominationReducer,
});

const nominatedMoviesFromStorage = localStorage.getItem("nominatedMovies")
  ? JSON.parse(localStorage.getItem("nominatedMovies"))
  : [];

const initalState = {
  searchMovieList: {
    searchedMovies: data,
  },
  nominatedMovieList: {
    nominatedMovies: nominatedMoviesFromStorage,
  },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
