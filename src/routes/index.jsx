import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { CandidateList, CandidateProfile } from '../pages/Candidates';
import NotFound from '../pages/NotFound';

const Routes = () => (
  <Switch>
    <Route path="/" exact>
      <Redirect to="/candidates/list/all" />
    </Route>
    <Route path="/candidates/list/:type" exact component={CandidateList} />
    <Route path="/candidates/profile/:id" exact component={CandidateProfile} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Routes;
