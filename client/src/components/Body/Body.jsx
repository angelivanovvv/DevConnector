import React from "react";
import { Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";

import { PATHS } from "../../constants/clientRoutes";
import * as Pages from "../../exports/Pages";

import PrivateRoute from "./../PrivateRoute/PrivateRoute";

const Body = ({ isAuthenticated, isLoading }) => {
  const auth = { isAuthenticated, isLoading };
  return (
    <Switch>
      <Route exact path={PATHS.LANDING} component={Pages.Landing} />
      <Route exact path={PATHS.REGISTER} component={Pages.Register} />
      <Route exact path={PATHS.LOGIN} component={Pages.Login} />
      <Route exact path={PATHS.PROFILES} component={Pages.Profiles} />
      <Route
        exact
        path={PATHS.PROFILE + "/:userId"}
        component={Pages.Profile}
      />
      <PrivateRoute
        exact
        auth={auth}
        path={PATHS.DASHBOARD}
        component={Pages.Dashboard}
      />
      <PrivateRoute
        exact
        auth={auth}
        path={PATHS.CREATE_PROFILE}
        component={Pages.CreateProfile}
      />
      <PrivateRoute
        exact
        auth={auth}
        path={PATHS.EDIT_PROFILE}
        component={Pages.EditProfile}
      />
      <PrivateRoute
        exact
        auth={auth}
        path={PATHS.ADD_EXPERIENCE}
        component={Pages.Experience}
      />
      <PrivateRoute
        exact
        auth={auth}
        path={PATHS.ADD_EDUCATION}
        component={Pages.Education}
      />
      <PrivateRoute
        exact
        auth={auth}
        path={PATHS.POSTS}
        component={Pages.Posts}
      />
    </Switch>
  );
};

Body.propTypes = {
  isAuthenticated: PropTypes.bool,
  isLoading: PropTypes.bool
};

Body.defaultProps = {
  isAuthenticated: false,
  isLoading: true
};

export default Body;
