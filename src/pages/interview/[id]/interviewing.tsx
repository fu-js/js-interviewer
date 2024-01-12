import DecisionGroup from "@/components/custom/decision-group";
import If from "@/components/custom/if";
import LoadButton from "@/components/custom/load-button";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import requestBackend from "@/lib/requestBackend";
import Decision from "@/lib/types/decision";
import Status from "@/lib/types/status";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ({ onDone, onNoteSubmit, candidate }: any) {
  const { fullName, department, id } = candidate || {};
  const [decision, setDecision] = useState(
    candidate?.decision || Decision.NOT_DECIDED
  );
  const [note, setNote] = useState("");
  const [isStarted, setIsStarted] = useState(
    candidate?.candidateStatus === Status.INTERVIEWING
  );
  const { toast } = useToast();

  const router = useRouter();
  const interviewDeskId = router.query.id as string;
  const [detail, setDetail] = useState<any>(null);

  useEffect(() => {
    requestBackend(`/interview-desk/candidate-detail`, { candidateId: id })
      .then((res) => res.json())
      .then((res) => {
        const metadataRaw = res.data.metadata;
        const metadata = JSON.parse(metadataRaw);
        console.log(metadata);
        setDetail(metadata);
      });
  }, []);

  const submitNote = () => {
    const isSuccess = onNoteSubmit(candidate, note);
    if (isSuccess) {
      setNote("");
    }
  };

  const endInterview = async () => {
    await onDone({
      ...candidate,
      decision,
    });
  };

  const startInterview = async () => {
    const postStartResponse = await requestBackend(
      `/interview-desk/${interviewDeskId}/start`,
      {
        candidateId: candidate.id,
      },
      { method: "PUT" }
    );
    const status = postStartResponse.status;
    if (status === 200) {
      setIsStarted(true);
    } else {
      toast({ title: "Failed to start interview" });
    }
  };

  return (
    <div className="space-y-5">
      <div className="border rounded-lg overflow-hidden p-4 border-dashed border-border">
        <p className="text-lg font-medium p-2 text-center">{fullName}</p>
        <p className="text-muted-foreground p-1 text-center">
          {department?.name}
        </p>
      </div>
      <div className="flex gap-4 w-full">
        <div className="border rounded-lg overflow-hidden p-4 border-dashed border-border max-w-[100ch]">
          <div className="">
            {detail &&
              detail.map((item: any, index: number) => {
                return (
                  <div className="py-1" key={index}>
                    <p className="">{item.title}</p>
                    <p className="text-muted-foreground break-words">
                      {item.content}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="border rounded-lg overflow-hidden p-4 border-dashed border-border grow lg:min-w-[50ch]">
          <If condition={!isStarted}>
            <LoadButton className="w-full" onClick={startInterview}>
              <span>Start interview</span>
            </LoadButton>
          </If>
          <If condition={isStarted}>
            <div className="">
              <Label htmlFor="note">Your note</Label>
              <Textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Enter note"
                id="note"
                rows={12}
              />
              <p className="text-sm text-muted-foreground pt-1">
                You can drag the bottom right corner to resize the textarea.
              </p>
              <Button className="mt-4 w-full bg-primary" onClick={submitNote}>
                <span>Submit note</span>
              </Button>
            </div>
            <div className="mt-5">
              <div className="flex flex-col gap-4 py-4">
                <DecisionGroup
                  defaultValue={decision}
                  onValueChange={(value) => setDecision(value)}
                  orientation="vertical"
                />
                <LoadButton onClick={endInterview}>
                  <span>End interview</span>
                </LoadButton>
              </div>
            </div>
          </If>
        </div>
      </div>
    </div>
  );
}
