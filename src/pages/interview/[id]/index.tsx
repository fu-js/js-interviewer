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

let metadata = [
  { title: "Mã số sinh viên:", content: "HE190182" },
  {
    title: "Link Facebook:",
    content: "https://www.facebook.com/viet.buiquoc.284?mibextid=ZbWKwL",
  },
  {
    title: "Chuyên ngành học của bạn là gì?",
    content: "Công nghệ thông tin",
  },
  {
    title: "Bạn hãy miêu tả bản thân bằng 3 từ:",
    content: "Thích Nhật Bản",
  },
  {
    title:
      "Bạn có sở thích hay tài năng đặc biệt nào không? Đừng ngần ngại khoe với chúng mình những thế mạnh hay tài lẻ của bạn nhé, biết đâu đó là những điểm cộng rất lớn đấy!",
    content:
      "Mình khá thích Nhật, nếu không vì bác Yên mất giá là mình đi rồi 😥",
  },
  {
    title: "Lý do bạn muốn tham gia vào JS Club là gì?",
    content: "Học hỏi là chính, kiếm drl là phụ :3",
  },
  {
    title:
      "Bạn có thể gửi chúng mình 1 tấm ảnh của mình ở bên dưới để chúng mình có thể dễ dàng nhận ra bạn được không?",
    content:
      "https://drive.google.com/open?id=132Ulu02ssMrSDCzZv74-OP7ci-Ad9iTl",
  },
  { title: "Bạn muốn ứng tuyển vào ban nào", content: "Ban Chuyên môn" },
  {
    title:
      "Tại sao bạn lại lựa chọn trở thành thành viên ban Chuyên môn? Điều gì khiến bạn cảm thấy phù hợp tại vị trí này?",
    content: "Mình học CNTT và cũng có biết 1 chút tiếng Nhật",
  },
  {
    title: "Bạn muốn đăng ký ban chuyên môn chuyên về mảng gì nhỉ?",
    content: "Cả 2",
  },
  {
    title:
      "Cho chúng mình biết nhiều hơn và chi tiết hơn những kinh nghiệm và kỹ năng bạn có nhé",
    content: "Từng học xong N4 (từ năm lớp 10 😥)",
  },
];

let interviewees = [
  {
    id: 1,
    name: "Trịnh Phạm Đoan Trang",
    phoneNumber: "0123456789",
    department: {
      id: 1,
      name: "Ban Chuyen Mon",
    },
    metadata: metadata,
    decision: Decision.PASS,
  },
  {
    id: 2,
    name: "Nguyễn Thị Thanh Huyền",
    phoneNumber: "0123456789",
    department: {
      id: 1,
      name: "Ban Chuyen Mon",
    },
    metadata: metadata,
    decision: Decision.CONSIDERING,
  },
  {
    id: 3,
    name: "Vũ Lê Băng Tâm",
    phoneNumber: "0123456789",
    department: {
      id: 1,
      name: "Ban Chuyen Mon",
    },
    metadata: metadata,
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

    // const newData = [
    //   ...data,
    //   {
    //     ...interviewee,
    //     id: interviewee.length + 1,
    //   },
    // ];
    // setData(newData);

    setTimeout(() => {
      setIsInterviewing(true);
    }, 1000);
  };

  const submitNote = (interviewee: any) => {};

  // interview load
  const router = useRouter();
  const deskId = router.query.id as string;
  const { data: response, isLoading } = useSWR(
    `/api/desk/${deskId}/interviewing`,
    fetcher,
    {
      refreshInterval: 1000,
    }
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
          <Interviewing
            data={response.data}
            onDone={doneInterviewing}
            onNoteSubmit={submitNote}
          />
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
