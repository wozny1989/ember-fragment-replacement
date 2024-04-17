import BaseModel from 'ember-fragment-replacement/pods/base/model';
import { attr } from '@ember-data/model';

export default class LangModel extends BaseModel {
  @attr('string') base;
  @attr('string') en_GB;
  @attr('string') de_DE;

  get resolved() {
    let resolvedTitle = 'EMPTY';

    this.eachAttribute((name) => {
      if (this[name]) {
        resolvedTitle = this[name];
      }
    });

    return resolvedTitle;
  }
}
