import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import {createStore,applyMiddleware,compose} from "redux";
import thunk from "redux-thunk"
import Reducers from './Redux/Reducers';
import 'react-tooltip/dist/react-tooltip.css'

const store = createStore(Reducers,compose(applyMiddleware(thunk)))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

