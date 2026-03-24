import Image from "next/image";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between">
      {/*Search Bar */}
      <div className="hidden lg:flex">
        <Image
          src="/icons/search.png"
          alt="search-icon"
          width={20}
          height={20}
          className="w-7"
        />
        <input type="text" placeholder="Search..." />
      </div>
      {/*ICONS and USER */}
      <div className="flex items-center justify-end gap-2">
        <div className="flex items-center justify-center rounded-lg bg-white p-1">
          <Image
            src="/icons/message.png"
            alt="message-icon"
            width={20}
            height={20}
            className="w-7 cursor-pointer"
          />
        </div>
        <div className="flex items-center justify-center rounded-lg bg-white p-1">
          <Image
            src="/icons/announcement.png"
            alt="announcement-icon"
            width={20}
            height={20}
            className="w-7 cursor-pointer"
          />
        </div>
        <div className="flex flex-col">
          <span>Name</span>
          <span>Name</span>
        </div>
      </div>
    </div>
  );
}
