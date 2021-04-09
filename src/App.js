import './App.scss';
import HomeComponent from './components/HomeComponent';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NavigationComponent from './components/NavigationComponent';
import RenderDebuggerComponent from './components/RenderDebuggerComponent';

function App() {
  return (
    <Router>
      <NavigationComponent />
      <Switch>
        <Route path='/debugger'>
          <RenderDebuggerComponent />
        </Route>
        <Route path='/'>
          <HomeComponent />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
