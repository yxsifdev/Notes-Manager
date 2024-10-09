import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
async function UserName() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      {session ? (
        <div className="text-[#888]">@{session.user?.name}</div>
      ) : (
        <div>No hay sesión iniciada</div>
      )}
    </div>
  );
}

export default UserName;
