// Converts the Markdown the model returns into plain text for the clipboard.
// Code blocks keep their content; only the syntax around it is removed.
export function markdownToPlainText(markdown) {
    return markdown
        .replace(/```[^\n]*\n([\s\S]*?)```/g, "$1")
        .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
        .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
        .replace(/^#{1,6}\s+/gm, "")
        .replace(/(\*\*|__)(.+?)\1/g, "$2")
        .replace(/\*(.+?)\*/g, "$1")
        .replace(/`([^`]+)`/g, "$1")
        .trim();
}
