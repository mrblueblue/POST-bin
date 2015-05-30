import React from 'react';
import Router from 'react-router';
import { routes } from './routes';
import { flux } from './flux';
import mui from 'material-ui';

let ThemeManager = new mui.Styles.ThemeManager();
let muiTheme = ThemeManager.getCurrentTheme();

Router.run(routes, Router.HistoryLocation, (Handler) => {
  React.withContext(
    { flux, muiTheme },
    () => React.render(
      <Handler/>,
      document.getElementById('app'))
  );
});
