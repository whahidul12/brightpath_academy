import menuItems from "@/constants/menuItems";
import Image from "next/image";
import Link from "next/link";

export default function MenuBar() {
  return (
    <>
      {menuItems.map((category) => (
        <div className="flex flex-col gap-2" key={category.title}>
          <span>{category.title}</span>
          {category.items.map((item) => (
            <Link
              className="flex items-center gap-2"
              href={item.href || "/"}
              key={item.label}
            >
              <Image
                src={item.icon}
                alt={item.label}
                height={20}
                width={20}
              ></Image>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      ))}
    </>
  );
}
