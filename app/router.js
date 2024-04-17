import EmberRouter from '@ember/routing/router';
import config from 'ember-fragment-replacement/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('dashboard', { path: '' });
  this.route('post', { path: ':id' });
});
