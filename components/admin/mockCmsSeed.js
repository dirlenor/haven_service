import { buildServiceContentTemplate, stringifyServiceContent } from "../../lib/serviceContent";

const partitionTemplate = buildServiceContentTemplate({
  serviceLabel: "ฉากกั้นห้อง",
  heroImageUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuApi2CxZcES08srhoQL-lOpvfNWrWS0vN1GOM9uhRSTRUZyxmBAzTdtx3BM_87IOBKUjGpqcRKuYqeqKJHS9X848cZq8viVwq_dGXqKgwt8mwdBcB0lb6OnUBSiMvOEikfh8IX7zdPe59IHhEL3gDFa-rg7nBm0gdUw87KQPG8oc9G5pdEHzVgm-w5b_2lSywyesmZqD8RkBCPI6MyxWrbvg2AQuF_HMLkrDkcr0sdXuWmumnjbFKfekbyB5vDkKo00scaSJWtp3gxv",
  heroImageAlt: "ฉากกั้นห้อง"
});

partitionTemplate.hero.subtitle =
  "ฉากกั้นห้อง คือการแบ่งพื้นที่ภายในให้เป็นสัดส่วน โดยไม่ต้องก่อผนังถาวร เหมาะทั้งบ้าน ออฟฟิศ และหน้าร้าน ช่วยให้พื้นที่ใช้งานชัดเจนและยืดหยุ่นมากขึ้น";
