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

  const highlightIfInterviewing = (candidate: any) => {
    return candidate.candidateStatus === "CHECKED_IN" ||
      candidate.candidateStatus === "INTERVIEWING"
      ? "bg-muted/60 hover:bg-muted/60"
      : "";
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Dept</TableHead>
          <TableHead>Decision</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right pr-7">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((candidate: any) => (
          <TableRow
            key={candidate.id}
            className={highlightIfInterviewing(candidate)}
          >
            <TableCell className="font-medium">{candidate.fullName}</TableCell>
            <TableCell>{candidate.department.name}</TableCell>
            <TableCell>{candidate.decision}</TableCell>
            <TableCell>{candidate.candidateStatus}</TableCell>
            <TableCell className="text-right">
              <EditButton candidate={candidate} onEdit={onEdit} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
