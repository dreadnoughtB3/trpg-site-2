export interface Mission {
    id: number;
    title: string;
    description: string;
    objectives: string[];
    }
  
export interface Node {
    id: number;
    name: string;
    ip: string;
    securityLevel: number;
    ports: number[];
}