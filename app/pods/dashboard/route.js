import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class DashboardRoute extends Route {
  @service store;

  model() {
    return this.store.createRecord('post', {
      lang: 'en_GB',
      langAlt: ['de_DE'],
      title: this.store.createRecord('lang', {
        en_GB: 'My title',
        de_DE: 'My titel',
      }),
    });
  }
}
