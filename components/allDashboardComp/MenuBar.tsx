import menuItems from "@/constants/menuItems";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

export default async function MenuBar() {
  const user = await currentUser();
  const role = user?.publicMetadata.role;

  return (
    <>
      {menuItems.map((category) => (
        <div
          className="flex flex-col items-center gap-2 lg:items-start lg:pl-4"
          key={category.title}
        >
          <span className="mt-4 font-bold">{category.title}</span>
          {category.items.map(
            (item) =>
              item.visible.includes(role) && (
                <Link
                  key={item.label}
                  href={item.href || "/"}
                  className={`hover:bg-primary/10 flex w-fit items-center gap-2 rounded-lg py-2 md:px-2 lg:w-full ${
                    item.label === "Logout" &&
                    "text-white duration-200 hover:bg-red-500 lg:bg-red-400"
                  }`}
                >
                  <div className="flex items-center justify-center rounded-lg border border-gray-600 bg-white p-1 lg:border-none">
                    <Image
                      src={item.icon}
                      alt={item.label}
                      height={20}
                      width={20}
                    />
                  </div>
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              ),
          )}
        </div>
      ))}
    </>
  );
}
