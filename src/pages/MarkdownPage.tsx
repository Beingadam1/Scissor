import React from 'react';
import MarkdownEditor from '../components/MarkdownEditor';

const MarkdownPage: React.FC = () => {
  return (
    <div>
      <h1>Write and Preview Markdown</h1>
      <MarkdownEditor />
    </div>
  );
};

export default MarkdownPage;
