"use client";

import type {NewsCategory} from "../../data/site";

import {Button} from "@heroui/react";
import {useMemo, useState} from "react";

import {NewsCard} from "../../components/site/news-card";
import {PageHeader} from "../../components/site/page-header";
import {NEWS_ITEMS} from "../../data/site";

const FILTERS: readonly (NewsCategory | "ทั้งหมด")[] = [
  "ทั้งหมด",
  "ข่าวด่วน",
  "เตือนภัย",
  "ประกาศ",
  "ผลการดำเนินงาน",
];

export function NewsPage() {
  const [active, setActive] = useState<(typeof FILTERS)[number]>("ทั้งหมด");

  const items = useMemo(
    () => (active === "ทั้งหมด" ? NEWS_ITEMS : NEWS_ITEMS.filter((n) => n.category === active)),
    [active],
  );

  return (
    <>
      <PageHeader
        description="ติดตามข่าวด่วน ประกาศ ผลการดำเนินงาน และการแจ้งเตือนภัยจากสำนักงาน ปปง."
        title="ข่าวสารและประกาศ"
      />

      <div className="mx-auto max-w-6xl px-5 py-8">
        <div className="mb-6 flex flex-wrap gap-2">
          {FILTERS.map((filter) => (
            <Button
              key={filter}
              size="sm"
              variant={active === filter ? "primary" : "secondary"}
              onPress={() => setActive(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}