partitionTemplate.intro.title = "ฉากกั้นห้อง";
partitionTemplate.intro.items = [
  {
    heading: "ทำไมต้องติดฉากกั้นห้อง",
    body: "แบ่งพื้นที่ใช้งานให้ชัดเจน ติดตั้งง่าย ไม่กระทบโครงสร้างหลัก และปรับรูปแบบได้ตามการใช้งาน"
  },
  {
    heading: "ฉากกั้นห้องช่วยกั้นแอร์ได้อย่างไร",
    body: "ลดการรั่วไหลของอากาศเย็น ทำให้แอร์เย็นเร็วขึ้น รักษาอุณหภูมิได้ดี และช่วยประหยัดพลังงานในระยะยาว"
  },
  {
    heading: "ช่วยเก็บเสียงและเพิ่มความเป็นส่วนตัว",
    body: "ลดเสียงรบกวนระหว่างพื้นที่ เพิ่มความเป็นส่วนตัว เหมาะกับห้องทำงาน ออฟฟิศ ห้องประชุม และพื้นที่ที่ต้องการความสงบ"
  }
];
partitionTemplate.intro.image = {
  url: "https://lh3.googleusercontent.com/aida-public/AB6AXuApi2CxZcES08srhoQL-lOpvfNWrWS0vN1GOM9uhRSTRUZyxmBAzTdtx3BM_87IOBKUjGpqcRKuYqeqKJHS9X848cZq8viVwq_dGXqKgwt8mwdBcB0lb6OnUBSiMvOEikfh8IX7zdPe59IHhEL3gDFa-rg7nBm0gdUw87KQPG8oc9G5pdEHzVgm-w5b_2lSywyesmZqD8RkBCPI6MyxWrbvg2AQuF_HMLkrDkcr0sdXuWmumnjbFKfekbyB5vDkKo00scaSJWtp3gxv",
  alt: "ผลงานฉากกั้นห้อง"
};
partitionTemplate.types.items = [
  {
    title: "ฉากกั้นห้องสไตล์ญี่ปุ่น",
    description:
      "ฉากกั้นห้องที่เน้นความเรียบง่าย โปร่งสบาย และสมดุล ได้รับแรงบันดาลใจจากงานออกแบบแบบญี่ปุ่น เหมาะกับผู้ที่ต้องการแบ่งพื้นที่ แต่ยังอยากให้บรรยากาศดูโล่งและอบอุ่น",
    fitTitle: "เหมาะกับ",
    fitList: ["บ้านพักอาศัย, ห้องนั่งเล่น, ห้องทำงาน", "ร้านที่ต้องการบรรยากาศสงบ เป็นธรรมชาติ"],
    highlightTitle: "จุดเด่น",
    highlightList: ["ดีไซน์เรียบ สบายตา", "ช่วยแบ่งพื้นที่โดยไม่ทำให้ห้องดูอึดอัด", "เข้ากับสไตล์มินิมอลและญี่ปุ่น"],
    image: {
      url: "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=900&q=80",
      alt: "ฉากกั้นห้องสไตล์ญี่ปุ่น"
    }
  }
];
partitionTemplate.specs.cards = [
  {
    title: "วัสดุ",
    items: [
      {
        text: "กระจกใส / กระจกฝ้า",
        image: {
          url: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=200&q=80",
          alt: "กระจกใส"
        }
      },
      {
        text: "อะลูมิเนียม",
        image: {
          url: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=200&q=80",
          alt: "อลูมิเนียม"
        }
      },
      {
        text: "PVC",
        image: {
          url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=200&q=80",
          alt: "PVC"
        }
      },
      {
        text: "ไม้หรือไม้เทียม",
        image: {
          url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=200&q=80",
          alt: "ไม้หรือไม้เทียม"
        }
      },
      {
        text: "ผ้า หรือวัสดุผสม",
        image: {
          url: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=200&q=80",
          alt: "ผ้า หรือวัสดุผสม"
        }
      }
    ]
  },
  {
    title: "สี",
    items: [
      {
        text: "โทนใสหรือโปร่ง เพิ่มความโล่ง",
        image: {
          url: "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=200&q=80",
          alt: "โทนใสโปร่ง"
        }
      },
      {
        text: "โทนขาว เทา ดำ ให้ความเรียบ ทันสมัย",
        image: {
          url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=200&q=80",
          alt: "โทนขาวเทาดำ"
        }
      },
      {
        text: "โทนไม้ เพิ่มความอบอุ่น",
        image: {
          url: "https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=200&q=80",
          alt: "โทนไม้"
        }
      },
      {
        text: "เลือกสีให้เข้ากับสไตล์พื้นที่",
        image: {
          url: "https://images.unsplash.com/photo-1505691723518-36a5b1f6df81?auto=format&fit=crop&w=200&q=80",
          alt: "เลือกสี"
        }
      }
    ]
  },
  {
    title: "ขนาด",
    items: [
      {
        text: "ผลิตและติดตั้งตามขนาดพื้นที่จริง",
        image: {
          url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=200&q=80",
          alt: "ขนาดพื้นที่จริง"
        }
      },
      {
        text: "ใช้ได้ทั้งพื้นที่เล็กและพื้นที่ขนาดใหญ่",
        image: {
          url: "https://images.unsplash.com/photo-1505685711294-3008a0c9ff55?auto=format&fit=crop&w=200&q=80",
          alt: "พื้นที่เล็กใหญ่"
        }
      }
    ]
  }
];
partitionTemplate.gallery.images = [
  {
    url: "https://images.unsplash.com/photo-1505692794400-787b69cae2a6?auto=format&fit=crop&w=1200&q=80",
    alt: "ภาพฉากกั้นห้อง 1"
  },
  {
    url: "https://images.unsplash.com/photo-1484637631220-240c4d45d31b?auto=format&fit=crop&w=1200&q=80",
    alt: "ภาพฉากกั้นห้อง 2"
  },
  {
    url: "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1200&q=80",
    alt: "ภาพฉากกั้นห้อง 3"
  },
  {
    url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
    alt: "ภาพฉากกั้นห้อง 4"
  },
  {
    url: "https://images.unsplash.com/photo-1505692794400-787b69cae2a6?auto=format&fit=crop&w=1200&q=80",
    alt: "ภาพฉากกั้นห้อง 5"
  }
];
partitionTemplate.process.steps = [
  {
    number: "01",
    icon: "chat_bubble",
    title: "ปรึกษาและประเมินงาน",
    body: "พูดคุยกับดีไซเนอร์เพื่อสรุปความต้องการและงบประมาณพร้อมแนวทางที่เหมาะสม"
  },
  {
    number: "02",
    icon: "straighten",
    title: "วัดพื้นที่จริง",
    body: "เข้าวัดพื้นที่หน้างานด้วยเครื่องมือเลเซอร์ เพื่อความแม่นยำระดับ 100%"
  },
  {
    number: "03",
    icon: "palette",
    title: "เลือกวัสดุและสรุปแบบ",
    body: "ชมตัวอย่างวัสดุจริงหลายเกรด พร้อมนำเสนอแบบ 3D Final ก่อนลงมือผลิต"
  },
  {
    number: "04",
    icon: "home_work",
    title: "ติดตั้งและส่งมอบงาน",
    body: "ช่างมืออาชีพติดตั้งอย่างรวดเร็ว พร้อมตรวจสอบคุณภาพก่อนส่งมอบบ้านในฝันให้กับคุณ"
  }
];
partitionTemplate.articles.items = [
  {
    image: {
      url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
      alt: "แบบฉากกั้นห้อง"
    },
    categoryLabel: "บทความ",
    title: "เทคนิคเลือกฉากกั้นที่ตอบโจทย์ทั้งแสงและพื้นที่",
    href: "/articles"
  },
  {
    image: {
      url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
      alt: "จัดวางฉากกั้น"
    },
    categoryLabel: "บทความ",
    title: "วางแผนติดตั้งฉากกั้นอย่างมืออาชีพใน 7 วัน",
    href: "/articles"
  },
  {
    image: {
      url: "https://images.unsplash.com/photo-1505692794400-787b69cae2a6?auto=format&fit=crop&w=1200&q=80",
      alt: "ดูแลฉากกั้นห้อง"
    },
    categoryLabel: "บทความ",
    title: "วิธีถนอมวัสดุฉากกั้นให้ดูใหม่เกินเวลา",
    href: "/articles"
  }
];
partitionTemplate.faq.items = [
  {
    question: "Q: ฉากกั้นห้องคืออะไร?",
    answer: "A: โครงกั้นพื้นที่เพื่อแบ่งห้อง เพิ่มความเป็นสัดส่วน"
  },
  {
    question: "Q: ฉากกั้นห้องช่วยกั้นแอร์ได้ไหม?",
    answer: "A: ได้ ช่วยลดการรั่วไหลของแอร์ ประหยัดพลังงาน"
  },
  {
    question: "Q: มีวัสดุอะไรบ้าง?",
    answer: "A: PVC, อะคริลิค, กระจก, งานญี่ปุ่น, งานยูโร"
  }
];
partitionTemplate.ctaSecondary.enabled = true;

