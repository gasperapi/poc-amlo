// Mock content for the ปปง. public template (POC). No backend — all data is static.
// Images sourced from amlo.go.th and sub-sites (pdss.amlo.go.th, sed.amlo.go.th galleries).

export type NewsCategory = "ข่าวด่วน" | "ประกาศ" | "ผลการดำเนินงาน" | "เตือนภัย";

export type NewsItem = {
  readonly id: string;
  readonly title: string;
  readonly excerpt: string;
  readonly category: NewsCategory;
  readonly date: string;
  readonly readTime: string;
  readonly image: string;
  readonly isBreaking?: boolean;
};

export const NEWS_ITEMS: readonly NewsItem[] = [
  {
    category: "ข่าวด่วน",
    date: "3 ก.ค. 2569",
    excerpt:
      "ปปง. อายัดทรัพย์สินเครือข่ายขบวนการหลอกลวงลงทุนออนไลน์ มูลค่ารวมกว่า 850 ล้านบาท พร้อมประสานหน่วยงานที่เกี่ยวข้องเร่งคืนเงินผู้เสียหาย",
    id: "n1",
    image: "/images/amlo/news/news-1.jpeg",
    isBreaking: true,
    readTime: "อ่าน 3 นาที",
    title: "อายัดทรัพย์เครือข่ายหลอกลงทุนออนไลน์ กว่า 850 ล้านบาท",
  },
  {
    category: "เตือนภัย",
    date: "2 ก.ค. 2569",
    excerpt:
      "แจ้งเตือนประชาชนระวังมิจฉาชีพแอบอ้างเป็นเจ้าหน้าที่ ปปง. โทรศัพท์ข่มขู่ให้โอนเงินเข้าบัญชีเพื่อตรวจสอบ ย้ำ ปปง. ไม่มีนโยบายดังกล่าว",
    id: "n2",
    image: "/images/amlo/news/news-2.jpeg",
    isBreaking: true,
    readTime: "อ่าน 2 นาที",
    title: "เตือนภัย! มิจฉาชีพแอบอ้างเป็นเจ้าหน้าที่ ปปง. หลอกโอนเงิน",
  },
  {
    category: "ประกาศ",
    date: "30 มิ.ย. 2569",
    excerpt:
      "ประกาศรายชื่อบุคคลที่ถูกกำหนดตามมาตรา 6 แห่งพระราชบัญญัติป้องกันและปราบปรามการสนับสนุนทางการเงินแก่การก่อการร้าย ฉบับล่าสุด",
    id: "n3",
    image: "/images/amlo/news/news-3.jpeg",
    readTime: "อ่าน 4 นาที",
    title: "ประกาศรายชื่อบุคคลที่ถูกกำหนด ฉบับล่าสุด",
  },
  {
    category: "ผลการดำเนินงาน",
    date: "28 มิ.ย. 2569",
    excerpt:
      "สรุปผลการดำเนินงานไตรมาส 2/2569 ปปง. ดำเนินการยึด อายัดทรัพย์สินรวมกว่า 3,200 ล้านบาท และส่งเรื่องดำเนินคดีกว่า 120 ราย",
    id: "n4",
    image: "/images/amlo/news/news-4.png",
    readTime: "อ่าน 5 นาที",
    title: "สรุปผลการดำเนินงานไตรมาส 2/2569",
  },
  {
    category: "ประกาศ",
    date: "25 มิ.ย. 2569",
    excerpt:
      "เปิดรับฟังความคิดเห็นร่างกฎกระทรวงว่าด้วยการตรวจสอบเพื่อทราบข้อเท็จจริงเกี่ยวกับลูกค้า (KYC) สำหรับสถาบันการเงิน",
    id: "n5",
    image: "/images/amlo/news/news-5.png",
    readTime: "อ่าน 3 นาที",
    title: "เปิดรับฟังความคิดเห็นร่างกฎกระทรวงด้าน KYC",
  },
  {
    category: "เตือนภัย",
    date: "22 มิ.ย. 2569",
    excerpt:
      "เตือนภัยรูปแบบการฟอกเงินผ่านสินทรัพย์ดิจิทัล พร้อมแนะแนวทางสังเกตธุรกรรมที่ผิดปกติสำหรับประชาชนและผู้ประกอบธุรกิจ",
    id: "n6",
    image: "/images/amlo/news/news-6.png",
    readTime: "อ่าน 4 นาที",
    title: "รู้ทันรูปแบบการฟอกเงินผ่านสินทรัพย์ดิจิทัล",
  },
];

