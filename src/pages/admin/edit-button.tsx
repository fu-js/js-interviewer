import DecisionGroup from "@/components/custom/decision-group";
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
import { useState } from "react";

export default function ({ interviewee: candidateData }: { interviewee: any }) {
  if (!candidateData) return null;

  const [candidate, setCandidate] = useState(candidateData);

  function edit(candidate: any): void {
    
  }

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
              {candidate?.fullName} - {candidate?.department.name}
            </DrawerDescription>
          </DrawerHeader>
          <div className="grid gap-4 p-4">
            <div className="flex gap-4 items-center py-4">
              <DecisionGroup
                defaultValue={candidateData.decision}
                onValueChange={(value) =>
                  setCandidate({ ...candidate, decision: value })
                }
              />
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button onClick={() => edit({ ...candidate })}>Submit</Button>
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
