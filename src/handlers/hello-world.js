'use strict';

import { helloWorldLogic } from '../logic/hello-world.js';
import { helloWorldGreeting } from '../data.js';

/**
 * reverses and alerts user input.
 * it expects the event target to be a form with .userInput.value
 * @param {Event} event - a DOM event
 */
export const helloWorldHandler = (event) => {
  console.log('-- hello world handler --');

  const userInput = event.target.userInput.value;
  console.log('userInput:', typeof userInput, userInput);

  const reversedInput = helloWorldLogic(userInput);
  console.log('reversedInput:', typeof reversedInput, reversedInput);

  const message = `${helloWorldGreeting}\n\n${userInput} -> ${reversedInput}`;
  console.log('message:', typeof message, message);
  alert(message);

  event.preventDefault();
};
