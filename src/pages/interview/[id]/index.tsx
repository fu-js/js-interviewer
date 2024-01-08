import BackButton from "@/components/custom/back-button";
import If from "@/components/custom/if";
import Layout from "@/components/custom/layout";
import { ModeToggle } from "@/components/custom/mode-toggle";
import { useToast } from "@/components/ui/use-toast";
import Status from "@/lib/types/status";
import useFetch from "@/lib/useFetch";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSWRConfig } from "swr";
import InterviewTable from "./interview-table";
import Interviewing from "./interviewing";

export default function Interview() {
  const { toast } = useToast();
  const router = useRouter();
  const deskId = router.query.id as string;

  // interviewing loading
  const {
    data: candidates,
    isLoading: isLoadingCandidates,
    mutate,
  } = useFetch(`${process.env.BACKEND_URL}/interview-desk/${deskId || 1}`, {
    page: 1,
    limit: 10,
  });

  const [inverviewingCandidate, setInterviewingCandidate] = useState<any>(null);
  useEffect(() => {
    if (!candidates) return;
    const interviewingCandidate = candidates?.data.candidates.find(
      (candidate: any) => candidate.status === Status.CHECKED_IN
    );
    setInterviewingCandidate(interviewingCandidate);
  }, [candidates]);

  const doneInterviewing = async (interviewee: any) => {
    const res = await fetch(
      `${process.env.BACKEND_URL}/interview-desk/${deskId}/complete?candidateId=${interviewee.id}`,
      {
        method: "PUT",
      }
    );
    const status = res.status;
    if (status === 200) {
      mutate();
      setInterviewingCandidate(null);
      toast({
        title: "Success",
      });
    } else {
      toast({
        title: "Failed ",
      });
    }
  };

  const submitNote = (interviewee: any) => {};

  const edit = (newInterviewee: any) => {};

  return (
    <Layout>
      <main className="p-5">
        <div className="absolute right-2 top-2">
          <ModeToggle />
        </div>
        <BackButton href="/interview" />
        <h1 className="text-4xl px-2 py-5 font-bold">
          {"Bàn phỏng vấn " + deskId}
        </h1>
        <h2 className="text-4xl text-center p-5 font-bold">Ongoing</h2>
        <If condition={!inverviewingCandidate}>
          <div className="border flex rounded-lg p-4 border-dashed border-border justify-center items-center">
            <div className="flex gap-2 text-muted-foreground py-5">
              <ReloadIcon className="mr-2 -mt-1 h-10 w-10 animate-spin" />
              <p className="text-2xl">Awating assignment</p>
            </div>
          </div>
        </If>
        <Interviewing
          data={inverviewingCandidate}
          onDone={doneInterviewing}
          onNoteSubmit={submitNote}
        />
        <h2 className="mt-20 text-4xl text-center p-5 font-bold">
          Interview table
        </h2>
        {candidates?.data?.candidates && !isLoadingCandidates && (
          <div className="border border-border rounded-lg overflow-hidden">
            <InterviewTable data={candidates.data.candidates} onEdit={edit} />
          </div>
        )}
      </main>
    </Layout>
  );
}
