# Emails Editor Component

![Banner](/images/screenshot.png)

## Introduction

Vanilla Javascript that renders an emails input field component. It validates entered emails and tags them as valid or invalid. It also provides an API to manipulate the emails list.

You can access an online example [here](https://lotofcaffeine.github.io/emails-input).

## Usage

1. Download and link [emails-input.js](./dist/emails-input.js) in your HTML file:

```html
<script src="./dist/emails-input.js"></script>
```

2. Call `EmailsInput` function passing a `HTMLDivElement` as first parameter. The `EmailsEditor` component will be rendered inside this div element. You can also optionally provide an `options` object to configure some aspects of the component.

```html
<div id="emails-input"></div>
<script src="emails-input.js"></script>
<script>
  var inputContainerNode = document.querySelector('#emails-input');
  var emailsInput = EmailsInput(inputContainerNode, options);
</script>
```

## Development

To build a development environment, you need to have [yarn](https://yarnpkg.com/) installed. It will take care of installing all the necessary tools.

1. Install the dependencies:

```sh
yarn
```

2. Re-build the library on any change:

```sh
yarn start
```

3. Start the development web server:

```sh
yarn start:server
```

The web server will serve the example page in 8081 port.

4. Build a prodution-ready version

```sh
yarn build
```

A new `emails-input.js` will be generated in `dist` folder.

### Tests

Different test strategies are used on different points of the component.

- Unit tests were used to test the State Manager module, [Jest](https://jestjs.io/) is used to run the tests.
- Component tests were used to test the components, [Jest](https://jestjs.io/) is used to run the tests and mock dependencies.
- End-to-End tests were used to test the whole `EmailsEditor` component. [Cypress](https://www.cypress.io/) is used to run the tests.

1. Run the unit and component tests:

```sh
yarn test
```

2. Run the E2E tests:

```sh
yarn test:e2e:run
```

## Public Interface

### EmailsInput

Main function that creates the `EmailsEditor` component. Its paramaters are:

- `rootContainer`: `HTMLDivElement` container element.
- `options`: Optional object containing configuration information.

Available options:

- `id`: The ID of the input, can be used to associate a `<label>` through `of` attribute (See examples).
- `placeholder`: placeholder text of the input. If this property is not provided, the default value is used (_add more people..._).
- `name`: Name of the input, can be used to define the name of the field inside a form (See examples); if this property is not provided, the default value is used (`emails-input`).

### EmailsEditor

An object that extends `HTMLDivElement` and provides the following public API:

- `getEmails`: Returns a list of valid emails in the form of an array of `Block`'s.
- `getBlocks`: Returns a list of all blocks present in the input field in the form of an array of `Block`'s.
- `addBlock`: Add a new block to the input field; it receives a `Block`, parse the provided text and adds it to the input field with the appropriate style applied.

## Usage Examples

### Basic usage

You can place the component anywhere on your webpage.

1. Include the library:

```html
<script src="emails-input.js"></script>
```

2. Add a div element where you want the input to be placed:

```html
<div id="emails-input"></div>
```

3. Create the input calling the global constructor, provide an `option` object to change the default settings:

```js
var emailsInput = EmailsInput(inputContainerNode, {
  placeholder: 'Type emails here!!!',
});
```

### Adding an EmailsEditor into a form

The component was designed to be used as a regular input field; it can be added to any form; a hidden input is used to keep a list of all the valid emails as a comma-separated string sent through the form submission.

1. Add a container div inside a form, optionally you can add a label associated with the input:

```html
<form>
  <!-- 
  .
  .
  .
  -->
  <label for="share-emails-input"
    >List of emails that will receive a share link</label
  >
  <div id="emails-input"></div>
  <!-- 
  .
  .
  .
  -->
</form>
```

2. Create the input setting the desired ID, it is also possible to define the name attribute of the field:

```js
var emailsInput = EmailsInput(inputContainerNode, {
  id: 'share-emails-input',
  name: 'share-email-list',
});
```

3. Adding blocks programatically

```js
function prefillwithManagementEmails(emails, emailsInput) {
  emails.forEach(e => emailsInput.addBlock(e));
}
```

4. Get valid emails programmatically

```js
var validEmails = emailsInput.getEmails();

sendToEmailBroker(validEmails);
```

## Architecture

The architecture described here is based on the requirements and the expected behavior of the component. The initial idea was to break this component in smaller pieces and divide the requirements among them so that each piece had a clear and specific responsibility; with that, it was possible to define a sub-components for each piece.

A diagram was built to map:

- The main responsibility of each sub-component,
- The events that each one should raise,
- The properties that they should receive,
- Map where in the system the requirements were met.

[![Emails Editor Component](/images/input-email-component.jpg)](https://miro.com/app/board/o9J_kkisH10=/)
[Link to Miro Board](https://miro.com/app/board/o9J_kkisH10=/)

The two main architectural goals that were defined based on this research was:

1. Provide a stateful mechanism, as the component has a clear state machine behavior. Different triggers change its internal state, and it visually changes in order to reflect this new state.
2. Provide a central point of event handling that will orchestrate the behavior of all components, as it should handle different user's generated events and convert them in state changes.

A high-level UML-inspired diagram with all the major components:
[![UML Diagram](/images/uml-diagram.jpg)](https://miro.com/app/board/o9J_kkw9Ct4=/)
[Link to Miro Board](https://miro.com/app/board/o9J_kkw9Ct4=/)

### Model

An internal representation of an email block was created, it contains:

- `id`: auto-generated id that uniquely identifies the block.
- `text`: The text of that block can be an email address, in case of a valid block, or any other string.
- `isValid`: Boolean value that is `true` when the block has a valid email address in its `text` property, `false` otherwise.

### State Manager

A simplified Redux-like module was implemented to support the state machine mentioned in the first goal. It is not recommended to change the state directly, but use actions to change it. Each sub-component that needs to update after changes in this state should subscribe to a listener.

#### State

The state has:

- `blocks`: An array of `Block`'s with the current list of blocks added to the component.
- `currentText`: The text typed in the input field.
- `lastBlockIdRemoved`: The ID of the last removed block, either by clicking the X (close) button or using the Delete/Backspace key.

#### Store

The State Manager provides a `Store` object that holds the `State` object, and it is responsible for applying the provided `reducer` function to change the state based on the given actions.

The module provides a `createStore(reducer, initialState);` method that receives:

- `reducer`: Function that will apply the necessary changes to the state.
- `initialState`: The internal state will be initialized with this `State` object.

The store has the following methods:

- `dispatch: (action: Action) => void`: Dispatches an action. This is the only way to trigger a state change.

- `subscribe: (actionType: ActionType, listener: Listener) => void`: Adds a change listener. It will be called any time the given `actionType` is dispatched.

- `getState: () => State`: Returns the current state.

#### Reducer

`export type Reducer = (state: State, action: Action) => State`

A function that applies the given `action` to the current state and returns the new state.

#### Actions

These are the possible actions:

- `AppendBlock`: Add a new block to the state; its payload must have a string with a comma-separated list of (valid or invalid) emails.
- `DeleteBlock`: Remove a block from the state; its payload must have the `Block` object that should be removed (all event listeners are removed to avoid memory leaks).
- `ChangeInput`: Changes the value of `currentText` field, its payload must have the new text.

### Components

- `EmailsEditor` is the main component of the `emails-input` library and the provider of the public interface. Its central position makes it perfect to be the handler of user events raised by other components and the translator to actions that changes the internal state accordingly.
- `EmailBlock`: Block with a text (valid email or something else) and a delete button. Its main element is a span.
- `InputField`: Input that will receive all the user's typing and pasted strings. Its main element is an input.
- `HiddenInput`: Renders an input of type hidden; it is used by the `EmailsEditor` to keep a list of valid emails as a comma-separated string. This component is used to send the information through the form submission.
- `DeleteButton`: Used inside an `EmailBlock`, renders the delete button. Its main element is a button.

## Improvements

| Problem                                                                                                                | Solution                                                                            |
| ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| The test suites aren't covering all scenarios necessary for a production-ready component                               | Consider writing more tests and consider to add test coverage as a metric in the CI |
| The component is not very customizable                                                                                 | Consider adding more properties, like CSS class names, to the `options` object      |
| The event listener removal logic uses prop drilling; this practice could lead to a hard to refactor code in the future | Consider using a different strategy for this logic.                                 |
