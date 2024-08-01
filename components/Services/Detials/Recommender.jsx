// pages/Recommender.js
import Image from "next/image";
import noimg from "@/image/noimg.svg";
import moment from "moment/moment";
import Link from "next/link";
export default function Recommender({ allFixedServices }) {
  //   console.log(allFixedServices);
  return (
    <div className="w-full">
      <h1 className="text-xl font-bold mb-4">Recommender for you</h1>
      <ul>
        {allFixedServices?.slice(0, 4)?.map((item) => (
          <li key={item.id} className="flex items-center mb-4">
            <div className="w-20 h-20 relative mr-4">
              <Image
                src={item?.image_url ? item?.image_url : noimg}
                alt={item.title}
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
            <div className="flex-1 min-w-0">
              <Link
                href="/services"
                className="text-blue-600 text-md font-semibold block truncate"
              >
                {item.title}
              </Link>
              <div className="text-gray-600 text-sm w-full block">
                <div className="truncate">{item?.description}</div>
              </div>
              <p className="text-gray-600 text-sm">
                {moment(item?.created_at).format("DD MMM")}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
