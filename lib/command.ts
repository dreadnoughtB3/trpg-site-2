export const executeCommand = (input: string): string => {
    const [command, ...args] = input.split(' ');
  
    switch (command.toLowerCase()) {
      case 'help':
        return `
  Available commands:
    help - Show this help message
    ls - List files in current directory
    cd - Change directory
    cat - Display file contents
    connect - Connect to a node
    scan - Scan for available nodes
        `;
      case 'ls':
        return 'File1.txt\nFile2.txt\nDirectory1';
      case 'cd':
        return args[0] ? `Changed directory to ${args[0]}` : 'Usage: cd <directory>';
      case 'cat':
        return args[0] ? `Contents of ${args[0]}:\nSample file content` : 'Usage: cat <filename>';
      case 'connect':
        return args[0] ? `Connected to ${args[0]}` : 'Usage: connect <ip>';
      case 'scan':
        return 'Scanning...\nFound nodes: 192.168.1.1, 10.0.0.1';
      default:
        return `Command not found: ${command}`;
    }
  };