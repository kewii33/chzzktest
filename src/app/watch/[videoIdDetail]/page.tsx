import VideoDetail from "@/components/VideoDetail";

export default function page({
  params,
}: {
  params: { videoIdDetail: string };
}) {
  const decodeVideoId = decodeURIComponent(params.videoIdDetail);
  return (
    <div>
      <VideoDetail params={params} />
    </div>
  );
}
