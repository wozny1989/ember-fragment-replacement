import Model from '@ember-data/model';

export default class BaseModel extends Model {
  get hasDirtyAttributes() {
    const hasDirtyAttributes = super.hasDirtyAttributes;

    let hasDirtyFragmentRelationships = false;

    this.eachRelationship((name, descriptor) => {
      if (
        descriptor.type.endsWith('fragment') &&
        this[name]?.hasDirtyAttributes
      ) {
        hasDirtyFragmentRelationships = true;
      }
    });

    return hasDirtyAttributes || hasDirtyFragmentRelationships;
  }
}