export type EventItem = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly day: string;
  readonly month: string;
  readonly time: string;
  readonly location: string;
  readonly type: string;
  readonly seatsLeft?: number;
};

export const EVENTS: readonly EventItem[] = [
  {
    day: "12",
    description:
      "อบรมให้ความรู้แก่ผู้ประกอบวิชาชีพเกี่ยวกับหน้าที่การรายงานธุรกรรมและการตรวจสอบลูกค้า",
    id: "e1",
    location: "โรงแรมเซ็นทรา ศูนย์ราชการ กรุงเทพฯ",
    month: "ก.ค.",
    seatsLeft: 24,
    time: "09:00 – 16:00 น.",
    title: "สัมมนาการรายงานธุรกรรมสำหรับผู้ประกอบวิชาชีพ",
    type: "สัมมนา",
  },
  {
    day: "19",
    description:
      "เวทีเสวนาแนวทางความร่วมมือระหว่างหน่วยงานในการสกัดกั้นบัญชีม้าและแก๊งคอลเซ็นเตอร์",
    id: "e2",
    location: "ออนไลน์ผ่าน Zoom Webinar",
    month: "ก.ค.",
    seatsLeft: 180,
    time: "13:30 – 15:30 น.",
    title: "เสวนาออนไลน์: ตัดวงจรบัญชีม้าและคอลเซ็นเตอร์",
    type: "เสวนาออนไลน์",
  },
  {
    day: "05",
    description:
      "กิจกรรมให้ความรู้ประชาชนเรื่องภัยการเงินและการป้องกันตนเองจากมิจฉาชีพ พร้อมบูธให้คำปรึกษา",
    id: "e3",
    location: "ศูนย์การค้าเซ็นทรัลเวิลด์ กรุงเทพฯ",
    month: "ส.ค.",
    time: "10:00 – 18:00 น.",
    title: "AMLO Roadshow รู้ทันภัยการเงิน",
    type: "นิทรรศการ",
  },
  {
    day: "21",
    description:
      "การประชุมวิชาการประจำปีด้านการป้องกันและปราบปรามการฟอกเงิน แลกเปลี่ยนองค์ความรู้ระดับสากล",
    id: "e4",
    location: "ศูนย์การประชุมแห่งชาติสิริกิติ์",
    month: "ส.ค.",
    seatsLeft: 60,
    time: "08:30 – 17:00 น.",
    title: "การประชุมวิชาการประจำปี AML/CFT 2569",
    type: "ประชุมวิชาการ",
  },
];

export type SocialPlatform = "tiktok" | "instagram" | "facebook";

export type SocialPost = {
  readonly id: string;
  readonly platform: SocialPlatform;
  readonly caption: string;
  readonly thumbnail: string;
  readonly author: string;
  readonly likes: string;
  readonly comments: string;
  readonly views?: string;
};

export const SOCIAL_POSTS: readonly SocialPost[] = [
  {
    author: "@amlo.thailand",
    caption: "3 สัญญาณเตือน! เว็บลงทุนปลอมที่ต้องรีบหนี 🚩 #รู้ทันภัยการเงิน",
    comments: "1.2K",
    id: "s1",
    likes: "48.2K",
    platform: "tiktok",
    thumbnail: "/images/amlo/social/social-1.png",
    views: "1.8M",
  },
  {
    author: "amlo_thailand",
    caption: "อินโฟกราฟิก: ขั้นตอนแจ้งเบาะแสการฟอกเงินผ่านสายด่วน 1710",
    comments: "312",
    id: "s2",
    likes: "9.4K",
    platform: "instagram",
    thumbnail: "/images/amlo/social/social-2.jpeg",
  },
  {
    author: "@amlo.thailand",
    caption: "บัญชีม้าคืออะไร? ทำไมถึงผิดกฎหมาย มาดูกัน 👀 #บัญชีม้า",
    comments: "876",
    id: "s3",
    likes: "63.1K",
    platform: "tiktok",
    thumbnail: "/images/amlo/social/social-3.jpeg",
    views: "2.4M",
  },
  {
    author: "สำนักงาน ปปง.",
    caption: "สรุปผลปฏิบัติการอายัดทรัพย์เครือข่ายหลอกลงทุน มูลค่ากว่า 850 ล้านบาท",
    comments: "540",
    id: "s4",
    likes: "12.7K",
    platform: "facebook",
    thumbnail: "/images/amlo/social/social-4.jpeg",
  },
  {
    author: "amlo_thailand",
    caption: "เช็กก่อนโอน! วิธีตรวจสอบบัญชีต้องสงสัยด้วยตัวเอง",
    comments: "205",
    id: "s5",
    likes: "7.8K",
    platform: "instagram",
    thumbnail: "/images/amlo/social/social-5.jpeg",
  },
  {
    author: "@amlo.thailand",
    caption: "มิจฉาชีพแอบอ้าง ปปง. โทรมาแบบนี้ อย่าเชื่อเด็ดขาด! ☎️❌",
    comments: "2.1K",
    id: "s6",
    likes: "91.5K",
    platform: "tiktok",
    thumbnail: "/images/amlo/social/social-6.jpeg",
    views: "3.1M",
  },
];

