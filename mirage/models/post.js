import { Model, belongsTo, hasMany } from 'miragejs';

export default Model.extend({
  user: belongsTo('user', { async: true, inverse: null }),
  users: hasMany('user', { async: true, inverse: null }),
});
