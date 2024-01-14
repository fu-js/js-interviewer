import Layout from "@/components/custom/layout";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import useFetch from "@/lib/useFetch";
import InterviewTable from "./interview-table";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Department from "@/lib/types/department";
import { getAllDepartmentName } from "@/lib/types/department";
import { isNumberObject } from "util/types";

export default function () {
  const [keyword, setKeyword] = useState("");
  const [departmentList, setDepartmentList] = useState([1, 2, 3, 4, 5]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [decision, setDecision] = useState("ALL");

  const {
    data: candidateData,
    mutate: reloadCandidateData,
  } = useFetch(
    `${process.env.BACKEND_URL}/analysis/`,
    {
      page: 0,
      limit: 100,
      departmentId: departmentList,
      status: "INTERVIEWED",
      keyword,
    },
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
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
      <div className="flex gap-4 py-2 px-8">
            <Input
              type="text"
              placeholder="Search for anything..."
              className=""
              defaultValue={keyword}
              ref={inputRef}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  setKeyword(inputRef.current?.value || "");
                  reloadCandidateData();
                }
              }}
            />
            <Select
              onValueChange={(value) => {
                setDecision(value);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Decision" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All</SelectItem>
                <SelectItem value="NOT_DECIDED">Not Decided</SelectItem>
                <SelectItem value="PASS">Pass</SelectItem>
                <SelectItem value="CONSIDERING">Considering</SelectItem>
                <SelectItem value="FAIL">Fail</SelectItem>
              </SelectContent>
            </Select>
            <Select
              onValueChange={(value) => {
                if (value === "All") {
                  setDepartmentList([1, 2, 3, 4, 5]);
                } else {
                  setDepartmentList([Number(value)]);
                }
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                {getAllDepartmentName().map((key: any) => (
                  <SelectItem key={key} value={Department[key]}>
                    {key}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={() => {
                setKeyword(inputRef.current?.value.trim() || "");
                reloadCandidateData();
              }}
            >Search</Button>
        </div>
      <div className="p-4">
        {candidateData && (
          <div className="mx-4 rounded-xl border border-border">
            <InterviewTable data={candidateData?.data?.candidates} decision={decision} />
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
        <CardTitle>{count || "---"}</CardTitle>
      </CardHeader>
    </Card>
  );
}
