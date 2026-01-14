# ✅ Website Quality Checklist

ใช้ checklist นี้ทุกครั้งหลังจากแก้ไขไฟล์ HTML/CSS/JS เพื่อให้แน่ใจว่าทุกอย่างทำงานถูกต้องและสอดคล้องกัน

---

## 🎨 Design Consistency

### Navbar
- [ ] Navbar ใช้ component จาก `main.js` (มี `<div id="navbar-container">`)
- [ ] สีพื้นหลัง navbar เหมือนกันทุกหน้า
- [ ] Logo และชื่อบริษัทแสดงถูกต้อง
- [ ] เมนู navigation แสดงถูกต้อง
- [ ] Active state ของเมนูถูกต้อง (หน้าไหน active จะ highlight)
- [ ] ปุ่ม "ขอใบเสนอราคา" แสดงถูกต้อง
- [ ] Responsive: เมนูแสดงถูกต้องบน mobile/tablet/desktop

### Footer
- [ ] Footer มีโครงสร้างเหมือนกันทุกหน้า
- [ ] Logo และชื่อบริษัทแสดงถูกต้อง
- [ ] Social media icons แสดงถูกต้อง
- [ ] ลิงก์ใน footer ถูกต้อง (บริการ, ลิงก์ด่วน, ติดต่อ)
- [ ] ข้อมูลติดต่อถูกต้อง (ที่อยู่, เบอร์โทร, LINE ID)
- [ ] Copyright และ legal links แสดงถูกต้อง
- [ ] Footer รองรับ dark mode

### Colors
- [ ] Primary color เป็น `#d46211` ทุกหน้า
- [ ] Background color เหมือนกันทุกหน้า (`bg-background-light`)
- [ ] Text color เหมือนกันทุกหน้า (`text-[#181411]`)
- [ ] Dark mode colors ถูกต้อง (`dark:bg-background-dark`, `dark:text-white`)

---

## 📄 Page Structure

### HTML Structure
- [ ] Body class ถูกต้อง: `bg-background-light dark:bg-background-dark font-display text-[#181411] dark:text-white`
- [ ] Main structure ถูกต้อง: `<main class="w-full">`
- [ ] Navbar container: `<div id="navbar-container" class="sticky top-0 z-50 w-full"></div>`
- [ ] Footer อยู่นอก `<main>` tag
- [ ] Script loading order ถูกต้อง:
  - [ ] Tailwind CSS CDN โหลดก่อน
  - [ ] `style.css` โหลดก่อน
  - [ ] `tailwind-config.js` โหลดหลัง Tailwind CDN
  - [ ] `main.js` โหลดสุดท้าย

### Scripts & Styles
- [ ] `tailwind-config.js` ถูกโหลด
- [ ] `style.css` ถูกโหลด
- [ ] `main.js` ถูกโหลด (สำหรับ navbar component)
- [ ] Tailwind plugins ถูกต้อง: `forms,container-queries` (หรือ `line-clamp` ถ้าจำเป็น)

---

## 🔗 Links & Navigation

### Internal Links
- [ ] ลิงก์ไปหน้า `index.html` ถูกต้อง
- [ ] ลิงก์ไปหน้า `allservices.html` ถูกต้อง (ไม่ใช่ `services.html`)
- [ ] ลิงก์ไปหน้า `about.html` ถูกต้อง
- [ ] ลิงก์ไปหน้า `articles.html` ถูกต้อง
- [ ] ลิงก์ไปหน้า `contact.html` ถูกต้อง
- [ ] Anchor links (เช่น `#curtains`, `#portfolio`) ถูกต้อง

### Footer Links
- [ ] ลิงก์ในส่วน "บริการ" ชี้ไป `allservices.html#...` ถูกต้อง
- [ ] ลิงก์ในส่วน "ลิงก์ด่วน" ถูกต้อง
- [ ] ลิงก์ social media ถูกต้อง (ถ้ามี)

---

## 📱 Responsive Design

### Mobile (< 768px)
- [ ] Navbar แสดงถูกต้อง (hamburger menu ถ้ามี)
- [ ] Content ไม่ overflow
- [ ] Images responsive
- [ ] Footer แสดงถูกต้อง

### Tablet (768px - 1024px)
- [ ] Layout แสดงถูกต้อง
- [ ] Grid columns ปรับตัวถูกต้อง

### Desktop (> 1024px)
- [ ] Layout แสดงเต็มที่
- [ ] Max-width containers ถูกต้อง (เช่น `max-w-[1280px]`, `max-w-[1440px]`)

---

## 🌓 Dark Mode

- [ ] Dark mode toggle ทำงาน (ถ้ามี)
- [ ] Background colors เปลี่ยนตาม dark mode
- [ ] Text colors เปลี่ยนตาม dark mode
- [ ] Border colors เปลี่ยนตาม dark mode
- [ ] Footer รองรับ dark mode
- [ ] Navbar รองรับ dark mode

