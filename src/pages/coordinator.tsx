import BackButton from "@/components/custom/back-button";
import Layout from "@/components/custom/layout";
import { ModeToggle } from "@/components/custom/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import Status from "@/lib/types/status";
import useFetch from "@/lib/useFetch";
import { Dialog } from "@headlessui/react";
import { PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function Coordinator() {
  const { data: checkedInCandidates, mutate: reloadCheckedInCandidates } =
    useFetch(
      `/coordinator/checked-in`,
      {
        page: 0,
        limit: 100,
        departmentId: [1, 2, 3, 4, 5],
      },
      {
        refreshInterval: 10000,
      }
    );

  const { data: desksData, mutate: reloadDeskData } = useFetch(
    `${process.env.BACKEND_URL}/interview-desk/list-all-interview-desk`,
    {
      status: "FREE",
      departmentId: [1, 2, 3, 4, 5],
    },
    {
      refreshInterval: 10000,
    }
  );

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<any>({});
  const [selectedDesk, setSelectedDesk] = useState<any>([]);

  const { toast } = useToast();

  const togglePopup = (candidate: any) => {
    setIsPopupOpen(!isPopupOpen);
    setSelectedCandidate(candidate);

    const selectedDepartment = candidate.department.name;
    const filteredDesk = desksData.data.filter((desk: any) =>
      selectedDepartment
        .toLowerCase()
        .includes(desk.department.name.toLowerCase())
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
    const assign = async (candidate: any) => {
      // PUT to /coordinator/send-to-interview-desk?candidateId=${candidate.id}&interviewDeskId=${selectedDeskId}
      const checkinRes = await fetch(
        `${process.env.BACKEND_URL}/coordinator/send-to-interview-desk?candidateId=${candidate.id}&interviewDeskId=${selectedDeskId}`,
        {
          method: "PUT",
        }
      );

      const status = checkinRes.status;
      if (status === 200) {
        toast({ title: "Assign success" });
        reloadCheckedInCandidates();
        reloadDeskData();
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
                  <TableHead>Interview Desk</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {checkedInCandidates &&
                  checkedInCandidates?.data?.candidates?.map((candidate: any) => (
                    <TableRow key={candidate.id}>
                      <TableCell>
                        <b>{candidate.fullName}</b>
                      </TableCell>
                      <TableCell>{candidate.department.name}</TableCell>
                      <TableCell>{candidate.interviewSlot.slotTime}</TableCell>
                      <TableCell>{candidate.interviewDesk || "---"}</TableCell>
                      <TableCell>{candidate.status}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-2">
                          {candidate.status === Status.CHECKED_IN && (
                            <Button
                              className="mx-2"
                              variant="outline"
                              onClick={() => togglePopup(candidate)}
                            >
                              <PlusIcon className="mr-2" />
                              Assign
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              {/* <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total Waiting</TableCell>
                  <TableCell className="text-right">
                  {checkedInCandidates?.data.candidates.length || "---"}
                  </TableCell>
                </TableRow>
              </TableFooter> */}
            </Table>
          </div>
          <div className="border rounded-lg max-h-[60vh] overflow-y-auto">
            <h3 className="text-center text-2xl font-bold p-3">
              Free Interview Desks
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
                {desksData &&
                  desksData.data?.map((desk: any) => (
                    <TableRow key={desk.id}>
                      <TableCell>{desk.name}</TableCell>
                      <TableCell>{desk.department.name}</TableCell>
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
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-60" />
            <div
              className={`relative bg-background border rounded-lg max-w-md p-8`}
            >
              <Dialog.Title className="font-semibold">
                Assign Candidate
              </Dialog.Title>
              <form onSubmit={handleSubmit}>
                <select className="border p-3 rounded-lg w-full text-gray-900 dark:text-gray-100 dark:border-gray-700 dark:bg-gray-700 my-5 focus:outline-muted">
                  {selectedDesk &&
                    selectedDesk.map((desk: any) => (
                      <option
                        key={desk.id}
                        value={desk.id}
                        className="cursor-pointer"
                      >
                        {desk.name + " : " + desk.department.name}
                      </option>
                    ))}
                </select>
                <p className="text-muted-foreground pb-3">
                  *Please check the table carefully
                </p>
                <Button type="submit" className="w-full">
                  Assign
                </Button>
              </form>
            </div>
          </Dialog>
        )}
      </main>
    </Layout>
  );
}
