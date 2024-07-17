import Videos from "@/components/Videos";
import React from "react";

export default function page({ params }: { params: { keyword: string } }) {
  const decodeKeyword = decodeURIComponent(params.keyword);
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <Videos params={params} />
    </div>
  );
}
