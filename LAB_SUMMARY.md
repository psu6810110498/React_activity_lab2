# 📚 สรุปองค์ความรู้: Bookstore API with NestJS

**รายวิชา:** Lab Activity  
**หัวข้อ:** การพัฒนา REST API ด้วย NestJS และ Docker  
**รหัสนักศึกษา:** 6810110498

---

## 1. Docker และ Container Technology

### 1.1 Docker คืออะไร?

Docker เป็นแพลตฟอร์มสำหรับการสร้าง แจกจ่าย และรันแอปพลิเคชันภายใน Container ซึ่งเป็นสภาพแวดล้อมที่แยกตัวออกจากระบบปฏิบัติการหลัก ทำให้สามารถรันแอปพลิเคชันได้อย่างสม่ำเสมอบนทุกเครื่อง

### 1.2 องค์ประกอบหลักของ Docker

| องค์ประกอบ | คำอธิบาย |
|-----------|----------|
| **Image** | แม่แบบที่ใช้สร้าง Container ประกอบด้วยโค้ด, Runtime, Libraries และ Dependencies ทั้งหมด |
| **Container** | Instance ที่รันจาก Image เปรียบเสมือน Virtual Machine แต่เบากว่ามาก |
| **Docker Compose** | เครื่องมือสำหรับกำหนดและรันหลาย Container พร้อมกัน |
| **Volume** | พื้นที่เก็บข้อมูลถาวรที่ไม่หายไปเมื่อ Container หยุดทำงาน |

### 1.3 การใช้งานใน Lab นี้

ในแล็บนี้ใช้ Docker เพื่อรัน PostgreSQL Database โดยไม่ต้องติดตั้งบนเครื่องโดยตรง:

```yaml
# docker-compose.yml
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: password123
      POSTGRES_DB: bookstore_dev
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
```

**คำสั่งที่ใช้:**
- `docker-compose up -d` - รัน Container แบบ Background
- `docker ps` - ดู Container ที่กำลังทำงาน
- `docker-compose down` - หยุด Container

### 1.4 ประโยชน์ของ Docker

1. **Consistency** - แอปทำงานเหมือนกันทุกเครื่อง
2. **Isolation** - แยกสภาพแวดล้อมไม่กระทบระบบหลัก
3. **Portability** - ย้ายแอปไปรันที่ไหนก็ได้
4. **Scalability** - ขยายระบบได้ง่าย

---

## 2. NestJS Framework

### 2.1 NestJS คืออะไร?

NestJS เป็น Framework สำหรับสร้าง Server-side Application ด้วย Node.js โดยใช้ TypeScript เป็นหลัก มีโครงสร้างที่ได้รับแรงบันดาลใจจาก Angular ทำให้โค้ดเป็นระเบียบและบำรุงรักษาง่าย

### 2.2 สถาปัตยกรรมของ NestJS

```
┌─────────────────────────────────────────────────────────┐
│                     NestJS Application                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐   │
│   │   Module    │   │   Module    │   │   Module    │   │
│   │  ┌───────┐  │   │  ┌───────┐  │   │  ┌───────┐  │   │
│   │  │Control│  │   │  │Control│  │   │  │Control│  │   │
│   │  └───┬───┘  │   │  └───┬───┘  │   │  └───┬───┘  │   │
│   │      │      │   │      │      │   │      │      │   │
│   │  ┌───▼───┐  │   │  ┌───▼───┐  │   │  ┌───▼───┐  │   │
│   │  │Service│  │   │  │Service│  │   │  │Service│  │   │
│   │  └───────┘  │   │  └───────┘  │   │  └───────┘  │   │
│   └─────────────┘   └─────────────┘   └─────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 3. NestJS Module

### 3.1 Module คืออะไร?

Module เป็นหน่วยจัดระเบียบโค้ดใน NestJS ทุกแอปพลิเคชันต้องมีอย่างน้อยหนึ่ง Module (AppModule) และสามารถแบ่งเป็น Feature Module ได้

### 3.2 โครงสร้าง Module

```typescript
@Module({
  imports: [TypeOrmModule.forFeature([BookCategory])],  // Module อื่นที่ใช้
  controllers: [BookCategoryController],                // Controllers ในโมดูล
  providers: [BookCategoryService],                     // Services ในโมดูล
  exports: [BookCategoryService],                       // สิ่งที่ให้ Module อื่นใช้
})
export class BookCategoryModule {}
```

### 3.3 Feature Modules ในแล็บนี้

| Module | หน้าที่ |
|--------|---------|
| **AppModule** | Root Module รวม Module ทั้งหมด |
| **BookCategoryModule** | จัดการหมวดหมู่หนังสือ |
| **BookModule** | จัดการหนังสือ |

### 3.4 ประโยชน์ของ Module

1. **Organization** - แยกโค้ดตาม Feature
2. **Encapsulation** - ซ่อน Implementation Details
3. **Reusability** - นำไปใช้ซ้ำได้
4. **Lazy Loading** - โหลดเมื่อจำเป็น

---

## 4. NestJS Controller

### 4.1 Controller คืออะไร?

Controller รับผิดชอบการรับ HTTP Request และส่ง Response กลับไปยัง Client เป็นจุดเชื่อมต่อระหว่าง Client และ Application

### 4.2 Decorators ที่ใช้บ่อย

| Decorator | HTTP Method | ตัวอย่าง |
|-----------|-------------|----------|
| `@Get()` | GET | ดึงข้อมูล |
| `@Post()` | POST | สร้างข้อมูลใหม่ |
| `@Patch()` | PATCH | แก้ไขบางส่วน |
| `@Put()` | PUT | แก้ไขทั้งหมด |
| `@Delete()` | DELETE | ลบข้อมูล |

### 4.3 ตัวอย่าง Controller

```typescript
@Controller('book-category')  // URL prefix: /book-category
export class BookCategoryController {
  constructor(private readonly service: BookCategoryService) {}

