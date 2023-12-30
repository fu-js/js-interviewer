import BackButton from "@/components/custom/back-button";
import If from "@/components/custom/if";
import Layout from "@/components/custom/layout";
import { ModeToggle } from "@/components/custom/mode-toggle";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import Interviewing from "./interviewing";
import InterviewTable from "./interview-table";

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
  const [isInterviewing, setIsInterviewing] = useState(true);

  const doneInterviewing = () => {
    setIsInterviewing(false);
    setTimeout(() => {
      setIsInterviewing(true);
    }, 1000);
  };

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
        <If condition={!isInterviewing}>
          <div className="border flex rounded-lg p-4 border-dashed border-border justify-center items-center">
            <div className="flex gap-2 text-muted-foreground py-5">
              <ReloadIcon className="mr-2 -mt-1 h-10 w-10 animate-spin" />
              <p className="text-2xl">Awating assignment</p>
            </div>
          </div>
        </If>
        <If condition={isInterviewing}>
          <Interviewing onDone={doneInterviewing} />
        </If>
        <h1 className="text-4xl text-center p-5 font-bold">Interview table</h1>
        <div className="border rounded-lg overflow-hidden">
          <InterviewTable data={invoices} />
        </div>
      </main>
    </Layout>
  );
}
