import Model, { attr } from '@ember-data/model';

export default class LangModel extends Model {
  @attr('string') en_GB;
  @attr('string') de_DE;
}
