import React from 'react';
import { type Dispatch } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface StoryItem {
  world: string;
  desc: string;
  members: String[];
  event_date: String;
}

interface ScenarioData {
  data: StoryItem;
  openDialog: boolean;
  setOpenDialog: Dispatch<React.SetStateAction<boolean>>;
}

const ScenarioDialog: React.FC<ScenarioData> = ({ data, openDialog, setOpenDialog }) => {


  return ( 
    <Dialog onOpenChange={((v) => {setOpenDialog(v)})} open={openDialog}>
      <DialogContent className="bg-[#282b30] text-gray-300 border-0">
      <DialogHeader className="bg-[#1e2124] rounded-lg p-2">
        <DialogTitle>シナリオ詳細 - {data.world}</DialogTitle>
        <DialogDescription>
          <div>開催日: {data.event_date.split("T")[0]}</div>
        </DialogDescription>
      </DialogHeader>
        <div className="px-2 pb-2">
          <p>参加者　：{data.members.join("、")}</p>
          <p>あらすじ：<br/>{data.desc}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
 
export default ScenarioDialog;