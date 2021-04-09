import './App.css';
import HomeComponent from './components/HomeComponent';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/'>
          <HomeComponent></HomeComponent>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
