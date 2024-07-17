import { useQuery } from "@tanstack/react-query";
import { SUBSCRIBED_QUERY_KEY } from "../subscribe/subscribeQueryKeys";
import { fetchSubscribeStatus } from "../subscribe/subscribeQueryFns";

export const useSubscribedDataQuery = (channel_id: string) => {
  const { data: subscribedData } = useQuery({
    queryKey: [SUBSCRIBED_QUERY_KEY, channel_id],
    queryFn: async () => await fetchSubscribeStatus(channel_id),
  });
  return subscribedData;
};
