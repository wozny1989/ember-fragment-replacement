import RESTSerializer from '@ember-data/serializer/rest';

export default class ApplicationSerializer extends RESTSerializer {
  normalize(model, hash) {
    this.#setFragmentDefaultValues(model, hash);

    return super.normalize(model, hash);
  }

  #setFragmentDefaultValues(model, hash) {
    model.eachRelationship((name, { kind, type, options }) => {
      if (kind === 'belongsTo' && type.endsWith('fragment') && !hash[name]) {
        hash[name] = options.defaultValue?.() || {};
      }
    });
  }
}
