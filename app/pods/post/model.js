import BaseModel from 'ember-fragment-replacement/pods/base/model';
import { attr } from '@ember-data/model';
import { service } from '@ember/service';
import { LangFragment } from '../lang-fragment';

export const LANG_FIELDS = ['title'];
const defaultValue = () => new LangFragment({ base: 'aa' });

export default class PostModel extends BaseModel {
  @service store;

  @attr('string') lang;
  @attr({ defaultValue: () => ['base'] }) langAlt;
  @attr('lang-fragment', { defaultValue }) title;
}
