import logo from './logo.svg';
import RetailLogin from './features/retail/components/login';
import RetailIndex from './features/retail/components';
import RetailSignUp from './features/retail/components/signup';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserActivity } from './features/retail/slice';
import NavBar from './navbar';
import { RetailSnackBar } from './features/retail/components/retail-snackbar';
//Render Props You pass  component as prop to another component

//PrivateRoute -> HOC -> Higher Order Component -> It takes some simple component and adds a new functionality

//Render props -> 

function PrivateRoute(props) {
  const { children, loggedIn, ...rest } = props;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedIn  ? (children) : (<Redirect to={{
          pathname: '/login',
          state: { from: location }
        }} />)
      }
    />
  )
}

function App() {
  const userActivity = useSelector(selectUserActivity);
  return (
    <>
    <NavBar/>
    <Switch>
      <PrivateRoute exact path="/" loggedIn={userActivity.loggedIn} >
        <RetailIndex />
      </PrivateRoute>
      <Route path="/login">
        <RetailLogin/>
      </Route>
      <Route path="/signup">
        <RetailSignUp/>
      </Route>
    </Switch>
    <RetailSnackBar/>
    </>
  );
}

export default App;
