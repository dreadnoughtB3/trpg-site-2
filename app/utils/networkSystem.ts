interface NetworkNode {
    ip: string;
    name: string;
    ports: number[];
    files: string[];
    connected: boolean;
  }
  
  export class NetworkSystem {
    private nodes: NetworkNode[] = [
      {
        ip: '192.168.0.1',
        name: 'Home',
        ports: [21, 22, 80],
        files: ['personal.txt', 'todo.list'],
        connected: true,
      },
      {
        ip: '10.0.0.1',
        name: 'Corporate Server',
        ports: [22, 80, 443],
        files: ['confidential.doc', 'employees.db'],
        connected: false,
      },
      {
        ip: '172.16.0.1',
        name: 'Research Lab',
        ports: [22, 443, 8080],
        files: ['research_data.xlsx', 'experiment_results.pdf'],
        connected: false,
      },
    ];
  
    private currentNode: NetworkNode;
  
    constructor() {
      this.currentNode = this.nodes[0]; // Start connected to home
    }
  
    connect(ip: string): string {
      const targetNode = this.nodes.find(node => node.ip === ip);
      if (targetNode) {
        this.currentNode = targetNode;
        this.currentNode.connected = true;
        return `Connected to ${targetNode.name} (${ip})`;
      }
      return `Failed to connect to ${ip}`;
    }
  
    scan(ip: string): string {
      const targetNode = this.nodes.find(node => node.ip === ip);
      if (targetNode) {
        return `
  Scan results for ${targetNode.name} (${ip}):
  Open ports: ${targetNode.ports.join(', ')}
  Files: ${targetNode.files.join(', ')}
        `;
      }
      return `No information available for ${ip}`;
    }
  
    getCurrentIP(): string {
      return this.currentNode.ip;
    }
  
    getConnectedNodes(): string[] {
      return this.nodes.filter(node => node.connected).map(node => node.ip);
    }
  
    addNode(node: NetworkNode): void {
      this.nodes.push(node);
    }
  
    removeNode(ip: string): void {
      const index = this.nodes.findIndex(node => node.ip === ip);
      if (index !== -1) {
        this.nodes.splice(index, 1);
      }
    }
  }
  
  export const networkSystem = new NetworkSystem();