/* eslint-disable no-unused-vars */
import { validatePresence } from 'ember-changeset-validations/validators';
import buildMessage from 'ember-changeset-validations/utils/validation-errors';

export default {
  // user: [validatePresenseRelationship()],
  user: [validatePresence({ presence: true })],
  // resultMapping: [validateResultMapping()],
};

function validatePresenseRelationship() {
  return async (key, newValue, oldValue, changes, content) => {
    console.log({ key, newValue, oldValue, changes, content });
    const id = await newValue?.id;

    if (!id) {
      return buildMessage(key, {
        type: 'presence',
        value: newValue,
      });
    }

    return true;
  };
}
