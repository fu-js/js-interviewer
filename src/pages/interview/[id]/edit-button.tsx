import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

export default function ({
  interviewee,
  onEdit,
}: {
  interviewee: any;
  onEdit: any;
}) {
  if (!interviewee) return null;

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Edit</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-xl">
          <DrawerHeader>
            <DrawerTitle>
              <p className="text-xl font-medium">Edit</p>
            </DrawerTitle>
            <DrawerDescription className="text-muted-foreground">
              {interviewee?.name} - {interviewee?.dept}
            </DrawerDescription>
          </DrawerHeader>
          <div className="grid gap-4 p-4">
            <Label htmlFor="note">Your note</Label>
            <Textarea
              placeholder="Enter note"
              value={interviewee.note}
              onChange={(e) => (interviewee.note = e.target.value)}
              id="note"
              className="resize-y"
              rows={12}
            />
            <div className="flex gap-4 items-center py-4">
              <RadioGroup
                defaultValue={interviewee.status}
                onValueChange={(value) => (interviewee.status = value)}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Đạt" id="r1" />
                  <Label htmlFor="r1" className="cursor-pointer">
                    Đạt
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Chờ" id="r2" />
                  <Label htmlFor="r2" className="cursor-pointer">
                    Chờ
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Loại" id="r3" />
                  <Label htmlFor="r3" className="cursor-pointer">
                    Loại
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button onClick={() => onEdit({ ...interviewee })}>Submit</Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}