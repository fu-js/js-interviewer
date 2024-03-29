import Decision from "@/lib/types/decision";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export default function ({
  defaultValue,
  onValueChange,
  orientation = "horizontal",
}: {
  defaultValue: Decision;
  onValueChange: (decision: Decision) => void;
  orientation?: "vertical" | "horizontal";
}) {
  return (
    <RadioGroup
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      className={`flex ${orientation === "vertical" ? "flex-col" : ""} gap-4`}
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
