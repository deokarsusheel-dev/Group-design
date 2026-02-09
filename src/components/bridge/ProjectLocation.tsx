import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CITY_DATA, type CityParams } from "./cityData";
import CustomLoadingDialog, { type CustomParams } from "./CustomLoadingDialog";

interface Props {
  disabled: boolean;
}

const ProjectLocation = ({ disabled }: Props) => {
  const [mode, setMode] = useState<"city" | "custom">("city");
  const [city, setCity] = useState("");
  const [cityParams, setCityParams] = useState<CityParams | null>(null);
  const [customDialogOpen, setCustomDialogOpen] = useState(false);
  const [customParams, setCustomParams] = useState<CustomParams>({
    windSpeed: "",
    seismicZone: "",
    maxTemp: "",
    minTemp: "",
  });

  const handleCityChange = (c: string) => {
    setCity(c);
    setCityParams(CITY_DATA[c] || null);
  };

  const handleModeChange = (m: "city" | "custom") => {
    setMode(m);
    if (m === "city") {
      setCustomParams({ windSpeed: "", seismicZone: "", maxTemp: "", minTemp: "" });
    } else {
      setCity("");
      setCityParams(null);
    }
  };

  const displayParams = mode === "city" && cityParams
    ? {
        windSpeed: `${cityParams.windSpeed} m/s`,
        seismicZone: `Zone ${cityParams.seismicZone} (Z = ${cityParams.seismicFactor})`,
        maxTemp: `${cityParams.maxTemp} °C`,
        minTemp: `${cityParams.minTemp} °C`,
      }
    : mode === "custom" && customParams.windSpeed
    ? {
        windSpeed: `${customParams.windSpeed} m/s`,
        seismicZone: customParams.seismicZone,
        maxTemp: `${customParams.maxTemp} °C`,
        minTemp: `${customParams.minTemp} °C`,
      }
    : null;

  return (
    <div className={`eng-section ${disabled ? "eng-disabled" : ""}`}>
      <div className="eng-section-title">2. Project Location</div>

      <div className="flex gap-4 mb-3">
        <label className="flex items-center gap-1.5 text-xs cursor-pointer">
          <input
            type="radio"
            name="locMode"
            checked={mode === "city"}
            onChange={() => handleModeChange("city")}
            disabled={disabled}
          />
          Enter Location Name
        </label>
        <label className="flex items-center gap-1.5 text-xs cursor-pointer">
          <input
            type="radio"
            name="locMode"
            checked={mode === "custom"}
            onChange={() => handleModeChange("custom")}
            disabled={disabled}
          />
          Custom Loading Parameters
        </label>
      </div>

      {mode === "city" && (
        <div className="flex items-center gap-3 mb-2">
          <label className="eng-label mb-0 whitespace-nowrap">City:</label>
          <Select value={city} onValueChange={handleCityChange} disabled={disabled}>
            <SelectTrigger className="eng-input w-48">
              <SelectValue placeholder="Select city..." />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(CITY_DATA).map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {mode === "custom" && (
        <Button
          variant="outline"
          size="sm"
          className="text-xs mb-2"
          onClick={() => setCustomDialogOpen(true)}
          disabled={disabled}
        >
          Open Parameter Table
        </Button>
      )}

      {displayParams && (
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 pl-2">
          <span className="eng-label mb-0">Basic Wind Speed:</span>
          <span className="eng-value-green">{displayParams.windSpeed}</span>
          <span className="eng-label mb-0">Seismic Zone & Factor:</span>
          <span className="eng-value-green">{displayParams.seismicZone}</span>
          <span className="eng-label mb-0">Max Temperature:</span>
          <span className="eng-value-green">{displayParams.maxTemp}</span>
          <span className="eng-label mb-0">Min Temperature:</span>
          <span className="eng-value-green">{displayParams.minTemp}</span>
        </div>
      )}

      <CustomLoadingDialog
        open={customDialogOpen}
        onClose={() => setCustomDialogOpen(false)}
        onApply={setCustomParams}
        initial={customParams}
      />
    </div>
  );
};

export default ProjectLocation;
