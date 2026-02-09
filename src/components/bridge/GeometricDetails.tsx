import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import ModifyGeometryDialog from "./ModifyGeometryDialog";

interface Props {
  disabled: boolean;
}

const GeometricDetails = ({ disabled }: Props) => {
  const [span, setSpan] = useState("");
  const [carriagewayWidth, setCarriagewayWidth] = useState("");
  const [footpath, setFootpath] = useState("None");
  const [skewAngle, setSkewAngle] = useState("");
  const [geoDialogOpen, setGeoDialogOpen] = useState(false);

  const spanNum = parseFloat(span);
  const cwNum = parseFloat(carriagewayWidth);
  const skewNum = parseFloat(skewAngle);

  const spanError = span && !isNaN(spanNum) && (spanNum < 20 || spanNum > 45);
  const cwError = carriagewayWidth && !isNaN(cwNum) && (cwNum < 4.25 || cwNum >= 24);
  const skewWarning = skewAngle && !isNaN(skewNum) && (skewNum < -15 || skewNum > 15);

  return (
    <div className={`eng-section ${disabled ? "eng-disabled" : ""}`}>
      <div className="eng-section-title">3. Geometric Details</div>
      <div className="grid grid-cols-[140px_1fr] gap-x-3 gap-y-2 items-center">
        <label className="eng-label mb-0">Span (m):</label>
        <div>
          <Input
            className="eng-input w-32"
            value={span}
            onChange={(e) => setSpan(e.target.value)}
            disabled={disabled}
            type="number"
          />
          {spanError && <p className="eng-error mt-0.5">Outside the software range (20–45 m).</p>}
        </div>

        <label className="eng-label mb-0">Carriageway Width (m):</label>
        <div>
          <Input
            className="eng-input w-32"
            value={carriagewayWidth}
            onChange={(e) => setCarriagewayWidth(e.target.value)}
            disabled={disabled}
            type="number"
          />
          {cwError && <p className="eng-error mt-0.5">Must be ≥4.25 and &lt;24 m.</p>}
        </div>

        <label className="eng-label mb-0">Footpath:</label>
        <Select value={footpath} onValueChange={setFootpath} disabled={disabled}>
          <SelectTrigger className="eng-input w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="None">None</SelectItem>
            <SelectItem value="Single-sided">Single-sided</SelectItem>
            <SelectItem value="Both">Both</SelectItem>
          </SelectContent>
        </Select>

        <label className="eng-label mb-0">Skew Angle (°):</label>
        <div>
          <Input
            className="eng-input w-32"
            value={skewAngle}
            onChange={(e) => setSkewAngle(e.target.value)}
            disabled={disabled}
            type="number"
          />
          {skewWarning && (
            <p className="eng-warning mt-0.5">⚠ IRC 24 (2010) requires detailed analysis for skew &gt;±15°.</p>
          )}
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="mt-3 text-xs"
        onClick={() => setGeoDialogOpen(true)}
        disabled={disabled || !carriagewayWidth || isNaN(cwNum) || cwError}
      >
        Modify Additional Geometry
      </Button>

      <ModifyGeometryDialog
        open={geoDialogOpen}
        onClose={() => setGeoDialogOpen(false)}
        carriagewayWidth={cwNum || 0}
      />
    </div>
  );
};

export default GeometricDetails;
