import { clientSupabase } from "@/utils/supabase/client";

export const fetchBlockStatus = async (channel_id: string) => {
  const { data: blockChannel, error } = await clientSupabase
    .from("blocked_channel")
    .select("user_id")
    .eq("channel_id", channel_id);
  if (error) {
    console.error("차단 정보를 불러오지 못함", error);
  } else {
    return blockChannel;
  }
};

export const getBlockStatus = async (user_id: string) => {
  const { data: getblockChannel, error } = await clientSupabase
    .from("blocked_channel")
    .select("channel_id")
    .eq("user_id", user_id);
  if (error) {
    console.error("차단 정보를 불러오지 못함", error);
  } else {
    return getblockChannel;
  }
};
