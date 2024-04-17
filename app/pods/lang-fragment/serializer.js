import ApplicationSerializer from 'ember-fragment-replacement/pods/application/serializer';
import { v4 } from 'uuid';

export default class LangSerializer extends ApplicationSerializer {
  normalize(model, hash) {
    if (!hash.id) {
      hash.id = v4();
    }

    return super.normalize(model, hash);
  }
}
