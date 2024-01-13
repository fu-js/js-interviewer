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

export default function ({ data }: any) {
  if (!data) return null;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Dept</TableHead>
          <TableHead>Decision</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((interviewee: any) => (
          <TableRow key={interviewee.id}>
            <TableCell className="font-medium">
              {interviewee.fullName}
            </TableCell>
            <TableCell>{interviewee.department.name}</TableCell>
            <TableCell>{interviewee.decision}</TableCell>
            <TableCell className="text-right">
              <EditButton
                interviewee={interviewee}
              />
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
