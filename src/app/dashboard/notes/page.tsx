import CardNotes from "@/components/dashboard/notes/CardNotes";
import HeaderComponent from "@/components/ui/Header";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

async function DashboardNotesPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>Por favor, inicia sesión para ver tus notas.</div>;
  }
  return (
    <>
      <HeaderComponent />
      <CardNotes />
    </>
  );
}

export default DashboardNotesPage;
