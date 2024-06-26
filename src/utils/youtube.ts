import { Video } from "@/types/videoTypes";
import axios, { AxiosInstance } from "axios";

// import { Video } from "@/types/videoTypes";
// import axios from "axios";

export default class Youtube {
  private httpClient: AxiosInstance;
  constructor() {
    this.httpClient = axios.create({
      baseURL: "https://www.googleapis.com/youtube/v3",
      params: { key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY },
    });
  }
  async search(keyword: string): Promise<Video[]> {
    return this.searchByKeyword(keyword);
  }
  async searchByKeyword(keyword: string): Promise<Video[]> {
    return this.httpClient
      .get("search", {
        params: {
          part: "snippet",
          maxResults: 24,
          type: "video",
          q: keyword,
        },
      })
      .then((res: any) => res.data.items)
      .then((items: Video[]) =>
        items.map((item: Video) => ({ ...item, id: item.id.toString() }))
      );
  }

  async mostPopular() {
    return this.httpClient
      .get("videos", {
        params: {
          part: "snippet",
          maxResults: 25,
          chart: "mostPopular",
        },
      })
      .then((res: any) => res.data.items)
      .then((items: Video[]) =>
        items.map((item: any) => ({
          ...item,
          id: item.id.videoId,
        }))
      );
  }
}
