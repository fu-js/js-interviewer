import { useState } from "react";
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
import useFetch from "@/lib/useFetch";
import { Dialog } from '@headlessui/react';
import requestBackend from "@/lib/requestBackend";
import { useToast } from "@/components/ui/use-toast";


// let checkedInCandidates = [{
//   "id": 41,
//   "fullName": "Nguyễn Đức Thắng",
//   "department": {
//     "id": 1,
//     "name": "Ban Văn hóa"
//   },
//   "phoneNumber": "945228637",
//   "interviewSlot": {
//     "id": 1,
//     "order": 0,
//     "slotTime": "7h00-9h00"
//   }
// }];

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
  const {
    data: checkedInCandidates,
    isLoading: isLoadingCheckedInCandidates,
    mutate: reloadCheckedInCandidates,
  } = useFetch(`/coordinator/checked-in`, {
    page: 0,
    limit: 100,
    departmentId: [1, 2, 3, 4, 5],
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<any>({});
  const [selectedDesk, setSelectedDesk] = useState<any>([]);

  const { toast } = useToast();

  const togglePopup = (candidate: any) => {
    setIsPopupOpen(!isPopupOpen);
    setSelectedCandidate(candidate);

    const selectedDepartment = candidate.department.name;
    const filteredDesk = interviewDesk.filter((desk: any) => selectedDepartment.toLowerCase().includes(desk.department.toLowerCase()));
    setSelectedDesk(filteredDesk);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Handle your submission logic here
    console.log("Selected Candidate: ", selectedCandidate);

    // get selected desk
    const selectedDeskId = event.target.elements[0].value;
    console.log("Selected Desk: ", selectedDeskId)

    // fetch to add candidate to desk
    // PUT /interview-server/public/v1/coordinator/send-to-interview-desk
    const assign = async (candidate: any) => {
      const checkinRes = await requestBackend(
        `/coordinator/send-to-interview-desk/?candidateIds=${candidate.id}&interviewDeskId=${selectedDeskId}`,
        { method: "PUT" }
      );
      const status = checkinRes.status;
      if (status === 200) {
        toast({ title: "Assign successfully" });
        reloadCheckedInCandidates();
      } else {
        toast({ title: "Assign failed" });
      }
    };


    // assign selected desk to selected candidate
    assign(selectedCandidate);

    setIsPopupOpen(false);
    setSelectedCandidate({});
    setSelectedDesk([]);
  };

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
                {checkedInCandidates && checkedInCandidates.data.candidates.map((candidate: any) => (
                  <TableRow key={candidate.id}>
                    <TableCell>{candidate.id}</TableCell>
                    <TableCell>{candidate.fullName}</TableCell>
                    <TableCell>{candidate.department.name}</TableCell>
                    <TableCell>{candidate.interviewSlot.slotTime}</TableCell>
                    <TableCell>
                      <Button className="mx-2" onClick={() => togglePopup(candidate)}>
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
                {interviewDesk.map((desk: any) => (
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

        {isPopupOpen && (
          <Dialog open={isPopupOpen} onClose={() => setIsPopupOpen(false)} className={`fixed inset-0 z-10 overflow-y-auto`}>
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

            <div className={`relative bg-white dark:bg-gray-800 rounded max-w-sm mx-auto mt-10 p-8`}>
              <Dialog.Title className="text-gray-900 dark:text-gray-100">Assign Candidate</Dialog.Title>
              <form onSubmit={handleSubmit}>
                <select className="border p-2 rounded w-full text-gray-900 dark:text-gray-100 dark:border-gray-700 dark:bg-gray-700">
                  {/* Filter desk with same department.id with selectedCandidate */}
                  
                  {selectedDesk && selectedDesk.map((desk: any) => (
                    <option key={desk.id} value={desk.id}>{desk.name}</option>
                  ))}
                </select>
                <Button type="submit" className="mt-4 bg-blue-500 dark:bg-blue-700 text-white">
                  Submit
                </Button>
              </form>
            </div>
        </Dialog>
        )}
      </main>
    </Layout>
  );
}
