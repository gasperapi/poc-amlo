import type {NewsCategory, NewsItem} from "../../data/site";

import {Clock} from "@gravity-ui/icons";
import {Card, Chip, Link} from "@heroui/react";
import Image from "next/image";

const CATEGORY_COLOR: Record<NewsCategory, "accent" | "success" | "warning" | "danger"> = {
  ข่าวด่วน: "danger",
  ประกาศ: "accent",
  ผลการดำเนินงาน: "success",
  เตือนภัย: "warning",
};

export function NewsCard({item}: {item: NewsItem}) {
  return (
    <Card className="group overflow-hidden p-0">
      <div className="bg-surface-secondary relative aspect-[16/10] w-full overflow-hidden">
        <Image
          alt={item.title}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          src={item.image}
        />
        <div className="absolute left-3 top-3">
          <Chip color={CATEGORY_COLOR[item.category]} size="sm" variant="soft">
            {item.category}
          </Chip>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <div className="text-muted flex items-center gap-2 text-xs">
          <span className="tabular-nums">{item.date}</span>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" />
            {item.readTime}
          </span>
        </div>
        <Link
          className="text-foreground hover:text-accent text-base font-semibold leading-snug no-underline"
          href="#"
        >
          {item.title}
        </Link>
        <p className="text-muted line-clamp-2 text-sm leading-6">{item.excerpt}</p>
      </div>
    </Card>
  );
}
