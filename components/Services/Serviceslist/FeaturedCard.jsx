import Image from "next/image";
import noimg from "@/image/noImg.svg";
import moment from "moment";
import Link from "next/link";

const FeaturedCard = ({ allService }) => {
  // console.log(allService);
  return (
    <div className="w-[300px] rounded overflow-hidden shadow-lg border border-gray-200">
      <div className="relative">
        <Image
          src={allService?.image_urls[0] ?? noimg}
          alt={allService?.image_urls}
          className="w-full h-[200px]"
          width={200}
          height={200}
        />
        {allService?.is_featured && (
          <div className="absolute top-0 left-0 bg-[#FFCE58] text-black px-2 py-1 text-sm font-semibold">
            Featured
          </div>
        )}
        <div className="absolute bottom-0 right-0 bg-[#FFCE58] text-black px-2 py-1 text-sm font-semibold">
          {allService?.fixed_price} Rs
        </div>
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{allService?.title}</div>
        <p className="text-gray-700 text-base line-clamp-2">
          {allService?.service?.description}
        </p>
      </div>
      <hr className="border-black" />
      <div className="px-6 pt-4 pb-2 flex justify-between items-center">
        <span className="text-gray-600 text-sm">
          {moment(allService?.created_at).fromNow()}
        </span>
        <Link href={`/services/sub-category/detial/${allService?.id}`}>
          <button className="bg-[#FFCE58] text-black px-4 py-2 rounded flex items-center">
            Detail
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedCard;
