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

export default function ({
  candidate,
  onEdit,
}: {
  candidate: any;
  onEdit: any;
}) {
  if (!candidate) return null;

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
          <div className="grid gap-4 py-6">
            <DecisionGroup
              defaultValue={candidate.decision}
              onValueChange={(value) => (candidate.decision = value)}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={() => onEdit({ ...candidate })}>Edit</Button>
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
