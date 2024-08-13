"use client"
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import 'katex/dist/katex.css'
const MarkdownRenderer = ({ content }) => {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]}
      children={content}
    />
  );
};

export default MarkdownRenderer;

