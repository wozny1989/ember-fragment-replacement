import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class MainFormComponent extends Component {
  @tracked selectedLanguage = this.args.model.lang;

  get langOptions() {
    const { model } = this.args;

    return [model.lang, ...model.langAlt];
  }

  @action
  onTitleChange({ target: { value } }) {
    const { model } = this.args;
    model.set(`title`, { ...model.title, [this.selectedLanguage]: value });
  }

  @action
  submit(event) {
    event.preventDefault();

    this.args.model.save();
  }
}
