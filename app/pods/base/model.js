import Model from '@ember-data/model';

const isFragment = (type) => type?.endsWith('fragment');

export default class BaseModel extends Model {
  get hasDirtyAttributes() {
    const hasDirtyAttributes = super.hasDirtyAttributes;

    let hasDirtyFragments = false;

    this.eachAttribute((name, { type }) => {
      if (isFragment(type) && this[name]?.hasDirtyAttributes) {
        hasDirtyFragments = true;
      }
    });

    return hasDirtyAttributes || hasDirtyFragments;
  }

  rollbackAttributes() {
    this.eachAttribute((name, { type }) => {
      if (isFragment(type) && this[name]?.hasDirtyAttributes) {
        this[name].rollbackAttributes();
      }
    });

    super.rollbackAttributes();
  }
}
