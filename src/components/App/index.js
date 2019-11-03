import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import themeFile from '../../util/theme';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import Footer from '../Footer';
import PrivacyPage from '../Privacy';
import TermsPage from '../Terms';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

// MUI stuff
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme(themeFile);

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Router>
      <Fragment>
        <Navigation />

        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
        <Route path={ROUTES.PRIVACY} component={PrivacyPage} />
        <Route path={ROUTES.TERMS} component={TermsPage} />
        <Footer />
      </Fragment>
    </Router>
  </MuiThemeProvider>
);

export default withAuthentication(App);
