import React, { useMemo } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

const MarkdownEditor = ({ value, onChange, label, placeholder }) => {
    const options = useMemo(() => ({
        spellChecker: false,
        placeholder: placeholder || 'Write your content here...',
        status: false,
        minHeight: '300px',
        autofocus: false,
        renderingConfig: {
            codeSyntaxHighlighting: true,
        },
    }), [placeholder]);

    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-medium text-brand-grey-600 dark:text-brand-grey-400">
                    {label}
                </label>
            )}
            <div className="prose-editor prose dark:prose-invert max-w-none">
                <SimpleMDE 
                    value={value} 
                    onChange={onChange} 
                    options={options}
                />
            </div>
            <style dangerouslySetInnerHTML={{ __html: `
                .prose-editor .editor-toolbar {
                    border-top-left-radius: 8px;
                    border-top-right-radius: 8px;
                    border: 1px solid var(--color-brand-grey-200);
                    background: var(--color-brand-grey-50);
                }
                .dark .prose-editor .editor-toolbar {
                    border-color: var(--color-brand-grey-800);
                    background: var(--color-brand-grey-900);
                    color: white;
                }
                .prose-editor .CodeMirror {
                    border-bottom-left-radius: 8px;
                    border-bottom-right-radius: 8px;
                    border: 1px solid var(--color-brand-grey-200);
                    border-top: none;
                    font-family: 'JetBrains Mono', monospace;
                }
                .dark .prose-editor .CodeMirror {
                    border-color: var(--color-brand-grey-800);
                    background: #0a0a0a;
                    color: #e5e5e5;
                }
                .prose-editor .editor-toolbar button {
                    color: inherit !important;
                }
                .prose-editor .editor-toolbar button.active, .prose-editor .editor-toolbar button:hover {
                    background: var(--color-brand-grey-200);
                }
                .dark .prose-editor .editor-toolbar button.active, .dark .prose-editor .editor-toolbar button:hover {
                    background: var(--color-brand-grey-800);
                }
            `}} />
        </div>
    );
};

export default MarkdownEditor;
