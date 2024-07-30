import SubCategoryDetial from "@/components/Services/Detials/SubCategoryDetial";
import React from "react";

export default function page({ params }) {
  return (
    <div>
      <SubCategoryDetial paramsID={params.id} />
    </div>
  );
}
