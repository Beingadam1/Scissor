import React, { useState } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import ReactMarkdown from 'react-markdown';

const MarkdownEditor: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>('');

  const mdParser = new MarkdownIt();

  const handleEditorChange = ({ text }: { text: string }) => {
    setMarkdown(text);
  };

  return (
    <div>
      <MdEditor
        value={markdown}
        style={{ height: '500px' }}
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
      />
      <h2>Markdown Preview</h2>
      <div className="markdown-preview">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownEditor;
