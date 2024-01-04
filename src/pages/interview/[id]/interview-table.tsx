import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditButton from "./edit-button";

export default function ({ data, onEdit }: any) {
  if (!data) return null;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Dept</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((interviewee: any) => (
          <TableRow key={interviewee.id}>
            <TableCell className="font-medium">{interviewee.name}</TableCell>
            <TableCell>
              {interviewee.department.name}
            </TableCell>
            <TableCell>{interviewee.decision}</TableCell>
            <TableCell className="text-right">
              <EditButton interviewee={interviewee} onEdit={onEdit} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
