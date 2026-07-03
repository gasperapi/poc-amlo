import {EventCard} from "../../components/site/event-card";
import {PageHeader} from "../../components/site/page-header";
import {EVENTS} from "../../data/site";

// Group events by month for a lightweight calendar-style layout.
const MONTHS = Array.from(new Set(EVENTS.map((e) => e.month)));

export function EventsPage() {
  return (
    <>
      <PageHeader
        description="ปฏิทินสัมมนา อบรม และกิจกรรมให้ความรู้ประชาชน ลงทะเบียนเข้าร่วมได้ล่วงหน้า"
        title="กิจกรรมที่จะมาถึง"
      />

      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-8">
        {MONTHS.map((month) => (
          <section key={month} className="flex flex-col gap-4">
            <h2 className="text-foreground text-lg font-semibold">เดือน {month} 2569</h2>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {EVENTS.filter((e) => e.month === month).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
