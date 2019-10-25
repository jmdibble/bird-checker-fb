import React from 'react';

import { AuthUserContext, withAuthorization } from '../Session';
import PasswordChangeForm from '../PasswordChange';
import ReportBug from '../ReportBug';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <PasswordChangeForm authUser={authUser} />
        <ReportBug authUser={authUser} />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
