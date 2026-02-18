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

### Auto Deploy ไป VPS ด้วย GitHub Actions (push แล้ว deploy อัตโนมัติ)
1. ไปที่ GitHub repo > `Settings` > `Secrets and variables` > `Actions`
2. เพิ่ม Secrets:
   - `VPS_HOST` = IP หรือโดเมน VPS
   - `VPS_USER` = user SSH (แนะนำ `root`)
   - `VPS_SSH_KEY` = private key สำหรับเข้า VPS
   - `VPS_PORT` = optional (default 22)
3. (Optional) เพิ่ม Variables:
   - `DEPLOY_BRANCH` (default ใช้ branch ที่ trigger)
   - `APP_DIR` (default `/var/www/haven_service`)
   - `APP_NAME` (default `haven-service`)
   - `REPO_URL` (default `https://github.com/<owner>/<repo>.git`)
4. ไฟล์ workflow อยู่ที่ `.github/workflows/deploy-vps.yml`
5. จากนี้แค่ push เข้า `main` ระบบจะ deploy ให้เองอัตโนมัติ

หมายเหตุ: ถ้า VPS ยังไม่เคย setup มาก่อน workflow จะ bootstrap ให้ครั้งแรก แล้วรอบถัดไปจะเป็น deploy ปกติ

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
