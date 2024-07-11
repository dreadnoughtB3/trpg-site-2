import { FileSystemNode, getNodeByPath, FileType } from '../utils/fileSystem';

interface FileSystemProps {
  currentDirectory: string;
  fileSystem: FileSystemNode;
  setCurrentDirectory: (dir: string) => void;
}

export default function FileSystem({
  currentDirectory,
  fileSystem,
  setCurrentDirectory,
}: FileSystemProps) {
  const currentNode = getNodeByPath(currentDirectory, fileSystem);

  return (
    <div className="w-full md:w-1/3 p-4 border-l border-green-500">
      <h2 className="text-lg font-bold mb-2">File System</h2>
      <div className="text-sm">
        <div className="mb-2">Current Directory: {currentDirectory}</div>
        {currentNode?.children?.map((child) => (
          <div
            key={child.name}
            className="cursor-pointer hover:text-green-300"
            onClick={() => setCurrentDirectory(`${currentDirectory}/${child.name}`)}
          >
            {child.name}
            {child.type === FileType.Directory ? '/' : ''}
          </div>
        ))}
      </div>
    </div>
  );
}