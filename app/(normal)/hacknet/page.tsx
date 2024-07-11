"use client";

import { useState, useEffect } from 'react';
import Terminal from '@/app/components/Terminal';
import FileSystem from '@/app/components/FileSystem';
import StatusBar from '@/app/components/StatusBar';
import { networkSystem } from '@/app/utils/networkSystem';
import { initialFileSystem, FileSystemNode } from '@/app/utils/fileSystem';
import { missionSystem } from '@/app/utils/missionSystem';

export default function Home() {
  const [currentDirectory, setCurrentDirectory] = useState('/');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [fileSystem, setFileSystem] = useState<FileSystemNode>(initialFileSystem);
  const [currentIP, setCurrentIP] = useState(networkSystem.getCurrentIP());
  const [currentMission, setCurrentMission] = useState(missionSystem.getCurrentMission());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIP(networkSystem.getCurrentIP());
      setCurrentMission(missionSystem.getCurrentMission());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-black text-green-500 font-mono">
      <StatusBar currentIP={currentIP} currentMission={currentMission} />
      <div className="flex-1 flex flex-col md:flex-row">
        <Terminal
          currentDirectory={currentDirectory}
          setCurrentDirectory={setCurrentDirectory}
          commandHistory={commandHistory}
          setCommandHistory={setCommandHistory}
          fileSystem={fileSystem}
        />
        <FileSystem
          currentDirectory={currentDirectory}
          setCurrentDirectory={setCurrentDirectory}
          fileSystem={fileSystem}
        />
      </div>
    </div>
  );
}