import { Mission } from '@/types';

export const missions: Mission[] = [
  {
    id: 1,
    title: 'First Steps',
    description: 'Learn the basics of hacking and complete your first mission.',
    objectives: [
      'Connect to your first node',
      'Crack the SSH password',
      'Delete a file named "secret.txt"',
    ],
  },
  {
    id: 2,
    title: 'Corporate Espionage',
    description: 'Infiltrate a rival company\'s network and steal sensitive data.',
    objectives: [
      'Scan for vulnerable nodes in the 192.168.1.0/24 range',
      'Exploit a buffer overflow vulnerability',
      'Exfiltrate files from /home/ceo/',
    ],
  },
  // Add more missions as needed
];