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
import { useState } from "react";

export default function ({ interviewee: candidateData }: { interviewee: any }) {
  if (!candidateData) return null;

  const [candidate, setCandidate] = useState(candidateData);
  const { toast } = useToast();

  const edit = async (candidate: any) => {
    const editRes = await requestBackend(
      `/analysis/decide`,
      { candidateId: candidate.id, decision: candidate.decision },
      { method: "PUT" }
    );
    const status = editRes.status;
    if (status === 200) {
      toast({
        title: "Edit success",
        description: "Candidate has been edited",
      });
    } else {
      toast({
        title: "Edit failed",
        description: "Candidate has not been edited",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="mx-auto w-full">
          <DialogHeader>
            <DialogTitle>
              <p className="text-xl font-medium">Edit</p>
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {candidate?.fullName} - {candidate?.department.name}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-96 py-4">
            {JSON.parse(candidate.metadata).map((item: any, index: number) => (
              <div className="py-1" key={index}>
                <p className="text-muted-foreground">{"Q: " + item.title}</p>
                <p>{"A: " + item.content}</p>
              </div>
            ))}
          </ScrollArea>
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
              <Button onClick={() => edit(candidate)}>Edit</Button>
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
