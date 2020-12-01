<!-- BEGIN TITLE -->

# DOCS

<!-- END TITLE -->

<!-- BEGIN TOC -->

- [data.js](#srcdatajs)
- [handlers](#handlers)
  - [hello-world.js](#srchandlershello-worldjs)
- [init.js](#srcinitjs)
- [listeners](#listeners)
  - [hello-world.js](#srclistenershello-worldjs)
- [logic](#logic)
  - [hello-world.js](#srclogichello-worldjs)

<!-- END TOC -->

<!-- BEGIN DOCS -->

---

## [./src/data.js](./src/data.js?study)

<a name="helloWorldGreeting"></a>

## helloWorldGreeting : <code>string</code>

used in the message alerted to users

---

# Handlers

handlers define user interactions

they read user input
from events or from the DOM

they process user data using program logic functions

they communicate results to the user

they log any important information for developers

---

### [./src/handlers/hello-world.js](./src/handlers/hello-world.js?study)

<a name="helloWorldHandler"></a>

## helloWorldHandler

reverses and alerts user input.
it expects the event target to be a form with .userInput.value

| Param | Type               | Description |
| ----- | ------------------ | ----------- |
| event | <code>Event</code> | a DOM event |

[TOP](#DOCS)

---

---

## [./src/init.js](./src/init.js?study)

---

## Listeners

---

### [./src/listeners/hello-world.js](./src/listeners/hello-world.js?study)

<a name="hello world listener
calls the helloWorldHandler when the hello-world-form is submitted"></a>

## hello world listener

calls the helloWorldHandler when the hello-world-form is submitted

[TOP](#DOCS)

---

---

12/1/2020, 1:03:14 AM

---

### [./src/logic/hello-world.js](./src/logic/hello-world.js?study)

<a name="helloWorldLogic"></a>

## helloWorldLogic ⇒ <code>string</code>

reverses a string!

**Returns**: <code>string</code> - the string reversed

| Param | Type                | Description         |
| ----- | ------------------- | ------------------- |
| input | <code>string</code> | a string to reverse |

[TOP](#DOCS)

---

<!-- END DOCS -->
