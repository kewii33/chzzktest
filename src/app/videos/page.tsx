import Videos from "@/components/Videos";
import React from "react";

export default function page({ params }: { params: { keyword: string } }) {
  return (
    <div>
      <Videos params={params} />
    </div>
  );
}
