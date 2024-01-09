import Layout from "@/components/custom/layout";
import useFetch from "@/lib/useFetch";
import InterviewTable from "./interview-table";

export default function () {
  const {
    data: data,
    isLoading: isLoadingCandidates,
    mutate,
  } = useFetch(`${process.env.BACKEND_URL}/analysis/`, {
    page: 0,
    limit: 100,
    departmentId: [1, 2, 3, 4, 5],
    status: "INTERVIEWED",
  });

  return (
    <Layout>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <h2 className="text-3xl font-bold tracking-tight">Admin</h2>
      </div>
      <div className="p-4">
        {data && (
          <div className="mx-4 rounded-xl border border-border">
            <InterviewTable data={data.data.candidates} />
          </div>
        )}
      </div>
    </Layout>
  );
}
