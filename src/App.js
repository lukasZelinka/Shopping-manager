import Core from "./pages/Core";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/groceries">
        <Core />
      </Route>
    </Router>
  );
}

export default App;
