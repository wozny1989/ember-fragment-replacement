import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class DashboardRoute extends Route {
  @service store;

  model({ id }) {
    return this.store.findRecord('post', id);
  }
}