export const mockCmsSeed = {
  categories: ["ไอเดียแต่งบ้าน", "คอนโดมิเนียม", "เคล็ดลับ"],
  services: [
    {
      id: "svc-curtains",
      slug: "curtains",
      title: "ฉากกั้นห้อง",
      summary: "ออกแบบและติดตั้งฉากกั้นห้องที่ยืดหยุ่นต่อทุกการใช้งาน",
      heroImage:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuApi2CxZcES08srhoQL-lOpvfNWrWS0vN1GOM9uhRSTRUZyxmBAzTdtx3BM_87IOBKUjGpqcRKuYqeqKJHS9X848cZq8viVwq_dGXqKgwt8mwdBcB0lb6OnUBSiMvOEikfh8IX7zdPe59IHhEL3gDFa-rg7nBm0gdUw87KQPG8oc9G5pdEHzVgm-w5b_2lSywyesmZqD8RkBCPI6MyxWrbvg2AQuF_HMLkrDkcr0sdXuWmumnjbFKfekbyB5vDkKo00scaSJWtp3gxv".trim(),
      status: "draft",
      content: stringifyServiceContent(partitionTemplate)
    }
  ],
  articles: [
    {
      id: "art-trend-2024",
      slug: "color-trends-2024",
      title: "เทรนด์สีทาบ้านปี 2024 ที่จะทำให้บ้านของคุณดูอบอุ่น",
      summary:
        "รวมไอเดียโทนสีที่กำลังมาแรง พร้อมเทคนิคจับคู่สีให้บ้านดูอบอุ่นและเป็นธรรมชาติ",
      category: "ไอเดียแต่งบ้าน",
      date: "2024-01-12",
      readTime: "อ่าน 5 นาที",
      authorName: "ทีมงาน Thai Haven",
      authorRole: "Interior Design Expert",
      authorAvatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAXWE0kEIRMYRBH8llvfe84nWq9tnpXvbU-sV7E64tt9MPh_Fk-j9T_iUBxXGVa62XkVXhNdXjyMV3zTifg0giqUZ3PgUz_rNHO5zrP-yiaFT-pCy9fm2Gc6_B6UOuf-2u1yEjOYwSFkYt_nHNTVJWcBxcjzGwAV1kugLD7hP0TEk02CWVLgnPKsDwOJA7scdCgBzkH0wZp92AcRzMyHL2AwfLS8DeOjAWbRFj5NN3SGVfomIwAX7SnMNUuT54FyNZ96530MZQKdn5w"
          .trim(),
      heroImage:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD5LbwLJC4JP2_I9XPdytLwy4gUXRd8OjvmHK0MiCPLTx9wIMMyK42a4QDt1TeKkGdFpCTiYCYxnARoi3k34pwtcEV4KYBFN2amkpR1yVUmn8cPaxuIwZvndC5aO0q1GQcWyG0qY9qmthd1x3__UOhKR1YHPJciq-npWbGLRbtgqg-lWTqOMl7SiRpzGJIUlS_NwpCRZ0XwxQDyoNa7j4dN8A_bwI8ZB9FaEbd1MB2YRrpCOkt5ZN8wMQPphDD8F2892Cy5DKsFn635"
        .trim(),
      status: "draft",
      contentHtml: `<p>เมื่อพูดถึงการเปลี่ยนบรรยากาศในบ้าน “สี” คือองค์ประกอบที่มีพลังมากที่สุด ในปี 2024 นี้เทรนด์การตกแต่งบ้านเน้นไปที่ความรู้สึกอบอุ่น ผ่อนคลาย และใกล้ชิดธรรมชาติ</p>
<h2>1. Peach Fuzz (สีพีชละมุน)</h2>
<p>สีแห่งปี 2024 ที่ให้ความรู้สึกอบอุ่น นุ่มนวล และเป็นมิตร เหมาะสำหรับห้องนั่งเล่นหรือห้องนอน</p>
<h2>2. Warm White &amp; Cream (ขาวอุ่นและครีม)</h2>
<p>ขาวอมเหลืองและครีมวานิลลา ช่วยให้แสงสะท้อนนุ่มนวล เหมาะกับคนที่ชอบมินิมอลแต่ไม่อยากให้ห้องดูจืด</p>
<h2>3. Nature Green (เขียวธรรมชาติ)</h2>
<p>โทนเขียวธรรมชาติช่วยดึงความสงบเข้ามาในบ้าน ลองทาสีเขียวที่ผนังฝั่งหัวเตียงหรือเลือกโซฟาสีเขียวเข้ม</p>
<blockquote>การเลือกสีทาบ้านไม่ควรดูแค่แคตตาล็อก แต่ควรลองทาลงบนผนังจริงและดูในเวลาที่ต่างกันของวัน</blockquote>
<p>หากต้องการคำแนะนำเพิ่มเติม ทีมงาน Thai Haven Service พร้อมให้คำปรึกษาเสมอ</p>`,
      ctaTitle: "สนใจปรับโฉมบ้านกับเรา?",
      ctaBody: "ปรึกษาฟรี สอบถามราคา หรือนัดหมายวัดหน้างานได้ทันที",
      ctaButtonLabel: "ติดต่อเราเลย",
      ctaButtonHref: "/contact"
    }
  ]
};
