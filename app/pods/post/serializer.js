import ApplicationSerializer from 'ember-fragment-replacement/pods/application/serializer';
import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';
import { service } from '@ember/service';
import { contentLangAttrs } from '../../utils/lang';

import { LANG_FIELDS } from './model';

export default class PostSerializer extends ApplicationSerializer.extend(
  EmbeddedRecordsMixin,
) {
  @service store;

  attrs = {
    ...contentLangAttrs(LANG_FIELDS),
  };
}
