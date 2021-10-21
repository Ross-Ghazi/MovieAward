import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../index.css";
import { useDispatch, useSelector } from "react-redux";
import { NominateMovie } from "../actions/MoveActions";

function Movie({ movie }) {
  const { nominatedMovies } = useSelector((state) => state.nominatedMovieList);

  const dispatch = useDispatch();
  const nominateHandler = (e) => {
    dispatch(NominateMovie(movie));
  };

  const existItem = nominatedMovies.find((x) => movie.imdbID === x.imdbID);

  return (
    <Card style={{ minHeight: "40rem" }} className="my-3 p-3 rounded">
      <Link to={`/${movie.imdbID}`}>
        <Card.Img src={movie.Poster} style={{ height: "30rem" }} />
      </Link>
      <Card.Body>
        <Link
          to={`/${movie.imdbID}`}
          style={{
            textDecoration: "none",
            color: "rgb(173, 175, 174)",
          }}
        >
          <Card.Title style={{ minHeight: "4rem" }} as="div">
            <strong>
              {movie.Title} ({movie.Year})
            </strong>
          </Card.Title>
        </Link>
        <Button
          variant={existItem ? "dark" : "primary"}
          onClick={nominateHandler}
          disabled={existItem}
          opacity={"0.1"}
        >
          {existItem ? "Nominated" : "Nominate"}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Movie;
