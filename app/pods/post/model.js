import BaseModel from 'ember-fragment-replacement/pods/base/model';
import { attr, belongsTo } from '@ember-data/model';
import { service } from '@ember/service';

export const LANG_FIELDS = ['title'];

export default class PostModel extends BaseModel {
  @service store;

  @attr('string') lang;
  @attr({
    defaultValue() {
      return [];
    },
  })
  langAlt;
  @belongsTo('lang-fragment', {
    async: false,
    inverse: null,
    defaultValue() {
      return { base: 'yoo', en_GB: 'Ahoj!' };
    },
  })
  title;
}
