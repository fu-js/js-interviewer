import BackButton from "@/components/custom/back-button";
import Layout from "@/components/custom/layout";
import { ModeToggle } from "@/components/custom/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export default function Interview() {
  return (
    <Layout>
      <main className="p-5">
        <div className="absolute right-2 top-2">
          <ModeToggle />
        </div>
        <BackButton href="/interview" />
        <h1 className="text-4xl text-center p-5 font-bold">
          Ongoing Interviewee
        </h1>
        <div className="border flex rounded-lg overflow-hidden p-4 border-dashed border-border">
          <div className="">
            <div className="">
              <img
                src="https://picsum.photos/900"
                className="rounded-lg w-96 h-96"
              />
              <p className="text-lg font-medium p-2 text-center">
                Trịnh Phạm Đoan Trang
              </p>
              <p className="text-muted-foreground p-1 text-center">
                Ban Chuyên môn
              </p>
            </div>
          </div>
          <div className="grow px-4">
            <div className="">
              <Label htmlFor="note">Your note</Label>
              <Textarea placeholder="Enter note" id="note" rows={8} />
              <p className="text-sm text-muted-foreground">
                You can drag the bottom right corner to resize the textarea.
              </p>
              <RadioGroup defaultValue="Chờ" className="flex py-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Đạt" id="r1" />
                  <Label htmlFor="r1">Đạt</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Chờ" id="r2" />
                  <Label htmlFor="r2">Chờ</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Loại" id="r3" />
                  <Label htmlFor="r3">Loại</Label>
                </div>
              </RadioGroup>
              <Button className="block w-full">
                <span>Submit</span>
              </Button>
            </div>
          </div>
        </div>
        <h1 className="text-4xl text-center p-5 font-bold">Interview table</h1>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">
                    {invoice.invoice}
                  </TableCell>
                  <TableCell>{invoice.paymentStatus}</TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell className="text-right">
                    {invoice.totalAmount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </Layout>
  );
}
