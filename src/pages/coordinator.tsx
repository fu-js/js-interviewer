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
import { useToast } from "@/components/ui/use-toast";
import requestBackend from "@/lib/requestBackend";
import useFetch from "@/lib/useFetch";
import { Dialog } from "@headlessui/react";
import { PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const interviewDesk = [
  {
    id: 1,
    name: "Ban văn hoá 1",
    department: "Văn hóa",
    status: "Available",
  },
  {
    id: 2,
    name: "Ban văn hóa 2",
    department: "Văn hóa",
    status: "Interviewing",
  },
  {
    id: 3,
    name: "Ban chuyên môn 1",
    department: "Chuyên môn",
    status: "Assigned",
  },
];

export default function Coordinator() {
  const { data: checkedInCandidates, mutate: reloadCheckedInCandidates } =
    useFetch(`/coordinator/checked-in`, {
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
    const filteredDesk = interviewDesk.filter((desk: any) =>
      selectedDepartment.toLowerCase().includes(desk.department.toLowerCase())
    );
    setSelectedDesk(filteredDesk);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Handle your submission logic here
    // console.log("Selected Candidate: ", selectedCandidate);

    // get selected desk
    const selectedDeskId = event.target.elements[0].value;
    // console.log("Selected Desk: ", selectedDeskId);

    // fetch to add candidate to desk
    // PUT /interview-server/public/v1/coordinator/send-to-interview-desk
    const assign = async (candidate: any) => {
      // PUT to /coordinator/send-to-interview-desk?candidateId=${candidate.id}&interviewDeskId=${selectedDeskId}
      const checkinRes = await requestBackend(
        `/coordinator/send-to-interview-desk?candidateId=${candidate.id}&interviewDeskId=${selectedDeskId}`,
        {},
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
        <div className="lg:flex items-start gap-4">
          <div className="border rounded-lg grow">
            <h3 className="text-center text-2xl font-bold p-3">
              Checked-in Candidates
            </h3>
            <Table>
              <TableHeader className="border-t">
                <TableRow>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Slot Time</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {checkedInCandidates &&
                  checkedInCandidates.data.candidates.map((candidate: any) => (
                    <TableRow key={candidate.id}>
                      <TableCell>{candidate.fullName}</TableCell>
                      <TableCell>{candidate.department.name}</TableCell>
                      <TableCell>{candidate.interviewSlot.slotTime}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-2">
                          <Button
                            className="mx-2"
                            variant="outline"
                            onClick={() => togglePopup(candidate)}
                          >
                            <PlusIcon className="mr-2" />
                            Assign
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total Waiting</TableCell>
                  <TableCell className="text-right">
                    {checkedInCandidates?.data.candidates.length || "---"}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
          <div className="border rounded-lg">
            <h3 className="text-center text-2xl font-bold p-3">
              Interview Desks
            </h3>
            <Table>
              <TableHeader className="border-t">
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {interviewDesk.map((desk: any) => (
                  <TableRow key={desk.id}>
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
          <Dialog
            open={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            className={`fixed flex justify-center items-center inset-0 z-10 overflow-y-auto`}
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            <div
              className={`relative bg-background border rounded-lg max-w-sm p-8`}
            >
              <Dialog.Title className="">Assign Candidate</Dialog.Title>
              <form onSubmit={handleSubmit}>
                <select className="border p-2 rounded w-full text-gray-900 dark:text-gray-100 dark:border-gray-700 dark:bg-gray-700 my-5 focus:outline-border">
                  {selectedDesk &&
                    selectedDesk.map((desk: any) => (
                      <option
                        key={desk.id}
                        value={desk.id}
                        className="cursor-pointer"
                      >
                        {desk.name}
                      </option>
                    ))}
                </select>
                <Button type="submit">Submit</Button>
              </form>
            </div>
          </Dialog>
        )}
      </main>
    </Layout>
  );
}
