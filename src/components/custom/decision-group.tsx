import Decision from "@/lib/types/decision";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export default function ({
  defaultValue,
  onValueChange,
}: {
  defaultValue: Decision;
  onValueChange: (decision: Decision) => void;
}) {
  return (
    <RadioGroup
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      className="flex gap-4"
    >
      {Object.keys(Decision).map((key) => (
        <div className="flex items-center space-x-2" key={key}>
          <RadioGroupItem value={key} id={key} />
          <Label htmlFor={key} className="cursor-pointer">
            {key}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
