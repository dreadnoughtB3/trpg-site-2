import React from 'react';
import { Node } from '@/types';

interface NodeProps {
  node: Node;
}

const NodeComponent: React.FC<NodeProps> = ({ node }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-md">
      <h3 className="text-lg font-bold mb-2">{node.name}</h3>
      <p>IP: {node.ip}</p>
      <p>Security Level: {node.securityLevel}</p>
      <div className="mt-2">
        <h4 className="font-bold">Ports:</h4>
        <ul>
          {node.ports.map((port, index) => (
            <li key={index}>{port}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NodeComponent;