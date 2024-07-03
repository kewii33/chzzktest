import ChannelDetail from "@/components/ChannelDetail";
import React from "react";

export default function page({ params }: { params: { channelId: string } }) {
  const decodeChannelId = decodeURIComponent(params.channelId);
  return (
    <div>
      <ChannelDetail params={params} />
    </div>
  );
}
