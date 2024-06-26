// "use client";

// import { Video } from "@/types/videoTypes";
// import React from "react";
// type VideoCardProps = {
//   video: Video;
// };

// export default function VideoCard({ video }: VideoCardProps) {
//   return <div>{video.snippet.title}</div>;
// }

import React from "react";
import { Video } from "@/types/videoTypes";

type VideoCardProps = {
  video: Video;
};

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <div>
      <h3>{video.snippet.title}</h3>
      <p>{video.snippet.description}</p>
      <img
        src={video.snippet.thumbnails.medium.url}
        alt={video.snippet.title}
      />
    </div>
  );
};

export default VideoCard;
