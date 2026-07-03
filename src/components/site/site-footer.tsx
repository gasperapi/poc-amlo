import {Envelope, LogoFacebook, MapPin} from "@gravity-ui/icons";
import {Link} from "@heroui/react";
import Image from "next/image";

import logo from "../../Anti-Money_Laundering_Office_Logo.png";
import {SITE_NAV_ITEMS} from "../../site-nav";

export function SiteFooter() {
  return (
    <footer className="border-separator mt-16 border-t">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <Image alt="ตราสัญลักษณ์ ปปง." className="size-9 object-contain" src={logo} />
            <div className="flex flex-col leading-tight">
              <span className="text-foreground text-sm font-bold">ปปง.</span>
              <span className="text-muted text-xs">ปราบปรามการฟอกเงิน</span>
            </div>
          </div>
          <p className="text-muted max-w-xs text-sm leading-6">
            สำนักงานป้องกันและปราบปรามการฟอกเงิน หน่วยงานของรัฐที่ดูแลการบังคับใช้กฎหมายว่าด้วยการฟอกเงิน
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-foreground text-sm font-semibold">เมนูหลัก</h3>
          <ul className="flex flex-col gap-2">
            {SITE_NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link className="text-muted hover:text-foreground text-sm no-underline" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-foreground text-sm font-semibold">ติดต่อ</h3>
          <ul className="text-muted flex flex-col gap-2.5 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="text-muted mt-0.5 size-4 shrink-0" />
              <span>เลขที่ 422 ถนนพญาไท แขวงวังใหม่ เขตปทุมวัน กรุงเทพฯ 10330</span>
            </li>
            <li className="flex items-center gap-2">
              <Envelope className="text-muted size-4 shrink-0" />
              <Link className="text-muted hover:text-foreground no-underline" href="mailto:contact@amlo.go.th">
                contact@amlo.go.th
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-foreground text-sm font-semibold">สายด่วน</h3>
          <p className="text-foreground text-2xl font-bold tabular-nums">1710</p>
          <p className="text-muted text-sm">แจ้งเบาะแส / สอบถามข้อมูล ทุกวันจันทร์–ศุกร์</p>
          <Link
            className="text-accent inline-flex items-center gap-1.5 text-sm no-underline"
            href="https://facebook.com"
          >
            <LogoFacebook className="size-4" />
            ติดตามเราบน Facebook
          </Link>
        </div>
      </div>

      <div className="border-separator border-t">
        <div className="text-muted mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-5 text-xs sm:flex-row">
          <span>© 2569 สำนักงานป้องกันและปราบปรามการฟอกเงิน — ตัวอย่างเทมเพลต (Mockup)</span>
          <span>นโยบายความเป็นส่วนตัว · เงื่อนไขการใช้งาน</span>
        </div>
      </div>
    </footer>
  );
}
