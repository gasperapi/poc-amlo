"use client";

import type {SocialPlatform} from "../../data/site";

import {Button} from "@heroui/react";
import {useMemo, useState} from "react";

import {PageHeader} from "../../components/site/page-header";
import {SocialCard} from "../../components/site/social-card";
import {SOCIAL_POSTS} from "../../data/site";

const FILTERS: readonly {id: SocialPlatform | "all"; label: string}[] = [
  {id: "all", label: "ทั้งหมด"},
  {id: "tiktok", label: "TikTok"},
  {id: "instagram", label: "Instagram"},
  {id: "facebook", label: "Facebook"},
];

export function SocialPage() {
  const [active, setActive] = useState<SocialPlatform | "all">("all");

  const posts = useMemo(
    () => (active === "all" ? SOCIAL_POSTS : SOCIAL_POSTS.filter((p) => p.platform === active)),
    [active],
  );

  return (
    <>
      <PageHeader
        description="รวมคอนเทนต์ให้ความรู้จากช่องทางโซเชียลมีเดียอย่างเป็นทางการของ ปปง. ทั้ง TikTok, Instagram และ Facebook"
        title="โซเชียลมีเดีย"
      />

      <div className="mx-auto max-w-6xl px-5 py-8">
        <div className="mb-6 flex flex-wrap gap-2">
          {FILTERS.map((filter) => (
            <Button
              key={filter.id}
              size="sm"
              variant={active === filter.id ? "primary" : "secondary"}
              onPress={() => setActive(filter.id)}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {posts.map((post) => (
            <SocialCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}
