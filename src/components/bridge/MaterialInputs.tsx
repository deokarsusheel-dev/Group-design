import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface Props {
  disabled: boolean;
}

const concreteGrades = ["M25", "M30", "M35", "M40", "M45", "M50", "M55", "M60"];

const MaterialInputs = ({ disabled }: Props) => {
  const [girderSteel, setGirderSteel] = useState("E250");
  const [bracingSteel, setBracingSteel] = useState("E250");
  const [deckConcrete, setDeckConcrete] = useState("M30");

  return (
    <div className={`eng-section ${disabled ? "eng-disabled" : ""}`}>
      <div className="eng-section-title">4. Material Inputs</div>
      <div className="grid grid-cols-[160px_1fr] gap-x-3 gap-y-2 items-center">
        <label className="eng-label mb-0">Girder Steel:</label>
        <Select value={girderSteel} onValueChange={setGirderSteel} disabled={disabled}>
          <SelectTrigger className="eng-input w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="E250">E250</SelectItem>
            <SelectItem value="E350">E350</SelectItem>
            <SelectItem value="E450">E450</SelectItem>
          </SelectContent>
        </Select>

        <label className="eng-label mb-0">Cross Bracing Steel:</label>
        <Select value={bracingSteel} onValueChange={setBracingSteel} disabled={disabled}>
          <SelectTrigger className="eng-input w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="E250">E250</SelectItem>
            <SelectItem value="E350">E350</SelectItem>
            <SelectItem value="E450">E450</SelectItem>
          </SelectContent>
        </Select>

        <label className="eng-label mb-0">Deck Concrete:</label>
        <Select value={deckConcrete} onValueChange={setDeckConcrete} disabled={disabled}>
          <SelectTrigger className="eng-input w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {concreteGrades.map((g) => (
              <SelectItem key={g} value={g}>{g}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default MaterialInputs;
