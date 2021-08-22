import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store, persistore } from './store/store'
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/index.css';


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistore}>
            <Route component={App} />
          </PersistGate>
        </Provider>
      </Switch>
    </Router>,
  </React.StrictMode>,
  document.getElementById('root')
)

