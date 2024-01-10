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
import { PlusIcon, PersonIcon } from "@radix-ui/react-icons";

let checkedInCandidates = [{
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

const interviewDesk = [
  {
    "id": 1,
    "name": "Ban văn hoá 1",
    "department": "Văn hóa",
    "status": "Available"
  },
  {
    "id": 2,
    "name": "Ban văn hóa 2",
    "department": "Văn hóa",
    "status": "Interviewing"
  },
  {
    "id": 3,
    "name": "Ban chuyên môn 1",
    "department": "Chuyên môn",
    "status": "Assigned"
  },
]

export default function Coordinator() {
  // duplicate data for testing 10 rows
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
            <h3 className="text-center text-2xl font-bold p-5">
              Checked-in Candidates
            </h3>
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
                          <PlusIcon />
                          Assign
                      </Button>
                      <Button className="mx-2">
                          <PersonIcon />
                          View Profile
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              {/* <TableFooter>
                <TableRow>
                  <TableCell colSpan={4}>Total Waiting</TableCell>
                  <TableCell className="text-right">{checkedInCandidates.length}</TableCell>
                </TableRow>
              </TableFooter> */}
            </Table>
          </div>
          <div className="border rounded-lg grow">
            <h3 className="text-center text-2xl font-bold p-5">
              Interview Desks
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {interviewDesk.map((desk) => (
                  <TableRow key={desk.id}>
                    <TableCell>{desk.id}</TableCell>
                    <TableCell>{desk.name}</TableCell>
                    <TableCell>{desk.department}</TableCell>
                    <TableCell>{desk.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </Layout>
  );
}
