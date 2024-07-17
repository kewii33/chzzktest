"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import VideoCard from "./VideoCard";
import { Video } from "@/types/videoTypes";
import Youtube from "@/utils/youtube";
import {
  useBlockDataByUserIdQuery,
  useBlockDataQuery,
} from "@/query/useQueries/useBlockQuery";
import { useGetUserDataQuery } from "@/query/useUserQuery";
import { Channel } from "@/types/channelTypes";

export default function Videos({ params }: { params: { keyword: string } }) {
  const { keyword } = useParams<{ keyword: string }>();
  const decodeKeyword = decodeURIComponent(params.keyword);

  //검색 결과 가져오기
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

  //인기 동영상 가져오기
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

  //채널 아이디 가져오기
  const videoId = videos?.[0]?.id;
  const { data: videoData } = useQuery<Video>({
    queryKey: ["video", videoId],
    queryFn: async ({ queryKey }) => {
      const youtube = new Youtube();
      const videoId = queryKey[1] as string;
      return youtube.getSearchedVideoInfoById(videoId);
    },
  });
  const channelId = videoData?.snippet.channelId;
  const { data: channel } = useQuery<Channel>({
    queryKey: ["channel", channelId],
    queryFn: async ({ queryKey }) => {
      const youtube = new Youtube();
      const channelId = queryKey[1] as string;
      return youtube.getChannelInfoById(channelId);
    },
  });

  //유저 데이터 가져오기
  const { data: user } = useGetUserDataQuery();
  const user_id = user?.user_id;
  const channel_id = channel?.id;

  //차단된 채널 정보 가져오기
  const blockedChannels = useBlockDataByUserIdQuery(user_id as string);
  console.log(blockedChannels);

  //비디오 필터링 함수(트렌드)
  const filterBlockedVideos = (videos: Video[] | undefined) => {
    if (!videos || !blockedChannels) {
      return videos;
    }
    return videos.filter(
      (video) =>
        !blockedChannels.some(
          (blocked) => blocked.channel_id === video.snippet.channelId
        )
    );
  };

  //비디오 필터링 함수(검색)
  const filterBlockedSearchVideos = (videos: Video[] | undefined) => {
    if (!videos || !blockedChannels) {
      return videos;
    }
    return videos.filter(
      (videoData) =>
        !blockedChannels.some(
          (blocked) => blocked.channel_id === videoData.snippet.channelId
        )
    );
  };

  const filteredVideos = filterBlockedSearchVideos(videos);
  const filteredVideosTrend = filterBlockedVideos(videosTrend);

  return (
    <div>
      <div>
        <div>
          {keyword ? (
            <p>
              <strong>{decodeKeyword}</strong>검색 결과🔍
            </p>
          ) : (
            "인기 동영상🔥"
          )}
        </div>
        {keyword ? (
          <div>
            {isLoading && <div>로딩중입니다.</div>}
            {error && <p>에러가 발생했습니다.</p>}
            {filteredVideos && (
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl-grid-cols-4 gap-2 gap-y-4">
                {filteredVideos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </ul>
            )}
          </div>
        ) : (
          <div>
            {isLoadingTrend && <div>로딩중입니다.</div>}
            {errorTrend && <p>에러가 발생했습니다.</p>}
            {filteredVideosTrend && (
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl-grid-cols-4 gap-2 gap-y-4">
                {filteredVideosTrend.map((video) => (
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
