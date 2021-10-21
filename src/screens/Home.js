import React from "react";

import { Row, Col, Container } from "react-bootstrap";
import Movie from "../components/Movie";
import NominatedMovie from "../components/NominatedMovie";
import SearchBox from "../components/SearchBox";
import CustomModal from "../components/CustomModal";
import Loader from "../components/Loader";

import { useSelector } from "react-redux";

function Home() {
  const { searchedMovies, loading, searchError } = useSelector(
    (state) => state.searchMovieList
  );

  const { nominatedMovies, nominationError } = useSelector(
    (state) => state.nominatedMovieList
  );

  return (
    <div>
      {nominationError && <CustomModal consdition={nominationError} />}
      {searchError && <CustomModal consdition={searchError} />}
      <SearchBox />
      <div className="nominated">
        <h3 className="title"> Nominated List</h3>
        <Container fluid="md">
          <Row className="justify-content-between">
            {nominatedMovies.map((movie) => (
              <Col key={movie.imdbID}>
                <NominatedMovie movie={movie} />
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      <div className="result">
        <h3 className="title">Search Results</h3>

        {loading ? (
          <Loader />
        ) : (
          <Row>
            {searchedMovies?.Search.map((movie) => (
              <Col key={movie.imdbID} sm={12} md={6} lg={4} xl={3}>
                <Movie movie={movie} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
export default Home;
