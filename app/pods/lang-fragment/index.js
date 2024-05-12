import { tracked } from '@glimmer/tracking';

const SUPPORT_LANGS = [
  'base',
  'de_DE',
  'en_GB',
  'en_US',
  'fr_CA',
  'ko_KR',
  'es_ES',
  'id_ID',
  'zh_CN',
  'th_TH',
  'ja_JP',
  'pt_PT',
  'hu_HU',
  'nl_NL',
];

export class LangFragment {
  @tracked base = null;
  @tracked de_DE = null;
  @tracked en_GB = null;
  @tracked en_US = null;
  @tracked fr_CA = null;
  @tracked ko_KR = null;
  @tracked es_ES = null;
  @tracked id_ID = null;
  @tracked zh_CN = null;
  @tracked th_TH = null;
  @tracked ja_JP = null;
  @tracked pt_PT = null;
  @tracked hu_HU = null;
  @tracked nl_NL = null;

  _snapshot = {};

  constructor(contextOrModel, value = {}) {
    SUPPORT_LANGS.forEach((lang) => {
      this[lang] = value[lang] ?? null;
    });

    this._snapshot = structuredClone(this.serialize());
  }

  rollbackAttributes() {
    SUPPORT_LANGS.forEach((lang) => {
      this[lang] = this._snapshot[lang] ?? null;
    });
  }

  get hasDirtyAttributes() {
    return SUPPORT_LANGS.some((lang) => this[lang] !== this._snapshot[lang]);
  }

  get resolved() {
    const filledLang = SUPPORT_LANGS.find((lang) => Boolean(this[lang]));

    return this[filledLang];
  }

  toString() {
    return JSON.stringify(this.serialize());
  }

  serialize() {
    return SUPPORT_LANGS.reduce((acc, lang) => {
      return { ...acc, [lang]: this[lang] };
    }, {});
  }
}
