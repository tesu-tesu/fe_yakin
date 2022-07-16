import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { APP_ROUTE, PRIVATE_ROUTE } from '../src/config/routes';
import { Container } from '@mui/material';
import { PrivateRoute, PublicRoute } from './config/componentRoutes';
import Navbar from '../src/components/Navbar';
import Navbar_2 from './components/Navbar_2';
import ResponsiveAppBar from './components/SearchAppBar';

function App() {
  return (
    <Router>
      <div className='main-app-wrapper'>
        <div className='header-app-wrapper'>
          <ResponsiveAppBar />
        </div>
        <div className='content-wrapper'>
          <Container>
            <Switch>
              {APP_ROUTE.map((value) => (
                <PublicRoute
                  key={value.name}
                  path={value.path}
                  component={value.component}
                  exact={value.exact}
                  restricted={value.restricted}
                  private={value.private}
                />
              ))}
              <Route exact >
                <Switch>
                  {PRIVATE_ROUTE.map((value) => (
                    <PrivateRoute
                      key={value.name}
                      path={value.path}
                      component={value.component}
                      exact={value.exact}
                      restricted={value.restricted}
                    />
                  ))}
                </Switch>
              </Route>
            </Switch>
          </Container>
        </div>
      </div>
    </Router>
  );
}

export default App;
