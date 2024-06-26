import Videos from "@/components/Videos";
import React from "react";

export default function page({ params }: { params: { keyword: string } }) {
  const decodeKeyword = decodeURIComponent(params.keyword);
  return (
    <div>
      <p>
        <strong>{decodeKeyword}</strong>검색 결과입니다.
      </p>
      <Videos params={params} />
    </div>
  );
}
