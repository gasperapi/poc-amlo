"use client";

import type {ComponentType, SVGProps} from "react";

import {
  ArrowRight,
  Bell,
  Bookmark,
  Calendar,
  CircleCheck,
  CircleExclamation,
  CircleQuestion,
  Clock,
  Copy,
  Database,
  Eye,
  FileText,
  FolderOpen,
  Gear,
  Lock,
  Magnifier,
  PersonPlus,
  Plus,
  ScalesBalanced,
  ShieldCheck,
  Volume,
  Xmark,
} from "@gravity-ui/icons";
import {Button, Card, Chip, ProgressBar, SearchField, toast} from "@heroui/react";
import {Sheet} from "@heroui-pro/react";
import Image from "next/image";
import {useEffect, useMemo, useState} from "react";

import logo from "../../Anti-Money_Laundering_Office_Logo.png";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;
type Language = "th" | "en";
type Role = "public" | "applicant" | "agency" | "officer" | "executive";
type ServiceId = "complaint" | "rights" | "sanction" | "auction";
type ContrastMode = "normal" | "contrast" | "gray";

type VisitItem = {
  id: string;
  title: string;
  group: string;
  at: string;
  tags: string[];
};

type DraftForm = {
  serviceId: ServiceId;
  name: string;
  phone: string;
  detail: string;
  attachment: string;
};

type ChatMessage = {
  id: string;
  from: "user" | "bot";
  text: string;
};

type NotificationSettings = {
  sound: boolean;
  vibration: boolean;
  banner: boolean;
};

type CmsDraft = {
  title: string;
  category: string;
  language: Language;
  layout: string;
  publishAt: string;
  widgets: string[];
  bannerUrl: string;
  bannerClicks: number;
};

const STORAGE_KEY = "iamlo-prototype-v1";

const ROLE_OPTIONS: Array<{
  id: Role;
  label: string;
  labelEn: string;
  description: string;
  descriptionEn: string;
}> = [
  {
    description: "ข่าวสาร บริการ และ Chatbot",
    descriptionEn: "News, services, and chatbot",
    id: "public",
    label: "ประชาชน",
    labelEn: "Public",
  },
  {
    description: "ติดตามคำร้องและเอกสาร",
    descriptionEn: "Requests, documents, and case tracking",
    id: "applicant",
    label: "ผู้ขอรับบริการ",
    labelEn: "Applicant",
  },
  {
    description: "ข้อมูลประสานงาน API",
    descriptionEn: "Partner APIs and coordination data",
    id: "agency",
    label: "หน่วยงานภายนอก",
    labelEn: "External Agency",
  },
  {
    description: "CMS, notification, config",
    descriptionEn: "CMS, notifications, and configurations",
    id: "officer",
    label: "เจ้าหน้าที่",
    labelEn: "Officer",
  },
  {
    description: "Dashboard และอนุมัติ",
    descriptionEn: "Executive dashboards and approvals",
    id: "executive",
    label: "ผู้บริหาร",
    labelEn: "Executive",
  },
];

const SERVICES: Array<{
  id: ServiceId;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  tag: string;
  tagEn: string;
  icon: IconType;
  tone: string;
  fields: string[];
  fieldsEn: string[];
}> = [
  {
    description: "ยื่นข้อมูลเบาะแส ร้องทุกข์ หรือร้องเรียนการทุจริตเจ้าหน้าที่ พร้อมเลขติดตาม",
    descriptionEn:
      "Submit a complaint, tip-off, or officer misconduct report with a mock tracking number.",
    fields: ["ประเภทเรื่อง", "รายละเอียดเหตุการณ์", "ช่องทางติดต่อ", "แนบหลักฐาน"],
    fieldsEn: ["Case type", "Incident details", "Contact channel", "Evidence attachment"],
    icon: ShieldCheck,
    id: "complaint",
    tag: "บริการประชาชน",
    tagEn: "Citizen Service",
    title: "รับเรื่องร้องเรียนแจ้งเบาะแส",
    titleEn: "Complaint & Tip Submission",
    tone: "text-[#d71920] bg-[#d71920]/10",
  },
  {
    description: "ค้นหาสถานะบัญชี/คดีที่อยู่ระหว่างคุ้มครองสิทธิ และยื่นคำร้องเบื้องต้น",
    descriptionEn:
      "Search protected account or case status and prepare an initial victim rights request.",
    fields: ["เลขบัญชี", "ชื่อบัญชี", "ข้อมูลรายคดี", "เอกสารยืนยันตัวตน"],
    fieldsEn: ["Bank account no.", "Account name", "Case information", "Identity documents"],
    icon: ScalesBalanced,
    id: "rights",
    tag: "คุ้มครองสิทธิ",
    tagEn: "Victim Rights",
    title: "คุ้มครองสิทธิผู้เสียหาย",
    titleEn: "Victim Rights Protection",
    tone: "text-[#0b2f6b] bg-[#0b2f6b]/10",
  },
  {
    description: "ตรวจสอบรายชื่อบุคคลที่ถูกกำหนดจากชื่อ นามสกุล หรือเลขประจำตัว",
    descriptionEn:
      "Search designated persons by name, surname, or personal identification number.",
    fields: ["เลขบัตรประชาชน", "ชื่อ", "นามสกุล", "เหตุผลการค้นหา"],
    fieldsEn: ["National ID", "First name", "Surname", "Search reason"],
    icon: Lock,
    id: "sanction",
    tag: "รายชื่อบุคคลที่ถูกกำหนด",
    tagEn: "Designated Persons",
    title: "สืบค้นประกาศรายชื่อบุคคลที่ถูกกำหนด",
    titleEn: "Designated Persons Search",
    tone: "text-[#111827] bg-[#111827]/10",
  },
  {
    description: "ดูทรัพย์สินรอประมูล ภาพถ่าย ราคาเริ่มต้น และกำหนดการขายทอดตลาด",
    descriptionEn:
      "Browse auction assets with images, starting prices, and scheduled auction dates.",
    fields: ["ประเภททรัพย์", "ช่วงราคา", "จังหวัด", "วันประมูล"],
    fieldsEn: ["Asset type", "Price range", "Province", "Auction date"],
    icon: FolderOpen,
    id: "auction",
    tag: "ขายทอดตลาด",
    tagEn: "Asset Auction",
    title: "ขายทอดตลาดทรัพย์สิน",
    titleEn: "Asset Auction",
    tone: "text-[#0f766e] bg-[#0f766e]/10",
  },
];

