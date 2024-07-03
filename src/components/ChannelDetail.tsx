"use client";

import { Channel } from "@/types/channelTypes";
import { Video } from "@/types/videoTypes";
import Youtube from "@/utils/youtube";
import { Button } from "@nextui-org/button";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import VideoCard from "./VideoCard";

export default function ChannelDetail({
  params,
}: {
  params: { channelId: string };
}) {
  const channelId = decodeURIComponent(params.channelId);
  const { data: channel } = useQuery<Channel>({
    queryKey: ["channel", channelId],
    queryFn: async ({ queryKey }) => {
      const youtube = new Youtube();
      const channelId = queryKey[1] as string;
      return youtube.getChannelInfoById(channelId);
    },
  });

  const {
    isLoading: isLoadingVideos,
    error: errorVideos,
    data: videos,
  } = useQuery<Video[]>({
    queryKey: ["videos", channelId],
    queryFn: () => {
      const youtube = new Youtube();
      return youtube.searchByChannelId(channelId);
    },
  });

  const thumbnailUrl = channel?.snippet.thumbnails.high?.url as string;

  return (
    <div>
      <div className="flex">
        <div>
          <Image width={100} height={100} alt="채널썸네일" src={thumbnailUrl} />
        </div>
        <div>
          <div>{channel?.snippet.title}</div>
          <div className="flex">
            {channel?.snippet.customUrl}
            {channel?.statistics.subscriberCount}
            {channel?.statistics.videoCount}
          </div>
          {channel?.snippet.description}
        </div>
        <div>
          <Button>구독</Button>
          <Button>차단</Button>
        </div>
      </div>
      <ul>
        <li>
          <p>홈</p>
          <div>
            <p>동영상</p>
            {videos ? (
              <ul>
                {videos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </ul>
            ) : (
              <p>비디오 없음</p>
            )}
          </div>
          <p>재생목록</p>
          <p>커뮤니티</p>
          <p>좋아요한 동영상</p>
        </li>
      </ul>
    </div>
  );
}
