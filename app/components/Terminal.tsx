import React, { useState, useRef, useEffect } from 'react';
import { executeCommand } from '@/lib/command';

const Terminal: React.FC = () => {
  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const output = executeCommand(input);
    setHistory([...history, `$ ${input}`, output]);
    setInput('');
  };

  return (
    <div className="bg-black p-4 rounded-md overflow-auto h-full">
      {history.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
      <form onSubmit={handleSubmit} className="flex">
        <span>$&nbsp;</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent flex-grow outline-none"
        />
      </form>
    </div>
  );
};

export default Terminal;