import {Card} from "@heroui/react";

import {PageHeader} from "../../components/site/page-header";

// Brand palette from the official ปปง. (iAMLO) color guide. These are exact
// brand colors, so they are intentionally hardcoded rather than theme tokens.
const BRAND = {
  // Primary blue matches the site theme accent (azure) so the guide reflects the actual system.
  navy: "#1877E0",
  red: "#E01F26",
  skyblue: "#67B7E8",
  white: "#FFFFFF",
  yellow: "#F5B301",
};

type PrimaryColor = {
  name: string;
  hex: string;
  percent: number;
  meaning: string;
  note: string;
  textOnColor: string;
  bordered?: boolean;
};

const PRIMARY_COLORS: readonly PrimaryColor[] = [
  {
    hex: BRAND.navy,
    meaning: "ความสุขุม สง่างาม และใฝ่เรียนรู้",
    name: "สีน้ำเงิน",
    note: "เป็นหนึ่งในแม่สีที่สร้างสีอื่น ๆ อีกทั้งเป็นสีธงชาติไทยด้วย",
    percent: 50,
    textOnColor: "#FFFFFF",
  },
  {
    hex: BRAND.white,
    bordered: true,
    meaning: "ความโปร่งใส ซื่อสัตย์ และความยุติธรรม",
    name: "สีขาว",
    note: "เป็นสีที่เกิดจากการรวมของทุกสี อีกทั้งเป็นหนึ่งในสีธงชาติไทยด้วย",
    percent: 40,
    textOnColor: "#10316E",
  },
  {
    hex: BRAND.yellow,
    meaning: "ความคิดสร้างสรรค์ มิตรภาพ และสามัคคี",
    name: "สีเหลือง",
    note: "เปรียบเสมือนพื้นดินและแร่ทอง แสดงถึงความเป็นปึกแผ่น",
    percent: 10,
    textOnColor: "#3A2E00",
  },
];

type AccentColor = {
  name: string;
  hex: string;
  meaning: string;
  note: string;
  textOnColor: string;
};

const ACCENT_COLORS: readonly AccentColor[] = [
  {
    hex: BRAND.red,
    meaning: "ความมุ่งมั่น และกล้าหาญ",
    name: "สีแดง",
    note: "ใช้เน้นข้อความหรือส่วนที่ต้องการดึงความสนใจเป็นพิเศษ",
    textOnColor: "#FFFFFF",
  },
  {
    hex: BRAND.skyblue,
    meaning: "ความสงบ และปลอดภัย",
    name: "สีฟ้า",
    note: "เป็นสีที่มีพื้นที่มากที่สุดในโลก เพราะเป็นสีของท้องทะเล",
    textOnColor: "#0A2540",
  },
];

type CoreValue = {
  label: string;
  bg: string;
  text: string;
  bordered?: boolean;
};

const CORE_VALUES: readonly CoreValue[] = [
  {bg: BRAND.red, label: "กล้าหาญ", text: "#FFFFFF"},
  {bg: BRAND.white, bordered: true, label: "ซื่อสัตย์", text: "#10316E"},
  {bg: BRAND.white, bordered: true, label: "ยุติธรรม", text: "#10316E"},
  {bg: BRAND.yellow, label: "สามัคคี", text: "#3A2E00"},
  {bg: BRAND.navy, label: "ใฝ่เรียนรู้", text: "#FFFFFF"},
];

export function ColorGuidePage() {
  return (
    <>
      <PageHeader
        description="แนวทางการใช้สีของระบบตามอัตลักษณ์สำนักงาน ปปง. (โครงการ iAMLO) เพื่อให้การออกแบบสื่อและเว็บไซต์เป็นไปในทิศทางเดียวกัน"
        title="แนวทางการใช้สี (Color Guide)"
      />

      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-5 py-8">
        {/* Primary colors */}
        <section className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-foreground text-xl font-semibold">สีหลัก 3 สี</h2>
            <p className="text-muted text-sm">
              สัดส่วนการใช้สีหลักในการออกแบบสื่อและหน้าจอของระบบ
            </p>
          </div>

          {/* Proportion bar */}
          <div className="flex h-4 w-full overflow-hidden rounded-full">
            {PRIMARY_COLORS.map((c) => (
              <div
                key={c.name}
                className={c.bordered ? "border-border border-y" : ""}
                style={{backgroundColor: c.hex, width: `${c.percent}%`}}
                title={`${c.name} ${c.percent}%`}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {PRIMARY_COLORS.map((color) => (
              <Card key={color.name} className="overflow-hidden p-0">
                <div
                  className={`flex h-32 flex-col justify-between p-5 ${color.bordered ? "border-border border-b" : ""}`}
                  style={{backgroundColor: color.hex, color: color.textOnColor}}
                >
                  <span className="text-sm font-medium opacity-80">{color.name}</span>
                  <span className="text-4xl font-bold leading-none tabular-nums">
                    {color.percent}%
                  </span>
                </div>
                <div className="flex flex-col gap-2 p-4">
                  <p className="text-foreground text-sm font-semibold leading-snug">
                    {color.meaning}
                  </p>
                  <p className="text-muted text-xs leading-5">{color.note}</p>
                  <span className="text-muted mt-1 text-xs font-medium uppercase tabular-nums">
                    {color.hex}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Accent / text-emphasis colors */}
        <section className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-foreground text-xl font-semibold">สีเน้นข้อความ</h2>
            <p className="text-muted text-sm">
              ใช้สำหรับเน้นข้อความหรือองค์ประกอบที่ต้องการดึงความสนใจ
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {ACCENT_COLORS.map((color) => (
              <Card key={color.name} className="flex-row items-stretch gap-4 p-4">
                <div
                  className="border-border flex size-20 shrink-0 items-center justify-center rounded-xl border text-sm font-semibold"
                  style={{backgroundColor: color.hex, color: color.textOnColor}}
                >
                  {color.name}
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
                  <p className="text-foreground text-base font-semibold">{color.meaning}</p>
                  <p className="text-muted text-xs leading-5">{color.note}</p>
                  <span className="text-muted mt-1 text-xs font-medium uppercase tabular-nums">
                    {color.hex}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Core values */}
        <section className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-foreground text-xl font-semibold">
              สอดคล้องกับค่านิยมหลัก (Core Values)
            </h2>
            <p className="text-muted text-sm">
              ชุดสีสะท้อนค่านิยมหลักของสำนักงาน ปปง.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {CORE_VALUES.map((value) => (
              <span
                key={value.label}
                className={`inline-flex min-w-[120px] items-center justify-center rounded-xl px-5 py-3 text-base font-semibold ${value.bordered ? "border-border border" : ""}`}
                style={{backgroundColor: value.bg, color: value.text}}
              >
                {value.label}
              </span>
            ))}
          </div>
        </section>

        <div className="border-separator text-muted border-t pt-6 text-xs">
          อ้างอิงแนวทางการใช้สีจากคู่มืออัตลักษณ์องค์กร สำนักงาน ปปง. (โครงการ iAMLO)
        </div>
      </div>
    </>
  );
}
