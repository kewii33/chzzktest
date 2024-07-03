import { Channel } from "@/types/channelTypes";
import { Video } from "@/types/videoTypes";
import axios, { AxiosInstance } from "axios";

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
      .then((items: any) =>
        items.map((item: any) => ({
          id: item.id.videoId,
          snippet: item.snippet,
          channelId: item.snippet.channelId,
        }))
      );
  }

  async mostPopular(): Promise<Video[]> {
    return this.httpClient
      .get("videos", {
        params: {
          part: "id, snippet, statistics",
          maxResults: 25,
          chart: "mostPopular",
          regionCode: "kr",
        },
      })
      .then((res: any) => res.data.items)
      .then((items: any[]) =>
        items.map((item: any) => ({
          id: item.id,
          snippet: item.snippet,
          statistics: item.statistics,
          channelId: item.snippet.channelId,
        }))
      );
  }

  //채널 id로 채널 썸네일 불러오기
  async getChannelInfoById(channelId: string): Promise<Channel> {
    return this.httpClient
      .get("channels", {
        params: {
          part: "snippet, statistics",
          id: channelId,
        },
      })
      .then((res: any) => res.data.items[0] || null);
  }

  async searchByChannelId(channelId: string): Promise<Video[]> {
    return this.httpClient
      .get("search", {
        params: {
          part: "snippet",
          maxResults: 24,
          type: "video",
          channelId: channelId,
        },
      })
      .then((res: any) => res.data.items)
      .then((items: any) =>
        items.map((item: any) => ({
          id: item.id.videoId,
          snippet: item.snippet,
          channelId: item.snippet.channelId,
        }))
      );
  }

  //비디오 id로 비디오 조회수불러오기
  async getSearchedVideoInfoById(videoId: string): Promise<Video> {
    return this.httpClient
      .get("videos", {
        params: {
          part: "snippet, statistics",
          id: videoId,
        },
      })
      .then((res: any) => res.data.items[0] || null);
  }
}
