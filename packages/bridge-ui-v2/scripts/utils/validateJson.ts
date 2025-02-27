/* eslint-disable no-console */
import Ajv, { type Schema } from 'ajv';

import { Logger } from './Logger';

const ajv = new Ajv({ strict: false });

type SchmaWithId = Schema & { $id?: string };

const logger = new Logger('json-validator');

export const validateJsonAgainstSchema = (json: JSON, schema: SchmaWithId): boolean => {
  logger.info(`Validating ${schema.$id}`);
  const validate = ajv.compile(schema);

  const valid = validate(json);

  if (!valid) {
    logger.error('Validation failed.');
    console.error('Error details:', ajv.errors);
    return false;
  }
  logger.info(`Validation of ${schema.$id} succeeded.`);
  return true;
};
