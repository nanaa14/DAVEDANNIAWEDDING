# Website Pernikahan Nia Daniati & Dave G. Balk

## Cara melihat
Buka `index.html` di browser. Untuk hasil terbaik, gunakan koneksi internet agar font Google Fonts dapat dimuat.

## File yang sudah disertakan
- `assets/youre-still-the-one.mp3` — musik latar, dengan tombol putar/jeda, seek, dan mute.
- `assets/lokasi-qr.png` — QR Code lokasi.
- `assets/referensi/` — dua screenshot contoh desain yang dikirim sebagai referensi visual.

## Cara mengganti foto
Bagian galeri saat ini memakai kotak placeholder (bukan foto pernikahan), karena dua gambar yang dikirim merupakan screenshot referensi tampilan website.

Di `index.html`, cari bagian `photo-grid`. Untuk mengganti kotak placeholder dengan foto, ubah salah satu blok:
```html
<div class="photo-placeholder"><span>01</span><b>Tambahkan foto 2022</b></div>
```
menjadi:
```html
<img class="gallery-photo" src="assets/gallery/2022-01.jpg" alt="Kenangan Nia dan Dave tahun 2022">
```
Simpan foto dengan nama berikut agar rapi:
- 2022: `2022-01.jpg` sampai `2022-05.jpg`
- 2025: `2025-01.jpg` sampai `2025-06.jpg`
- 2026: `2026-01.jpg` sampai `2026-07.jpg`

Tambahkan aturan ini ke bagian paling bawah `style.css` agar foto mengikuti tata letak galeri:
```css
.gallery-photo {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 7px;
  display: block;
}
```
Untuk foto portrait yang ingin dibuat lebih tinggi, tambahkan class `tall` pada gambar dan gunakan `height: 370px`.

## Mengganti QR Code atau musik
- Ganti file `assets/lokasi-qr.png` dengan QR Code baru (gunakan nama file yang sama).
- Ganti file `assets/youre-still-the-one.mp3` dengan audio baru (gunakan nama file yang sama).

## Publikasi
Unggah seluruh folder `nia-dave-wedding` ke hosting statis (misalnya GitHub Pages, Netlify, atau hosting cPanel). Pastikan `index.html`, `style.css`, `script.js`, dan folder `assets` tetap berada dalam struktur yang sama.


## Galeri foto (penting)
Letakkan foto langsung di folder `assets` dengan nama file berikut:
- `foto1.jpg` sampai `foto5.jpg` untuk tahun 2022
- `foto6.jpg` sampai `foto11.jpg` untuk tahun 2025
- `foto12.jpg` sampai `foto18.jpg` untuk tahun 2026

Nama file harus sama persis (huruf kecil). Jika fotonya PNG, ubah juga ekstensi pada `src` di `index.html`.
Foto akan otomatis tampil setelah file diletakkan di folder `assets`.

## Data rekening bank
Di `index.html`, cari bagian `id="gift"`. Ganti:
- `NAMA BANK 1`, `ISI NOMOR REKENING 1`, `NAMA PEMILIK REKENING`
- Opsional: data rekening kedua.
Nomor rekening pada atribut `data-copy` di tombol juga harus diganti agar tombol salin bekerja dengan nomor yang benar.
