// pages/Recommender.js
import Image from "next/image";
import noimg from "@/image/noimg.svg";

const recommendations = [
  {
    id: 1,
    title: "Fane Repairing",
    date: "10 August",
    imageSrc: "noimg",
  },
  {
    id: 2,
    title: "Machine Repairing",
    date: "2 August",
    imageSrc: "noimg",
  },
  {
    id: 3,
    title: "Electric scooter Repairing",
    date: "3 July",
    imageSrc: "noimg",
  },
  {
    id: 4,
    title: "Home Wiring Repairing",
    date: "19 June",
    imageSrc: "noimg",
  },
  //   { id: 5, title: "Ac Repairing", date: "1 June", imageSrc: "noimg" },
  //   {
  //     id: 6,
  //     title: "Meter Repairing",
  //     date: "16 April",
  //     imageSrc: "noimg",
  //   },
];

export default function Recommender() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Recommender for you</h1>
      <ul>
        {recommendations.map((item) => (
          <li key={item.id} className="flex items-center mb-4">
            <div className="w-20 h-20 relative mr-4">
              <Image
                src={noimg}
                alt={item.title}
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
            <div>
              <a href="#" className="text-blue-600 text-md font-semibold">
                {item.title}
              </a>
              <p className="text-gray-600 text-sm">{item.date}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
