"use client";

//채널 차단, 비디오 차단
import { Channel } from "@/types/channelTypes";
import { Video } from "@/types/videoTypes";
import Youtube from "@/utils/youtube";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function VideoDetail({
  params,
}: {
  params: { videoIdDetail: string };
}) {
  const videoId = params.videoIdDetail;
  const { data: videoData } = useQuery<Video>({
    queryKey: ["video", videoId],
    queryFn: async ({ queryKey }) => {
      const youtube = new Youtube();
      const videoId = queryKey[1] as string;
      return youtube.getSearchedVideoInfoById(videoId);
    },
  });
  const cannelId = videoData?.snippet.channelId;
  const { data: channel } = useQuery<Channel>({
    queryKey: ["channel", cannelId],
    queryFn: async ({ queryKey }) => {
      const youtube = new Youtube();
      const channelId = queryKey[1] as string;
      return youtube.getChannelInfoById(channelId);
    },
  });
  return (
    <div>
      <iframe
        id="player"
        width="640"
        height="360"
        src={`https://www.youtube.com/embed/${params.videoIdDetail}?autoplay=1`}
        allow="autoplay"
      ></iframe>
      <div>
        <div>{videoData?.snippet.title}</div>
        <div>
          {channel && (
            <Image
              width={100}
              height={100}
              alt="채널 썸네일"
              src={channel.snippet.thumbnails.medium.url}
            />
          )}
        </div>
        <div>{channel?.snippet.title}</div>
        <div>{channel?.statistics.subscriberCount}</div>
        <div>{videoData?.statistics.likeCount}</div>
        <div>{videoData?.statistics.viewCount}</div>
        <div>{videoData?.snippet.publishedAt}</div>
        <div>{videoData?.snippet.description}</div>
      </div>
    </div>
  );
}
