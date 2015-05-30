import Router from 'react-router';
import { App } from './components/App';
import { HomeView } from './components/HomeView';
import { BinInfoView } from './components/BinInfoView';

let { Route, DefaultRoute } = Router;

export const routes = (
  <Route handler={App}>
    <DefaultRoute handler={HomeView} path='/' />
    <Route name='/:bin' handler={BinInfoView} />
  </Route>
);
