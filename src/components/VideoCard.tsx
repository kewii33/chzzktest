"use client";

import React from "react";
import { Video } from "@/types/videoTypes";
import { Channel } from "@/types/channelTypes";
import { useQuery } from "@tanstack/react-query";
import Youtube from "@/utils/youtube";
import Image from "next/image";
import Link from "next/link";

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
    <div>
      <Link href={`/watch/${videoIdDetail}`}>
        <Image
          className="object-cover"
          width={500}
          height={500}
          src={thumbnailUrl}
          alt={video.snippet.title}
        />
        <div className="flex">
          <Link href={`/channel/${video.snippet.channelId}`}>
            {channel && (
              <Image
                width={100}
                height={100}
                alt="채널 썸네일"
                src={channel.snippet.thumbnails.medium.url}
              />
            )}
          </Link>
          <div>
            <p>{videoIdDetail}</p>
            <h3>{video.snippet.title}</h3>
            <p>
              <Link href={`/channel/${video.snippet.channelId}`}>
                {video.snippet.channelTitle}
              </Link>
            </p>
            <p>
              {video.statistics?.viewCount
                ? video.statistics.viewCount
                : videoData?.statistics.viewCount}
            </p>
            <p>{video.snippet.publishedAt}</p>
            <p>채널 아이디 : {channelId}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;
