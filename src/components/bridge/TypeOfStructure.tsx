import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

const TypeOfStructure = ({ value, onChange }: Props) => {
  return (
    <div className="eng-section">
      <div className="eng-section-title">1. Type of Structure</div>
      <div className="flex items-center gap-3">
        <label className="eng-label mb-0 whitespace-nowrap">Structure Type:</label>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="eng-input w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Highway">Highway</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {value === "Other" && (
        <p className="eng-warning mt-2">⚠ Other structures not included.</p>
      )}
    </div>
  );
};

export default TypeOfStructure;
