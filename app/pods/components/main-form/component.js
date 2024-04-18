import Component from '@glimmer/component';
import { tracked, cached } from '@glimmer/tracking';
import { action } from '@ember/object';

import { Changeset } from 'ember-changeset';

export default class MainFormComponent extends Component {
  @tracked selectedLanguage = this.args.model.lang;

  @cached
  get changeset() {
    const { model } = this.args;
    if (!model) return null;

    return new Changeset(this.args.model);
  }

  get langOptions() {
    const { model } = this.args;

    return [model.lang, ...model.langAlt];
  }

  @action
  onTitleChange({ target: { value } }) {
    const { model } = this.args;
    model.set(`title.${this.selectedLanguage}`, value);
  }

  @action
  onTitleChangesetChange({ target: { value } }) {
    this.changeset.set(`title.${this.selectedLanguage}`, value);
  }

  @action
  rollbackModel() {
    this.args.model.rollbackAttributes();
  }

  @action
  rollbackChangeset() {
    this.changeset.rollback();
  }

  @action
  async submit(event) {
    event.preventDefault();

    await this.args.model.save();
  }

  @action
  async submitChangeset(event) {
    event.preventDefault();

    await this.changeset.save();
  }
}
