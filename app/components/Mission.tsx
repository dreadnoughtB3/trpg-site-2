import React from 'react';
import { Mission } from '@/types';

interface MissionProps {
  mission: Mission;
}

const MissionComponent: React.FC<MissionProps> = ({ mission }) => {
  return (
    <div className="bg-gray-900 p-4 rounded-md">
      <h2 className="text-xl font-bold mb-2">{mission.title}</h2>
      <p className="mb-4">{mission.description}</p>
      <ul className="list-disc list-inside">
        {mission.objectives.map((objective, index) => (
          <li key={index}>{objective}</li>
        ))}
      </ul>
    </div>
  );
};

export default MissionComponent;