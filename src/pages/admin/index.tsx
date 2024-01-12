import Layout from "@/components/custom/layout";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useFetch from "@/lib/useFetch";
import InterviewTable from "./interview-table";

export default function () {
  const { data: candidateData } = useFetch(
    `${process.env.BACKEND_URL}/analysis/`,
    {
      page: 0,
      limit: 100,
      departmentId: [1, 2, 3, 4, 5],
      status: "INTERVIEWED",
    },
    { revalidateOnFocus: false }
  );

  const useCount = (decision: string) => {
    const { data } = useFetch(
      `${process.env.BACKEND_URL}/analysis/count-by-decision`,
      { status: decision },
      { revalidateOnFocus: false }
    );
    return data;
  };

  const notDecidedData = useCount("NOT_DECIDED");
  const acceptedData = useCount("PASS");
  const consideringData = useCount("CONSIDERING");
  const rejectedData = useCount("FAIL");

  return (
    <Layout>
      <div className="flex-1 space-y-4 px-8 pt-6">
        <h2 className="text-3xl font-bold tracking-tight">Analysis</h2>
      </div>
      <div className="p-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {notDecidedData && (
          <Count title="Not Decided" count={notDecidedData.data} />
        )}
        {acceptedData && <Count title="Accepted" count={acceptedData.data} />}
        {consideringData && (
          <Count title="Considering" count={consideringData.data} />
        )}
        {rejectedData && <Count title="Rejected" count={rejectedData.data} />}
      </div>
      <div className="p-4">
        {candidateData && (
          <div className="mx-4 rounded-xl border border-border">
            <InterviewTable data={candidateData.data.candidates} />
          </div>
        )}
      </div>
    </Layout>
  );
}

function Count({ title, count }: { title: string; count: number }) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle>{count}</CardTitle>
      </CardHeader>
    </Card>
  );
}
