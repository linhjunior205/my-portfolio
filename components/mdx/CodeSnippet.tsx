"use client";

import React, { useState } from "react";
import { Highlight, Language } from "prism-react-renderer";
import vsDark from "@/utils/themes/vs-dark";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

interface CodeSnippetProps {
    code: string;
    language?: Language;
}

export default function CodeSnippet({ code, language = "tsx" }: CodeSnippetProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="mt-2 mb-4 relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 text-sm">
            <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-800 bg-zinc-950">
                <span className="text-zinc-400 font-mono">{language}</span>
                <Button
                    size="sm"
                    variant="ghost"
                    className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
                    onClick={handleCopy}
                >
                    <Copy className="w-4 h-4 mr-1" />
                    {copied ? "Copied" : "Copy"}
                </Button>
            </div>

            <Highlight code={code.trim()} language={language} theme={vsDark}>
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <pre className={`${className} p-4 overflow-x-auto`} style={style}>
                        {tokens.map((line, i) => (
                            <div key={i} {...getLineProps({ line })}>
                                {line.map((token, key) => (
                                    <span key={key} {...getTokenProps({ token })} />
                                ))}
                            </div>
                        ))}
                    </pre>
                )}
            </Highlight>
        </div>
    );
}
