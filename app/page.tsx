import { redirect } from "next/navigation";

// The corporate kerchanshegroup.com site is out of scope for this build (Section 6).
// This scaffold starts at the Agriculture hub, nested under Sectors > Agriculture.
export default function RootPage() {
  redirect("/agriculture");
}
