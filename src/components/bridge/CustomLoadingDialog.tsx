import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface CustomParams {
  windSpeed: string;
  seismicZone: string;
  maxTemp: string;
  minTemp: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onApply: (params: CustomParams) => void;
  initial: CustomParams;
}

const CustomLoadingDialog = ({ open, onClose, onApply, initial }: Props) => {
  const [params, setParams] = useState<CustomParams>(initial);

  const set = (key: keyof CustomParams, val: string) =>
    setParams((p) => ({ ...p, [key]: val }));

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-sm">Custom Loading Parameters</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-[1fr_1fr] gap-x-4 gap-y-2 text-xs">
          <label className="eng-label self-center">Wind Speed (m/s)</label>
          <Input className="eng-input" value={params.windSpeed} onChange={(e) => set("windSpeed", e.target.value)} />
          <label className="eng-label self-center">Seismic Zone</label>
          <Input className="eng-input" value={params.seismicZone} onChange={(e) => set("seismicZone", e.target.value)} />
          <label className="eng-label self-center">Max Temperature (°C)</label>
          <Input className="eng-input" value={params.maxTemp} onChange={(e) => set("maxTemp", e.target.value)} />
          <label className="eng-label self-center">Min Temperature (°C)</label>
          <Input className="eng-input" value={params.minTemp} onChange={(e) => set("minTemp", e.target.value)} />
        </div>
        <DialogFooter>
          <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
          <Button size="sm" onClick={() => { onApply(params); onClose(); }}>Apply</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomLoadingDialog;
