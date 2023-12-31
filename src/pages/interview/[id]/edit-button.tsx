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

export default function ({ interviewee }: { interviewee: any }) {
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
              <h3 className="text-xl font-medium">Edit</h3>
            </DrawerTitle>
            <DrawerDescription>
              <p className="text-muted-foreground">
                {interviewee?.name} - {interviewee?.dept}
              </p>
            </DrawerDescription>
          </DrawerHeader>
          <div className="grid gap-4 p-4">
            <Label htmlFor="note">Your note</Label>
            <Textarea
              placeholder="Enter note"
              id="note"
              className="resize-y"
              rows={12}
            />
            <div className="flex gap-4 items-center py-4">
              <RadioGroup defaultValue="Chờ" className="flex gap-4">
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
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
