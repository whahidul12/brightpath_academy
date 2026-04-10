import Image from "next/image";

export default function SingleUserStates({
  type,
  data,
  image,
}: {
  type: string;
  data: string;
  image: string;
}) {
  return (
    <div className="bg-card text-card-foreground flex min-w-40 flex-1 items-start justify-start gap-4 rounded-lg p-4">
      <div>
        <Image
          src={`/icons/${image}.png`}
          alt={type}
          width={24}
          height={24}
          className="h-9 w-9"
        />
      </div>
      <div className="">
        <h2 className="text-2xl font-semibold">{data}</h2>
        <p className="text-gray-600">{type}</p>
      </div>
    </div>
  );
}
