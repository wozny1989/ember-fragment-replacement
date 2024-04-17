import ApplicationAdapter from 'ember-fragment-replacement/pods/application/adapter';
import { v4 } from 'uuid';

export default class LangAdapter extends ApplicationAdapter {
  generateIdForRecord() {
    return v4();
  }
}
