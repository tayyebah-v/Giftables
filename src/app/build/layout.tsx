import { ClientBuildLayout } from "@/components/build/ClientBuildLayout";

export default function BuildLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientBuildLayout>{children}</ClientBuildLayout>;
}