const SEARCH_INDEX = [
  ...SERVICES.map((service) => ({
    group: "บริการ",
    groupEn: "Service",
    id: service.id,
    title: service.title,
    titleEn: service.titleEn,
    type: "service" as const,
    tags: [service.tag, ...service.fields],
    tagsEn: [service.tagEn, ...service.fieldsEn],
  })),
  {
    group: "FAQ",
    groupEn: "FAQ",
    id: "faq-complaint",
    tags: ["Chatbot", "FAQ", "แจ้งเบาะแส"],
    tagsEn: ["Chatbot", "FAQ", "Tip submission"],
    title: "แจ้งเบาะแสต้องใช้เอกสารอะไรบ้าง",
    titleEn: "What documents are needed for a tip submission?",
    type: "content" as const,
  },
  {
    group: "ข่าวสาร",
    groupEn: "News",
    id: "news-fake",
    tags: ["ข่าวปลอม", "เตือนภัย", "แก๊งคอลเซ็นเตอร์"],
    tagsEn: ["Fake news", "Fraud alert", "Call center scam"],
    title: "เตือนภัยมิจฉาชีพแอบอ้างเป็นเจ้าหน้าที่ ปปง.",
    titleEn: "Fraud alert: scammers impersonating AMLO officers",
    type: "content" as const,
  },
  {
    group: "นโยบาย",
    groupEn: "Policy",
    id: "policy",
    tags: ["Privacy Policy", "Cookies Policy", "Website Security Policy"],
    tagsEn: ["Privacy Policy", "Cookies Policy", "Website Security Policy"],
    title: "นโยบายเว็บไซต์ ความเป็นส่วนตัว คุกกี้ และความมั่นคงปลอดภัย",
    titleEn: "Website, privacy, cookies, and security policies",
    type: "content" as const,
  },
  {
    group: "Dashboard",
    groupEn: "Dashboard",
    id: "stats",
    tags: ["API", "Dashboard", "สถิติ"],
    tagsEn: ["API", "Dashboard", "Statistics"],
    title: "Dashboard แสดงผลข้อมูลจาก API และสถิติสำคัญ",
    titleEn: "API dashboard and key statistics",
    type: "content" as const,
  },
];

const AUCTION_ITEMS = [
  {
    asset: "คอนโดมิเนียม เขตบางนา",
    assetEn: "Condominium in Bang Na",
    date: "18 ก.ค. 2569",
    dateEn: "18 Jul 2026",
    image: "/images/amlo/news/news-4.png",
    price: "2.85 ลบ.",
    priceEn: "THB 2.85M",
    status: "เปิดลงทะเบียน",
    statusEn: "Registration open",
  },
  {
    asset: "รถยนต์อเนกประสงค์",
    assetEn: "Multi-purpose vehicle",
    date: "25 ก.ค. 2569",
    dateEn: "25 Jul 2026",
    image: "/images/amlo/news/news-5.png",
    price: "790,000 บ.",
    priceEn: "THB 790K",
    status: "รอตรวจสอบเอกสาร",
    statusEn: "Documents pending",
  },
  {
    asset: "ที่ดินพร้อมสิ่งปลูกสร้าง",
    assetEn: "Land with building",
    date: "2 ส.ค. 2569",
    dateEn: "2 Aug 2026",
    image: "/images/amlo/news/news-6.png",
    price: "7.4 ลบ.",
    priceEn: "THB 7.4M",
    status: "ใกล้ปิดรับ",
    statusEn: "Closing soon",
  },
];

const CALENDAR_ITEMS = [
  {date: "12 ก.ค.", dateEn: "12 Jul", label: "อบรม ATS", labelEn: "ATS training", role: "ประชาชน", roleEn: "Public"},
  {date: "18 ก.ค.", dateEn: "18 Jul", label: "ขายทอดตลาด", labelEn: "Asset auction", role: "ผู้ขอรับบริการ", roleEn: "Applicant"},
  {date: "21 ก.ค.", dateEn: "21 Jul", label: "ประชาพิจารณ์กฎหมาย", labelEn: "Legal hearing", role: "หน่วยงานภายนอก", roleEn: "Agency"},
  {date: "31 ก.ค.", dateEn: "31 Jul", label: "รายงานผู้บริหาร", labelEn: "Executive report", role: "ผู้บริหาร", roleEn: "Executive"},
];

const STAT_ITEMS = [
  {label: "มูลค่าทรัพย์รอขายทอดตลาด", labelEn: "Auction asset value", value: "348 ลบ.", valueEn: "THB 348M", trend: "+12%"},
  {label: "คำร้องคุ้มครองสิทธิ", labelEn: "Rights protection requests", value: "1,246", valueEn: "1,246", trend: "+8%"},
  {label: "รายการแจ้งเบาะแสเดือนนี้", labelEn: "Tip submissions this month", value: "2,891", valueEn: "2,891", trend: "+18%"},
  {label: "FAQ ที่ Chatbot ตอบได้", labelEn: "FAQ coverage by chatbot", value: "94%", valueEn: "94%", trend: "+6%"},
];

const DEFAULT_DRAFT: DraftForm = {
  attachment: "",
  detail: "",
  name: "",
  phone: "",
  serviceId: "complaint",
};

const DEFAULT_CMS: CmsDraft = {
  bannerClicks: 128,
  bannerUrl: "https://amlo.go.th/banner/cyber-alert",
  category: "เตือนภัย",
  language: "th",
  layout: "News Focus",
  publishAt: "2026-07-15T09:00",
  title: "เตือนภัยมิจฉาชีพแอบอ้างเป็นเจ้าหน้าที่ ปปง.",
  widgets: ["ข่าวด่วน", "บริการยอดนิยม", "ปฏิทินกิจกรรม", "สถิติสำคัญ"],
};

const DEFAULT_CHAT: ChatMessage[] = [
  {
    from: "bot",
    id: "welcome",
    text: "สวัสดีค่ะ ผู้ช่วย iAMLO ช่วยแนะนำการแจ้งเบาะแส คุ้มครองสิทธิ FAQ และบริการของ ปปง. ได้",
  },
];

