import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { executeCommand } from '../utils/commandSystem';
import { FileSystemNode } from '../utils/fileSystem';
import { missionSystem } from '../utils/missionSystem';

interface TerminalProps {
  currentDirectory: string;
  setCurrentDirectory: (dir: string) => void;
  commandHistory: string[];
  setCommandHistory: (history: string[]) => void;
  fileSystem: FileSystemNode;
}

export default function Terminal({
  currentDirectory,
  setCurrentDirectory,
  commandHistory,
  setCommandHistory,
  fileSystem,
}: TerminalProps) {
  const [input, setInput] = useState('');

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const result = executeCommand(input, currentDirectory, fileSystem);
      setCommandHistory([...commandHistory, `${currentDirectory}$ ${input}`, result.output]);
      if (result.newDirectory) {
        setCurrentDirectory(result.newDirectory);
      }
      setInput('');
      
      // Check mission objectives
      missionSystem.checkObjective(input);
    }
  };

  return (
    <div className="flex-1 p-4 overflow-auto">
      {commandHistory.map((cmd, index) => (
        <div key={index} className="whitespace-pre-wrap">{cmd}</div>
      ))}
      <div className="flex items-center">
        <span>{currentDirectory}$</span>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          className="bg-transparent border-none focus:ring-0 ml-2"
        />
      </div>
    </div>
  );
}