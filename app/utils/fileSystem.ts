export enum FileType {
  File,
  Directory,
  Executable,
}

export interface FileSystemNode {
  name: string;
  type: FileType;
  content?: string;
  children?: FileSystemNode[];
}

export interface Executable {
  name: string;
  run: (args: string[]) => string;
}

const executables: Record<string, Executable> = {
  'SSHCrack.exe': {
    name: 'SSHCrack.exe',
    run: (args: string[]) => {
      if (args.length < 1) return 'Usage: SSHCrack.exe <ip>';
      return `Attempting to crack SSH on ${args[0]}...`;
    },
  },
  'FTPBounce.exe': {
    name: 'FTPBounce.exe',
    run: (args: string[]) => {
      if (args.length < 1) return 'Usage: FTPBounce.exe <ip>';
      return `Attempting FTP bounce attack on ${args[0]}...`;
    },
  },
};

export const initialFileSystem: FileSystemNode = {
  name: '/',
  type: FileType.Directory,
  children: [
    {
      name: 'home',
      type: FileType.Directory,
      children: [
        {
          name: 'documents',
          type: FileType.Directory,
          children: [
            { name: 'readme.txt', type: FileType.File, content: 'Welcome to Hacknet!' },
          ],
        },
        {
          name: 'bin',
          type: FileType.Directory,
          children: [
            { name: 'SSHCrack.exe', type: FileType.Executable },
            { name: 'FTPBounce.exe', type: FileType.Executable },
          ],
        },
      ],
    },
    {
      name: 'sys',
      type: FileType.Directory,
      children: [
        { name: 'config.sys', type: FileType.File, content: 'System configuration' },
      ],
    },
  ],
};

export function getNodeByPath(path: string, root: FileSystemNode): FileSystemNode | null {
  const parts = path.split('/').filter(Boolean);
  let current: FileSystemNode | undefined = root;

  for (const part of parts) {
    if (current.type !== FileType.Directory) return null;
    current = current.children?.find((child) => child.name === part);
    if (!current) return null;
  }

  return current;
}

export function getParentPath(path: string): string {
  const parts = path.split('/').filter(Boolean);
  return '/' + parts.slice(0, -1).join('/');
}

export function resolvePath(path: string, currentDirectory: string): string {
  if (path.startsWith('/')) {
    return path;
  }
  const parts = currentDirectory.split('/').filter(Boolean);
  const newParts = path.split('/').filter(Boolean);
  
  for (const part of newParts) {
    if (part === '..') {
      parts.pop();
    } else if (part !== '.') {
      parts.push(part);
    }
  }
  
  return '/' + parts.join('/');
}

export function runExecutable(name: string, args: string[]): string {
  const executable = executables[name];
  if (executable) {
    return executable.run(args);
  }
  return `Executable not found: ${name}`;
}