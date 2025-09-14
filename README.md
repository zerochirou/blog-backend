# Blog Backend

## Commit Rules

**Format :** `<type>(<scope>): <subject>`

`<scope>` _opsional_

### Contoh:

```
feat(auth): Menambahkan fitur login
^--^        ^--------------------^
|           |
|           +-> Ringkasan dalam bentuk present tense.
|
+-------> Tipe: chore, docs, feat, fix, refactor, style, or test.
```

More Examples:
| Type | Deskripsi |
|-----------|-----------------------------------------------------------------------------------------------|
| `feat` | fitur baru untuk pengguna, bukan fitur baru untuk skrip build |
| `fix` | perbaikan bug untuk pengguna, bukan perbaikan pada skrip build |
| `change` | perbuhan kode bersifat global dan umum |
| `docs` | penambahan dan perubahan dokumentasi |
| `renewal` | memperbarui fungsi kode, mempengaruhi kode produksi |
| `style` | pemformatan, titik koma hilang, dll; tidak ada perubahan kode produksi |
| `refactor`| melakukan refaktor kode produksi, misalnya mengganti nama variabel |
| `test` | menambahkan tes yang hilang, melakukan refaktor tes; tidak ada perubahan kode produksi |
| `chore` | memperbarui tugas kasar dll; tidak ada perubahan kode produksi |
| `tools` | alat development, seperti lib, framework, dll |
| |

## Fitur yang tersedia

| Fitur             | Deskripsi                                     |
| ----------------- | --------------------------------------------- |
| `auth`            | Authentikasi menggunakan access token         |
| `category`        | ---                                           |
| `Business Domain` | Tempat para UMKM membuat profile usaha mereka |
| `rating`          | Fitur permberian rating                       |
|                   |

## Layanan Eksternal

- Untuk saat ini fitur penyimpanan gambar dilakukan dengan bantuan supabase storage.

## Target Fitur

deadline: 4 september 2025
| Fitur | Deskripsi |
|-----------|-----------------------------------------------------------------------------------------------|
| `mitra` | Fitur agar dapat terkoneksi ke layanan seperti Gofod, Shopee Food, Kurir, dll |
| `SEO` | Tempat para UMKM membuat profile usaha mereka `deadline: 20 september 2025` |
| `Secure System` | Pengetesan keamanan seperti ddos, dll...`deadline: 20 september 2025` |
||

https://roadmap.sh/projects/blogging-platform-api
