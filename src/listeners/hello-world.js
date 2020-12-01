'use strict';

import { helloWorldHandler } from '../handlers/hello-world.js';

/**
 * @name hello world listener
 * calls the helloWorldHandler when the hello-world-form is submitted
 */
document
  .getElementById('hello-world-form')
  .addEventListener('submit', helloWorldHandler);
