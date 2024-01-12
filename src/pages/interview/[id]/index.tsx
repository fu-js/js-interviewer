import BackButton from "@/components/custom/back-button";
import If from "@/components/custom/if";
import Layout from "@/components/custom/layout";
import { ModeToggle } from "@/components/custom/mode-toggle";
import { useToast } from "@/components/ui/use-toast";
import requestBackend from "@/lib/requestBackend";
import Status from "@/lib/types/status";
import useFetch from "@/lib/useFetch";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import InterviewTable from "./interview-table";
import Interviewing from "./interviewing";

export default function Interview() {
  const { toast } = useToast();
  const router = useRouter();
  const deskId = router.query.id as string;
  const backendUrl = process.env.BACKEND_URL;

  // interviewing loading
  const {
    data: candidates,
    isLoading: isLoadingCandidates,
    mutate: refetchCandidates,
  } = useFetch(
    `${backendUrl}/interview-desk/${deskId || 1}`,
    {
      page: 0,
      limit: 100,
    },
    {
      revalidateOnFocus: false,
    }
  );

  const [inverviewingCandidate, setInterviewingCandidate] = useState<any>(null);
  const isInterviewing = (candidate: any) => {
    return (
      candidate.candidateStatus === Status.BROWSING_PROFILE ||
      candidate.candidateStatus === Status.INTERVIEWING
    );
  };
  const filterInterviewingCandidate = () => {
    if (!candidates) return;
    const interviewingCandidate =
      candidates?.data.candidates.find(isInterviewing);
    setInterviewingCandidate(interviewingCandidate);
  };
  useEffect(filterInterviewingCandidate, [candidates]);

  const doneInterviewing = async (interviewee: any) => {
    const res = await requestBackend(
      `/interview-desk/${deskId}/complete`,
      { candidateId: interviewee.id },
      { method: "PUT" }
    );
    const decideRes = await requestBackend(
      `/interview-desk/${deskId}/decide`,
      {
        candidateId: interviewee.id,
        decision: interviewee.decision,
      },
      { method: "PUT" }
    );
    const status = res.status;
    const decideStatus = decideRes.status;
    if (status === 200 && decideStatus === 200) {
      refetchCandidates();
      setInterviewingCandidate(null);
      toast({ title: "Success" });
    } else {
      toast({ title: "Failed " });
    }
  };

  const submitNote = async (candidate: any, note: string) => {
    const noteResponse = await requestBackend(
      `/interview-desk/${deskId}/note`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({ candidateId: candidate.id, note: note }),
      }
    );
    const noteStatus = noteResponse.status;
    if (noteStatus === 200) {
      toast({ title: "Success" });
    } else {
      toast({ title: "Failed " });
    }
  };

  const edit = async (newCandidateData: any): Promise<boolean> => {
    const decideResponse = await requestBackend(
      `/interview-desk/${deskId}/decide`,
      {
        candidateId: newCandidateData.id,
        decision: newCandidateData.decision,
      },
      { method: "PUT" }
    );
    const decideStatus = decideResponse.status;
    if (decideStatus === 200) {
      refetchCandidates();
      toast({ title: "Success" });
      return true;
    } else {
      toast({ title: "Failed " });
      return false;
    }
  };

  return (
    <Layout>
      <main className="p-5">
        <div className="absolute right-2 top-2">
          <ModeToggle />
        </div>
        <BackButton href="/interview" />
        <h2 className="text-4xl text-center p-5 font-bold">Ongoing</h2>
        <If condition={!inverviewingCandidate}>
          <div className="border flex rounded-lg p-4 border-dashed border-border justify-center items-center">
            <div className="flex gap-2 text-muted-foreground py-5">
              <ReloadIcon className="mr-2 -mt-1 h-10 w-10 animate-spin" />
              <p className="text-2xl">Awating assignment</p>
            </div>
          </div>
        </If>
        {inverviewingCandidate && (
          <Interviewing
            candidate={inverviewingCandidate}
            onDone={doneInterviewing}
            onNoteSubmit={submitNote}
          />
        )}
        <h2 className="mt-20 text-4xl text-center p-5 font-bold">
          Interview table
        </h2>
        {candidates?.data?.candidates && !isLoadingCandidates && (
          <div className="border border-border rounded-lg overflow-hidden">
            <InterviewTable data={candidates?.data?.candidates} onEdit={edit} />
          </div>
        )}
      </main>
    </Layout>
  );
}
