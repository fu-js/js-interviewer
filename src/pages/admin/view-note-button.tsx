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
  const [notes, setNotes] = useState([]);
  const { toast } = useToast();

  const fetchNote = async () => {
    const notesRes = await requestBackend(
      `/analysis/notes`,
      {
        candidateId: candidate.id,
      },
      { method: "GET" }
    );

    const status = notesRes.status;
    if (status === 200) {
      const notes = await notesRes.json();
      setNotes(notes.data);
    } else {
      toast({
        title: "Fetch failed",
        description: "Notes has not been fetched",
      });
    }

    return status;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" onClick={fetchNote}>
          View notes
        </Button>
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
          <ScrollArea className="h-96 py-4">
            <div className="flex flex-col gap-4">
              {notes.map((note: any) => (
                <div className="flex flex-col gap-2">
                  <p className="text-sm">{note}</p>
                  <hr className="border-gray-200 dark:border-gray-600 dark:border-opacity-50 border-opacity-50" />
                </div>
              ))}
            </div>
          </ScrollArea>
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
