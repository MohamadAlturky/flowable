"use client"
import React from 'react';
import MarkdownRenderer from './markdown';

const markdownContent = `
# Sample Markdown Document

## Introduction
Welcome to this sample Markdown document. Here, we will explore various features of Markdown syntax.

## Lists
### Unordered List
- Item 1
- Item 2
  - Subitem 2.1
  - Subitem 2.2
- Item 3

### Ordered List
1. First item
2. Second item
3. Third item
   1. Subitem 3.1
   2. Subitem 3.2

## Formatting
Here are some formatting examples:
- **Bold text**
- *Italic text*
- ~~Strikethrough text~~
- \`Inline code\`
- [Link to Google](https://www.google.com)

## Code Blocks
\`\`\`javascript
function helloWorld() {
  console.log("Hello, world!");
}
helloWorld();
\`\`\`

## Blockquotes
> This is a blockquote.
> - Anonymous

## Tables
| Name      | Age |
| --------- | --- |
| John      | 28  |
| Jane      | 25  |
| Bob       | 32  |

## Conclusion
That's it for our sample Markdown document. Enjoy writing in Markdown!
`;

const Home = () => {
  return (
    <div>
      <h1>Markdown Rendering Example</h1>
      <MarkdownRenderer content={markdownContent} />
    </div>
  );
};

export default Home;
