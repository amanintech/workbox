/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

import {messageGenerator} from '../models/messages/messageGenerator';
import '../_version';

// TODO(philipwalton): remove once the switch to TypeScript is complete and
// we no longer need the `assert` module.
export interface WorkboxErrorDetails {
  cacheNameId?: string;
  className?: string;
  expectedClass?: Function;
  expectedMethod?: string;
  expectedType?: string;
  funcName?: string;
  isReturnValueProblem?: boolean;
  method?: string,
  moduleName?: string;
  paramName?: string;
  thrownError?: Error;
  validValueDescription?: string;
  value?: string;
  url?: string;
}



/**
 * Workbox errors should be thrown with this class.
 * This allows use to ensure the type easily in tests,
 * helps developers identify errors from workbox
 * easily and allows use to optimise error
 * messages correctly.
 *
 * @private
 */
class WorkboxError extends Error {
  name: string;
  details: WorkboxErrorDetails;

  /**
   *
   * @param {string} errorCode The error code that
   * identifies this particular error.
   * @param {Object=} details Any relevant arguments
   * that will help developers identify issues should
   * be added as a key on the context object.
   */
  constructor(errorCode: string, details: WorkboxErrorDetails) {
    let message = messageGenerator(errorCode, details);

    super(message);

    this.name = errorCode;
    this.details = details;
  }
}

export {WorkboxError};