  @Post()                                    // POST /book-category
  create(@Body() dto: CreateBookCategoryDto) {
    return this.service.create(dto);
  }

  @Get()                                     // GET /book-category
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')                                // GET /book-category/:id
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')                              // PATCH /book-category/:id
  update(@Param('id') id: string, @Body() dto: UpdateBookCategoryDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')                             // DELETE /book-category/:id
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
```

### 4.4 Parameter Decorators

| Decorator | ใช้ดึงข้อมูลจาก |
|-----------|----------------|
| `@Body()` | Request Body |
| `@Param()` | URL Parameters |
| `@Query()` | Query String |
| `@Headers()` | HTTP Headers |

---

## 5. NestJS Services

### 5.1 Service คืออะไร?

Service เป็นคลาสที่รวบรวม Business Logic และการจัดการข้อมูล แยกออกจาก Controller เพื่อให้โค้ดเป็นระเบียบและทดสอบได้ง่าย

### 5.2 Dependency Injection

NestJS ใช้ Dependency Injection Pattern ทำให้ไม่ต้องสร้าง Instance เอง:

```typescript
@Injectable()  // บอกว่าสามารถ Inject ได้
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly repo: Repository<Book>,  // Inject Repository
  ) {}
}
```

### 5.3 Repository Pattern

ใช้ TypeORM Repository ในการจัดการฐานข้อมูล:

```typescript
@Injectable()
export class BookCategoryService {
  constructor(
    @InjectRepository(BookCategory)
    private readonly repo: Repository<BookCategory>,
  ) {}

  // CRUD Operations
  create(dto) { return this.repo.save(dto); }
  findAll() { return this.repo.find(); }
  findOne(id) { return this.repo.findOneBy({ id }); }
  update(id, dto) { return this.repo.update(id, dto); }
  remove(id) { return this.repo.delete(id); }
}
```

### 5.4 ประโยชน์ของ Service

1. **Separation of Concerns** - แยก Logic ออกจาก Controller
2. **Testability** - ทดสอบ Unit Test ได้ง่าย
3. **Reusability** - ใช้ซ้ำจากหลาย Controller
4. **Maintainability** - บำรุงรักษาง่าย

---

## 6. REST API

### 6.1 REST คืออะไร?

REST (Representational State Transfer) เป็นรูปแบบสถาปัตยกรรมสำหรับออกแบบ Web API โดยใช้ HTTP Methods ในการจัดการ Resources

### 6.2 HTTP Methods และความหมาย

| Method | การใช้งาน | CRUD | ตัวอย่าง |
|--------|----------|------|---------|
| GET | ดึงข้อมูล | Read | `GET /books` |
| POST | สร้างใหม่ | Create | `POST /books` |
| PUT | แก้ไขทั้งหมด | Update | `PUT /books/1` |
| PATCH | แก้ไขบางส่วน | Update | `PATCH /books/1` |
| DELETE | ลบ | Delete | `DELETE /books/1` |

### 6.3 HTTP Status Codes

| Code | ความหมาย | ใช้เมื่อ |
|------|----------|---------|
| 200 | OK | สำเร็จทั่วไป |
| 201 | Created | สร้างข้อมูลสำเร็จ |
| 400 | Bad Request | ข้อมูลไม่ถูกต้อง |
| 404 | Not Found | ไม่พบข้อมูล |
| 500 | Server Error | เกิดข้อผิดพลาดฝั่ง Server |

### 6.4 Validation ด้วย DTO

DTO (Data Transfer Object) ใช้ตรวจสอบข้อมูลก่อนประมวลผล:

```typescript
export class CreateBookCategoryDto {
  @IsString()      // ต้องเป็น string
  @IsNotEmpty()    // ห้ามว่าง
  name: string;

  @IsString()
  @IsOptional()    // ไม่จำเป็นต้องมี
  description?: string;
}
```

### 6.5 Entity Relationships

ใน Phase 4 ได้เรียนรู้การสร้างความสัมพันธ์ระหว่าง Entities:

```typescript
// Many Books → One Category
@ManyToOne(() => BookCategory, (category) => category.id)
category: BookCategory;
```

---

## 7. สรุป

### สิ่งที่ได้เรียนรู้จากแล็บนี้

1. **Docker** - การใช้ Container รัน Database
2. **NestJS Architecture** - Module, Controller, Service Pattern
3. **TypeORM** - ORM สำหรับจัดการฐานข้อมูล
4. **REST API** - การออกแบบ API ตามมาตรฐาน
5. **Validation** - การตรวจสอบข้อมูลด้วย DTO
6. **Relationships** - การเชื่อมความสัมพันธ์ระหว่างตาราง

### ทักษะที่ได้

- สร้าง REST API ด้วย NestJS
- ใช้ Docker รัน PostgreSQL
- ออกแบบ Entity และ Relationships
- ทดสอบ API ด้วย Postman
- เขียน Validation ด้วย class-validator

---

**จัดทำโดย:** 6810110498  
**วันที่:** 17 ธันวาคม 2567
