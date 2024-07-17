"use client";

import React from "react";
import { Video } from "@/types/videoTypes";
import { Channel } from "@/types/channelTypes";
import { useQuery } from "@tanstack/react-query";
import Youtube from "@/utils/youtube";
import Image from "next/image";
import Link from "next/link";
import { timeAgo } from "@/utils/timeAgo";
import { formatCount } from "@/utils/formatCount";

type VideoCardProps = {
  video: Video;
  channel?: Channel;
};

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const channelId = video.snippet.channelId;
  const { data: channel } = useQuery<Channel>({
    queryKey: ["channel", channelId],
    queryFn: async ({ queryKey }) => {
      const youtube = new Youtube();
      const channelId = queryKey[1] as string;
      return youtube.getChannelInfoById(channelId);
    },
  });

  const videoId = video.id;
  const { data: videoData } = useQuery<Video>({
    queryKey: ["video", videoId],
    queryFn: async ({ queryKey }) => {
      const youtube = new Youtube();
      const videoId = queryKey[1] as string;
      return youtube.getSearchedVideoInfoById(videoId);
    },
  });

  const thumbnailUrl =
    video.snippet.thumbnails.maxres?.url || video.snippet.thumbnails.medium.url;

  const videoIdDetail = videoId || videoData?.id;

  return (
    <div className="bg-green-100">
      <Link href={`/watch/${videoIdDetail}`}>
        <Image
          width={400}
          height={400}
          src={thumbnailUrl}
          alt={video.snippet.title}
          layout="fixed"
          className="rounded-[10px]"
        />
        <div className="flex">
          <Link href={`/channel/${video.snippet.channelId}`}>
            <div className="w-[50px] h-[50px]">
              {channel && (
                <Image
                  className="rounded-full"
                  width={50}
                  height={50}
                  alt="채널 썸네일"
                  src={channel.snippet.thumbnails.medium.url}
                  layout="fixed"
                />
              )}
            </div>
          </Link>
          <div>
            {/* <p>{videoIdDetail}</p> */}
            <div>
              <h3 className="font-semibold line-clamp-2">
                {video.snippet.title}
              </h3>
            </div>
            <p className="text-sm opacity-80 my-1">
              <Link href={`/channel/${video.snippet.channelId}`}>
                {video.snippet.channelTitle}
              </Link>
            </p>
            <p className="text-sm opacity-80 my-1">
              {video.statistics?.viewCount
                ? `조회수 ${formatCount(video.statistics.viewCount)}`
                : `조회수 ${formatCount(
                    videoData?.statistics.viewCount as string
                  )}`}
            </p>
            <p className="text-sm opacity-80 my-1">
              {timeAgo(video.snippet.publishedAt)}
            </p>
            {/* <p>채널 아이디 : {channelId}</p> */}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;
