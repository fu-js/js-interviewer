import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditButton from "./edit-button";

export default function ({ data }: any) {
  if (!data) return null;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Dept</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((interviewee: any) => (
          <TableRow key={interviewee.id}>
            <TableCell className="font-medium">{interviewee.name}</TableCell>
            <TableCell className="text-right">{interviewee.dept}</TableCell>
            <TableCell className="text-right">
              <EditButton interviewee={interviewee} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
