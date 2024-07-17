import { clientSupabase } from "@/utils/supabase/client";

export const fetchSubscribeStatus = async (channel_id: string) => {
  const { data: subscribeChannel, error } = await clientSupabase
    .from("liked_channel")
    .select("user_id")
    .eq("channel_id", channel_id);
  if (error) {
    console.error("구독 정보를 불러오지 못함", error);
  } else {
    return subscribeChannel;
  }
};
