export const contentLangAttrs = (fields) => {
  return fields.reduce((acc, field) => {
    return {
      ...acc,
      [field]: {
        embedded: 'always',
      },
    };
  }, {});
};
