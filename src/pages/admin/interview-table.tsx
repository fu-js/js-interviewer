import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditButton from "./edit-button";
import ViewNoteButton from "./view-note-button";

export default function ({ data, decision }: any) {
  if (!data) return null;

  if (decision !== "ALL") {
    data = data.filter((interviewee: any) => interviewee.decision === decision);
  }
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Dept</TableHead>
          <TableHead>Decision</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((interviewee: any, i: any) => (
          <TableRow key={interviewee.id}>
            <TableCell>{i + 1}</TableCell>
            <TableCell className="font-medium">
              {interviewee.fullName}
            </TableCell>
            <TableCell>{interviewee.department.name}</TableCell>
            <TableCell>{interviewee.decision}</TableCell>
            <TableCell className="text-right">
              <EditButton
                interviewee={interviewee}
              />
              <span className="mx-2"></span>
              <ViewNoteButton
                interviewee={interviewee}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
