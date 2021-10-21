import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { ListMovies } from "../actions/MoveActions";

function SearchBox() {
  const dispatch = useDispatch();
  // const { searchedMovies } = useSelector((state) => state.movies);
  const [keyword, setKeyWord] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(ListMovies(keyword));
  };

  return (
    <Form className="SearchBox" onSubmit={submitHandler}>
      <Row>
        <Col md={10} style={{ marginBottom: "10px" }}>
          {" "}
          <Form.Control
            size="lg"
            type="text"
            placeholder="Search Movie"
            onChange={(e) => setKeyWord(e.target.value)}
            value={keyword}
          ></Form.Control>
        </Col>
        <Col md={2}>
          <Button size="lg" type="submit" className="p-10">
            Search{" "}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default SearchBox;
