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
        <Button variant="secondary">Edit</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-xl">
          <DrawerHeader>
            <DrawerTitle>
              <p className="text-xl font-medium">Edit</p>
            </DrawerTitle>
            <DrawerDescription className="text-muted-foreground">
              {interviewee?.fullName} - {interviewee?.department.name}
            </DrawerDescription>
          </DrawerHeader>
          <div className="grid gap-4 p-4">
            <Label htmlFor="note">Notes</Label>
            <div className="w-full p-4 border border-border border-dashed rounded-lg">
              {interviewee.note || "No note"}
            </div>
            <div className="flex gap-4 items-center py-4">
              <RadioGroup
                defaultValue={interviewee.decision}
                onValueChange={(value) => (interviewee.decision = value)}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="PASS" id="r1" />
                  <Label htmlFor="r1" className="cursor-pointer">
                    Đạt
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="NOT_DECIDED" id="r2" />
                  <Label htmlFor="r2" className="cursor-pointer">
                    Chờ
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="FAIL" id="r3" />
                  <Label htmlFor="r3" className="cursor-pointer">
                    Loại
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button onClick={() => onEdit({ ...interviewee })}>Edit</Button>
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
