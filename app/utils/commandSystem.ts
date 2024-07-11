import { FileSystemNode, FileType, getNodeByPath, resolvePath, runExecutable } from '@/app/utils/fileSystem'
import { networkSystem } from './networkSystem';
import { missionSystem } from './missionSystem';

interface CommandResult {
  output: string;
  newDirectory?: string;
}

export function executeCommand(
  command: string,
  currentDirectory: string,
  fileSystem: FileSystemNode
): CommandResult {
  const [cmd, ...args] = command.split(' ');

  switch (cmd.toLowerCase()) {
    case 'ls':
      return { output: listDirectory(currentDirectory, fileSystem) };
    case 'cd':
      return changeDirectory(args[0], currentDirectory, fileSystem);
    case 'cat':
      return { output: catFile(args[0], currentDirectory, fileSystem) };
    case 'connect':
      return { output: connect(args[0]) };
    case 'scan':
      return { output: scan(args[0]) };
    case 'run':
      return { output: runCommand(args, currentDirectory, fileSystem) };
    case 'scp':
      return { output: scp(args[0], args[1], currentDirectory, fileSystem) };
    case 'probe':
      return { output: probe() };
    case 'missions':
      return { output: listMissions() };
    case 'start_mission':
      return { output: startMission(args[0]) };
    case 'help':
      return { output: showHelp() };
    default:
      return { output: `Command not found: ${cmd}` };
  }
}

function listDirectory(currentDirectory: string, fileSystem: FileSystemNode): string {
  const node = getNodeByPath(currentDirectory, fileSystem);
  if (node && node.type === FileType.Directory) {
    return node.children
      .map((child) => `${child.name}${child.type === FileType.Directory ? '/' : ''}`)
      .join('\n');
  }
  return 'Invalid directory';
}

function changeDirectory(
  path: string,
  currentDirectory: string,
  fileSystem: FileSystemNode
): CommandResult {
  const newPath = resolvePath(path, currentDirectory);
  const node = getNodeByPath(newPath, fileSystem);
  if (node && node.type === FileType.Directory) {
    return { output: '', newDirectory: newPath };
  }
  return { output: 'Invalid directory' };
}

function catFile(
  filename: string,
  currentDirectory: string,
  fileSystem: FileSystemNode
): string {
  const path = resolvePath(filename, currentDirectory);
  const node = getNodeByPath(path, fileSystem);
  if (node && node.type === FileType.File) {
    return node.content || 'Empty file';
  }
  return 'File not found';
}

function connect(ip: string): string {
  const result = networkSystem.connect(ip);
  missionSystem.checkObjective(`Connect to ${ip}`);
  return result;
}

function scan(ip: string): string {
  return networkSystem.scan(ip);
}

function runCommand(args: string[], currentDirectory: string, fileSystem: FileSystemNode): string {
  if (args.length < 1) return 'Usage: run <executable> [args]';
  const [executableName, ...execArgs] = args;
  const executablePath = resolvePath(executableName, currentDirectory);
  const node = getNodeByPath(executablePath, fileSystem);
  
  if (node && node.type === FileType.Executable) {
    return runExecutable(node.name, execArgs);
  }
  return `Executable not found: ${executableName}`;
}

function scp(source: string, destination: string, currentDirectory: string, fileSystem: FileSystemNode): string {
  // Implement file copying between nodes
  return `Copied ${source} to ${destination}`;
}

function probe(): string {
  const connectedNodes = networkSystem.getConnectedNodes();
  return `Connected nodes:\n${connectedNodes.join('\n')}`;
}

function listMissions(): string {
  const availableMissions = missionSystem.getAvailableMissions();
  if (availableMissions.length === 0) {
    return 'No available missions.';
  }
  return availableMissions.map(m => `${m.id}: ${m.name}`).join('\n');
}

function startMission(id: string): string {
  return missionSystem.startMission(id);
}

function showHelp(): string {
  return `
Available commands:
  ls - List directory contents
  cd <directory> - Change directory
  cat <file> - Display file contents
  connect <ip> - Connect to an IP address
  scan <ip> - Scan an IP address
  run <executable> [args] - Run an executable file
  scp <source> <destination> - Copy files between nodes
  probe - List connected nodes
  missions - List available missions
  start_mission <id> - Start a mission
  help - Show this help message
  `;
}