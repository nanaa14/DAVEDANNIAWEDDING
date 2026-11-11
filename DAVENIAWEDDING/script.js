const audio = document.getElementById('weddingAudio');
const toggle = document.getElementById('musicToggle');
const playIcon = document.getElementById('playIcon');
const seek = document.getElementById('seekBar');
const current = document.getElementById('currentTime');
const duration = document.getElementById('duration');
const volume = document.getElementById('volumeToggle');

function timeLabel(seconds) {
  if (!Number.isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}
toggle.addEventListener('click', async () => {
  if (audio.paused) {
    try { await audio.play(); } catch (err) {
      alert('Musik belum dapat diputar. Coba tekan tombol putar sekali lagi.');
    }
  } else {
    audio.pause();
  }
});
audio.addEventListener('play', () => { playIcon.textContent = 'Ⅱ'; toggle.setAttribute('aria-label', 'Jeda musik'); });
audio.addEventListener('pause', () => { playIcon.textContent = '▶'; toggle.setAttribute('aria-label', 'Putar musik'); });
audio.addEventListener('loadedmetadata', () => { duration.textContent = timeLabel(audio.duration); });
audio.addEventListener('timeupdate', () => {
  current.textContent = timeLabel(audio.currentTime);
  if (Number.isFinite(audio.duration) && audio.duration > 0 && !seek.matches(':active')) {
    seek.value = (audio.currentTime / audio.duration) * 100;
  }
});
seek.addEventListener('input', () => {
  if (Number.isFinite(audio.duration)) audio.currentTime = (Number(seek.value) / 100) * audio.duration;
});
volume.addEventListener('click', () => {
  audio.muted = !audio.muted;
  volume.textContent = audio.muted ? '×' : '♫';
  volume.setAttribute('aria-label', audio.muted ? 'Nyalakan suara' : 'Bisukan suara');
});

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
menuButton.addEventListener('click', () => {
  const opened = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(opened));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));


// Reveal animation saat elemen masuk ke layar.
const revealElements = document.querySelectorAll(
  '.section-heading, .timeline-item, .reason-card, .photo-frame, .letter-card, .bank-card, .qr-frame'
);
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  revealElements.forEach(element => {
    element.classList.add('reveal');
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach(element => element.classList.add('is-visible'));
}

// Jika foto belum diunggah, tampilkan label nama file sebagai petunjuk.
document.querySelectorAll('.photo-frame img').forEach(img => {
  const markLoaded = () => img.closest('.photo-frame')?.classList.add('has-photo');
  if (img.complete && img.naturalWidth > 0) markLoaded();
  img.addEventListener('load', markLoaded);
});

// Tombol salin nomor rekening. Ganti nomor contoh di index.html terlebih dahulu.
document.querySelectorAll('.copy-account').forEach(button => {
  button.addEventListener('click', async () => {
    const account = button.dataset.copy || '';
    if (!account || account.startsWith('ISI NOMOR')) {
      alert('Silakan isi nomor rekening terlebih dahulu pada file index.html.');
      return;
    }
    try {
      await navigator.clipboard.writeText(account);
      const original = button.innerHTML;
      button.textContent = 'Berhasil disalin ✓';
      setTimeout(() => { button.innerHTML = original; }, 1800);
    } catch (error) {
      alert('Nomor rekening: ' + account);
    }
  });
});
