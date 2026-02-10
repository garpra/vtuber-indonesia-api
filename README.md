# VTuber Indonesia API

API untuk mengakses data **VTuber Indonesia** — mulai dari profil, agensi, platform, hingga metadata lainnya. Dibuat untuk developer yang ingin mengintegrasikan data VTuber Indonesia ke dalam aplikasi mereka.

## Tech Stack

| Teknologi               | Fungsi                  |
| ----------------------- | ----------------------- |
| Node.js                 | Runtime JavaScript      |
| Express.js              | Web framework REST API  |
| SQLite (better-sqlite3) | Database berbasis file  |
| Joi                     | Validasi schema request |
| Morgan                  | HTTP request logger     |
| Jest + Supertest        | Testing framework       |

## Cara Menjalankan

### Prasyarat

Pastikan sudah terinstall di komputermu:

- [Node.js](https://nodejs.org) v18 atau lebih baru
- npm (sudah termasuk saat install Node.js)

### Instalasi

**1. Clone repository**

```bash
git clone https://github.com/garpra/vtuber-indonesia-api.git
cd vtuber-indonesia-api
```

**2. Install dependencies**

```bash
npm install
```

**3. Setup environment**

```bash
cp .env.example .env
```

**4. Setup database**

```bash
# Buat tabel
npm run db:migrate

# Isi data awal
npm run db:seed
```

**5. Jalankan server**

```bash
# Development (auto-restart saat ada perubahan)
npm run dev

# Production
npm start
```

Server berjalan di `http://localhost:3000`

## API Endpoints

Base URL: `http://localhost:3000/api/v1`

| Method   | Endpoint       | Deskripsi                   |
| -------- | -------------- | --------------------------- |
| `GET`    | `/vtubers`     | Ambil semua VTuber          |
| `GET`    | `/vtubers/:id` | Ambil detail satu VTuber    |
| `POST`   | `/vtubers`     | Tambah VTuber baru          |
| `PUT`    | `/vtubers/:id` | Update penuh data VTuber    |
| `PATCH`  | `/vtubers/:id` | Update sebagian data VTuber |
| `DELETE` | `/vtubers/:id` | Hapus data VTuber           |
| `GET`    | `/health`      | Cek status API              |

### Query Parameters (GET /vtubers)

| Parameter  | Tipe   | Deskripsi                                                   |
| ---------- | ------ | ----------------------------------------------------------- |
| `search`   | string | Cari berdasarkan nama                                       |
| `agency`   | string | Filter berdasarkan agensi                                   |
| `platform` | string | Filter berdasarkan platform                                 |
| `status`   | string | Filter berdasarkan status (`active`, `graduated`, `hiatus`) |
| `page`     | number | Halaman ke- (default: 1)                                    |
| `limit`    | number | Jumlah data per halaman (default: 10, max: 100)             |

### Contoh Request

```bash
# Ambil semua VTuber Hololive yang aktif
GET /api/v1/vtubers?agency=Hololive&status=active

# Cari VTuber dengan nama "kobo"
GET /api/v1/vtubers?search=kobo

# Ambil halaman ke-2 dengan 5 data per halaman
GET /api/v1/vtubers?page=2&limit=5
```

### Contoh Response

```json
{
  "success": true,
  "message": "All Vtuber found!",
  "data": {
    "data": [
      {
        "id": 1,
        "name": "Kobo Kanaeru",
        "nickname": "Kobo",
        "agency": "Hololive",
        "generation": "HoloID Gen 3",
        "platform": "YouTube",
        "youtube_subscribers": 1300000,
        "status": "active",
        "tags": ["gaming", "singing", "zatsudan"]
      }
    ],
    "pagination": {
      "total": 45,
      "page": 1,
      "limit": 10,
      "totalPages": 5,
      "offset": 0
    }
  }
}
```

## Testing

```bash
npm test
```

## Struktur Project

```
vtuber-indonesia-api/
├── src/
│   ├── controllers/    # Handle request & response
│   ├── services/       # Business logic & query database
│   ├── routes/         # Definisi endpoint
│   ├── middleware/     # Validation & error handler
│   ├── validators/     # Joi schema
│   ├── database/       # Koneksi, migration, seeding
│   └── utils/          # Helper functions
├── tests/
│   └── integration/    # Integration test
├── schema.sql          # Skema tabel database
├── seed.sql            # Data awal (opsional)
└── .env.example        # Template konfigurasi
```

## Environment Variables

Salin `.env.example` ke `.env` lalu sesuaikan nilainya:

| Variable      | Default             | Deskripsi                 |
| ------------- | ------------------- | ------------------------- |
| `PORT`        | `3000`              | Port server               |
| `NODE_ENV`    | `development`       | Environment aplikasi      |
| `DB_PATH`     | `./data/vtubers.db` | Path file database SQLite |
| `API_VERSION` | `v1`                | Versi API                 |
| `LOG_FORMAT`  | `dev`               | Format log Morgan         |
