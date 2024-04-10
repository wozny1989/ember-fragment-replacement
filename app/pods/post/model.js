import Model, { attr } from '@ember-data/model';

export default class PostModel extends Model {
  @attr lang;
  @attr langAlt;
  @attr('lang') title;
}
