import { ConnectedRouter } from 'connected-react-router';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store, { history } from './store';

import './index.css';

ReactDOM.render(
  <ReduxProvider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </ReduxProvider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