export type FaqItem = {
  readonly question: string;
  readonly answer: string;
};

export const FAQS: readonly FaqItem[] = [
  {
    answer:
      "สามารถแจ้งเบาะแสได้หลายช่องทาง ได้แก่ สายด่วน 1710 ตลอด 24 ชั่วโมง, ระบบแจ้งเบาะแสออนไลน์บนเว็บไซต์ หรือยื่นหนังสือด้วยตนเอง ณ สำนักงาน ปปง. โดยข้อมูลผู้แจ้งจะถูกเก็บเป็นความลับ",
    question: "ต้องการแจ้งเบาะแสการฟอกเงิน สามารถทำได้ทางไหนบ้าง?",
  },
  {
    answer:
      "ปปง. ไม่มีนโยบายโทรศัพท์ให้ประชาชนโอนเงินเพื่อตรวจสอบหรือปลดอายัดบัญชี หากได้รับสายลักษณะนี้ให้วางสายทันทีและโทรตรวจสอบที่สายด่วน 1710",
    question: "ได้รับสายอ้างว่าเป็นเจ้าหน้าที่ ปปง. ให้โอนเงิน ควรทำอย่างไร?",
  },
  {
    answer:
      "เมื่อทรัพย์สินถูกอายัด ผู้มีส่วนได้เสียสามารถยื่นคำร้องขอคุ้มครองสิทธิต่อพนักงานเจ้าหน้าที่ภายในระยะเวลาที่กฎหมายกำหนด พร้อมแสดงหลักฐานว่าเป็นเจ้าของที่แท้จริงและได้ทรัพย์มาโดยสุจริต",
    question: "หากทรัพย์สินถูกอายัด จะขอคืนหรือคุ้มครองสิทธิได้อย่างไร?",
  },
  {
    answer:
      "สถาบันการเงินและผู้ประกอบวิชาชีพตามที่กฎหมายกำหนด มีหน้าที่รายงานธุรกรรมที่ใช้เงินสดตั้งแต่เกณฑ์ที่กำหนด ธุรกรรมเกี่ยวกับทรัพย์สิน และธุรกรรมที่มีเหตุอันควรสงสัย ต่อสำนักงาน ปปง.",
    question: "ธุรกรรมแบบใดบ้างที่ต้องรายงานต่อ ปปง.?",
  },
  {
    answer:
      "บัญชีม้าคือบัญชีที่เปิดหรือให้ผู้อื่นใช้เพื่อรับโอนเงินจากการกระทำผิด ผู้เปิดหรือให้ใช้บัญชีมีความผิดตามกฎหมาย มีโทษทั้งจำและปรับ จึงไม่ควรให้ผู้อื่นใช้บัญชีของตนโดยเด็ดขาด",
    question: "บัญชีม้าคืออะไร และมีความผิดอย่างไร?",
  },
  {
    answer:
      "ประชาชนสามารถติดตามข่าวสาร ประกาศ และกิจกรรมได้ที่เว็บไซต์ ปปง. รวมถึงช่องทางโซเชียลมีเดียอย่างเป็นทางการ ทั้ง Facebook, TikTok และ Instagram ของสำนักงาน",
    question: "ติดตามข่าวสารและกิจกรรมของ ปปง. ได้ที่ช่องทางใด?",
  },
];

// Popular quick-search suggestions surfaced under the hero search box.
export const SEARCH_SUGGESTIONS: readonly string[] = [
  "แจ้งเบาะแส",
  "ตรวจสอบรายชื่อบุคคลที่ถูกกำหนด",
  "บัญชีม้า",
  "การรายงานธุรกรรม",
  "ขอคุ้มครองสิทธิในทรัพย์สิน",
  "สายด่วน 1710",
];
