import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onClose: () => void;
  carriagewayWidth: number;
}

const ModifyGeometryDialog = ({ open, onClose, carriagewayWidth }: Props) => {
  const overallWidth = carriagewayWidth + 5;

  const [spacing, setSpacing] = useState("");
  const [numGirders, setNumGirders] = useState("");
  const [overhang, setOverhang] = useState("");
  const [lastEdited, setLastEdited] = useState<"spacing" | "girders" | "overhang" | "">("");
  const [error, setError] = useState("");

  const recalc = useCallback(() => {
    const s = parseFloat(spacing);
    const n = parseInt(numGirders);
    const o = parseFloat(overhang);

    setError("");

    if (lastEdited === "spacing" && !isNaN(s) && !isNaN(o)) {
      if (s <= 0 || o < 0) { setError("Values must be positive."); return; }
      if (s >= overallWidth || o >= overallWidth) { setError("Values exceed overall bridge width."); return; }
      const calc = (overallWidth - o) / s;
      setNumGirders(Math.round(calc).toString());
    } else if (lastEdited === "girders" && !isNaN(n) && !isNaN(o)) {
      if (n <= 0 || o < 0) { setError("Values must be positive."); return; }
      if (o >= overallWidth) { setError("Overhang exceeds overall width."); return; }
      const calc = (overallWidth - o) / n;
      setSpacing(calc.toFixed(1));
    } else if (lastEdited === "overhang" && !isNaN(s) && !isNaN(o)) {
      if (s <= 0 || o < 0) { setError("Values must be positive."); return; }
      if (o >= overallWidth) { setError("Overhang exceeds overall width."); return; }
      const calc = (overallWidth - o) / s;
      setNumGirders(Math.round(calc).toString());
    }
  }, [spacing, numGirders, overhang, lastEdited, overallWidth]);

  useEffect(() => {
    if (lastEdited) recalc();
  }, [spacing, numGirders, overhang, lastEdited, recalc]);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-sm">Modify Additional Geometry</DialogTitle>
        </DialogHeader>

        <div className="text-xs mb-2">
          <span className="eng-label">Overall Bridge Width:</span>{" "}
          <span className="font-semibold">{overallWidth.toFixed(1)} m</span>
          <span className="text-muted-foreground ml-2">(Carriageway + 5)</span>
        </div>

        <div className="grid grid-cols-[160px_1fr] gap-x-3 gap-y-2 items-center text-xs">
          <label className="eng-label mb-0">Girder Spacing (m):</label>
          <Input
            className="eng-input w-28"
            type="number"
            step="0.1"
            value={spacing}
            onChange={(e) => { setSpacing(e.target.value); setLastEdited("spacing"); }}
          />

          <label className="eng-label mb-0">Number of Girders:</label>
          <Input
            className="eng-input w-28"
            type="number"
            step="1"
            value={numGirders}
            onChange={(e) => { setNumGirders(e.target.value); setLastEdited("girders"); }}
          />

          <label className="eng-label mb-0">Deck Overhang Width (m):</label>
          <Input
            className="eng-input w-28"
            type="number"
            step="0.1"
            value={overhang}
            onChange={(e) => { setOverhang(e.target.value); setLastEdited("overhang"); }}
          />
        </div>

        {error && <p className="eng-error mt-1">{error}</p>}

        <DialogFooter>
          <Button variant="outline" size="sm" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModifyGeometryDialog;
