# API Documentation

Base URL: `http://localhost:3000/api/v1`

> Semua response menggunakan format JSON.

## Format Response

### Response Sukses

```json
{
  "success": true,
  "message": "pesan sukses",
  "data": { ... }
}
```

### Response Error

```json
{
  "success": false,
  "error": "pesan error",
  "details": ["detail error jika ada"]
}
```

### HTTP Status Code

| Status | Artinya                                      |
| ------ | -------------------------------------------- |
| `200`  | OK — request berhasil                        |
| `201`  | Created — data berhasil dibuat               |
| `400`  | Bad Request — validasi input gagal           |
| `404`  | Not Found — data tidak ditemukan             |
| `500`  | Internal Server Error — error di sisi server |

---

## Health Check

### GET /health

Mengecek apakah API sedang berjalan.

**Response 200**

```json
{
  "success": true,
  "message": "API is running"
}
```

---

## VTubers

### GET /vtubers

Mengambil daftar semua VTuber dengan dukungan search, filter, dan pagination.

**Query Parameters**

| Parameter  | Tipe   | Required | Default | Deskripsi                                                  |
| ---------- | ------ | -------- | ------- | ---------------------------------------------------------- |
| `search`   | string | No       | -       | Cari VTuber berdasarkan nama                               |
| `agency`   | string | No       | -       | Filter berdasarkan agensi (contoh: `Hololive`)             |
| `platform` | string | No       | -       | Filter berdasarkan platform (contoh: `YouTube`)            |
| `status`   | string | No       | -       | Filter berdasarkan status: `active`, `graduated`, `hiatus` |
| `page`     | number | No       | `1`     | Halaman ke-                                                |
| `limit`    | number | No       | `10`    | Jumlah data per halaman (maksimal `100`)                   |

**Contoh Request**

```
GET /api/v1/vtubers?agency=Hololive&status=active&page=1&limit=5
```

**Response 200**

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
        "real_name": null,
        "agency": "Hololive",
        "generation": "HoloID Gen 3",
        "platform": "YouTube",
        "youtube_channel": "https://www.youtube.com/@KoboKanaeru",
        "youtube_subscribers": 1300000,
        "twitch_channel": null,
        "twitter_handle": "kobokanaeru",
        "instagram_handle": null,
        "tiktok_handle": null,
        "debut_date": "2022-03-25",
        "birthday": "04-10",
        "character_designer": "Aftermoon",
        "live2d_modeler": null,
        "fanbase_name": "Listeners",
        "tags": ["gaming", "singing", "zatsudan", "horror"],
        "description": "Rain shaman dari Hololive Indonesia Gen 3.",
        "avatar_url": null,
        "status": "active",
        "graduate_date": null,
        "created_at": "2024-01-01T00:00:00.000Z",
        "updated_at": "2024-01-01T00:00:00.000Z"
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

---

### GET /vtubers/:id

Mengambil detail satu VTuber berdasarkan ID.

**Path Parameter**

| Parameter | Tipe   | Required | Deskripsi      |
| --------- | ------ | -------- | -------------- |
| `id`      | number | Yes      | ID unik VTuber |

**Contoh Request**

```
GET /api/v1/vtubers/1
```

**Response 200**

