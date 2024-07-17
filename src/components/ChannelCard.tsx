import { useToggleBlockMutation } from "@/query/useMutation/useBlockMutation";
import { Channel } from "@/types/channelTypes";
import Youtube from "@/utils/youtube";
import { Button } from "@nextui-org/button";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

interface ChannelCardProps {
  channelId: string | null;
  userId: string | undefined;
}

const ChannelCard: React.FC<ChannelCardProps> = ({ channelId, userId }) => {
  const { data: channel } = useQuery<Channel>({
    queryKey: ["channel", channelId],
    queryFn: async ({ queryKey }) => {
      const youtube = new Youtube();
      const channelId = queryKey[1] as string;
      return youtube.getChannelInfoById(channelId);
    },
  });

  const channelThumbnail = channel?.snippet.thumbnails.high.url as string;
  const toggleBlockMutation = useToggleBlockMutation();

  const handleBlockToggle = async () => {
    if (!channelId || !userId) {
      console.error("채널 아이디나 유저 아이디가 없습니다.");
      return;
    }
    try {
      await toggleBlockMutation.mutateAsync({
        channel_id: channelId,
        user_id: userId,
      });
    } catch (error) {
      console.error("Error toggling like", error);
      alert(`차단 해제 실패! ${error}`);
    }
  };

  const cancelBlockButton = () => {
    if (window.confirm("차단을 해제하시겠습니까?")) {
      handleBlockToggle();
    }
  };

  return (
    <div>
      <div className="flex">
        <div>
          <Image
            src={channelThumbnail}
            alt="채널 썸네일"
            className="rounded-full"
            width={50}
            height={50}
          />
          <div>{channel?.snippet.title}</div>
        </div>
      </div>
      <div>
        <Button onClick={cancelBlockButton}>차단 해제</Button>
      </div>
    </div>
  );
};

export default ChannelCard;
