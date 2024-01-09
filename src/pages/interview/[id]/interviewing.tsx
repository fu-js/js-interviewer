import DecisionGroup from "@/components/custom/decision-group";
import If from "@/components/custom/if";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Decision from "@/lib/types/decision";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function ({ onDone, onNoteSubmit, candidate }: any) {
  if (!candidate) return null;

  const { fullName, metadata, department } = candidate;
  const [decision, setDecision] = useState(
    candidate.decision || Decision.NOT_DECIDED
  );
  const [note, setNote] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [isEnding, setIsEnding] = useState(false);

  const submitNote = () => {
    const isSuccess = onNoteSubmit(candidate, note);
    if (isSuccess) {
      setNote("");
    }
  };

  const endInterview = () => {
    setIsEnding(true);
    onDone({
      ...candidate,
      decision,
    });
    setTimeout(() => {
      setIsEnding(false);
    }, 1000);
  };

  return (
    <div className="space-y-5">
      <div className="border rounded-lg overflow-hidden p-4 border-dashed border-border">
        <p className="text-lg font-medium p-2 text-center">{fullName}</p>
        <p className="text-muted-foreground p-1 text-center">
          {department.name}
        </p>
        {metadata?.map((item: any) => (
          <div className="py-2">
            <span className="text-muted-foreground">{item.title}</span>
            <br />
            <span>{item.content}</span>
          </div>
        ))}
      </div>
      <If condition={!isStarted}>
        <div className="border rounded-lg overflow-hidden p-4 border-dashed border-border">
          <Button
            className=""
            onClick={() => {
              setIsStarted(true);
            }}
          >
            <span>Start interview</span>
          </Button>
        </div>
      </If>
      <If condition={isStarted}>
        <div className="border rounded-lg overflow-hidden p-4 border-dashed border-border">
          <div className="">
            <Label htmlFor="note">Your note</Label>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Enter note"
              id="note"
              rows={8}
            />
            <p className="text-sm text-muted-foreground pt-1">
              You can drag the bottom right corner to resize the textarea.
            </p>
            <Button className="mt-4" onClick={submitNote}>
              <span>Submit note</span>
            </Button>
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden p-4 border-dashed border-border">
          <div className="flex gap-4 items-center py-4">
            <DecisionGroup
              defaultValue={decision}
              onValueChange={(value) => setDecision(value)}
            />
            <Button onClick={endInterview}>
              {isEnding && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
              <span>End interview</span>
            </Button>
          </div>
        </div>
      </If>
    </div>
  );
}