---

## ⚡ Performance & Functionality

### JavaScript
- [ ] Navbar component โหลดถูกต้อง
- [ ] Active state logic ทำงานถูกต้อง
- [ ] ไม่มี console errors
- [ ] Event listeners ทำงานถูกต้อง (ถ้ามี)

### Images
- [ ] Images โหลดได้
- [ ] Alt text มีครบถ้วน
- [ ] Images responsive

### Forms (ถ้ามี)
- [ ] Form inputs แสดงถูกต้อง
- [ ] Validation ทำงาน (ถ้ามี)
- [ ] Submit button ทำงาน (ถ้ามี)

---

## 🎯 Page-Specific Checks

### allservices.html
- [ ] Service cards แสดงครบถ้วน
- [ ] Images ใน service cards โหลดได้
- [ ] Hover effects ทำงาน
- [ ] Consultation section แสดงถูกต้อง
- [ ] Background color เป็น `bg-industrial-white` หรือ `bg-background-light`

### index.html
- [ ] Hero section แสดงถูกต้อง
- [ ] Service cards แสดงถูกต้อง
- [ ] Portfolio section แสดงถูกต้อง (ถ้ามี)
- [ ] CTA buttons ทำงาน

### about.html
- [ ] Content แสดงถูกต้อง
- [ ] Images แสดงถูกต้อง

### articles.html
- [ ] Article list แสดงถูกต้อง
- [ ] Pagination ทำงาน (ถ้ามี)

### contact.html
- [ ] Contact form แสดงถูกต้อง
- [ ] Map แสดงถูกต้อง (ถ้ามี)

---

## 🔍 Cross-Browser Testing

- [ ] Chrome/Edge ทำงานถูกต้อง
- [ ] Firefox ทำงานถูกต้อง
- [ ] Safari ทำงานถูกต้อง (ถ้าทดสอบได้)

---

## 📝 Code Quality

### HTML
- [ ] HTML structure ถูกต้อง (semantic HTML)
- [ ] Indentation สม่ำเสมอ
- [ ] ไม่มี unclosed tags
- [ ] Attributes ครบถ้วน (alt, aria-label, etc.)

### CSS
- [ ] Classes ใช้ Tailwind ถูกต้อง
- [ ] Custom CSS ไม่ conflict กับ Tailwind
- [ ] Dark mode classes ครบถ้วน

### JavaScript
- [ ] Code ไม่มี syntax errors
- [ ] Variables ใช้ camelCase
- [ ] Functions มี comments (ถ้าจำเป็น)

---

## 🚨 Common Issues to Check

- [ ] ไม่มี hardcoded colors (ใช้ Tailwind config แทน)
- [ ] ไม่มี duplicate code (ใช้ components แทน)
- [ ] ไม่มี broken links
- [ ] ไม่มี missing images
- [ ] ไม่มี console errors
- [ ] ไม่มี layout shifts (CLS issues)

---

## 📋 Quick Reference

### Standard Body Class
```html
<body class="bg-background-light dark:bg-background-dark font-display text-[#181411] dark:text-white">
```

### Standard Main Structure
```html
<main class="w-full">
    <!-- content -->
</main>
```

### Standard Navbar Container
```html
<div id="navbar-container" class="sticky top-0 z-50 w-full"></div>
```

### Standard Script Loading Order
```html
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link rel="stylesheet" href="assets/css/style.css">
<script src="assets/js/tailwind-config.js"></script>
<!-- ... content ... -->
<script src="assets/js/main.js"></script>
```

### Standard Footer Structure
```html
<footer class="bg-white dark:bg-background-dark border-t border-gray-100 dark:border-gray-800 mt-20">
    <div class="max-w-[1280px] mx-auto px-6 lg:px-10 py-16">
        <!-- footer content -->
    </div>
</footer>
```

---

## 💡 Tips

1. **เปรียบเทียบกับ index.html** - ใช้เป็น reference เพราะเป็นหน้าหลัก
2. **ตรวจสอบ console** - ดู errors หรือ warnings
3. **ทดสอบ responsive** - ใช้ DevTools เปลี่ยนขนาดหน้าจอ
4. **ทดสอบ dark mode** - เปลี่ยน theme และตรวจสอบทุก element
5. **ตรวจสอบ links** - คลิกทุกลิงก์ให้แน่ใจว่าทำงาน

---

**หมายเหตุ**: Checklist นี้ควรใช้ทุกครั้งหลังจากแก้ไขไฟล์ HTML/CSS/JS เพื่อให้แน่ใจว่าทุกอย่างทำงานถูกต้องและสอดคล้องกัน
