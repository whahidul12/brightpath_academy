import menuItems from "@/constants/menuItems";
import Image from "next/image";
import Link from "next/link";

export default function MenuBar() {
  return (
    <>
      {menuItems.map((category, index) => (
        <div key={index}>
          <span>{category.title}</span>
          {category.items.map((item, index) => (
            <Link href={item.href || "/"} key={index}>
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
