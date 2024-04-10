import Transform from '@ember-data/serializer/transform';

export default class LangTransform extends Transform {
  serialize(value) {
    console.log('serialize', value);
    return value;
  }

  deserialize(value, { defaultValue }) {
    console.log('deserialize', value, defaultValue);
    return value;
  }

  static create() {
    console.log('create');
    return new this();
  }
}
