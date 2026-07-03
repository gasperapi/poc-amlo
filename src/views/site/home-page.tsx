import {ArrowRight, Bell, ScalesBalanced, ShieldCheck} from "@gravity-ui/icons";
import {Button, Link} from "@heroui/react";

import {EventCard} from "../../components/site/event-card";
import {NewsCard} from "../../components/site/news-card";
import {QuickSearch} from "../../components/site/quick-search";
import {EVENTS, NEWS_ITEMS} from "../../data/site";

const STATS = [
  {label: "ทรัพย์สินที่อายัด (ไตรมาส 2)", value: "3,200 ล.บ."},
  {label: "เรื่องที่ดำเนินคดี", value: "120 ราย"},
  {label: "สายด่วนแจ้งเบาะแส", value: "1710"},
];

export function HomePage() {
  const breakingNews = NEWS_ITEMS.filter((n) => n.isBreaking);
  const latestNews = NEWS_ITEMS.slice(0, 3);
  const upcomingEvents = EVENTS.slice(0, 2);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="from-accent to-[oklch(from_var(--accent)_calc(l-0.14)_c_h)] absolute inset-0 bg-gradient-to-br" />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center px-5 pb-16 pt-16 text-center sm:pt-20">
          <span className="text-accent-foreground/90 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
            <ShieldCheck className="size-3.5" />
            สำนักงานป้องกันและปราบปรามการฟอกเงิน
          </span>
          <h1 className="text-accent-foreground mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            ร่วมเป็นหูเป็นตา หยุดยั้งการฟอกเงิน
          </h1>
          <p className="text-accent-foreground/70 mt-4 max-w-2xl text-base leading-7 sm:text-lg">
            ค้นหาข่าวสาร ประกาศ กิจกรรม และบริการของ ปปง. ได้อย่างรวดเร็ว พร้อมช่องทางแจ้งเบาะแสที่ปลอดภัย
          </p>

          <div className="mt-8 w-full max-w-2xl">
            <QuickSearch />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5">
        <section className="border-border bg-surface -mt-8 relative grid grid-cols-1 gap-4 rounded-2xl border p-6 shadow-surface sm:grid-cols-3">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-start gap-1">
              <span className="text-foreground text-2xl font-bold tabular-nums">{stat.value}</span>
              <span className="text-muted text-sm">{stat.label}</span>
            </div>
          ))}
        </section>

        <section className="mt-12 flex flex-col gap-5">
          <div className="flex items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-danger inline-flex items-center gap-1.5 text-xs font-semibold">
                <Bell className="size-3.5" />
                ข่าวด่วนล่าสุด
              </span>
              <h2 className="text-foreground text-xl font-semibold">ข่าวสารและประกาศ</h2>
            </div>
            <Link
              className="text-accent inline-flex items-center gap-1 text-sm no-underline"
              href="/news"
            >
              ดูทั้งหมด
              <ArrowRight className="size-4" />
            </Link>
          </div>

          {breakingNews.length > 0 ? (
            <div className="border-danger/30 bg-danger-soft flex flex-col gap-1 rounded-2xl border p-4">
              <span className="text-danger text-xs font-semibold">กำลังเป็นข่าว</span>
              <div className="flex flex-col gap-2">
                {breakingNews.map((n) => (
                  <Link
                    key={n.id}
                    className="text-foreground hover:text-danger text-sm font-medium no-underline"
                    href="#"
                  >
                    {n.title}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {latestNews.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section className="mt-14 flex flex-col gap-5">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-foreground text-xl font-semibold">กิจกรรมที่จะมาถึง</h2>
            <Link
              className="text-accent inline-flex items-center gap-1 text-sm no-underline"
              href="/events"
            >
              ดูปฏิทินกิจกรรม
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>

        <section className="mt-14">
          <div className="from-accent to-[oklch(from_var(--accent)_calc(l-0.14)_c_h)] relative overflow-hidden rounded-3xl bg-gradient-to-r p-8 sm:p-10">
            <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur">
                  <ScalesBalanced className="size-6" />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-accent-foreground text-xl font-bold">พบเห็นการฟอกเงิน?</h2>
                  <p className="text-accent-foreground/70 text-sm">
                    แจ้งเบาะแสได้ตลอด 24 ชั่วโมง ข้อมูลของคุณเป็นความลับ
                  </p>
                </div>
              </div>
              <Button className="bg-white text-accent" variant="tertiary">
                แจ้งเบาะแส
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
