import { clientSupabase } from "@/utils/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BLOCK_TOGGGLE_KEY } from "../block/blockQueryKeys";

export const useToggleBlockMutation = () => {
  const queryClient = useQueryClient();
  const toggleBlockMutation = useMutation({
    mutationFn: async ({
      channel_id,
      user_id,
    }: {
      channel_id: string;
      user_id: string;
    }) => {
      try {
        const { data: blockedChannelData, error: selectError } =
          await clientSupabase
            .from("blocked_channel")
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

        if (blockedChannelData && blockedChannelData.length > 0) {
          await clientSupabase
            .from("blocked_channel")
            .delete()
            .eq("channel_id", channel_id)
            .eq("user_id", user_id);
        } else {
          const { error: inserError } = await clientSupabase
            .from("blocked_channel")
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
      queryClient.invalidateQueries({ queryKey: [BLOCK_TOGGGLE_KEY] });
    },
  });
  return toggleBlockMutation;
};
