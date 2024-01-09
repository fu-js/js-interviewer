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
          <TableHead>Decision</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((candidate: any) => (
          <TableRow key={candidate.id}>
            <TableCell className="font-medium">
              {candidate.fullName}
            </TableCell>
            <TableCell>{candidate.department.name}</TableCell>
            <TableCell>{candidate.decision}</TableCell>
            <TableCell>{candidate.status}</TableCell>
            <TableCell className="text-right">
              <EditButton candidate={candidate} onEdit={onEdit} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