```json
{
  "success": true,
  "message": "Vtuber found",
  "data": {
    "id": 1,
    "name": "Kobo Kanaeru",
    "nickname": "Kobo",
    "real_name": null,
    "agency": "Hololive",
    "generation": "HoloID Gen 3",
    "platform": "YouTube",
    "youtube_channel": "https://www.youtube.com/@KoboKanaeru",
    "youtube_subscribers": 1300000,
    "twitch_channel": null,
    "twitter_handle": "kobokanaeru",
    "instagram_handle": null,
    "tiktok_handle": null,
    "debut_date": "2022-03-25",
    "birthday": "04-10",
    "character_designer": "Aftermoon",
    "live2d_modeler": null,
    "fanbase_name": "Listeners",
    "tags": ["gaming", "singing", "zatsudan", "horror"],
    "description": "Rain shaman dari Hololive Indonesia Gen 3.",
    "avatar_url": null,
    "status": "active",
    "graduate_date": null,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

**Response 404**

```json
{
  "success": false,
  "error": "Vtuber not found",
  "details": []
}
```

---

### POST /vtubers

Menambahkan data VTuber baru.

**Request Body**

| Field                 | Tipe          | Required | Deskripsi                                                   |
| --------------------- | ------------- | -------- | ----------------------------------------------------------- |
| `name`                | string        | Yes      | Nama karakter atau persona VTuber                           |
| `nickname`            | string        | No       | Alias atau nama panggilan                                   |
| `real_name`           | string        | No       | Nama asli (jika diketahui publik)                           |
| `agency`              | string        | No       | Nama agensi (contoh: `Hololive`, `NIJISANJI`, `Indie`)      |
| `generation`          | string        | No       | Generasi atau batch (contoh: `HoloID Gen 3`)                |
| `platform`            | string        | No       | Platform utama, default: `YouTube`                          |
| `youtube_channel`     | string (URL)  | No       | URL channel YouTube                                         |
| `youtube_subscribers` | number        | No       | Jumlah subscriber YouTube                                   |
| `twitch_channel`      | string (URL)  | No       | URL channel Twitch                                          |
| `twitter_handle`      | string        | No       | Username Twitter/X tanpa `@`                                |
| `instagram_handle`    | string        | No       | Username Instagram tanpa `@`                                |
| `tiktok_handle`       | string        | No       | Username TikTok tanpa `@`                                   |
| `debut_date`          | string        | No       | Tanggal debut format `YYYY-MM-DD`                           |
| `birthday`            | string        | No       | Ulang tahun karakter format `YYYY-MM-DD` atau `MM-DD`       |
| `character_designer`  | string        | No       | Nama illustrator atau desainer karakter                     |
| `live2d_modeler`      | string        | No       | Nama Live2D rigger atau modeler                             |
| `fanbase_name`        | string        | No       | Nama komunitas fans resmi                                   |
| `tags`                | array[string] | No       | Tag konten, contoh: `["gaming", "singing"]`                 |
| `description`         | string        | No       | Deskripsi singkat tentang VTuber                            |
| `avatar_url`          | string (URL)  | No       | URL gambar avatar                                           |
| `status`              | string        | No       | Status: `active`, `graduated`, `hiatus` (default: `active`) |
| `graduate_date`       | string        | No       | Tanggal graduate format `YYYY-MM-DD`                        |

**Contoh Request Body**

```json
{
  "name": "Kobo Kanaeru",
  "nickname": "Kobo",
  "agency": "Hololive",
  "generation": "HoloID Gen 3",
  "platform": "YouTube",
  "youtube_channel": "https://www.youtube.com/@KoboKanaeru",
  "youtube_subscribers": 1300000,
  "twitter_handle": "kobokanaeru",
  "debut_date": "2022-03-25",
  "tags": ["gaming", "singing", "zatsudan"],
  "status": "active"
}
```

**Response 201**

```json
{
  "success": true,
  "message": "Vtuber created",
  "data": {
    "id": 46,
    "name": "Kobo Kanaeru",
    "nickname": "Kobo",
    "agency": "Hololive",
    "status": "active",
    // ... field lainnya
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

**Response 400**

```json
{
  "success": false,
  "error": "Validation failed",
  "details": ["\"name\" is required"]
}
```

---

### PUT /vtubers/:id

Memperbarui seluruh data VTuber. Field yang tidak dikirim akan menjadi `null`.

**Path Parameter**

| Parameter | Tipe   | Required | Deskripsi      |
| --------- | ------ | -------- | -------------- |
| `id`      | number | Yes      | ID unik VTuber |

**Request Body**

Sama seperti POST, dengan `name` tetap **required**.

**Contoh Request Body**

```json
{
  "name": "Kobo Kanaeru",
  "agency": "Hololive",
  "status": "active",
  "youtube_subscribers": 1350000
}
```

**Response 200**

```json
{
  "success": true,
  "message": "Vtuber updated",
  "data": {
    "id": 1,
    "name": "Kobo Kanaeru",
    "agency": "Hololive",
    "status": "active",
    // ... field lainnya
    "updated_at": "2024-06-01T00:00:00.000Z"
  }
}
```

**Response 400** — name tidak dikirim

```json
{
  "success": false,
  "error": "Validation failed",
  "details": ["\"name\" is required"]
}
```

**Response 404** — ID tidak ditemukan

```json
{
  "success": false,
  "error": "Vtuber not found",
  "details": []
}
```

---

### PATCH /vtubers/:id

Memperbarui sebagian field data VTuber. Hanya field yang dikirim yang akan berubah.

**Path Parameter**

| Parameter | Tipe   | Required | Deskripsi      |
| --------- | ------ | -------- | -------------- |
| `id`      | number | Yes      | ID unik VTuber |

**Request Body**

Kirim satu atau lebih field yang ingin diubah. Semua field bersifat **optional**, namun minimal satu field harus ada.

**Contoh Request Body**

```json
{
  "youtube_subscribers": 1400000,
  "status": "active"
}
```

**Response 200**

```json
{
  "success": true,
  "message": "Vtuber updated",
  "data": {
    "id": 1,
    "name": "Kobo Kanaeru",
    "youtube_subscribers": 1400000,
    "status": "active",
    // ... field lainnya
    "updated_at": "2024-06-01T00:00:00.000Z"
  }
}
```

**Response 400** — body kosong

```json
{
  "success": false,
  "error": "Validation failed",
  "details": ["\"value\" must have at least 1 key"]
}
```

**Response 404**

```json
{
  "success": false,
  "error": "Vtuber not found",
  "details": []
}
```

---

### DELETE /vtubers/:id

Menghapus data VTuber secara permanen berdasarkan ID.

**Path Parameter**

| Parameter | Tipe   | Required | Deskripsi      |
| --------- | ------ | -------- | -------------- |
| `id`      | number | Yes      | ID unik VTuber |

**Contoh Request**

```
DELETE /api/v1/vtubers/1
```

**Response 200**

```json
{
  "success": true,
  "message": "Vtuber deleted",
  "data": {
    "id": 1,
    "name": "Kobo Kanaeru",
    "agency": "Hololive",
    "status": "active"
    // ... field lainnya
  }
}
```

**Response 404**

```json
{
  "success": false,
  "error": "Vtuber not found",
  "details": []
}
```

---

## Error Umum

| Error                                                 | Status | Penyebab                                    |
| ----------------------------------------------------- | ------ | ------------------------------------------- |
| `"name" is required`                                  | 400    | Field `name` tidak dikirim di POST atau PUT |
| `"status" must be one of [active, graduated, hiatus]` | 400    | Nilai `status` tidak valid                  |
| `"value" must have at least 1 key`                    | 400    | Body PATCH dikirim kosong `{}`              |
| `Vtuber not found`                                    | 404    | ID tidak ada di database                    |
| `Internal server error`                               | 500    | Error tidak terduga di sisi server          |