const DEFAULT_CHAT_EN: ChatMessage[] = [
  {
    from: "bot",
    id: "welcome",
    text: "Hello, I am the iAMLO assistant. I can help with complaints, victim rights, FAQs, and AMLO public services.",
  },
];

const COPY = {
  en: {
    attachmentPlaceholder: "Attachment filename, e.g. evidence.pdf",
    bannerClickAnalytics: "Banner Click Analytics",
    captchaConfirm: "Verify",
    captchaPassed: "Verified",
    chatbotHeading: "iAMLO Intelligent Assistant",
    chatbotPlaceholder: "Type a question...",
    chatPrompts: ["Submit a complaint", "Victim rights", "Asset auction"],
    clearChat: "Clear chat",
    cmsBody:
      "CMS, preview, translation, layout presets, widget ordering, banner analytics, and duplicate-title alerts",
    cmsLocked:
      "Select Officer or Executive to open the TOR workbench for CMS, Notifications, and Configurations.",
    cmsTitle: "Officer CMS & Config",
    duplicateTitle: "Duplicate title detected. The system alerts the editor before publishing.",
    formBody: "Mock service form with autosaved draft and tracking number",
    heroBody:
      "TOR-aligned prototype for flexible search, citizen services, chatbot, personalization, universal design, registration, CMS, notifications, configurations, and API dashboard mocks. All interactions persist in localStorage.",
    heroCta: "Start Tip Submission",
    heroOfficer: "Try Officer Mode",
    navReset: "Reset",
    notificationsBody: "Toggle sound, vibration, banners, and configure upload policy",
    notificationsTitle: "Notifications",
    noHistory: "No history yet. Click a service or search result to generate Last Visited data.",
    personalizedBody: "Based on the latest clicked topics and interest tags",
    registerBody: "Mock login and registration for 5 user groups",
    saveDraft: "Save Draft",
    searchBody: "Traditional search, tag search, prompt suggestions, and flexible search for services/news/FAQ/policy",
    searchChips: ["Mule account", "Asset auction", "Tip submission", "Designated persons", "Privacy Policy"],
    searchPlaceholder: "Search: mule account, asset auction, Privacy Policy, Dashboard API",
    searchTitle: "Smart Search & Citizen Services",
    send: "Send",
    submit: "Submit Request",
    technicalTitle: "API Dashboard Mock",
    technicalBody: "TOR-specific mock modules: auction, calendar, dashboard, and API integration",
    calendarTitle: "Access-based Event Calendar",
    securityTitle: "Security & Transaction Log",
    uploadConfig: "Upload Config",
    uploadPolicy: "Max 50 MB · MP3, MP4, PDF, WORD, EXCEL",
    userPlaceholder: "Username / ThaiD mock",
    widgetHelp: "Mock Drag & Drop using order controls",
  },
  th: {
    attachmentPlaceholder: "ชื่อไฟล์แนบ เช่น evidence.pdf",
    bannerClickAnalytics: "Banner Click Analytics",
    captchaConfirm: "ยืนยัน",
    captchaPassed: "ผ่านแล้ว",
    chatbotHeading: "ผู้ช่วยอัจฉริยะ iAMLO",
    chatbotPlaceholder: "พิมพ์คำถาม...",
    chatPrompts: ["ยื่นเรื่องร้องเรียน", "คุ้มครองสิทธิ", "ขายทอดตลาด"],
    clearChat: "ล้างแชท",
    cmsBody: "CMS, preview, translation, layout, widget ordering, banner analytics และ duplicate-title notification",
    cmsLocked:
      "เลือก role “เจ้าหน้าที่” หรือ “ผู้บริหาร” ด้านบนเพื่อเปิด workbench ตาม TOR ข้อ CMS / Notifications / Configurations",
    cmsTitle: "Officer CMS & Config",
    duplicateTitle: "พบหัวเรื่องซ้ำ ระบบแจ้งเตือนก่อนเผยแพร่",
    formBody: "ฟอร์มบริการจำลองพร้อม autosave draft และเลขติดตาม",
    heroBody:
      "Prototype ตาม TOR สำหรับค้นหาแบบยืดหยุ่น บริการประชาชน Chatbot, Personalized, Universal Design, Registration, CMS, Notification, Config และ Dashboard API mock ทั้งหมดคลิกเล่นได้และจำ state ผ่าน localStorage",
    heroCta: "เริ่มแจ้งเบาะแส",
    heroOfficer: "ทดลองโหมดเจ้าหน้าที่",
    navReset: "Reset",
    notificationsBody: "เปิด/ปิดเสียง สั่น Banner และกำหนด upload policy",
    notificationsTitle: "Notifications",
    noHistory: "ยังไม่มีประวัติ กดบริการหรือผลค้นหาเพื่อสร้าง Last Visited",
    personalizedBody: "จำจากหัวข้อที่ผู้ใช้คลิกล่าสุดและ tag ที่สนใจ",
    registerBody: "Mock login / registration สำหรับ 5 กลุ่มผู้ใช้งาน",
    saveDraft: "บันทึกแบบร่าง",
    searchBody: "Traditional search, tags search, prompt suggestion และ flexible search สำหรับบริการ/ข่าว/FAQ/Policy",
    searchChips: ["บัญชีม้า", "ขายทอดตลาด", "แจ้งเบาะแส", "รายชื่อบุคคล", "Privacy Policy"],
    searchPlaceholder: "ค้นหา เช่น บัญชีม้า, ขายทอดตลาด, Privacy Policy, Dashboard API",
    searchTitle: "Smart Search & Citizen Services",
    send: "ส่ง",
    submit: "ส่งคำร้อง",
    technicalTitle: "API Dashboard Mock",
    technicalBody: "ตัวอย่างข้อมูลเฉพาะระบบจาก TOR: auction, calendar, dashboard และ API integration",
    calendarTitle: "ปฏิทินกิจกรรมตามสิทธิ์",
    securityTitle: "Security & Transaction Log",
    uploadConfig: "Upload Config",
    uploadPolicy: "สูงสุด 50 MB · MP3, MP4, PDF, WORD, EXCEL",
    userPlaceholder: "ชื่อผู้ใช้งาน / ThaiD mock",
    widgetHelp: "จำลอง Drag & Drop ด้วยปุ่มเลื่อนลำดับ",
  },
} as const;

