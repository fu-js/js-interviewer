import BackButton from "@/components/custom/back-button";
import ConfirmButton from "@/components/custom/confirm-button";
import Layout from "@/components/custom/layout";
import { ModeToggle } from "@/components/custom/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import requestBackend from "@/lib/requestBackend";
import useFetch from "@/lib/useFetch";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRef, useState } from "react";

export default function Checkin() {
  const [keyword, setKeyword] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const {
    data: checkinData,
    isLoading: isLoadingCheckinData,
    mutate: reloadCheckinData,
  } = useFetch(`/checkin/`, {
    page: 0,
    limit: 100,
    keyword,
    departmentId: [1, 2, 3, 4, 5],
  });

  const searchByKeyword = () => {
    setKeyword(inputRef.current?.value || "");
  };
  const getStudentCode = (candidate: any) => {
    if (!candidate) return "Not found";
    const metadata = candidate.metadata;
    const json = JSON.parse(metadata);
    for (const item of json) {
      if (item.title === "Mã số sinh viên:") {
        return item.content;
      }
    }
  };

  const enterToSearch = (e: any) => {
    if (e.keyCode === 13) {
      searchByKeyword();
    }
  };
  const checkin = async (candidate: any) => {
    const checkinRes = await requestBackend(
      `/checkin/update-candidate-status`,
      { candidateIds: candidate.id, candidateStatus: "CHECKED_IN" },
      { method: "POST" }
    );
    const status = checkinRes.status;
    if (status === 200) {
      toast({ title: "Checkin successfully" });
      reloadCheckinData();
    } else {
      toast({ title: "Checkin failed" });
    }
  };

  return (
    <Layout>
      <main className="p-5">
        <div className="absolute right-2 top-2">
          <ModeToggle />
        </div>
        <BackButton href="/" />
        <h1 className="text-4xl text-center p-5 font-bold">Checkin table</h1>
        <div className="flex gap-4 py-4">
          <Input
            type="text"
            placeholder="Search for anything..."
            className=""
            defaultValue={keyword}
            ref={inputRef}
            onKeyDown={enterToSearch}
          />
          <Button onClick={searchByKeyword}>Search</Button>
        </div>
        {isLoadingCheckinData && (
          <div className="border flex rounded-lg p-4 border-dashed border-border justify-center items-center">
            <div className="flex gap-2 text-muted-foreground py-5">
              <ReloadIcon className="mr-2 -mt-1 h-10 w-10 animate-spin" />
              <p className="text-2xl">Loading</p>
            </div>
          </div>
        )}
        {checkinData && (
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Student code</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {checkinData.data.candidates.map((candidate: any) => (
                  <TableRow key={candidate.id}>
                    <TableCell className="font-medium">
                      {candidate.fullName}
                    </TableCell>
                    <TableCell>{candidate.department.name}</TableCell>
                    <TableCell>{getStudentCode(candidate)}</TableCell>
                    <TableCell className="text-right">
                      <ConfirmButton
                        actionName="Check in"
                        onConfirm={() => checkin(candidate)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
    </Layout>
  );
}
