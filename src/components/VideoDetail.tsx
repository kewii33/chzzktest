"use client";

import { useToggleBlockMutation } from "@/query/useMutation/useBlockMutation";
import { useToggleSubscribeMutation } from "@/query/useMutation/useSubscribeMutation";
import { useBlockDataQuery } from "@/query/useQueries/useBlockQuery";
import { useSubscribedDataQuery } from "@/query/useQueries/useSubscribeQuery";
import { useGetUserDataQuery } from "@/query/useUserQuery";
import { Channel } from "@/types/channelTypes";
import { Video } from "@/types/videoTypes";
import { formatCount } from "@/utils/formatCount";
import Youtube from "@/utils/youtube";
import { Button } from "@nextui-org/button";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiSolidLike } from "react-icons/bi";

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
  const channelId = videoData?.snippet.channelId;
  const { data: channel } = useQuery<Channel>({
    queryKey: ["channel", channelId],
    queryFn: async ({ queryKey }) => {
      const youtube = new Youtube();
      const channelId = queryKey[1] as string;
      return youtube.getChannelInfoById(channelId);
    },
  });

  const { data: user } = useGetUserDataQuery();
  const user_id = user?.user_id;
  const channel_id = channel?.id;

  //구독 상태
  const [subscibed, setSubscribed] = useState<boolean | null>(null);
  const [subcribedUser, setSubscribedUser] = useState<string[]>([]);

  const toggleSubscribeMutation = useToggleSubscribeMutation();
  const subscribeUser = useSubscribedDataQuery(channel_id as string);

  useEffect(() => {
    if (!subscribeUser || subscribeUser.length === 0) {
      setSubscribed(false);
      return;
    }
    const userSubscribes = subscribeUser.some(
      (subcribedUser) => subcribedUser.user_id === user_id
    );
    setSubscribed(userSubscribes);
  }, [subscribeUser, user_id]);

  const handleSubscribeToggle = async () => {
    if (!user_id) {
      alert("로그인 후 이용해주세요");
      return;
    }
    if (!channel_id) {
      console.error("채널 아이디가 없습니다.");
      return;
    }
    try {
      await toggleSubscribeMutation.mutateAsync({ channel_id, user_id });
      if (subscibed) {
        setSubscribed(false);
        setSubscribedUser((prevSubscribedUser) =>
          prevSubscribedUser.filter((id) => id !== user_id)
        );
      } else {
        setSubscribed(true);
        setSubscribedUser((prevSubscribedUser) => [
          ...prevSubscribedUser,
          user_id,
        ]);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      alert(`구독 실패! ${error}`);
    }
  };
  const cancelSubscribeButton = () => {
    if (window.confirm("구독을 취소하시겠습니까?")) {
      handleSubscribeToggle();
    }
    return;
  };

  //차단 상태
  const [blocked, setBlocked] = useState<boolean | null>(null);
  const [blockedUser, setBlockedUser] = useState<string[]>([]);

  const toggleBlockMutation = useToggleBlockMutation();
  const blockUser = useBlockDataQuery(channel_id as string);

  useEffect(() => {
    if (!blockUser || blockUser.length === 0) {
      setBlocked(false);
      return;
    }
    const userBlocks = blockUser.some(
      (blockedUser) => blockedUser.user_id === user_id
    );
    setBlocked(userBlocks);
  }, [blockUser, user_id]);

  const handleBlockToggle = async () => {
    if (!user_id) {
      alert("로그인 후 이용해주세요");
      return;
    }
    if (!channel_id) {
      console.error("채널 아이디가 없습니다.");
      return;
    }
    try {
      await toggleBlockMutation.mutateAsync({ channel_id, user_id });
      if (blocked) {
        setBlocked(false);
        setBlockedUser((prevBlockedUser) =>
          prevBlockedUser.filter((id) => id !== user_id)
        );
      } else {
        setBlocked(true);
        setBlockedUser((prevBlockedUser) => [...prevBlockedUser, user_id]);
      }
    } catch (error) {
      console.error("Error toggling like", error);
      alert(`차단 실패! ${error}`);
    }
  };
  const cancelBlockButton = () => {
    if (window.confirm("차단을 해제하시겠습니까?")) {
      handleBlockToggle();
    }
  };

  return (
    <div className="w-full">
      <iframe
        id="player"
        width="100%"
        height="640"
        src={`https://www.youtube.com/embed/${params.videoIdDetail}?autoplay=1`}
        allow="autoplay"
      ></iframe>
      <div>
        <div className="font-semibold line-clamp-2">
          {videoData?.snippet.title}
        </div>
        <div className="flex w-full">
          <div className="flex justify-betweeen">
            <div className="flex bg-green-200">
              <Link href={`/channel/${channelId}`}>
                <div>
                  {channel && (
                    <Image
                      width={50}
                      height={50}
                      alt="채널 썸네일"
                      src={channel.snippet.thumbnails.medium.url}
                      className="rounded-full"
                    />
                  )}
                </div>
              </Link>
              <div className="flex-col">
                <Link href={`/channel/${channelId}`}>
                  <div>{channel?.snippet.title}</div>
                </Link>
                <div>
                  {channel?.statistics.subscriberCount
                    ? `구독자 ${formatCount(
                        channel?.statistics.subscriberCount
                      )}명`
                    : `구독자 수 불러올 수 없음`}
                </div>
              </div>
            </div>
            <div>
              <div>
                {subscibed ? (
                  <Button onClick={cancelSubscribeButton}>구독중</Button>
                ) : (
                  <Button onClick={handleSubscribeToggle}>구독</Button>
                )}
              </div>
              <div>
                {blocked ? (
                  <Button onClick={cancelBlockButton}>차단 해제</Button>
                ) : (
                  <Button onClick={handleBlockToggle}>차단</Button>
                )}
              </div>
            </div>
          </div>
          <div className="flex">
            <BiSolidLike />
            <div>
              {videoData?.statistics.likeCount
                ? `${formatCount(videoData?.statistics.likeCount)}`
                : `좋아요 수 불러올 수 없음`}
            </div>
          </div>
        </div>
        <div>
          {videoData?.statistics.viewCount
            ? `조회수 ${formatCount(videoData?.statistics.viewCount)}회`
            : `조회수 불러올 수 없음`}
        </div>
        <div>{videoData?.snippet.publishedAt}</div>
        <div>{videoData?.snippet.description}</div>
        <div>{videoData?.snippet.description}</div>
        <div>{videoData?.snippet.description}</div>
        <div>{videoData?.snippet.description}</div>
      </div>
    </div>
  );
}