const NOTIFICATION_OPTIONS = {
  en: [
    {key: "sound" as const, label: "Sound alert", icon: Volume},
    {key: "vibration" as const, label: "Device vibration", icon: Bell},
    {key: "banner" as const, label: "Banner notification", icon: FileText},
  ],
  th: [
    {key: "sound" as const, label: "เสียงแจ้งเตือน", icon: Volume},
    {key: "vibration" as const, label: "สั่นบนอุปกรณ์", icon: Bell},
    {key: "banner" as const, label: "Banner แจ้งเตือน", icon: FileText},
  ],
} as const;

function nowLabel() {
  return new Intl.DateTimeFormat("th-TH", {
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
  }).format(new Date());
}

function useStoredState<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(fallback);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(`${STORAGE_KEY}:${key}`);

      if (raw) setValue(JSON.parse(raw) as T);
    } catch {
      setValue(fallback);
    }
  }, [key]);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(`${STORAGE_KEY}:${key}`, JSON.stringify(value));
    } catch {
      // Demo state still works in-memory when storage is unavailable.
    }
  }, [key, mounted, value]);

  return [value, setValue] as const;
}

function unique<T>(items: T[]) {
  return Array.from(new Set(items));
}

function FlagStripe() {
  return (
    <div aria-hidden className="flex h-2 w-full overflow-hidden rounded-full">
      <span className="flex-1 bg-[#d71920]" />
      <span className="flex-[1.2] bg-white" />
      <span className="flex-[2] bg-[#0b2f6b]" />
      <span className="flex-[1.2] bg-white" />
      <span className="flex-1 bg-[#d71920]" />
    </div>
  );
}

function SectionHeading({
  description,
  icon: Icon,
  title,
}: {
  description?: string;
  icon: IconType;
  title: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#0b2f6b] text-white">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <h2 className="text-foreground text-xl font-semibold">{title}</h2>
        {description ? <p className="text-muted mt-1 max-w-2xl text-sm leading-6">{description}</p> : null}
      </div>
    </div>
  );
}

function TogglePill({
  isActive,
  label,
  onPress,
}: {
  isActive: boolean;
  label: string;
  onPress: () => void;
}) {
  return (
    <Button
      className={isActive ? "bg-[#0b2f6b] text-white" : undefined}
      size="sm"
      variant={isActive ? "primary" : "secondary"}
      onPress={onPress}
    >
      {label}
    </Button>
  );
}

