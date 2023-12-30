import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

export default function ({ onDone }: any) {
  return (
    <div className="border flex rounded-lg overflow-hidden p-4 border-dashed border-border">
      <div className="">
        <div className="">
          <img
            src="https://picsum.photos/900"
            className="rounded-lg w-96 h-96"
          />
          <p className="text-lg font-medium p-2 text-center">
            Trịnh Phạm Đoan Trang
          </p>
          <p className="text-muted-foreground p-1 text-center">
            Ban Chuyên môn
          </p>
        </div>
      </div>
      <div className="grow px-4">
        <div className="">
          <Label htmlFor="note">Your note</Label>
          <Textarea placeholder="Enter note" id="note" rows={8} />
          <p className="text-sm text-muted-foreground">
            You can drag the bottom right corner to resize the textarea.
          </p>
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
            <Button className="" onClick={onDone}>
              <span>Submit</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
