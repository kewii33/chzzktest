"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { BsYoutube, BsSearch } from "react-icons/bs";

export default function Header() {
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
    <header>
      <Link href="/">
        <div>
          <BsYoutube />
          <h1>{"BlockTube"}</h1>
        </div>
      </Link>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></input>
        <button>
          <BsSearch />
        </button>
      </form>
      {/* <nav>
        <Link href="/">home</Link>
        <Link href="/about">about</Link>
        <Link href="/posts">posts</Link>
        <Link href="/contact">contact</Link>
      </nav> */}
    </header>
  );
}
