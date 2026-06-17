// ===== AOS Initialization =====
document.addEventListener('DOMContentLoaded', function () {
  AOS.init({
    duration: 700,
    easing: 'ease-out-cubic',
    once: true,
    offset: 50,
    disable: 'mobile' // optional: matikan di mobile jika perlu
  });
});

// ===== Counter Animation (angka berjalan) =====
document.addEventListener('DOMContentLoaded', function () {
  const counters = document.querySelectorAll('.counter');
  
  // Intersection Observer untuk memulai counter saat terlihat
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'), 10);
        const duration = 2000; // ms
        const stepTime = 20; // ms
        const steps = duration / stepTime;
        const increment = target / steps;
        let current = 0;

        // Pastikan hanya dijalankan sekali
        if (counter.dataset.animated === 'true') return;
        counter.dataset.animated = 'true';

        const updateCounter = () => {
          current += increment;
          if (current < target) {
            // Untuk angka besar (jutaan), gunakan format dengan pemisah ribuan
            if (target >= 1000000) {
              counter.textContent = Math.floor(current).toLocaleString('id-ID');
            } else {
              counter.textContent = Math.floor(current);
            }
            setTimeout(updateCounter, stepTime);
          } else {
            // Final value
            if (target >= 1000000) {
              counter.textContent = target.toLocaleString('id-ID');
            } else {
              counter.textContent = target;
            }
          }
        };

        updateCounter();
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(counter => observer.observe(counter));
});

// ===== (Optional) Navbar background effect saat scroll =====
// Sudah ditangani dengan backdrop-blur pada class sticky, 
// tapi bisa tambahkan efek transisi jika diperlukan.
console.log('PANI website ready.');
