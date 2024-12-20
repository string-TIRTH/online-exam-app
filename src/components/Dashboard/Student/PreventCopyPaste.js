import React from 'react';
const PreventCopyPaste = ({ children }) => {
  const preventCopyPaste = (e) => {
    e.preventDefault();
    alert('Copy-paste is disabled!');
  };

  return (
    <div
      onCopy={preventCopyPaste}
      onCut={preventCopyPaste}
      onPaste={preventCopyPaste}
      style={{ userSelect: 'none' }}
    >
      {children}
    </div>
  );
};

export default PreventCopyPaste;
