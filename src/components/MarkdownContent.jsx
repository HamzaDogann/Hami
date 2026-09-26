import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Fenced code blocks with a language get syntax highlighting; everything else renders as plain <code>.
const createComponents = (syntaxStyle) => ({
    code({ className, children }) {
        const language = /language-(\w+)/.exec(className || '')?.[1];
        if (!language) return <code className={className}>{children}</code>;

        return (
            <SyntaxHighlighter PreTag="div" language={language} style={syntaxStyle}>
                {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
        );
    },
});

const DARK_COMPONENTS = createComponents(oneDark);
const LIGHT_COMPONENTS = createComponents(oneLight);

const MarkdownContent = ({ content, className, lightCode = false }) => (
    <ReactMarkdown className={className} components={lightCode ? LIGHT_COMPONENTS : DARK_COMPONENTS}>
        {content}
    </ReactMarkdown>
);

export default MarkdownContent;
