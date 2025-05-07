# Re-U-Project CN334 Web Development Final Project by Used2becool group

This project use template from TU-PINE Software Engineering CN334 Template for CN334 Webapplication Development.

Create by Dr.[Akkharawoot Takhom](mailto:takkhara@engr.tu.ac.th)(Instructor) and [Tharathon Utasri](mailto:tharathon.ut@gmail.com)(TA)

Includes
 - app_frontend : NextJS template for Front-end Development
 - user_service : Django with Restframework, cors-header, requests and Simple_JWT installed
 - product_service : Django with Restframework, cors-header, requests and Simple_JWT installed
 - data : PostgreSQL Database file

## Requirements
 - Docker and Docker-compose version 2.0+

## Getting Start

To run this dokcer-compose template please folloiwng the instruction following
  1. Build the docker container by following command
  
  ```
  docker-compose build
  ```

  2.  Start the Docker-compose container by following command

  ```
  docker-compose up -d
  ```

## การติดตั้งและรันโปรเจค

1. Clone โปรเจค:
```bash
git clone <repository-url>
cd Re-U-Project
```

2. สร้างโฟลเดอร์ data:
```bash
mkdir -p data/db data/media
```

3. คัดลอกไฟล์รูปภาพ:
- คัดลอกโฟลเดอร์ `data/media` จากเพื่อนร่วมทีมที่พัฒนาโปรเจค

4. Import ข้อมูล:
```bash
# รัน Docker containers
docker-compose up -d

# Import ข้อมูล
docker exec -i re-u-project-product_api-1 python manage.py loaddata product_data.json
```

5. เข้าถึงแอปพลิเคชัน:
- Frontend: http://localhost:3343
- Product API: http://localhost:3341
- User API: http://localhost:3342
- Auth API: http://localhost:3344
- Database: localhost:5432

## ข้อมูลสำหรับการเข้าสู่ระบบ

- Username: cn334Admin
- Password: cn334Admin

## การเข้าถึง Admin Panel

- Product Admin: http://localhost:3341/admin
- User Admin: http://localhost:3342/admin
- Auth Admin: http://localhost:3344/admin
