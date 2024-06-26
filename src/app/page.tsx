import Videos from "@/components/Videos";
import Image from "next/image";

export default function Home({ params }: { params: { keyword: string } }) {
  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>유튭 차단기능, 채널별 좋아요</p>
      <Videos params={params} />
    </section>
  );
}
