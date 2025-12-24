import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/themes/prism.css';
import { Button } from '../../components/ui/Button';
import { Play, Terminal, Trash2, Copy, Check } from 'lucide-react';
import axios from 'axios';

const DEFAULT_CODE = `#include <iostream>

int main() {
    std::cout << "Hello, Engineer!" << std::endl;
    return 0;
}`;

export const Playground = () => {
    const [searchParams] = useSearchParams();
    const [code, setCode] = useState(DEFAULT_CODE);
    const [stdin, setStdin] = useState('');
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        const encodedCode = searchParams.get('code');
        if (encodedCode) {
            try {
                const decoded = decodeURIComponent(atob(encodedCode));
                setCode(decoded);
            } catch (e) {
                console.error("Failed to decode code from URL", e);
            }
        }
    }, [searchParams]);

    const handleRun = async () => {
        setIsRunning(true);
        setOutput('Compiling and executing...');
        try {
            const response = await axios.post('https://emkc.org/api/v2/piston/execute', {
                language: 'cpp',
                version: '10.2.0',
                files: [
                    {
                        content: code
                    }
                ],
                stdin: stdin
            });

            const { run } = response.data;
            if (run.stderr) {
                setOutput(run.stderr);
            } else {
                setOutput(run.stdout || 'Program executed successfully (no output).');
            }
        } catch (error) {
            setOutput('Error: Connection to simulator failed.');
            console.error(error);
        } finally {
            setIsRunning(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="flex flex-col gap-8 h-[calc(100vh-250px)]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-4">
                <div className="space-y-1">
                    <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-brand-grey-400">Environment: v1.0.cpp_reactor</p>
                    <h1 className="text-2xl font-display font-bold">Simulator</h1>
                </div>
                <div className="flex flex-wrap gap-4">
                    <Button variant="ghost" size="sm" onClick={() => setCode(DEFAULT_CODE)}>
                        <Trash2 size={14} /> Reset
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleCopy}>
                        {isCopied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />} 
                        {isCopied ? "Copied" : "Copy"}
                    </Button>
                    <Button 
                        disabled={isRunning} 
                        onClick={handleRun}
                        className="min-w-[140px]"
                    >
                        {isRunning ? (
                            <span className="animate-pulse flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-white dark:bg-brand-black" /> Processing
                            </span>
                        ) : (
                            <><Play size={14} fill="currentColor" /> Execute</>
                        )}
                    </Button>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-0 border border-brand-grey-100 dark:border-brand-grey-900 rounded-sm overflow-hidden bg-brand-grey-50/20 dark:bg-brand-grey-900/10">
                {/* Editor Section */}
                <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-brand-grey-100 dark:border-brand-grey-900 overflow-auto scrollbar-hide">
                    <div className="sticky top-0 z-10 flex border-b border-brand-grey-100 dark:border-brand-grey-900 p-3 bg-brand-grey-50 dark:bg-brand-grey-900">
                        <div className="flex gap-1.5 font-mono text-[8px] uppercase tracking-widest text-brand-grey-400 items-center">
                            <span className="w-2 h-2 rounded-full border border-brand-grey-200 dark:border-brand-grey-800" /> 
                            Source_Buffer.cpp
                        </div>
                    </div>
                    <div className="p-4 font-mono text-sm min-h-full">
                        <Editor
                            value={code}
                            onValueChange={setCode}
                            highlight={code => Prism.highlight(code, Prism.languages.cpp, 'cpp')}
                            padding={20}
                            style={{
                                fontFamily: '"Fira Code", "Fira Mono", monospace',
                                fontSize: 14,
                                minHeight: '100%',
                                backgroundColor: 'transparent',
                            }}
                            className="editor-content"
                        />
                    </div>
                </div>

                {/* Sidebar Section: Input & Output */}
                <div className="lg:col-span-2 flex flex-col divide-y divide-brand-grey-100 dark:divide-brand-grey-900 bg-brand-grey-50/30 dark:bg-brand-grey-900/40">
                    {/* Input Section */}
                    <div className="flex flex-col h-1/3">
                        <div className="sticky top-0 z-10 flex border-b border-brand-grey-100 dark:border-brand-grey-900 p-3 bg-brand-grey-50 dark:bg-brand-grey-900">
                            <div className="flex gap-1.5 font-mono text-[8px] uppercase tracking-widest text-brand-grey-400 items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-grey-200 dark:bg-brand-grey-800" /> 
                                Input_Buffer (stdin)
                            </div>
                        </div>
                        <textarea
                            value={stdin}
                            onChange={(e) => setStdin(e.target.value)}
                            placeholder="// Provide program input here..."
                            className="flex-1 p-6 font-mono text-xs bg-transparent outline-none resize-none text-brand-black dark:text-brand-white placeholder:text-brand-grey-300 dark:placeholder:text-brand-grey-700"
                        />
                    </div>

                    {/* Output Section */}
                    <div className="flex flex-col flex-1">
                        <div className="sticky top-0 z-10 flex border-b border-brand-grey-100 dark:border-brand-grey-900 p-3 bg-brand-grey-50 dark:bg-brand-grey-900">
                            <div className="flex gap-1.5 font-mono text-[8px] uppercase tracking-widest text-brand-grey-400 items-center">
                                <Terminal size={10} /> 
                                Output_Stream
                            </div>
                        </div>
                        <div className="p-8 font-mono text-xs flex-1 overflow-auto whitespace-pre-wrap leading-relaxed text-brand-grey-600 dark:text-brand-grey-400">
                            {output || "// Awaiting execution..."}
                        </div>
                    </div>
                </div>
            </div>
            
            <style>{`
                .editor-content textarea {
                    outline: none !important;
                }
                .prism-code {
                    background: transparent !important;
                }
                .token.comment, .token.prolog, .token.doctype, .token.cdata { color: #A3A3A3; }
                .token.punctuation { color: #525252; }
                .token.namespace { opacity: .7; }
                .token.property, .token.tag, .token.boolean, .token.number, .token.constant, .token.symbol, .token.deleted { color: #000; font-weight: bold; }
                .token.selector, .token.attr-name, .token.string, .token.char, .token.builtin, .token.inserted { color: #404040; }
                .token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string { color: #000; }
                .token.atrule, .token.attr-value, .token.keyword { color: #000; font-weight: 800; }
                .token.function, .token.class-name { color: #000; text-decoration: underline; text-underline-offset: 4px; text-decoration-thickness: 1px; text-decoration-color: #E5E5E5; }
                .token.regex, .token.important, .token.variable { color: #000; }
                
                .dark .token.property, .dark .token.tag, .dark .token.boolean, .dark .token.number, .dark .token.constant, .dark .token.symbol, .dark .token.deleted { color: #FFF; }
                .dark .token.selector, .dark .token.attr-name, .dark .token.string, .dark .token.char, .dark .token.builtin, .dark .token.inserted { color: #D4D4D4; }
                .dark .token.operator, .dark .token.entity, .dark .token.url { color: #FFF; }
                .dark .token.atrule, .dark .token.attr-value, .dark .token.keyword { color: #FFF; }
                .dark .token.function, .dark .token.class-name { color: #FFF; text-decoration-color: #262626; }
                .dark .token.comment { color: #525252; }
                .dark .token.punctuation { color: #A3A3A3; }
            `}</style>
        </div>
    );
};
