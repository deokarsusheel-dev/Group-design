import { useState } from "react";
import TypeOfStructure from "./TypeOfStructure";
import ProjectLocation from "./ProjectLocation";
import GeometricDetails from "./GeometricDetails";
import MaterialInputs from "./MaterialInputs";

const BasicInputs = () => {
  const [structureType, setStructureType] = useState("Highway");
  const isDisabled = structureType === "Other";

  return (
    <div className="space-y-0">
      <TypeOfStructure value={structureType} onChange={setStructureType} />
      <ProjectLocation disabled={isDisabled} />
      <GeometricDetails disabled={isDisabled} />
      <MaterialInputs disabled={isDisabled} />
    </div>
  );
};

export default BasicInputs;
