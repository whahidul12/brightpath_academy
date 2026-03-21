import Image from "next/image";
import brandLogo from "@/assets/brand/brand-logo.png";
export default function Navbar() {
  return (
    <>
      <Image
        src={brandLogo}
        alt={"brand-logo"}
        className="h-20 w-20 rounded-full"
      ></Image>
      <h1 className="bg-red-500">navbar</h1>
    </>
  );
}
