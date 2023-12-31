import BackButton from "@/components/custom/back-button";
import If from "@/components/custom/if";
import Layout from "@/components/custom/layout";
import { ModeToggle } from "@/components/custom/mode-toggle";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import Interviewing from "./interviewing";
import InterviewTable from "./interview-table";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { useRouter } from "next/router";

const invoices = [
  {
    id: 1,
    name: "Trịnh Phạm Đoan Trang",
    dept: "Ban Chuyên môn",
  },
  {
    id: 2,
    name: "Nguyễn Thị Thanh Huyền",
    dept: "Ban Chuyên môn",
  },
  {
    id: 3,
    name: "Vũ Lê Băng Tâm",
    dept: "Ban Chuyên môn",
  }
];

export default function Interview() {
  // interviewing loading
  const [isInterviewing, setIsInterviewing] = useState(true);
  const doneInterviewing = () => {
    setIsInterviewing(false);
    setTimeout(() => {
      setIsInterviewing(true);
    }, 1000);
  };

  // interview load
  const router = useRouter();
  const deskId = router.query.id as string;
  const { data: response, isLoading } = useSWR(
    `/api/desk/${deskId}/interviewing`,
    fetcher
  );

  return (
    <Layout>
      <main className="p-5">
        <div className="absolute right-2 top-2">
          <ModeToggle />
        </div>
        <BackButton href="/interview" />
        <h1 className="text-4xl text-center p-5 font-bold">
          Ongoing Interviewee
        </h1>
        <If condition={!isInterviewing}>
          <div className="border flex rounded-lg p-4 border-dashed border-border justify-center items-center">
            <div className="flex gap-2 text-muted-foreground py-5">
              <ReloadIcon className="mr-2 -mt-1 h-10 w-10 animate-spin" />
              <p className="text-2xl">Awating assignment</p>
            </div>
          </div>
        </If>
        {response && isInterviewing && !isLoading && (
          <Interviewing data={response.data} onDone={doneInterviewing} />
        )}
        <h1 className="text-4xl text-center p-5 font-bold">Interview table</h1>
        <div className="border border-border rounded-lg overflow-hidden">
          <InterviewTable data={invoices} />
        </div>
      </main>
    </Layout>
  );
}
