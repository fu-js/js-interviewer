import Layout from "@/components/custom/layout";
import InterviewTable from "./interview-table";

let pastInterviewees = [
  {
    id: 1,
    name: "Trịnh Phạm Đoan Trang",
    dept: "Ban Chuyên môn",
    note: "Đạt",
    status: "Đạt",
  },
  {
    id: 2,
    name: "Nguyễn Thị Thanh Huyền",
    dept: "Ban Chuyên môn",
    note: "Chờ",
    status: "Chờ",
  },
  {
    id: 3,
    name: "Vũ Lê Băng Tâm",
    dept: "Ban Văn hóa",
    note: "Chờ",
    status: "Chờ",
  },
];

export default function () {
  return (
    <Layout>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <h2 className="text-3xl font-bold tracking-tight">Admin</h2>
      </div>
      <div className="p-4">
        <div className="mx-4 rounded-xl border border-border">
          <InterviewTable data={pastInterviewees} />
        </div>
      </div>
    </Layout>
  );
}
