import React from 'react';
import './App.css';

import { Provider } from "react-redux";
import {store } from './network/store';
import LandingPage from './landingPage';


function App() {

  return (
   <Provider store={store}>
    <LandingPage/>
   </Provider>
  );
}

export default App;
