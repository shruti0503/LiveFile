// components/CodeBlock.js
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ codeString }:any) => {
    return (
        <SyntaxHighlighter language="javascript" style={dark} className="w-[50%]">
            {codeString}
        </SyntaxHighlighter>
    );
};

export default CodeBlock;
