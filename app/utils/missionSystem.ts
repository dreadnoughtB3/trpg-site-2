export interface Mission {
    id: string;
    name: string;
    description: string;
    objectives: string[];
    reward: string;
    completed: boolean;
  }
  
  export class MissionSystem {
    private missions: Mission[] = [
      {
        id: 'M001',
        name: 'First Steps',
        description: 'Connect to the Corporate Server and retrieve the confidential document.',
        objectives: ['Connect to 10.0.0.1', 'Download confidential.doc'],
        reward: 'SSHCrack.exe upgrade',
        completed: false,
      },
      {
        id: 'M002',
        name: 'Data Extraction',
        description: 'Access the Research Lab and download the experiment results.',
        objectives: ['Connect to 172.16.0.1', 'Download experiment_results.pdf'],
        reward: 'New hacking tool: PortMapper.exe',
        completed: false,
      },
    ];
  
    private currentMission: Mission | null = null;
  
    startMission(id: string): string {
      const mission = this.missions.find(m => m.id === id);
      if (mission && !mission.completed) {
        this.currentMission = mission;
        return `Mission started: ${mission.name}\n${mission.description}`;
      }
      return 'Mission not found or already completed.';
    }
  
    checkObjective(action: string): boolean {
      if (this.currentMission) {
        const objectiveIndex = this.currentMission.objectives.findIndex(obj => obj === action);
        if (objectiveIndex !== -1) {
          this.currentMission.objectives.splice(objectiveIndex, 1);
          if (this.currentMission.objectives.length === 0) {
            this.completeMission();
          }
          return true;
        }
      }
      return false;
    }
  
    private completeMission(): void {
      if (this.currentMission) {
        this.currentMission.completed = true;
        console.log(`Mission completed: ${this.currentMission.name}`);
        console.log(`Reward: ${this.currentMission.reward}`);
        this.currentMission = null;
      }
    }
  
    getCurrentMission(): Mission | null {
      return this.currentMission;
    }
  
    getAvailableMissions(): Mission[] {
      return this.missions.filter(m => !m.completed);
    }
  
    addMission(mission: Mission): void {
      this.missions.push(mission);
    }
  
    removeMission(id: string): void {
      const index = this.missions.findIndex(m => m.id === id);
      if (index !== -1) {
        this.missions.splice(index, 1);
      }
    }
  }
  
  export const missionSystem = new MissionSystem();