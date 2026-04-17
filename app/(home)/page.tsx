import { ModeToggle } from "@/components/ModeToggle";
import { SignIn } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <>
      <SignIn />
      <ModeToggle />
    </>
  );
}
