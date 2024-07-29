import BaseModel from 'ember-fragment-replacement/pods/base/model';
import { attr } from '@ember-data/model';

export default class UserModel extends BaseModel {
  @attr('string') name;
}
