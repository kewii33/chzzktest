import { formatDistanceToNow, isAfter, isBefore } from "date-fns";
import { ko } from "date-fns/locale";

export const timeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const distance = formatDistanceToNow(date, { locale: ko });
  const resultDate = distance
    .replace("약", "")
    .replace("이상", "")
    .replace("거의", "");
  if (isBefore(date, now)) {
    return `${resultDate} 전`;
  }
};
