import {
  ActionType,
  appendBlock,
  changeInput,
  deleteBlock,
  Store,
} from '../../StateManager';
import {
  EmailsEditor,
  EmailBlock,
  InputField,
  EmailsEditorProps,
} from '../../types';
import { emailBlockBuilder } from '../EmailBlock';
import { inputFieldBuilder } from '../InputField';
import { hiddenInputBuilder } from '../HiddenInput';

import style from './EmailsEditor.modules.css';
import { Block } from '../../model';

export const emailsEditorBuilder = ({
  id,
  placeholder,
  name = 'emails-input',
  store,
}: EmailsEditorProps): EmailsEditor => {
  //// UI ELEMENTS ////
  const createEmailBlock = (block: Block): EmailBlock => {
    return emailBlockBuilder({
      block,
      onDelete: block => {
        store.dispatch({
          type: ActionType.DeleteBlock,
          payload: { block },
        });
      },
    });
  };
  const createInputField = (store: Store): InputField => {
    return inputFieldBuilder({
      id,
      placeholder,
      //avoid submiting the form when Enter is pressed
      shouldPreventEnterDefault: true,
      onTextChange: (text, key) => {
        const { currentText, blocks } = store.getState();
        // Update the state with the current value of the input field
        store.dispatch(changeInput(text));

        // If the key pressed is a Backspace/Delete or an Enter/Return
        // Erase or Add Email Block, respectivelly.
        if (key === 'Backspace') {
          if (currentText.length === 0 && blocks.length > 0) {
            const block = blocks[blocks.length - 1];
            store.dispatch(deleteBlock(block));
          }
        } else if (key === 'Enter') {
          const sanitizedText = text.trim();
          if (sanitizedText.length > 0) {
            store.dispatch(appendBlock(sanitizedText));
          }
        } else if (key === ',') {
          const sanitizedText = text.trim();
          store.dispatch(appendBlock(sanitizedText));
        }
      },
      onTextPasted: (text, event) => {
        const sanitizedText = text.trim();
        store.dispatch(appendBlock(sanitizedText));
        event.preventDefault();
      },
    });
  };

  const emailsEditor = document.createElement('div') as EmailsEditor;
  emailsEditor.classList.add(style['emails-editor']);

  emailsEditor.addEventListener(
    'blur',
    () => {
      const text = store.getState().currentText;
      if (text.length) {
        store.dispatch(appendBlock(text));
      }
    },
    true
  );
  emailsEditor.addEventListener('click', () => {
    inputField.focus();
  });
  const inputField = createInputField(store);
  emailsEditor.appendChild(inputField);

  //Use a hidden input to send the valid emails via form submit
  const hiddenInput = hiddenInputBuilder({
    name,
  });
  emailsEditor.appendChild(hiddenInput);
  //// ACTIONS SUBSCRIPTIONS ////

  // New emails were added at the end of the email list
  // The subscribe callback iterates the new emails and add an
  // Email Block for each one
  store.subscribe(ActionType.AppendBlock, ({ blocks }) => {
    // The number of email blocks currently rendered is equal to the number
    // of children of the element minu 2, because the <input> fields are also
    // children.
    for (let i = emailsEditor.childElementCount - 2; i < blocks.length; i++) {
      emailsEditor.insertBefore(createEmailBlock(blocks[i]), inputField);
    }
    emailsEditor.scrollTop = emailsEditor.scrollHeight;
    hiddenInput.setBlocks(blocks);
    store.dispatch(changeInput(''));
  });

  // An email was deleted, this subscribre callback deletes the Email
  // Block related with the deleted email.
  store.subscribe(ActionType.DeleteBlock, ({ lastBlockIdRemoved, blocks }) => {
    const emailBlock = emailsEditor.querySelector<EmailBlock>(
      `[data-tag-id="${lastBlockIdRemoved}"]`
    );
    if (emailBlock) {
      emailsEditor.removeChild(emailBlock);
      emailBlock.clean();
      hiddenInput.setBlocks(blocks);
    }
    inputField.focus();
  });

  // The the current text in the state changes, this subscribe callback set
  // the value of the input field accordingly
  store.subscribe(ActionType.ChangeInput, ({ currentText }) => {
    inputField.value = currentText;
  });

  // Set the behavior of the public interface in the created HTMLDivElement
  emailsEditor.getBlocks = () => {
    return store.getState().blocks;
  };
  emailsEditor.getEmails = () => {
    return store.getState().blocks.filter(e => e.isValid);
  };
  emailsEditor.addBlock = (text: string): void => {
    const sanitizedText = text.trim();
    if (sanitizedText.length > 0) {
      store.dispatch(appendBlock(sanitizedText));
    }
  };
  return emailsEditor;
};
