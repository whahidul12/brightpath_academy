import Image from "next/image";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  return (
    <div className="flex h-16 items-center justify-end px-4 sm:px-6 lg:justify-between">
      {/*Search Bar */}
      <div className="hidden gap-3 rounded-full border border-gray-500 bg-transparent p-2 lg:flex">
        <Image
          src="/icons/search.png"
          alt="search-icon"
          width={20}
          height={20}
          className="w-7"
        />
        <input
          type="text"
          placeholder="Search..."
          className="w-3xs border-none outline-none"
        />
      </div>
      {/*ICONS and USER */}
      <div className="flex items-center justify-end gap-6">
        <ModeToggle />
        <div className="flex items-center justify-center rounded-lg bg-white p-1">
          <Image
            src="/icons/message.png"
            alt="message-icon"
            width={20}
            height={20}
            className="w-7 cursor-pointer"
          />
        </div>
        <div className="relative flex items-center justify-center rounded-lg bg-white p-1">
          <Image
            src="/icons/announcement.png"
            alt="announcement-icon"
            width={20}
            height={20}
            className="w-7 cursor-pointer"
          />
          <div className="bg-primary text-primary-foreground absolute -top-3 -right-3 flex h-6 w-6 items-center justify-center rounded-full text-sm">
            22
          </div>
        </div>

        <div className="flex flex-col">
          <span className="">Jhon Doe</span>
          <span className="text-shadow-card-foreground text-right text-xs">
            Admin
          </span>
        </div>
        <div>
          <Image
            src="/icons/avatar.png"
            alt="user-avatar"
            width={40}
            height={40}
            className="w-10 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
