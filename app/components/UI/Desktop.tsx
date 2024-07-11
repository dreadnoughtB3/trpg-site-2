import React from 'react';
import Window from './Window';
import Terminal from '../Terminal';
import FileSystem from '../FileSystem';

const Desktop: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 h-screen">
      <Window title="Terminal">
        <Terminal />
      </Window>
      <Window title="File System">
        <FileSystem />
      </Window>
    </div>
  );
};

export default Desktop;