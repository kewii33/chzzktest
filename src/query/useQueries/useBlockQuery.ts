import { useQuery } from "@tanstack/react-query";
import { BLOCK_QUERY_KEY, GET_BLOCK_DATA_KEY } from "../block/blockQueryKeys";
import { fetchBlockStatus, getBlockStatus } from "../block/blockQueryFns";

export const useBlockDataQuery = (channel_id: string) => {
  const { data: blockedData } = useQuery({
    queryKey: [BLOCK_QUERY_KEY, channel_id],
    queryFn: async () => await fetchBlockStatus(channel_id),
  });
  return blockedData;
};

export const useBlockDataByUserIdQuery = (user_id: string) => {
  const { data: getBlockedDataByUserId } = useQuery({
    queryKey: [GET_BLOCK_DATA_KEY, user_id],
    queryFn: async () => await getBlockStatus(user_id),
  });
  return getBlockedDataByUserId;
};
