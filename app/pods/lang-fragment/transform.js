import Transform from '@ember-data/serializer/transform';
import { LangFragment } from './index';

export default class LangFragmentTransorm extends Transform {
  deserialize(serialized, { defaultValue = {} }) {
    const type = typeof serialized;

    if (type === 'object') {
      return new LangFragment(serialized);
    }

    return LangFragment(defaultValue);
  }

  serialize(value) {
    if (value instanceof LangFragment) {
      return value.serialize();
    } else {
      return null;
    }
  }

  static create() {
    return new this();
  }
}
