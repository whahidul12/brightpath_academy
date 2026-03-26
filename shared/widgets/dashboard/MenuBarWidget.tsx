import MenuBar from "@/components/allDashboardComp/MenuBar";
import Image from "next/image";

export default function MenuBarWidget() {
  return (
    <div className="border-r border-r-gray-500 lg:border-none">
      <div className="flex items-center justify-center gap-2 p-3 lg:justify-start">
        <Image
          src={"/branding/brand-logo.png"}
          alt={"brand-logo"}
          width={32}
          height={32}
          className="w-8 sm:w-10"
        ></Image>
        <span className="hidden lg:block lg:text-2xl">BrightPath</span>
      </div>
      <MenuBar></MenuBar>
    </div>
  );
}
