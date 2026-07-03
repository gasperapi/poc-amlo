"use client";

import {Calendar, CircleQuestion, FileText, Magnifier} from "@gravity-ui/icons";
import {Button, SearchField} from "@heroui/react";
import {useMemo, useState} from "react";

import {EVENTS, FAQS, NEWS_ITEMS, SEARCH_SUGGESTIONS} from "../../data/site";

type Result = {
  id: string;
  title: string;
  meta: string;
  group: "ข่าวสาร" | "กิจกรรม" | "คำถามที่พบบ่อย";
  icon: typeof FileText;
};

// Flattened, memo-friendly search index across the mock content.
const INDEX: Result[] = [
  ...NEWS_ITEMS.map((n) => ({
    group: "ข่าวสาร" as const,
    icon: FileText,
    id: `news-${n.id}`,
    meta: `${n.category} · ${n.date}`,
    title: n.title,
  })),
  ...EVENTS.map((e) => ({
    group: "กิจกรรม" as const,
    icon: Calendar,
    id: `event-${e.id}`,
    meta: `${e.day} ${e.month} · ${e.location}`,
    title: e.title,
  })),
  ...FAQS.map((f, i) => ({
    group: "คำถามที่พบบ่อย" as const,
    icon: CircleQuestion,
    id: `faq-${i}`,
    meta: "คำถามที่พบบ่อย",
    title: f.question,
  })),
];

export function QuickSearch() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return [];

    return INDEX.filter((item) => item.title.toLowerCase().includes(q)).slice(0, 6);
  }, [query]);

  const showPanel = query.trim().length > 0;

  return (
    <div className="relative w-full">
      <SearchField
        aria-label="ค้นหาข้อมูล ข่าวสาร และบริการ"
        className="w-full"
        value={query}
        onChange={setQuery}
      >
        <SearchField.Group className="bg-surface h-14 rounded-2xl px-2 text-base shadow-surface">
          <SearchField.SearchIcon className="ml-2 size-5" />
          <SearchField.Input
            className="text-base"
            placeholder="ค้นหาข่าว กิจกรรม หรือบริการ เช่น แจ้งเบาะแส, บัญชีม้า…"
          />
          <SearchField.ClearButton />
        </SearchField.Group>
      </SearchField>

      {showPanel ? (
        <div className="bg-overlay border-border absolute inset-x-0 top-16 z-20 overflow-hidden rounded-2xl border shadow-overlay">
          {results.length > 0 ? (
            <ul className="max-h-[360px] overflow-y-auto p-2">
              {results.map((item) => {
                const Icon = item.icon;

                return (
                  <li key={item.id}>
                    <a
                      className="hover:bg-surface-secondary flex items-start gap-3 rounded-xl p-3 no-underline"
                      href="#"
                    >
                      <span className="bg-accent-soft text-accent mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg">
                        <Icon className="size-4" />
                      </span>
                      <span className="flex min-w-0 flex-col">
                        <span className="text-foreground truncate text-sm font-medium">
                          {item.title}
                        </span>
                        <span className="text-muted truncate text-xs">{item.meta}</span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="flex flex-col items-center gap-1 px-4 py-8 text-center">
              <Magnifier className="text-muted size-6" />
              <p className="text-foreground text-sm font-medium">
                ไม่พบผลลัพธ์สำหรับ “{query.trim()}”
              </p>
              <p className="text-muted text-xs">ลองใช้คำค้นอื่น หรือติดต่อสายด่วน 1710</p>
            </div>
          )}
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <span className="text-muted text-xs">คำค้นยอดนิยม:</span>
        {SEARCH_SUGGESTIONS.map((s) => (
          <Button key={s} size="sm" variant="secondary" onPress={() => setQuery(s)}>
            {s}
          </Button>
        ))}
      </div>
    </div>
  );
}
