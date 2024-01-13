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
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import requestBackend from "@/lib/requestBackend";
import Decision from "@/lib/types/decision";
import { useState } from "react";

export default function ({ interviewee: candidateData }: { interviewee: any }) {
  if (!candidateData) return null;

  const [candidate, setCandidate] = useState(candidateData);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">View notes</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="mx-auto w-full">
          <DialogHeader>
            <DialogTitle>
              <p className="text-xl font-medium">All Notes</p>
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {candidate?.fullName} - {candidate?.department.name}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <DecisionGroup
              defaultValue={candidateData.decision}
              onValueChange={(decision) =>
                setCandidate({ ...candidate, decision })
              }
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
