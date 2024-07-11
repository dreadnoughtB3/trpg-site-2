import React, { useState } from 'react';

interface File {
  name: string;
  content: string;
}

interface Directory {
  name: string;
  contents: (File | Directory)[];
}

const FileSystem: React.FC = () => {
  const [fileSystem, setFileSystem] = useState<Directory>({
    name: 'root',
    contents: [
      { name: 'documents', contents: [] },
      { name: 'readme.txt', content: 'Welcome to Hacknet!' },
    ],
  });

  const renderFileSystem = (dir: Directory, depth = 0) => {
    return (
      <div style={{ marginLeft: `${depth * 20}px` }}>
        <div>{dir.name}/</div>
        {dir.contents.map((item, index) => (
          <div key={index}>
            {isDirectory(item) ? (
              renderFileSystem(item, depth + 1)
            ) : (
              <div>{item.name}</div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const isDirectory = (item: File | Directory): item is Directory => {
    return 'contents' in item;
  };

  return <div className="text-green-500">{renderFileSystem(fileSystem)}</div>;
};

export default FileSystem;