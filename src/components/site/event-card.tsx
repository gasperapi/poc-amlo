import type {EventItem} from "../../data/site";

import {Clock, MapPin} from "@gravity-ui/icons";
import {Button, Card, Chip} from "@heroui/react";

export function EventCard({event}: {event: EventItem}) {
  return (
    <Card className="flex-row items-stretch gap-4 p-4">
      <div className="bg-accent-soft text-accent flex size-16 shrink-0 flex-col items-center justify-center rounded-xl leading-none">
        <span className="text-2xl font-bold tabular-nums">{event.day}</span>
        <span className="mt-1 text-xs font-medium">{event.month}</span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-foreground text-base font-semibold leading-snug">{event.title}</h3>
          <Chip className="shrink-0" size="sm" variant="soft">
            {event.type}
          </Chip>
        </div>
        <p className="text-muted line-clamp-2 text-sm leading-6">{event.description}</p>
        <div className="text-muted flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" />
            {event.time}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5" />
            {event.location}
          </span>
        </div>
        <div className="mt-1 flex items-center justify-between gap-3">
          {typeof event.seatsLeft === "number" ? (
            <span className="text-success text-xs font-medium">
              เหลือ {event.seatsLeft} ที่นั่ง
            </span>
          ) : (
            <span className="text-muted text-xs">เข้าร่วมได้ไม่จำกัด</span>
          )}
          <Button size="sm" variant="outline">
            ลงทะเบียน
          </Button>
        </div>
      </div>
    </Card>
  );
}
