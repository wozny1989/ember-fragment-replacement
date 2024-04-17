import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class CreateNewComponent extends Component {
  @service store;

  @tracked model = null;

  @action
  create() {
    this.model = this.store.createRecord('post', {
      lang: 'en_GB',
      title: this.store.createRecord('lang-fragment'),
    });
  }
}
