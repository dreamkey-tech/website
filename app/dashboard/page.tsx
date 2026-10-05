import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Dream Key",
  description: "Your personalized real estate dashboard.",
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 bg-surface-container-low px-margin-mobile md:px-margin">
      <div className="max-w-[1320px] mx-auto bg-surface-clean rounded-xl p-space-xl shadow-sm border border-surface-container-highest">
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-4">
          Welcome to your Dashboard
        </h1>
        <p className="font-body-default text-body-default text-secondary">
          This is your personal dashboard. More features coming soon!
        </p>
      </div>
    </div>
  );
}
