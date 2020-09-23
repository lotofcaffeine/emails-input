import { emailsEditorBuilder } from './components';
import { createStore, reducer } from './StateManager';
import { EmailsEditor, EmailsInputOptions } from './types';

export default (
  rootContainer: HTMLDivElement,
  options: EmailsInputOptions
): EmailsEditor => {
  //// STATE MANAGER ////
  const store = createStore({
    reducer,
    initialState: {
      currentText: '',
      blocks: [],
    },
  });

  const emailsEditor = emailsEditorBuilder({
    store,
    ...options,
  });
  rootContainer.appendChild(emailsEditor);
  return emailsEditor;
};