export function PrototypePage() {
  const [language, setLanguage] = useStoredState<Language>("language", "th");
  const [role, setRole] = useStoredState<Role>("role", "public");
  const [visits, setVisits] = useStoredState<VisitItem[]>("visits", []);
  const [draft, setDraft] = useStoredState<DraftForm>("draft", DEFAULT_DRAFT);
  const [chat, setChat] = useStoredState<ChatMessage[]>("chat", DEFAULT_CHAT);
  const [notifications, setNotifications] = useStoredState<NotificationSettings>("notifications", {
    banner: true,
    sound: true,
    vibration: false,
  });
  const [cms, setCms] = useStoredState<CmsDraft>("cms", DEFAULT_CMS);
  const [trackedCases, setTrackedCases] = useStoredState<string[]>("cases", ["AMLO-2569-0710"]);
  const [securityLogs, setSecurityLogs] = useStoredState<string[]>("logs", [
    "Login สำเร็จผ่าน ThaiD",
    "Export Transaction Log",
  ]);
  const [query, setQuery] = useState("");
  const [activeServiceId, setActiveServiceId] = useState<ServiceId>("complaint");
  const [fontScale, setFontScale] = useStoredState<number>("fontScale", 1);
  const [contrastMode, setContrastMode] = useStoredState<ContrastMode>("contrast", "normal");
  const [captchaOk, setCaptchaOk] = useStoredState<boolean>("captcha", false);
  const [chatInput, setChatInput] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const copy = COPY[language];

  const activeService = SERVICES.find((service) => service.id === activeServiceId) ?? SERVICES[0];

  useEffect(() => {
    setChat((current) => {
      if (current.length !== 1 || current[0]?.id !== "welcome") return current;

      return language === "th" ? DEFAULT_CHAT : DEFAULT_CHAT_EN;
    });
  }, [language, setChat]);

  const searchResults = useMemo(() => {
    const clean = query.trim().toLowerCase();

    if (!clean) return SEARCH_INDEX.slice(0, 5);

    return SEARCH_INDEX.filter((item) =>
      [item.title, item.titleEn, item.group, item.groupEn, ...item.tags, ...item.tagsEn].some((text) =>
        text.toLowerCase().includes(clean),
      ),
    );
  }, [query]);

  const interestTags = useMemo(() => {
    const tags = visits.flatMap((visit) => visit.tags);

    return unique(tags).slice(0, 7);
  }, [visits]);

  const recommended = useMemo(() => {
    if (interestTags.length === 0) return SERVICES.slice(0, 3);

    return SERVICES.filter((service) =>
      [service.tag, service.tagEn, ...service.fields, ...service.fieldsEn].some((tag) =>
        interestTags.includes(tag),
      ),
    ).slice(0, 3);
  }, [interestTags]);

  const duplicateTitle = cms.title.trim() === DEFAULT_CMS.title;
  const canUseCms = role === "officer" || role === "executive";

  const recordVisit = (item: {id: string; title: string; group: string; tags: string[]}) => {
    const next: VisitItem = {...item, at: nowLabel()};

    setVisits((current) => [next, ...current.filter((visit) => visit.id !== item.id)].slice(0, 8));
  };

  const selectService = (serviceId: ServiceId) => {
    const service = SERVICES.find((item) => item.id === serviceId) ?? SERVICES[0];

    setActiveServiceId(serviceId);
    setDraft((current) => ({...current, serviceId}));
    recordVisit({
      group: service.tag,
      id: service.id,
      tags: [service.tag, ...service.fields],
      title: service.title,
    });
  };

  const submitDraft = () => {
    const trackingId = `AMLO-2569-${String(Math.floor(Math.random() * 9000) + 1000)}`;

    setTrackedCases((current) => [trackingId, ...current].slice(0, 5));
    setSecurityLogs((current) => [`สร้างคำร้อง ${trackingId}`, ...current].slice(0, 6));
    toast.success("บันทึกคำร้องแล้ว", {
      description: `เลขติดตาม ${trackingId} ถูกบันทึกใน localStorage`,
    });
  };

  const sendChat = (text: string) => {
    const clean = text.trim();

    if (!clean) return;

    const isRights = clean.includes("คุ้มครอง") || clean.toLowerCase().includes("right");
    const isAuction = clean.includes("ขายทอดตลาด") || clean.toLowerCase().includes("auction");
    const answer =
      language === "en"
        ? isRights
          ? "For victim rights, prepare account details, case information, and identity documents. The prototype keeps the draft in localStorage."
          : isAuction
            ? "The auction module shows asset images, starting prices, auction dates, and registration status using local mock data."
            : "Start by selecting a service. The prototype remembers Last Visited, interests, and drafts in localStorage for personalization."
        : isRights
          ? "กรณีคุ้มครองสิทธิ ให้เตรียมเลขบัญชี ชื่อบัญชี รายละเอียดคดี และเอกสารยืนยันตัวตน ระบบจะบันทึก draft ให้กลับมาทำต่อได้"
          : isAuction
            ? "หน้าขายทอดตลาดรองรับภาพทรัพย์ ราคาเริ่มต้น วันประมูล และสถานะการลงทะเบียน โดยข้อมูลนี้เป็น mock สำหรับ prototype"
            : "สามารถเริ่มจากเลือกบริการด้านซ้าย ระบบจะจำ Last Visited, ความสนใจ และ draft ผ่าน localStorage เพื่อจำลอง Personalized service";

    setChat((current) => [
      ...current,
      {from: "user", id: `u-${Date.now()}`, text: clean},
      {from: "bot", id: `b-${Date.now()}`, text: answer},
    ]);
    setChatInput("");
  };

  const saveCms = () => {
    setSecurityLogs((current) => [`บันทึก CMS: ${cms.title}`, ...current].slice(0, 6));
    toast("CMS draft saved", {
      description: "Preview, schedule, layout และ widget order ถูกจำไว้ใน localStorage",
    });
  };

  const moveWidget = (index: number, direction: -1 | 1) => {
    const target = index + direction;

    if (target < 0 || target >= cms.widgets.length) return;
    const widgets = [...cms.widgets];
    const current = widgets[index];

    widgets[index] = widgets[target];
    widgets[target] = current;
    setCms({...cms, widgets});
  };

  const resetDemo = () => {
    [
      "language",
      "role",
      "visits",
      "draft",
      "chat",
      "notifications",
      "cms",
      "cases",
      "logs",
      "fontScale",
      "contrast",
      "captcha",
    ].forEach((key) => localStorage.removeItem(`${STORAGE_KEY}:${key}`));
    window.location.reload();
  };

  const shellClass =
    contrastMode === "contrast"
      ? "bg-black text-white"
      : contrastMode === "gray"
        ? "grayscale"
        : "";

  return (
    <div className={shellClass} style={{fontSize: `${fontScale}rem`}}>
      <div className="border-separator bg-surface/95 sticky top-16 z-30 border-b backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {ROLE_OPTIONS.map((item) => (
              <Button
                key={item.id}
                aria-label={`${item.label}: ${item.description}`}
                className={role === item.id ? "bg-[#0b2f6b] text-white" : undefined}
                size="sm"
                variant={role === item.id ? "primary" : "secondary"}
                onPress={() => {
                  setRole(item.id);
                  setSecurityLogs((current) => [`สลับบทบาทเป็น ${item.label}`, ...current].slice(0, 6));
                }}
              >
                {item.label}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <TogglePill isActive={language === "th"} label="TH" onPress={() => setLanguage("th")} />
            <TogglePill isActive={language === "en"} label="EN" onPress={() => setLanguage("en")} />
            <Button size="sm" variant="secondary" onPress={() => setFontScale(Math.max(0.9, Number((fontScale - 0.05).toFixed(2))))}>
              A-
            </Button>
            <Button size="sm" variant="secondary" onPress={() => setFontScale(Math.min(1.2, Number((fontScale + 0.05).toFixed(2))))}>
              A+
            </Button>
            <Button size="sm" variant={contrastMode === "contrast" ? "primary" : "secondary"} onPress={() => setContrastMode(contrastMode === "contrast" ? "normal" : "contrast")}>
              คอนทราสต์
            </Button>
            <Button size="sm" variant={contrastMode === "gray" ? "primary" : "secondary"} onPress={() => setContrastMode(contrastMode === "gray" ? "normal" : "gray")}>
              ขาวดำ
            </Button>
            <Button size="sm" variant="danger-soft" onPress={resetDemo}>
              รีเซ็ต
            </Button>
          </div>
        </div>
      </div>

      <section className="relative overflow-hidden bg-[#0b2f6b] text-white">
        <div className="absolute inset-x-0 top-0 h-3 bg-[#d71920]" />
        <div className="absolute inset-x-0 top-3 h-3 bg-white" />
        <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-12 pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <Image alt="ตราสัญลักษณ์ ปปง." className="size-14 rounded-full bg-white object-contain p-1" src={logo} />
              <div>
                <p className="text-sm text-white/75">Intelligent AMLO Website Prototype</p>
                <h1 className="text-3xl font-bold leading-tight">
                  iAMLO
                </h1>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className="bg-white text-[#0b2f6b]" variant="tertiary" onPress={() => selectService("complaint")}>
                แจ้งเบาะแส
                <ArrowRight className="size-4" />
              </Button>
              <Button className="border-white/35 text-white" variant="outline" onPress={() => setRole("officer")}>
                สำหรับเจ้าหน้าที่
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-white/18 bg-white/10 p-5 backdrop-blur">
            <FlagStripe />
            <div className="mt-5 grid grid-cols-2 gap-3">
              {STAT_ITEMS.map((item) => (
                <div key={item.label} className="rounded-2xl bg-white/12 p-4">
                  <p className="text-2xl font-bold tabular-nums">
                    {item.value}
                  </p>
                  <p className="mt-1 text-sm leading-5 text-white/72">
                    {item.label}
                  </p>
                  <span className="mt-3 inline-flex rounded-full bg-white px-2 py-0.5 text-xs font-medium text-[#0b2f6b]">
                    {item.trend}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-5 py-10">
        <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="flex min-w-0 flex-col gap-5">
            <SectionHeading
              icon={Magnifier}
              title="ค้นหาข้อมูล"
            />

            <div className="relative">
              <SearchField aria-label="ค้นหาข้อมูลบนเว็บไซต์" value={query} onChange={setQuery}>
                <SearchField.Group className="h-14 rounded-2xl bg-surface px-2 shadow-surface">
                  <SearchField.SearchIcon className="ml-2 size-5" />
                  <SearchField.Input placeholder="ค้นหา เช่น บัญชีม้า, ขายทอดตลาด, แจ้งเบาะแส, รายชื่อบุคคล" />
                  <SearchField.ClearButton />
                </SearchField.Group>
              </SearchField>
              <div className="mt-3 flex flex-wrap gap-2">
                {["บัญชีม้า", "ขายทอดตลาด", "แจ้งเบาะแส", "รายชื่อบุคคล", "นโยบายความเป็นส่วนตัว"].map((item) => (
                  <Button key={item} size="sm" variant="secondary" onPress={() => setQuery(item)}>
                    {item}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {searchResults.map((item) => (
                <button
                  key={item.id}
                  className="border-border bg-surface hover:bg-surface-secondary cursor-pointer rounded-2xl border p-4 text-left shadow-surface"
                  type="button"
                  onClick={() => {
                    if (item.type === "service") selectService(item.id as ServiceId);
                    recordVisit({
                      group: item.group,
                      id: item.id,
                      tags: item.tags,
                      title: item.title,
                    });
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Chip size="sm" variant="soft">
                        {item.group}
                      </Chip>
                      <p className="text-foreground mt-3 text-sm font-semibold leading-6">
                        {item.title}
                      </p>
                      <p className="text-muted mt-2 line-clamp-1 text-xs">
                        {item.tags.join(" · ")}
                      </p>
                    </div>
                    <ArrowRight className="text-muted mt-1 size-4 shrink-0" />
                  </div>
                </button>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {SERVICES.map((service) => {
                const Icon = service.icon;
                const isActive = activeServiceId === service.id;

                return (
                  <Card key={service.id} className={`p-5 ${isActive ? "ring-2 ring-[#d71920]" : ""}`}>
                    <Card.Header className="flex-row items-start gap-3 p-0">
                      <span className={`flex size-11 shrink-0 items-center justify-center rounded-2xl ${service.tone}`}>
                        <Icon className="size-5" />
                      </span>
                      <div className="min-w-0">
                        <Card.Title className="text-base">
                          {language === "th" ? service.title : service.titleEn}
                        </Card.Title>
                        <Card.Description>{service.tag}</Card.Description>
                      </div>
                    </Card.Header>
                    <Card.Content className="px-0 py-4">
                      <p className="text-muted text-sm leading-6">
                        {service.description}
                      </p>
                    </Card.Content>
                    <Card.Footer className="p-0">
                      <Button fullWidth variant={isActive ? "primary" : "secondary"} onPress={() => selectService(service.id)}>
                        เปิดบริการ
                      </Button>
                    </Card.Footer>
                  </Card>
                );
              })}
            </div>
          </div>

          <aside className="flex flex-col gap-5">
            <div className="rounded-3xl bg-[#f8fafc] p-5 dark:bg-white/5">
              <SectionHeading
                icon={Bookmark}
                title="ข้อมูลที่เข้าชมล่าสุด"
              />
              <div className="mt-5 flex flex-col gap-3">
                {visits.length === 0 ? (
                  <p className="text-muted text-sm">ยังไม่มีประวัติการเข้าชม</p>
                ) : (
                  visits.slice(0, 4).map((visit) => (
                    <button
                      key={`${visit.id}-${visit.at}`}
                      className="bg-surface hover:bg-surface-secondary cursor-pointer rounded-2xl p-3 text-left shadow-surface"
                      type="button"
                      onClick={() => recordVisit(visit)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="min-w-0">
                          <span className="text-foreground block truncate text-sm font-medium">{visit.title}</span>
                          <span className="text-muted text-xs">{visit.group} · {visit.at}</span>
                        </span>
                        <Clock className="text-muted mt-1 size-4 shrink-0" />
                      </div>
                    </button>
                  ))
                )}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {recommended.map((service) => (
                  <Chip key={service.id} variant="soft">
                    {service.tag}
                  </Chip>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-[#fff7f7] p-5 dark:bg-white/5">
              <SectionHeading
                icon={PersonPlus}
                title="ลงทะเบียนผู้ใช้งาน"
              />
              <div className="mt-5 space-y-3">
                <input
                  className="border-border bg-surface text-foreground h-11 w-full rounded-xl border px-3 text-sm outline-none"
                  placeholder="ชื่อผู้ใช้งาน / ThaiD"
                  value={draft.name}
                  onChange={(event) => setDraft({...draft, name: event.target.value})}
                />
                <input
                  className="border-border bg-surface text-foreground h-11 w-full rounded-xl border px-3 text-sm outline-none"
                  placeholder="เบอร์โทร / Email"
                  value={draft.phone}
                  onChange={(event) => setDraft({...draft, phone: event.target.value})}
                />
                <div className="border-border bg-surface flex items-center justify-between rounded-2xl border p-4 shadow-surface">
                  <button
                    className="flex min-w-0 items-center gap-3 text-left"
                    type="button"
                    onClick={() => setCaptchaOk(!captchaOk)}
                  >
                    <span
                      className={`flex size-7 shrink-0 items-center justify-center rounded-md border ${
                        captchaOk
                          ? "border-[#0b2f6b] bg-[#0b2f6b] text-white"
                          : "border-border bg-background"
                      }`}
                    >
                      {captchaOk ? <CircleCheck className="size-4" /> : null}
                    </span>
                    <span className="text-foreground text-sm font-medium">
                      {captchaOk ? "ยืนยันความปลอดภัยแล้ว" : "ยืนยันว่าคุณเป็นมนุษย์"}
                    </span>
                  </button>
                  <div className="flex shrink-0 flex-col items-end leading-tight">
                    <span className="text-foreground text-xs font-semibold">Cloudflare</span>
                    <span className="text-muted text-[10px]">Privacy · Terms</span>
                  </div>
                </div>
                <Button fullWidth isDisabled={!captchaOk} onPress={() => {
                  setSecurityLogs((current) => [`Login mock role ${role}`, ...current].slice(0, 6));
                  toast.success(language === "th" ? "เข้าสู่ระบบจำลองแล้ว" : "Mock login completed", {
                    description: language === "th" ? "Session timeout mock: 20 นาที" : "Session timeout mock: 20 minutes",
                  });
                }}>
                  Login with ThaiD
                </Button>
              </div>
            </div>
          </aside>
        </section>

        <section className="grid gap-6 lg:grid-cols-[420px_1fr]">
          <div className="rounded-3xl bg-[#f8fafc] p-5 dark:bg-white/5">
            <SectionHeading
              icon={FileText}
              title={activeService.title}
            />
            <div className="mt-5 space-y-3">
              <textarea
                className="border-border bg-surface text-foreground min-h-32 w-full resize-y rounded-2xl border p-3 text-sm leading-6 outline-none"
                placeholder={
                  `รายละเอียดสำหรับ${activeService.title}`
                }
                value={draft.detail}
                onChange={(event) => setDraft({...draft, detail: event.target.value})}
              />
              <input
                className="border-border bg-surface text-foreground h-11 w-full rounded-xl border px-3 text-sm outline-none"
                placeholder="ชื่อไฟล์แนบ เช่น evidence.pdf"
                value={draft.attachment}
                onChange={(event) => setDraft({...draft, attachment: event.target.value})}
              />
              <div className="grid grid-cols-2 gap-3">
                <Button variant="secondary" onPress={() => toast("Draft saved", {description: "ข้อมูลถูกจำไว้ใน localStorage"})}>
                  บันทึกแบบร่าง
                </Button>
                <Button onPress={submitDraft}>ส่งคำร้อง</Button>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {trackedCases.map((item) => (
                <Chip key={item} variant="soft">
                  {item}
                </Chip>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <SectionHeading
              icon={Database}
              title="บริการข้อมูล"
            />
            <div className="grid gap-4 md:grid-cols-3">
              {AUCTION_ITEMS.map((item) => (
                <Card key={item.asset} className="overflow-hidden p-0">
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      alt={item.asset}
                      className="object-cover"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      src={item.image}
                    />
                  </div>
                  <Card.Content className="p-4">
                    <Chip size="sm" variant="soft">{item.status}</Chip>
                    <h3 className="text-foreground mt-3 text-sm font-semibold">
                      {item.asset}
                    </h3>
                    <p className="text-muted mt-1 text-xs">{item.date}</p>
                    <p className="mt-3 text-lg font-bold tabular-nums">
                      {item.price}
                    </p>
                  </Card.Content>
                </Card>
              ))}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl bg-[#0b2f6b] p-5 text-white">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">ปฏิทินกิจกรรม</h3>
                  <Calendar className="size-5" />
                </div>
                <div className="mt-4 space-y-3">
                  {CALENDAR_ITEMS.map((item) => (
                    <div key={item.label} className="flex items-center gap-3 rounded-2xl bg-white/10 p-3">
                      <span className="w-16 text-sm font-bold">
                        {item.date}
                      </span>
                      <span className="min-w-0 flex-1 text-sm">
                        {item.label}
                      </span>
                      <span className="rounded-full bg-white px-2 py-0.5 text-xs text-[#0b2f6b]">
                        {item.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl bg-[#fff7f7] p-5 dark:bg-white/5">
                <div className="flex items-center justify-between">
                  <h3 className="text-foreground font-semibold">บันทึกการใช้งาน</h3>
                  <ShieldCheck className="text-[#d71920] size-5" />
                </div>
                <div className="mt-4 space-y-2">
                  {securityLogs.map((log, index) => (
                    <div key={`${log}-${index}`} className="flex items-center gap-3 rounded-2xl bg-surface p-3 shadow-surface">
                      <CircleCheck className="text-success size-4 shrink-0" />
                      <span className="text-sm">{log}</span>
                    </div>
                  ))}
                </div>
                <Button className="mt-4" size="sm" variant="secondary" onPress={() => {
                  navigator.clipboard?.writeText(JSON.stringify(securityLogs, null, 2));
                  toast("คัดลอก log แล้ว");
                }}>
                  <Copy className="size-4" />
                  Export JSON
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="flex flex-col gap-5">
            <SectionHeading
              icon={Gear}
              title="จัดการเนื้อหาเว็บไซต์"
            />
            {!canUseCms ? (
              <div className="rounded-3xl border border-dashed border-[#d71920]/40 bg-[#fff7f7] p-6 text-sm text-[#991b1b] dark:bg-white/5 dark:text-white">
                เลือกบทบาทเจ้าหน้าที่หรือผู้บริหารเพื่อเปิดหน้าจัดการเนื้อหา
              </div>
            ) : (
              <div className="grid gap-5 lg:grid-cols-2">
                <div className="rounded-3xl bg-[#f8fafc] p-5 dark:bg-white/5">
                  <div className="space-y-3">
                    <input
                      className="border-border bg-surface text-foreground h-11 w-full rounded-xl border px-3 text-sm outline-none"
                      value={cms.title}
                      onChange={(event) => setCms({...cms, title: event.target.value})}
                    />
                    {duplicateTitle ? (
                      <div className="flex items-center gap-2 rounded-xl bg-warning/10 p-3 text-sm text-warning">
                        <CircleExclamation className="size-4" />
                        {copy.duplicateTitle}
                      </div>
                    ) : null}
                    <div className="grid grid-cols-2 gap-3">
                      <select
                        className="border-border bg-surface text-foreground h-11 rounded-xl border px-3 text-sm outline-none"
                        value={cms.category}
                        onChange={(event) => setCms({...cms, category: event.target.value})}
                      >
                        <option>เตือนภัย</option>
                        <option>ประกาศ</option>
                        <option>ผลการดำเนินงาน</option>
                      </select>
                      <select
                        className="border-border bg-surface text-foreground h-11 rounded-xl border px-3 text-sm outline-none"
                        value={cms.layout}
                        onChange={(event) => setCms({...cms, layout: event.target.value})}
                      >
                        <option>News Focus</option>
                        <option>Service First</option>
                        <option>Dashboard</option>
                        <option>Campaign</option>
                        <option>Minimal</option>
                      </select>
                    </div>
                    <input
                      className="border-border bg-surface text-foreground h-11 w-full rounded-xl border px-3 text-sm outline-none"
                      type="datetime-local"
                      value={cms.publishAt}
                      onChange={(event) => setCms({...cms, publishAt: event.target.value})}
                    />
                    <input
                      className="border-border bg-surface text-foreground h-11 w-full rounded-xl border px-3 text-sm outline-none"
                      value={cms.bannerUrl}
                      onChange={(event) => setCms({...cms, bannerUrl: event.target.value})}
                    />
                    <div className="flex flex-wrap gap-2">
                      <TogglePill isActive={cms.language === "th"} label="หน้า TH" onPress={() => setCms({...cms, language: "th"})} />
                      <TogglePill isActive={cms.language === "en"} label="Page EN" onPress={() => setCms({...cms, language: "en"})} />
                    </div>
                    <Button fullWidth onPress={saveCms}>Preview & Save CMS Draft</Button>
                  </div>
                </div>

                <div className="rounded-3xl bg-[#0b2f6b] p-5 text-white">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="font-semibold">Widget Order</h3>
                      <p className="text-sm text-white/70">จัดลำดับวิดเจ็ตบนหน้าเว็บไซต์</p>
                    </div>
                    <Eye className="size-5" />
                  </div>
                  <div className="mt-4 space-y-2">
                    {cms.widgets.map((widget, index) => (
                      <div key={widget} className="flex items-center gap-2 rounded-2xl bg-white/10 p-3">
                        <span className="flex size-7 items-center justify-center rounded-lg bg-white text-sm font-bold text-[#0b2f6b]">
                          {index + 1}
                        </span>
                        <span className="min-w-0 flex-1 text-sm">{widget}</span>
                        <Button isIconOnly aria-label="เลื่อนขึ้น" size="sm" variant="tertiary" onPress={() => moveWidget(index, -1)}>
                          ↑
                        </Button>
                        <Button isIconOnly aria-label="เลื่อนลง" size="sm" variant="tertiary" onPress={() => moveWidget(index, 1)}>
                          ↓
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 rounded-2xl bg-white p-4 text-[#0b2f6b]">
                    <p className="text-sm font-semibold">สถิติการคลิก Banner</p>
                    <p className="mt-2 text-3xl font-bold tabular-nums">{cms.bannerClicks}</p>
                    <ProgressBar aria-label="Banner click progress" className="mt-3" value={74} />
                    <Button className="mt-4" size="sm" variant="secondary" onPress={() => setCms({...cms, bannerClicks: cms.bannerClicks + 1})}>
                      <Plus className="size-4" />
                      Mock Click
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-3xl bg-[#f8fafc] p-5 dark:bg-white/5">
            <SectionHeading
              icon={Bell}
              title="การแจ้งเตือน"
            />
            <div className="mt-5 space-y-3">
              {NOTIFICATION_OPTIONS.th.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.key} className="flex items-center justify-between rounded-2xl bg-surface p-3 shadow-surface">
                    <span className="flex items-center gap-3 text-sm">
                      <Icon className="text-muted size-4" />
                      {item.label}
                    </span>
                    <Button
                      size="sm"
                      variant={notifications[item.key] ? "primary" : "secondary"}
                      onPress={() => setNotifications({...notifications, [item.key]: !notifications[item.key]})}
                    >
                      {notifications[item.key] ? "เปิด" : "ปิด"}
                    </Button>
                  </div>
                );
              })}
              <div className="rounded-2xl bg-surface p-4 shadow-surface">
                <p className="text-foreground text-sm font-semibold">ตั้งค่าไฟล์อัปโหลด</p>
                <p className="text-muted mt-1 text-sm">สูงสุด 50 MB · MP3, MP4, PDF, WORD, EXCEL</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Button
        aria-label="เปิดผู้ช่วยอัจฉริยะ"
        className="fixed bottom-5 right-5 z-40 bg-[#0b2f6b] text-white shadow-overlay ring-2 ring-white/80 hover:bg-[#123f86] max-sm:size-14 max-sm:rounded-full max-sm:p-0"
        size="lg"
        onPress={() => setChatOpen(true)}
      >
        <CircleQuestion className="size-5" />
        <span className="hidden sm:inline">ผู้ช่วยอัจฉริยะ</span>
      </Button>

      <Sheet isOpen={chatOpen} onOpenChange={setChatOpen}>
        <Sheet.Backdrop variant="blur">
          <Sheet.Content className="mx-auto max-h-[95vh] max-w-[460px]">
            <Sheet.Dialog>
              <Sheet.Handle />
              <Sheet.CloseTrigger />
              <Sheet.Header>
                <Sheet.Heading>{copy.chatbotHeading}</Sheet.Heading>
              </Sheet.Header>
              <Sheet.Body>
                <div className="flex max-h-[420px] flex-col gap-3 overflow-y-auto pr-1">
                  {chat.map((message) => (
                    <div
                      key={message.id}
                      className={`rounded-2xl p-3 text-sm leading-6 ${
                        message.from === "bot"
                          ? "bg-surface-secondary text-foreground"
                          : "ml-8 bg-[#0b2f6b] text-white"
                      }`}
                    >
                      {message.text}
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {copy.chatPrompts.map((prompt) => (
                    <Button key={prompt} size="sm" variant="secondary" onPress={() => sendChat(prompt)}>
                      {prompt}
                    </Button>
                  ))}
                </div>
                <div className="mt-4 flex gap-2">
                  <input
                    className="border-border bg-surface text-foreground h-11 min-w-0 flex-1 rounded-xl border px-3 text-sm outline-none"
                    placeholder={copy.chatbotPlaceholder}
                    value={chatInput}
                    onChange={(event) => setChatInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") sendChat(chatInput);
                    }}
                  />
                  <Button onPress={() => sendChat(chatInput)}>{copy.send}</Button>
                </div>
              </Sheet.Body>
              <Sheet.Footer>
                <Button variant="secondary" onPress={() => setChat(language === "th" ? DEFAULT_CHAT : DEFAULT_CHAT_EN)}>
                  <Xmark className="size-4" />
                  {copy.clearChat}
                </Button>
              </Sheet.Footer>
            </Sheet.Dialog>
          </Sheet.Content>
        </Sheet.Backdrop>
      </Sheet>
    </div>
  );
}
