import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export default function ({
  actionName,
  onConfirm,
}: {
  actionName: string;
  onConfirm: () => void;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{actionName}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Confirm</DialogTitle>
          <DialogDescription className="py-2">
            Are you sure you want to confirm action: "{actionName}" ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild onClick={onConfirm}>
            <Button variant="default">Confirm</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
