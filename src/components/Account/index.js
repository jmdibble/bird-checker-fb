import React from 'react';

import { AuthUserContext, withAuthorization } from '../Session';
import PasswordChangeForm from '../PasswordChange';
import ReportBug from '../ReportBug';
import AccountInfo from './accountInfo';

// MUI
import { Grid } from '@material-ui/core';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <AccountInfo authUser={authUser} />
        <PasswordChangeForm authUser={authUser} />
        <ReportBug authUser={authUser} />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
