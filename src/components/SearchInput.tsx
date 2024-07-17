import { useParams, useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";

export default function SearchInput() {
  const [text, setText] = useState("");
  const router = useRouter();
  const { keyword } = useParams<{ keyword: string }>();
  const decodeKeyword = decodeURIComponent(keyword as string);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push(`/videos/${text}`);
  };
  useEffect(() => {
    if (keyword) {
      setText(decodeKeyword as string);
    } else setText("");
  }, [keyword, decodeKeyword]);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className=""
        ></input>
        <button>
          <BsSearch />
        </button>
      </form>
    </div>
  );
}
