import DecisionGroup from "@/components/custom/decision-group";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

export default function ({ interviewee: candidateData }: { interviewee: any }) {
  if (!candidateData) return null;

  const [candidate, setCandidate] = useState(candidateData);

  function edit(candidate: any): void {

  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="mx-auto w-full max-w-xl">
          <DialogHeader>
            <DialogTitle>
              <p className="text-xl font-medium">Edit</p>
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {candidate?.fullName} - {candidate?.department.name}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
              <DecisionGroup
                defaultValue={candidateData.decision}
                onValueChange={(value) =>
                  setCandidate({ ...candidate, decision: value })
                }
              />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={() => edit({ ...candidate })}>Submit</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
