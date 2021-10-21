import React from "react";
import { Card, Button } from "react-bootstrap";
import "../index.css";
import { useDispatch } from "react-redux";
import { DeNominateMovie } from "../actions/MoveActions";
import { Link } from "react-router-dom";

function Movie({ movie }) {
  const dispatch = useDispatch();
  const removeHandler = (e) => {
    dispatch(DeNominateMovie(movie.imdbID));
  };

  return (
    <Card
      style={{ minHeight: "31em", maxWidth: "17rem" }}
      className="my-3 p-3 rounded"
    >
      <Link to={`/${movie.imdbID}`}>
        <Card.Img src={movie.Poster} style={{ height: "20rem" }} />
      </Link>
      <Card.Body>
        <Link
          to={`/${movie.imdbID}`}
          style={{
            textDecoration: "none",
            color: "rgb(173, 175, 174)",
          }}
        >
          <Card.Title style={{ minHeight: "5rem" }} as="div">
            <strong>
              {movie.Title} ({movie.Year})
            </strong>
          </Card.Title>
        </Link>
        <Button variant="secondary" onClick={removeHandler}>
          Remove
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Movie;
