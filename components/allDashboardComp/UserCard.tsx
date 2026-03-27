import Image from "next/image";

export default function UserCard({ userType }: { userType: string }) {
  return (
    <div className="odd:bg-primary even:bg-secondary odd:text-primary-foreground even:text-secondary-foreground min-w-32 flex-1 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <span>2025/26</span>
        <Image
          src="/icons/more.png"
          alt="more-icon"
          width={30}
          height={10}
          className="w-fit"
        />
      </div>
      <h1>12345</h1>
      <h2>{userType}</h2>
    </div>
  );
}
