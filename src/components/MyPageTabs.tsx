"use client";

import { useBlockDataByUserIdQuery } from "@/query/useQueries/useBlockQuery";
import { useGetUserDataQuery } from "@/query/useUserQuery";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import { BiSolidLike } from "react-icons/bi";
import { ImBlocked } from "react-icons/im";
import ChannelCard from "./ChannelCard";
import { FaUserCheck } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";

export default function MyPageTabs() {
  const { data: user } = useGetUserDataQuery();
  const user_id = user?.user_id;
  const blockedChannels = useBlockDataByUserIdQuery(user_id as string);
  console.log(blockedChannels);
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Dynamic tabs">
        <Tab
          key="liked_video"
          title={
            <div className="flex gap-4">
              <FaBookmark />
              <span>북마크한 동영상</span>
            </div>
          }
        >
          <Card>
            <CardBody>
              <h3>북마크한 동영상이 없습니다.</h3>
            </CardBody>
          </Card>
        </Tab>
        <Tab
          key="subscribed_channel"
          title={
            <div className="flex gap-4">
              <FaUserCheck />
              <span>구독한 채널</span>
            </div>
          }
        >
          <Card>
            <CardBody>
              <h3>구독한 채널이 없습니다.</h3>
            </CardBody>
          </Card>
        </Tab>
        <Tab
          key="blocked_channel"
          title={
            <div className="flex gap-4">
              <ImBlocked />
              <span>차단한 채널</span>
            </div>
          }
        >
          <Card>
            <CardBody>
              {blockedChannels ? (
                blockedChannels.length > 0 ? (
                  blockedChannels?.map((channel) => (
                    <ChannelCard
                      key={channel.channel_id}
                      channelId={channel.channel_id}
                      userId={user_id}
                    />
                  ))
                ) : (
                  <h3>차단한 채널이 없습니다.</h3>
                )
              ) : (
                <h3>차단한 채널이 없습니다.</h3>
              )}
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
