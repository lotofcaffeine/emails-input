(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.EmailsInput = factory());
}(this, (function () { 'use strict';

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  var createStore = function createStore(_ref) {
    var reducer = _ref.reducer,
        initialState = _ref.initialState;
    var state = initialState;
    var subscribers = new Map();
    return {
      dispatch: function dispatch(action) {
        var newState = reducer(state, action);

        if (subscribers.has(action.type)) {
          var _subscribers$get;

          (_subscribers$get = subscribers.get(action.type)) === null || _subscribers$get === void 0 ? void 0 : _subscribers$get.forEach(function (s) {
            return s(newState);
          });
        }
      },
      subscribe: function subscribe(actionType, listener) {
        if (subscribers.has(actionType)) {
          var _subscribers$get2;

          (_subscribers$get2 = subscribers.get(actionType)) === null || _subscribers$get2 === void 0 ? void 0 : _subscribers$get2.push(listener);
        } else {
          subscribers.set(actionType, [listener]);
        }
      },
      getState: function getState() {
        return state;
      }
    };
  };

  var ActionType;

  (function (ActionType) {
    ActionType[ActionType["DeleteBlock"] = 0] = "DeleteBlock";
    ActionType[ActionType["AppendBlock"] = 1] = "AppendBlock";
    ActionType[ActionType["ChangeInput"] = 2] = "ChangeInput";
  })(ActionType || (ActionType = {}));

  var uuidv4 = function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
          v = c === 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  };
  var validate = function validate(text) {
    if (!text || text.length === 0) return false;
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(text);
  };

  var Block = function Block(text, isValid) {
    this.id = uuidv4();
    this.text = text;
    this.isValid = isValid;
  };

  var reducer = function reducer(state, action) {
    switch (action.type) {
      case ActionType.DeleteBlock:
        {
          state.blocks = state.blocks.filter(function (e) {
            return e.id !== action.payload.tagId;
          });
          state.lastBlockIdRemoved = action.payload.tagId;
          return state;
        }

      case ActionType.AppendBlock:
        {
          var text = action.payload.text;

          if (text.indexOf(',') >= 0) {
            var texts = text.split(',');
            var blocks = texts.map(function (t) {
              return t.trim();
            }).filter(function (t) {
              return t.length > 0;
            }).map(function (t) {
              return new Block(t, validate(t));
            });
            state.blocks = state.blocks.concat(blocks);
          } else {
            var block = new Block(text, validate(text));
            state.blocks.push(block);
          }

          return state;
        }

      case ActionType.ChangeInput:
        {
          state.currentText = action.payload.text;
          return state;
        }

      default:
        return state;
    }
  };

  var appendBlock = function appendBlock(text) {
    return {
      type: ActionType.AppendBlock,
      payload: {
        text: text
      }
    };
  };
  var deleteBlock = function deleteBlock(tagId) {
    return {
      type: ActionType.DeleteBlock,
      payload: {
        tagId: tagId
      }
    };
  };
  var changeInput = function changeInput(text) {
    return {
      type: ActionType.ChangeInput,
      payload: {
        text: text
      }
    };
  };

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = ".DeleteButton-modules_emails-editor__delete-button__1NSXD {\n  display: inline-block;\n  cursor: pointer;\n  background-color: transparent;\n  border: 0;\n  transform: scale(1);\n  transition: transform 250ms;\n  cursor: pointer;\n}\n\n.DeleteButton-modules_emails-editor__delete-button__1NSXD:focus {\n  outline-style: dotted;\n}\n.DeleteButton-modules_emails-editor__delete-button__1NSXD:hover {\n  transform: scale(1.025);\n  outline: 0.5px solid transparent;\n}\n";
  var style = {"emails-editor__delete-button":"DeleteButton-modules_emails-editor__delete-button__1NSXD"};
  styleInject(css_248z);

  var createClose = function createClose() {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '8');
    svg.setAttribute('height', '8');
    svg.setAttribute('pointer-events', 'none');
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    svg.setAttribute('viewBox', '0 0 8 8');
    path.setAttribute('fill-rule', 'evenodd');
    path.setAttribute('clip-rule', 'evenodd');
    path.setAttribute('d', 'M8 .8L7.2 0 4 3.2.8 0 0 .8 3.2 4 0 7.2l.8.8L4 4.8 7.2 8l.8-.8L4.8 4 8 .8z');
    path.setAttribute('fill', '#050038');
    svg.appendChild(path);
    return svg;
  };

  var deleteButtonBuilder = function deleteButtonBuilder(_ref) {
    var tagId = _ref.tagId;
    var info = createClose();
    var element = document.createElement('button');
    element.dataset['tagId'] = tagId;
    element.appendChild(info);
    element.classList.add(style['emails-editor__delete-button']);
    return element;
  };

  var css_248z$1 = ".EmailBlock-modules_emails-editor__email-block__4PN-k {\n  display: inline-flex;\n  font-size: 14px;\n  line-height: 24px;\n  padding-left: 10px;\n  text-align: right;\n  color: #050038;\n}\n\n.EmailBlock-modules_emails-editor__email-block--valid__3jdwt {\n  border-radius: 100px;\n  background-color: rgba(102, 153, 255, 0.2);\n}\n\n.EmailBlock-modules_emails-editor__email-block--invalid__1uQN7 {\n  border-bottom: 1px dashed #d92929;\n  padding: 0;\n}\n";
  var style$1 = {"emails-editor__email-block":"EmailBlock-modules_emails-editor__email-block__4PN-k","emails-editor__email-block--valid":"EmailBlock-modules_emails-editor__email-block--valid__3jdwt","emails-editor__email-block--invalid":"EmailBlock-modules_emails-editor__email-block--invalid__1uQN7"};
  styleInject(css_248z$1);

  var emailBlockBuilder = function emailBlockBuilder(_ref) {
    var block = _ref.block,
        _ref$onDelete = _ref.onDelete,
        onDelete = _ref$onDelete === void 0 ? function () {} : _ref$onDelete;
    var element = document.createElement('span');
    element.classList.add(style$1['emails-editor__email-block']);
    element.classList.add(block.isValid ? style$1['emails-editor__email-block--valid'] : style$1['emails-editor__email-block--invalid']);
    element.dataset['tagId'] = block.id;
    var blockText = document.createElement('span');
    blockText.textContent = block.text; // This dataset field will be checked during e2e tests

    blockText.dataset['isValid'] = block.isValid ? 'valid' : 'invalid';
    element.appendChild(blockText);
    var deleteButton = deleteButtonBuilder({
      tagId: block.id,
      onClick: function onClick() {
        onDelete(block);
      }
    });
    element.appendChild(deleteButton);
    return element;
  };

  var css_248z$2 = ".InputField-modules_emails-editor__input-field__21cCM {\n  padding: 0;\n  border: 0;\n  margin: 0;\n  outline: 0.5px solid transparent;\n  font-size: 14px;\n  line-height: 24px;\n  flex-basis: 5%;\n  flex-grow: 1;\n  -webkit-box-shadow: none;\n  box-shadow: none;\n}\n\n.InputField-modules_emails-editor__input-field__21cCM::placeholder {\n  color: #c3c2cf;\n}\n\n.InputField-modules_emails-editor__input-field__21cCM::-ms-clear {\n  display: none;\n  width: 0;\n  height: 0;\n}\n.InputField-modules_emails-editor__input-field__21cCM::-ms-reveal {\n  display: none;\n  width: 0;\n  height: 0;\n}\n";
  var style$2 = {"emails-editor__input-field":"InputField-modules_emails-editor__input-field__21cCM"};
  styleInject(css_248z$2);

  var inputFieldBuilder = function inputFieldBuilder(_ref) {
    var id = _ref.id,
        _ref$placeholder = _ref.placeholder,
        placeholder = _ref$placeholder === void 0 ? 'add more people...' : _ref$placeholder,
        _ref$shouldPreventEnt = _ref.shouldPreventEnterDefault,
        shouldPreventEnterDefault = _ref$shouldPreventEnt === void 0 ? false : _ref$shouldPreventEnt,
        _ref$onTextChange = _ref.onTextChange,
        onTextChange = _ref$onTextChange === void 0 ? function () {} : _ref$onTextChange,
        _ref$onTextPasted = _ref.onTextPasted,
        onTextPasted = _ref$onTextPasted === void 0 ? function () {} : _ref$onTextPasted;
    var element = document.createElement('input');
    element.classList.add(style$2['emails-editor__input-field']);

    if (id) {
      element.setAttribute('id', id);
    }

    element.setAttribute('placeholder', placeholder);

    if (shouldPreventEnterDefault) {
      element.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
          event.preventDefault();
        }
      });
    }

    element.addEventListener('keyup', function (event) {
      var value = event.target.value;
      onTextChange(value, event.key, event);
    });
    element.addEventListener('paste', function (event) {
      var text = (event.clipboardData || window.clipboardData).getData('text');
      onTextPasted(text, event);
    });
    return element;
  };

  var hiddenInputBuilder = function hiddenInputBuilder(_ref) {
    var _ref$name = _ref.name,
        name = _ref$name === void 0 ? 'emails-input' : _ref$name,
        _ref$initialValue = _ref.initialValue,
        initialValue = _ref$initialValue === void 0 ? [] : _ref$initialValue;
    var element = document.createElement('input');

    element.setBlocks = function (blocks) {
      element.setAttribute('value', blocks.filter(function (b) {
        return b.isValid;
      }).map(function (b) {
        return b.text;
      }).join(','));
    };

    element.setAttribute('name', name);
    element.setAttribute('type', 'hidden');
    element.setBlocks(initialValue);
    return element;
  };

  var css_248z$3 = "@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');\n\n.EmailsEditor-modules_emails-editor__2P94A > * {\n  box-sizing: border-box;\n  font-family: 'Open Sans', sans-serif;\n  margin-left: 8px;\n  margin-top: 4px;\n}\n\n.EmailsEditor-modules_emails-editor__2P94A {\n  box-sizing: border-box;\n  background-color: #ffffff;\n  border: 1px solid #c3c2cf;\n  width: 100%;\n  overflow-y: auto;\n  display: flex;\n  align-items: flex-start;\n  flex-wrap: wrap;\n  justify-content: flex-start;\n  align-content: start;\n  min-height: 96px;\n  height: 96px;\n  border-radius: 4px;\n}\n";
  var style$3 = {"emails-editor":"EmailsEditor-modules_emails-editor__2P94A"};
  styleInject(css_248z$3);

  var emailsEditorBuilder = function emailsEditorBuilder(_ref) {
    var id = _ref.id,
        placeholder = _ref.placeholder,
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? 'emails-input' : _ref$name,
        store = _ref.store;

    //// UI ELEMENTS ////
    var createEmailBlock = function createEmailBlock(block) {
      return emailBlockBuilder({
        block: block,
        onDelete: function onDelete(block) {
          store.dispatch({
            type: ActionType.DeleteBlock,
            payload: {
              block: block
            }
          });
        }
      });
    };

    var createInputField = function createInputField(store) {
      return inputFieldBuilder({
        id: id,
        placeholder: placeholder,
        //avoid submiting the form when Enter is pressed
        shouldPreventEnterDefault: true,
        onTextChange: function onTextChange(text, key) {
          var _store$getState = store.getState(),
              currentText = _store$getState.currentText,
              blocks = _store$getState.blocks; // Update the state with the current value of the input field


          store.dispatch(changeInput(text)); // If the key pressed is a Backspace/Delete or an Enter/Return
          // Erase or Add Email Block, respectivelly.

          if (key === 'Backspace') {
            if (currentText.length === 0 && blocks.length > 0) {
              var block = blocks[blocks.length - 1];
              store.dispatch(deleteBlock(block.id));
            }
          } else if (key === 'Enter') {
            var sanitizedText = text.trim();

            if (sanitizedText.length > 0) {
              store.dispatch(appendBlock(sanitizedText));
            }
          } else if (key === ',') {
            var _sanitizedText = text.trim();

            store.dispatch(appendBlock(_sanitizedText));
          }
        },
        onTextPasted: function onTextPasted(text, event) {
          var sanitizedText = text.trim();
          store.dispatch(appendBlock(sanitizedText));
          event.preventDefault();
        }
      });
    };

    var emailsEditor = document.createElement('div');
    emailsEditor.classList.add(style$3['emails-editor']);
    emailsEditor.addEventListener('blur', function () {
      var text = store.getState().currentText;

      if (text.length) {
        store.dispatch(appendBlock(text));
      }
    }, true);

    var clickListener = function clickListener(event) {
      var button = event === null || event === void 0 ? void 0 : event.target;

      if (button.parentElement) {
        var span = button.parentElement;

        if (span.getAttribute('data-tag-id')) {
          var tagId = span.getAttribute('data-tag-id');

          if (tagId) {
            store.dispatch(deleteBlock(tagId));
          }
        }
      }

      inputField.focus();
    };

    emailsEditor.addEventListener('click', clickListener);
    var inputField = createInputField(store);
    emailsEditor.appendChild(inputField); //Use a hidden input to send the valid emails via form submit

    var hiddenInput = hiddenInputBuilder({
      name: name
    });
    emailsEditor.appendChild(hiddenInput); //// ACTIONS SUBSCRIPTIONS ////
    // New emails were added at the end of the email list
    // The subscribe callback iterates the new emails and add an
    // Email Block for each one

    store.subscribe(ActionType.AppendBlock, function (_ref2) {
      var blocks = _ref2.blocks;

      // The number of email blocks currently rendered is equal to the number
      // of children of the element minu 2, because the <input> fields are also
      // children.
      for (var i = emailsEditor.childElementCount - 2; i < blocks.length; i++) {
        emailsEditor.insertBefore(createEmailBlock(blocks[i]), inputField);
      }

      emailsEditor.scrollTop = emailsEditor.scrollHeight;
      hiddenInput.setBlocks(blocks);
      store.dispatch(changeInput(''));
    }); // An email was deleted, this subscribre callback deletes the Email
    // Block related with the deleted email.

    store.subscribe(ActionType.DeleteBlock, function (_ref3) {
      var lastBlockIdRemoved = _ref3.lastBlockIdRemoved,
          blocks = _ref3.blocks;
      var emailBlock = emailsEditor.querySelector("[data-tag-id=\"" + lastBlockIdRemoved + "\"]");

      if (emailBlock) {
        emailsEditor.removeChild(emailBlock);
        hiddenInput.setBlocks(blocks);
      }

      inputField.focus();
    }); // The the current text in the state changes, this subscribe callback set
    // the value of the input field accordingly

    store.subscribe(ActionType.ChangeInput, function (_ref4) {
      var currentText = _ref4.currentText;
      inputField.value = currentText;
    }); // Set the behavior of the public interface in the created HTMLDivElement

    emailsEditor.getBlocks = function () {
      return store.getState().blocks;
    };

    emailsEditor.getEmails = function () {
      return store.getState().blocks.filter(function (e) {
        return e.isValid;
      });
    };

    emailsEditor.addBlock = function (text) {
      var sanitizedText = text.trim();

      if (sanitizedText.length > 0) {
        store.dispatch(appendBlock(sanitizedText));
      }
    };

    return emailsEditor;
  };

  var index = (function (rootContainer, options) {
    //// STATE MANAGER ////
    var store = createStore({
      reducer: reducer,
      initialState: {
        currentText: '',
        blocks: []
      }
    });
    var emailsEditor = emailsEditorBuilder(_extends({
      store: store
    }, options));
    rootContainer.appendChild(emailsEditor);
    return emailsEditor;
  });

  return index;

})));
//# sourceMappingURL=emails-input.js.map
