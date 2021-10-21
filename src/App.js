import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./screens/Home";
import SingleMovie from "./screens/SingleMovie";

import "./App.css";

function App() {
  return (
    <Router>
      <Route path="/" component={Home} exact />
      <Route path="/:id" component={SingleMovie} />
    </Router>
  );
}
export default App;
