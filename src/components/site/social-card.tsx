import type {SocialPlatform, SocialPost} from "../../data/site";

import {Comment, Heart, LogoFacebook, PlayFill} from "@gravity-ui/icons";
import {Card} from "@heroui/react";
import Image from "next/image";

const PLATFORM_META: Record<SocialPlatform, {label: string; badge: string}> = {
  facebook: {badge: "bg-[#1877F2] text-white", label: "Facebook"},
  instagram: {
    badge: "bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5] text-white",
    label: "Instagram",
  },
  tiktok: {badge: "bg-black text-white", label: "TikTok"},
};

export function SocialCard({post}: {post: SocialPost}) {
  const meta = PLATFORM_META[post.platform];
  const isVideo = post.platform === "tiktok";

  return (
    <Card className="group overflow-hidden p-0">
      <div className="bg-surface-secondary relative aspect-[3/4] w-full overflow-hidden">
        <Image
          alt={post.caption}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          src={post.thumbnail}
        />

        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold ${meta.badge}`}
          >
            {post.platform === "facebook" ? <LogoFacebook className="size-3" /> : null}
            {meta.label}
          </span>
          {isVideo && post.views ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-black/40 px-2 py-1 text-[11px] font-medium text-white backdrop-blur">
              <PlayFill className="size-3" />
              {post.views}
            </span>
          ) : null}
        </div>

        {isVideo ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-transform duration-300 group-hover:scale-110">
              <PlayFill className="size-6" />
            </span>
          </div>
        ) : null}

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-8">
          <p className="line-clamp-2 text-sm font-medium leading-snug text-white">{post.caption}</p>
        </div>
      </div>

      <div className="flex items-center justify-between px-3 py-2.5">
        <span className="text-muted truncate text-xs">{post.author}</span>
        <div className="text-muted flex items-center gap-3 text-xs">
          <span className="inline-flex items-center gap-1">
            <Heart className="size-3.5" />
            {post.likes}
          </span>
          <span className="inline-flex items-center gap-1">
            <Comment className="size-3.5" />
            {post.comments}
          </span>
        </div>
      </div>
    </Card>
  );
}
