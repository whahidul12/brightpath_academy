import Image from "next/image";
import FormModal from "../microComponents/FormModal";
import { CardType } from "@/shared/types/types";

export default function SingleUserCard({ type }: { type: CardType }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Image
          src={
            "https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200"
          }
          alt="teacher-image"
          width={0}
          height={0}
          sizes="100vw"
          className="h-36 w-36 rounded-lg object-cover"
        />
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Name Of Mine</h1>
            <FormModal
              table={type}
              type="update"
              data={{ username: "myname", email: "myname@gmail.com" }}
            />
          </div>
          <p className="text-gray-500">
            Lorem one two thre sgjo sjops sjgs gspjs gspg psg spgsg spg spggspgg
            psg spgsg spgs gspg sp
          </p>
        </div>
      </div>
      <div>
        <ul className="flex flex-wrap gap-4">
          <li className="flex items-center justify-start gap-2">
            <Image src={"/icons/result.png"} alt="" width={24} height={24} />
            January 2025
          </li>
          <li className="flex items-center justify-start gap-2">
            <Image src={"/icons/result.png"} alt="" width={24} height={24} />
            thisismy@gmail.com
          </li>
          <li className="flex items-center justify-start gap-2">
            <Image src={"/icons/result.png"} alt="" width={24} height={24} />
            01839343896
          </li>
          <li className="flex items-center justify-start gap-2">
            <Image src={"/icons/result.png"} alt="" width={24} height={24} />
            B+
          </li>
        </ul>
      </div>
    </div>
  );
}
