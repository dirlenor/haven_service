# Thai Haven Service Website

เว็บไซต์สำหรับ Thai Haven Service - บริการตกแต่งภายในและรีโนเวทบ้าน

## การ Deploy

### VPS (เร็วสุด: bootstrap ครั้งเดียว + deploy คำสั่งเดียว)
1. ตั้งค่า VPS ครั้งแรกจากเครื่องคุณ:
   - `chmod +x vps-bootstrap.sh vps-deploy.sh`
   - `./vps-bootstrap.sh root@<VPS_IP> <REPO_URL> main /var/www/haven_service haven-service`
2. Deploy รอบถัดไป:
   - `./vps-deploy.sh root@<VPS_IP> main /var/www/haven_service haven-service`
3. เช็กสถานะบนเซิร์ฟเวอร์:
   - `ssh root@<VPS_IP> "pm2 status && pm2 logs haven-service --lines 100"`

### Netlify (แนะนำ - ง่ายที่สุด)
1. ไปที่ https://app.netlify.com/drop
2. ลากโฟลเดอร์ `haven_service` ทั้งหมดไปวาง
3. ได้ URL ทันที!

### GitHub Pages
1. สร้าง repository บน GitHub
2. Push code ขึ้นไป
3. ไปที่ Settings > Pages
4. เลือก branch และ folder
5. ได้ URL: `https://username.github.io/repository-name`

### Vercel
1. ติดตั้ง Vercel CLI: `npm i -g vercel`
2. รัน: `vercel` ในโฟลเดอร์นี้
3. ทำตามคำแนะนำ
