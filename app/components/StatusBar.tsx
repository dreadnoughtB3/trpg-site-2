import { Mission } from '../utils/missionSystem';

interface StatusBarProps {
  currentIP: string;
  currentMission: Mission | null;
}

export default function StatusBar({ currentIP, currentMission }: StatusBarProps) {
  return (
    <div className="bg-green-900 text-green-300 p-2 flex justify-between">
      <div>IP: {currentIP}</div>
      <div>
        {currentMission ? `Mission: ${currentMission.name}` : 'No active mission'}
      </div>
    </div>
  );
}