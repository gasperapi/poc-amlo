export type SiteNavItem = {
  readonly href: string;
  readonly label: string;
};

export const SITE_NAV_ITEMS: readonly SiteNavItem[] = [
  {href: "/", label: "หน้าแรก"},
  {href: "/news", label: "ข่าวสาร"},
  {href: "/events", label: "กิจกรรม"},
  {href: "/social", label: "โซเชียล"},
  {href: "/faq", label: "คำถามที่พบบ่อย"},
] as const;
