import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

export function Header() {
  return (
    <header className="border-b py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-primary">
          Pokémon Explorer
        </Link>
        <ModeToggle />
      </div>
    </header>
  );
}
