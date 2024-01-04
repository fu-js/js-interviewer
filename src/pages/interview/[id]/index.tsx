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
import Decision from "@/lib/types/decision";

let interviewees = [
  {
    id: 1,
    name: "Trịnh Phạm Đoan Trang",
    phoneNumber: "0123456789",
    department: {
      id: 1,
      name: "Ban Chuyen Mon"
    },
    decision: Decision.PASS,
  },
  {
    id: 2,
    name: "Nguyễn Thị Thanh Huyền",
    phoneNumber: "0123456789",
    department: {
      id: 1,
      name: "Ban Chuyen Mon"
    },
    decision: Decision.CONSIDERING,
  },
  {
    id: 3,
    name: "Vũ Lê Băng Tâm",
    phoneNumber: "0123456789",
    department: {
      id: 1,
      name: "Ban Chuyen Mon"
    },
    decision: Decision.FAIL,
  },
];

export default function Interview() {
  // interviewing loading
  const [isInterviewing, setIsInterviewing] = useState(true);
  const [data, setData] = useState(interviewees);
  const doneInterviewing = (interviewee: any) => {
    // TODO: call api to update interviewee decision
    setIsInterviewing(false);

    const newData = [
      ...data,
      {
        ...interviewee,
        id: interviewee.length + 1,
      },
    ];
    setData(newData);

    setTimeout(() => {
      setIsInterviewing(true);
    }, 1000);
  };

  // interview load
  const router = useRouter();
  const deskId = router.query.id as string;
  const { data: response, isLoading } = useSWR(
    `/api/desk/${deskId}/interviewing`,
    fetcher,
    {
      refreshInterval: 1000,
    },
  );

  // edit history
  const edit = (newInterviewee: any) => {
    // TODO: call api to update interviewee decision
    const newData = data.map((interviewee) => {
      if (interviewee.id === newInterviewee.id) {
        console.log(newInterviewee);
        return newInterviewee;
      }
      return interviewee;
    });
    setData(newData);
  };

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
        <h2 className="mt-20 text-4xl text-center p-5 font-bold">
          Interview table
        </h2>
        <div className="border border-border rounded-lg overflow-hidden">
          <InterviewTable data={data} onEdit={edit} />
        </div>
      </main>
    </Layout>
  );
}
