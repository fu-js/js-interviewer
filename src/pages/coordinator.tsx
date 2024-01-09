import BackButton from "@/components/custom/back-button";
import Layout from "@/components/custom/layout";
import { ModeToggle } from "@/components/custom/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const checkedInCandidates = [{
  "id": 41,
  "fullName": "Nguyễn Đức Thắng",
  "department": {
    "id": 1,
    "name": "Ban Văn hóa"
  },
  "phoneNumber": "945228637",
  "interviewSlot": {
    "id": 1,
    "order": 0,
    "slotTime": "7h00-9h00"
  }
}];

export default function Coordinator() {
  return (
    <Layout>
      <main className="p-5">
        <div className="absolute right-2 top-2">
          <ModeToggle />
        </div>
        <BackButton href="/" />
        <h1 className="text-4xl text-center p-5 font-bold">
          Coordinator table
        </h1>
        <div className="lg:flex gap-4">
          <div className="border rounded-lg grow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Slot Time</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {checkedInCandidates.map((candidate) => (
                  <TableRow key={candidate.id}>
                    <TableCell>{candidate.id}</TableCell>
                    <TableCell>{candidate.fullName}</TableCell>
                    <TableCell>{candidate.department.name}</TableCell>
                    <TableCell>{candidate.interviewSlot.slotTime}</TableCell>
                    <TableCell>
                      <Button className="mx-2">
                          {/* <ChevronLeftIcon /> */}
                          Assign
                      </Button>
                      <Button className="mx-2">
                          {/* <ChevronLeftIcon /> */}
                          View Profile
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4}>Total Waiting</TableCell>
                  <TableCell className="text-right">{checkedInCandidates.length}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
          <div className="grow">
            <div className="border border-dashed h-full rounded-lg"></div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
