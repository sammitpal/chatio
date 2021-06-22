import "./App.css";
import ChatWindow from "./components/ChatWindow";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./HomePage";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/chat/:name/:roomID">
            <ChatWindow />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
