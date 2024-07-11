export interface Executable {
    name: string;
    description: string;
    execute: (args: string[]) => string;
  }
  
  export const executables: Executable[] = [
    {
      name: 'SSHCrack',
      description: 'Attempts to crack SSH security on a target system',
      execute: (args) => `Attempting to crack SSH on ${args[0]}...`,
    },
    {
      name: 'FTPBounce',
      description: 'Exploits FTP bounce attack vulnerability',
      execute: (args) => `Executing FTP bounce attack on ${args[0]}...`,
    },
    // Add more executables as needed
  ];