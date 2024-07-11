import { Node } from '@/types';

export const nodes: Node[] = [
  {
    id: 1,
    name: 'Local Gateway',
    ip: '192.168.1.1',
    securityLevel: 1,
    ports: [21, 22, 80],
  },
  {
    id: 2,
    name: 'Corporate Server',
    ip: '10.0.0.1',
    securityLevel: 3,
    ports: [22, 80, 443],
  },
  // Add more nodes as needed
];