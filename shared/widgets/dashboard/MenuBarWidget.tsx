import MenuBar from "@/components/MenuBar";
import Image from "next/image";

export default function MenuBarWidget() {
  return (
    <>
      <div className="flex items-center justify-center gap-2">
        <Image
          src={"/branding/brand-logo.png"}
          alt={"dd"}
          width={32}
          height={32}
          className="w-8 sm:w-10"
        ></Image>
        <span className="hidden text-black lg:block">BrightPath</span>
      </div>
      <MenuBar></MenuBar>
    </>
  );
}
