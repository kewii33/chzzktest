import { clientSupabase } from "@/utils/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SUBSCRIBED_TOGGLE_KEY } from "../subscribe/subscribeQueryKeys";

export const useToggleSubscribeMutation = () => {
  const queryClient = useQueryClient();
  const toggleSubscribeMutation = useMutation({
    mutationFn: async ({
      channel_id,
      user_id,
    }: {
      channel_id: string;
      user_id: string;
    }) => {
      try {
        const { data: subscribedChannelData, error: selectError } =
          await clientSupabase
            .from("liked_channel")
            .select("channel_id")
            .eq("channel_id", channel_id)
            .eq("user_id", user_id);

        if (selectError) {
          console.error(
            "Error selecting data from liked_channel:",
            selectError
          );
          throw selectError;
        }

        if (subscribedChannelData && subscribedChannelData.length > 0) {
          await clientSupabase
            .from("liked_channel")
            .delete()
            .eq("channel_id", channel_id)
            .eq("user_id", user_id);
        } else {
          const { error: inserError } = await clientSupabase
            .from("liked_channel")
            .insert([{ channel_id, user_id }])
            .select();

          if (inserError) {
            console.error(
              "Error inserting data from liked_channel:",
              inserError
            );
            throw inserError;
          }
        }
      } catch (error) {
        console.error("Mutation error", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SUBSCRIBED_TOGGLE_KEY] });
    },
  });
  return toggleSubscribeMutation;
};
