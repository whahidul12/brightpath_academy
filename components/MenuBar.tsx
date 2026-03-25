import menuItems from "@/constants/menuItems";
import Image from "next/image";
import Link from "next/link";

export default function MenuBar() {
  return (
    <>
      {menuItems.map((category) => (
        <div
          className="flex flex-col items-center gap-2 lg:items-start lg:pl-4"
          key={category.title}
        >
          <span className="mt-4 font-bold">{category.title}</span>
          {category.items.map((item) =>
            item.label !== "Logout" ? (
              <Link
                className="flex w-fit items-center gap-2 lg:w-full"
                href={item.href || "/"}
                key={item.label}
              >
                <div className="flex items-center justify-center rounded-lg border border-gray-600 bg-white p-1 lg:border-none">
                  <Image
                    src={item.icon}
                    alt={item.label}
                    height={20}
                    width={20}
                  ></Image>
                </div>
                <span className="hidden lg:block">{item.label}</span>
              </Link>
            ) : (
              <Link
                className="flex w-fit items-center gap-2 rounded-lg lg:w-full lg:bg-red-400 lg:p-2"
                href={item.href || "/"}
                key={item.label}
              >
                <div className="flex items-center justify-center rounded-lg bg-red-300 p-1.5 lg:p-1">
                  <Image
                    src={item.icon}
                    alt={item.label}
                    height={20}
                    width={20}
                  ></Image>
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
