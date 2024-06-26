"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import VideoCard from "./VideoCard";
import { Video } from "@/types/videoTypes";
import Youtube from "@/utils/youtube";

export default function Videos({ params }: { params: { keyword: string } }) {
  const { keyword } = useParams<{ keyword: string }>();
  const decodeKeyword = decodeURIComponent(params.keyword);

  const {
    isLoading,
    error,
    data: videos,
  } = useQuery<Video[]>({
    queryKey: ["videos", decodeKeyword],
    queryFn: () => {
      const youtube = new Youtube();
      return youtube.search(decodeKeyword as string);
    },
  });

  const {
    isLoading: isLoadingTrend,
    error: errorTrend,
    data: videosTrend,
  } = useQuery<Video[]>({
    queryKey: ["videos"],
    queryFn: () => {
      const youtube = new Youtube();
      return youtube.mostPopular();
    },
  });

  return (
    <div>
      <div>
        <p>{keyword ? `${decodeKeyword}` : "핫트렌드"}</p>
        {isLoading && <div>로딩중입니다.</div>}
        {error && <p>에러가 발생했습니다.</p>}
        {keyword ? (
          <div>
            {videos && (
              <ul>
                {videos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </ul>
            )}
          </div>
        ) : (
          <div>
            {videosTrend && (
              <ul>
                {videosTrend.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
