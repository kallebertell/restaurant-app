import * as React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';

import logo from './logo.svg';

const PageHome = () => <div>Welcome to pizza</div>
const PageRestaurantListing = () => <div>Here we have restaurants</div>
const PageRestaurantDetails = () => <div>Here's a specific restaurant</div>
const PageNotFound = () => <div>Page not Found</div>;

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Switch>
          <Route exact={true} path="/" component={PageHome}/>
          <Route exact={true} path="/restaurants/:city/:postCode" component={PageRestaurantListing}/>
          <Route exact={true} path="/restaurant/:id" component={PageRestaurantDetails}/>
          <Route path="*" component={PageNotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
