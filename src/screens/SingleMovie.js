import React, { useState, useEffect } from "react";

import { Row, Col, Button, Container } from "react-bootstrap";
import CustomModal from "../components/CustomModal";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NominateMovie } from "../actions/MoveActions";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

function SingleMovie() {
  const [movie, setMovie] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { id } = useParams();
  const url = `https://www.omdbapi.com/?i=${id}&apikey=83da170e`;
  useEffect(() => {
    const SingleMovieFetch = async (id) => {
      try {
        setLoading(true);
        const response = await fetch(url);
        let data = await response.json();
        if (data.Response === "True") {
          setMovie(data);
        } else {
          console.log("ederertsert");
          throw new Error(data.Error);
        }
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    SingleMovieFetch(id);
  }, [id]);

  const { nominatedMovies, nominationError } = useSelector(
    (state) => state.nominatedMovieList
  );
  const dispatch = useDispatch();

  const existItem = nominatedMovies.find((x) => movie.imdbID === x.imdbID);

  const nominateHandler = (e) => {
    dispatch(NominateMovie(movie));
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {nominationError && <CustomModal consdition={nominationError} />}
          {!error ? (
            <div className="singleMovieCard">
              <Row>
                <Col className="d-flex justify-content-center" md={12}>
                  <h5>{movie.Title}</h5>
                </Col>
                <Col
                  md={12}
                  className="d-flex justify-content-center"
                  style={{ margin: "20px" }}
                >
                  {movie.Year}
                </Col>
                <Col
                  className="d-flex justify-content-center"
                  md={12}
                  style={{ margin: "20px" }}
                >
                  <img md={12} src={movie.Poster} alt={movie.Title} />
                </Col>
                <Col
                  className="d-flex justify-content-center"
                  md={12}
                  style={{ margin: "20px" }}
                >
                  Storyline: {movie.Plot}
                </Col>
                <Col
                  md={12}
                  className="d-flex justify-content-center"
                  style={{ margin: "20px" }}
                >
                  <Button
                    variant={existItem ? "dark" : "primary"}
                    onClick={nominateHandler}
                    disabled={existItem}
                    opacity={"0.1"}
                  >
                    {existItem ? "Nominated" : "Nominate"}
                  </Button>
                </Col>
                <Col
                  className="d-flex justify-content-center"
                  md={12}
                  style={{ margin: "20px", marginBottom: "300px" }}
                >
                  <Link to="/">
                    {" "}
                    <Button style={{ maxWidth: "200px" }}>
                      Back to Home Page
                    </Button>
                  </Link>
                </Col>
              </Row>
            </div>
          ) : (
            <Container style={{ margin: "20px" }}>
              <h3>No Result</h3>
              <h4>Please search again</h4>
            </Container>
          )}
        </>
      )}
    </>
  );
}
export default SingleMovie;
