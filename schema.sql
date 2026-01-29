-- =============================================================================
-- VTuber Indonesia API
-- Database Schema
-- Version : 1.0.0
-- Database : SQLite
-- =============================================================================

PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

-- =============================================================================
-- TABLE: vtubers
-- =============================================================================

CREATE TABLE IF NOT EXISTS vtubers (
    -- Primary Key
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,

    -- Identitas
    name                TEXT    NOT NULL,                       -- Nama karakter / persona VTuber
    nickname            TEXT,                                   -- Alias atau nama panggilan lain

    -- Agensi & Generasi
    agency              TEXT,                                   -- Nama agensi (Hololive, NIJISANJI, MAHA5, Indie, dll)

    -- Platform Utama
    platform            TEXT    NOT NULL DEFAULT 'YouTube',     -- Platform utama: YouTube, Twitch, dll

    -- Media Sosial & Channel
    youtube_channel     TEXT,                                   -- URL atau channel ID YouTube
    twitch_channel      TEXT,                                   -- URL atau username Twitch
    twitter_handle      TEXT,                                   -- Username Twitter/X (tanpa @)

    -- Informasi Karakter
    debut_date          TEXT,                                   -- Tanggal debut (format: YYYY-MM-DD)
    birthday            TEXT,                                   -- Ulang tahun karakter (YYYY-MM-DD atau MM-DD)
    character_designer  TEXT,                                   -- Nama illustrator / desainer karakter
    live2d_modeler      TEXT,                                   -- Nama Live2D rigger / modeler
    fanbase_name        TEXT,                                   -- Nama komunitas fans resmi

    -- Metadata
    tags                TEXT,                                   -- JSON array string, contoh: '["gaming","singing","zatsudan"]'
    description         TEXT,                                   -- Deskripsi singkat tentang VTuber
    avatar_url          TEXT,                                   -- URL gambar avatar / thumbnail resmi

    -- Status
    status              TEXT    NOT NULL DEFAULT 'active'       -- Status: active | graduated | hiatus
                            CHECK (status IN ('active', 'graduated', 'hiatus')),
    graduate_date       TEXT,                                   -- Tanggal graduate (jika sudah graduate, format: YYYY-MM-DD)

    -- Timestamps
    created_at          TEXT    NOT NULL DEFAULT (datetime('now', 'utc')),
    updated_at          TEXT    NOT NULL DEFAULT (datetime('now', 'utc'))
);

-- =============================================================================
-- INDEXES
-- =============================================================================

-- Index untuk pencarian berdasarkan nama (LIKE query)
CREATE INDEX IF NOT EXISTS idx_vtubers_name
    ON vtubers (name);

-- Index untuk filter berdasarkan agency
CREATE INDEX IF NOT EXISTS idx_vtubers_agency
    ON vtubers (agency);

-- Index untuk filter berdasarkan platform
CREATE INDEX IF NOT EXISTS idx_vtubers_platform
    ON vtubers (platform);

-- Index untuk filter berdasarkan status
CREATE INDEX IF NOT EXISTS idx_vtubers_status
    ON vtubers (status);

-- Composite index untuk kombinasi filter agency + status (query umum)
CREATE INDEX IF NOT EXISTS idx_vtubers_agency_status
    ON vtubers (agency, status);

-- =============================================================================
-- TRIGGER: auto-update updated_at
-- =============================================================================

CREATE TRIGGER IF NOT EXISTS trg_vtubers_updated_at
    AFTER UPDATE ON vtubers
    FOR EACH ROW
BEGIN
    UPDATE vtubers
    SET updated_at = datetime('now', 'utc')
    WHERE id = OLD.id;
END;

-- =============================================================================
-- END OF SCHEMA
-- =============================================================================
