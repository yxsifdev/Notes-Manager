import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
async function HeaderComponent() {
  const session = await getServerSession(authOptions);

  return (
    <header className="flex items-center justify-between py-4">
      <div className="flex items-center">
        <Link href="/" className="mr-10 text-3xl font-bold text-white">
          Notes Manager
        </Link>
        <nav>
          <ul className="flex items-center gap-5">
            <li>
              <Link
                href="/"
                className="text-sm transition text-text_color hover:text-white"
              >
                GitHub
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-sm transition text-text_color hover:text-white"
              >
                Discord
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-sm transition text-text_color hover:text-white"
              >
                Others
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {session ? (
        <div className="flex items-center gap-5">
          <Link href="/dashboard/profile" className="text-sm text-text_color">
            @{session.user?.name}
          </Link>
          <Link
            href="/dashboard"
            className="px-3 py-2 text-sm font-medium transition bg-[#3a853f] rounded hover:bg-[#3a853f]/90"
          >
            Dashboard
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Link
            href="/auth/login"
            className="px-3 py-2 text-sm font-medium transition bg-transparent border rounded border-card_border hover:bg-card_bg"
          >
            Acceso
          </Link>
          <Link
            href="/auth/register"
            className="px-3 py-2 text-sm font-medium transition rounded bg-button_bg hover:bg-button_bg/90"
          >
            Registrarse
          </Link>
        </div>
      )}
    </header>
  );
}

export default HeaderComponent;
