import * as React from 'react';
import { Route, Switch } from 'react-router';
import styled from 'styled-components';

const PageHome = () => <div>Welcome to pizza</div>
const PageRestaurantListing = () => <div>Here we have restaurants</div>
const PageRestaurantDetails = () => <div>Here's a specific restaurant</div>
const PageNotFound = () => <div>Page not Found</div>;

const AppWrapper = styled.div`
  text-align: center;
`
const Header = styled.header`
  background: black;
  color: white;
  padding: 1rem;
`
const Title = styled.h1`
  text-transform: uppercase;
  margin: 0;
`;

class App extends React.Component {
  public render() {
    return (
      <AppWrapper>
        <Header>
          <Title>Eat Pizza</Title>
        </Header>
        <Switch>
          <Route exact={true} path="/" component={PageHome}/>
          <Route exact={true} path="/restaurants/:city/:postCode" component={PageRestaurantListing}/>
          <Route exact={true} path="/restaurant/:id" component={PageRestaurantDetails}/>
          <Route path="*" component={PageNotFound} />
        </Switch>
      </AppWrapper>
    );
  }
}

export default App;
