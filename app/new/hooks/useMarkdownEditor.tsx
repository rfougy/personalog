import { useState, useCallback } from 'react';

export function useMarkdownEditor(initialValue: string = '') {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback((newValue: string) => {
    setValue(newValue);
  }, []);

  const insertText = useCallback(
    (before: string, after: string = '') => {
      const textarea = document.querySelector('textarea');
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = value.substring(start, end);
        const newText =
          value.substring(0, start) +
          before +
          selectedText +
          after +
          value.substring(end);
        setValue(newText);

        // Set cursor position
        setTimeout(() => {
          textarea.focus();
          textarea.setSelectionRange(
            start + before.length,
            end + before.length
          );
        }, 0);
      }
    },
    [value]
  );

  const actions = {
    bold: () => insertText('**', '**'),
    italic: () => insertText('*', '*'),
    bulletList: () => insertText('- '),
    numberedList: () => insertText('1. '),
    heading: () => insertText('# '),
    quote: () => insertText('> '),
    code: () => insertText('`', '`'),
    codeBlock: () => insertText('```\n', '\n```'),
    link: () => insertText('[', '](url)'),
    image: () => insertText('![alt text](', ')'),
  };

  return { value, handleChange, actions };
}
