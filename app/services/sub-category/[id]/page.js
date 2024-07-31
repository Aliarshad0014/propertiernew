import SubCategory from "@/components/Services/Sub-Services/SubCategory";
import React from "react";

export default function page({ params }) {
  return (
    <div>
      <SubCategory paramsID={params.id} />
    </div>
  );
}
