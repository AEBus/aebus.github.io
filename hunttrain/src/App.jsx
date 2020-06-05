import React, { useEffect, createContext } from 'react';
import { useImmerReducer } from 'use-immer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { firebaseConfig } from './utils/firebaseConfig';
import Axios from 'axios';
import firebase from 'firebase/app';
// import "firebase/database";
import 'firebase/auth';

import FooterA from '@A/09-footer/FooterA';
import NavBarA from '@A/07-navbar/NavBarA';
import SplashPageO from '@O/00-pages/SplashPageO';
import ScouterPageO from '@O/00-pages/ScouterPageO';

import theme from './theme';
import './sass/base.scss';

// state management
import initialState from 'Utils/initialState';
import scoutDataReducer from 'Utils/scoutDataReducer';

// context
export const DispatchContext = createContext();
export const StateContext = createContext();

const API_HOST_URL = process.env.API_URL;

firebase.initializeApp(firebaseConfig);

const App = () => {
  const [state, dispatch] = useImmerReducer(scoutDataReducer, initialState);

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
  };

  useEffect(() => {
    dispatch({ type: 'loading' });
    dispatch({ type: 'config', config: uiConfig });
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const options = {
          params: {
            uId: user.uid
          }
        };
        Axios.get(`${API_HOST_URL}/api/auth/login`, options)
          .then(response => {
            const userData = response.data.user;
            if (userData) {
              dispatch({ type: 'user', userData: userData, discord: userData.verified });
            }
          });
      } else {
        dispatch({ type: 'user', user: null, discord: false });
      }
    });
    dispatch({ type: 'loading' });
    return () => unsubscribe();
  }, [])

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <ThemeProvider theme={theme}>
          {/** will change this to only show if user is logged in */}
          <Router>
            <NavBarA />
            <Switch>
              <Route exact path="/" component={SplashPageO} />
              <Route path="/*" component={ScouterPageO} />
            </Switch>
            <FooterA />
          </Router>
        </ThemeProvider>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default App;
