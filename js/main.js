/* ============================================================
   KHAI RAMBO REAL ESTATE — MAIN JAVASCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll effect ── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Mobile menu ── */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-close');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    if (mobileClose) {
      mobileClose.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    }
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Scroll-reveal animations ── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (revealEls.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    revealEls.forEach(el => revealObserver.observe(el));
  }

  /* ── Animated counters ── */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => counterObserver.observe(el));
  }

  function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 2000;
    const isFloat = target % 1 !== 0;
    const step = duration / 60;
    let current = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = prefix + (isFloat ? current.toFixed(1) : Math.floor(current)) + suffix;
    }, 16);
  }

  /* ── Active nav link ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── Contact form → WhatsApp ── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const firstName   = (form.firstName.value || '').trim();
      const lastName    = (form.lastName.value  || '').trim();
      const phone       = (form.phone.value     || '').trim();
      const email       = (form.email.value     || '').trim();
      const enquiry     = form.enquiryType.options[form.enquiryType.selectedIndex]?.text || '';
      const budget      = form.budget.options[form.budget.selectedIndex]?.text || '';
      const timeline    = form.timeline.options[form.timeline.selectedIndex]?.text || '';
      const message     = (form.message.value   || '').trim();

      const fullName = [firstName, lastName].filter(Boolean).join(' ') || 'N/A';

      let text = `Hi Khai, I would like to enquire about a property.\n\n`;
      text += `*Name:* ${fullName}\n`;
      if (phone)    text += `*Mobile:* ${phone}\n`;
      if (email)    text += `*Email:* ${email}\n`;
      if (enquiry && !enquiry.startsWith('—')) text += `*Enquiry:* ${enquiry}\n`;
      if (budget   && !budget.startsWith('—'))  text += `*Budget:* ${budget}\n`;
      if (timeline && !timeline.startsWith('—')) text += `*Timeline:* ${timeline}\n`;
      if (message)  text += `\n*Message:*\n${message}`;

      const waKhai  = `https://api.whatsapp.com/send?phone=6588991000&text=${encodeURIComponent(text)}`;
      const waSofea = `https://api.whatsapp.com/send?phone=6588997654&text=${encodeURIComponent(text)}`;

      const khaiBtn  = document.getElementById('waKhai');
      const sofeaBtn = document.getElementById('waSofea');
      if (khaiBtn)  khaiBtn.href  = waKhai;
      if (sofeaBtn) sofeaBtn.href = waSofea;

      const success = document.getElementById('formSuccess');
      if (success) {
        success.style.display = 'block';
        form.reset();
        form.style.display = 'none';
      }
    });
  }

  /* ── Smooth anchor scrolling ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const pos = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: pos, behavior: 'smooth' });
      }
    });
  });

  /* ── Testimonials simple auto-scroll ── */
  const track = document.querySelector('.testimonials-track');
  if (track) {
    // Allow CSS grid to handle layout; no JS needed for static version
  }

  /* ── Hero video subtle parallax scale ── */
  const heroVideo = document.querySelector('.hero-video');
  const heroLightBeams = document.querySelectorAll('.hero-light-beam');
  if (heroVideo) {
    window.addEventListener('scroll', () => {
      const offset = window.pageYOffset;
      // Subtle upward drift for depth
      heroVideo.style.transform = `translate(-50%, calc(-50% + ${offset * 0.15}px))`;
      // Fade out video overlay as user scrolls
      const heroOverlay = document.querySelector('.hero-overlay');
      if (heroOverlay && offset < 600) {
        heroOverlay.style.opacity = 1 + (offset / 600) * 0.05;
      }
    }, { passive: true });
  }

  /* ── WhatsApp Form Widget ── */
  const waWidget    = document.getElementById('waWidget');
  const waWidgetBtn = document.getElementById('waWidgetBtn');
  const waForm      = document.getElementById('waForm');
  const waFileName  = document.getElementById('waFileName');
  const waFileInput = document.getElementById('waFile');
  const waError     = document.getElementById('waError');

  if (waWidget && waWidgetBtn) {
    waWidgetBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      waWidget.classList.toggle('open');
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!waWidget.contains(e.target)) {
        waWidget.classList.remove('open');
      }
    });

    // Prevent panel clicks from bubbling up and closing it
    const panel = document.getElementById('waWidgetPanel');
    if (panel) panel.addEventListener('click', (e) => e.stopPropagation());
  }

  if (waFileInput && waFileName) {
    waFileInput.addEventListener('change', () => {
      const file = waFileInput.files[0];
      if (!file) { waFileName.textContent = ''; return; }
      if (file.size > 5 * 1024 * 1024) {
        waFileName.textContent = 'File too large — max 5 MB';
        waFileName.style.color = '#e53e3e';
        waFileInput.value = '';
      } else {
        waFileName.textContent = '\uD83D\uDCCE ' + file.name;
        waFileName.style.color = '#25D366';
      }
    });
  }

  if (waForm) {
    waForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const recipientEl = waForm.querySelector('input[name="waRecipient"]:checked');
      const phone   = recipientEl ? recipientEl.value : '6588991000';
      const name    = document.getElementById('waName').value.trim();
      const email   = document.getElementById('waEmail').value.trim();
      const inquiry = document.getElementById('waInquiry').value;
      const mobile  = document.getElementById('waMobile').value.trim();
      const subject = document.getElementById('waSubject').value.trim();
      const message = document.getElementById('waMessage').value.trim();
      const hasFile = waFileInput && waFileInput.files.length > 0;
      const fname   = hasFile ? waFileInput.files[0].name : '';

      if (!name || !email || !inquiry || !message) {
        if (waError) {
          waError.textContent = 'Please fill in all required fields (Name, Email, Inquiry Type, Message).';
          waError.style.display = 'block';
        }
        return;
      }
      if (waError) waError.style.display = 'none';

      let txt = `*New Enquiry — Khai Rambo Website*\n\n`;
      txt += `*Name:* ${name}\n`;
      txt += `*Email:* ${email}\n`;
      txt += `*Inquiry Type:* ${inquiry}\n`;
      if (mobile) txt += `*Mobile:* +65 ${mobile}\n`;
      if (subject) txt += `*Subject:* ${subject}\n`;
      txt += `*Message:* ${message}`;
      if (hasFile) txt += `\n\n_[Document: ${fname} — will be shared separately]_`;

      window.open(
        `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(txt)}`,
        '_blank'
      );

      if (waWidget) waWidget.classList.remove('open');
      waForm.reset();
      if (waFileName) { waFileName.textContent = ''; }
    });
  }

  /* ── Rotating sample activity notice (bottom-left) ── */
  initSampleActivityToast();

  function initSampleActivityToast() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const districts = [
      'Jurong West',
      'Tampines',
      'Woodlands',
      'Punggol',
      'Sengkang',
      'Bishan',
      'Toa Payoh',
      'Bukit Batok',
      'Choa Chu Kang',
      'Ang Mo Kio',
      'Pasir Ris',
      'Bedok'
    ];
    const times = [
      'moments ago',
      '3 minutes ago',
      '12 minutes ago',
      '35 minutes ago',
      '1 hour ago',
      '2 hours ago'
    ];

    const toast = document.createElement('aside');
    toast.className = 'activity-toast';
    toast.setAttribute('aria-live', 'polite');
    toast.innerHTML = `
      <div class="activity-toast-icon"><i class="fa-solid fa-circle-check"></i></div>
      <div class="activity-toast-body">
        <p class="activity-toast-text"></p>
        <div class="activity-toast-meta">
          <span class="activity-toast-time"></span>
          <span class="activity-toast-badge">Verified</span>
        </div>
      </div>
    `;
    document.body.appendChild(toast);

    const textEl = toast.querySelector('.activity-toast-text');
    const timeEl = toast.querySelector('.activity-toast-time');

    const showDuration = 5200;
    const cycleDelay = 9000;
    let timer = null;
    let hideTimer = null;

    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const showToast = () => {
      const district = pick(districts);
      textEl.textContent = `Someone from ${district}, SG explored a FREE Discussion option.`;
      timeEl.textContent = `${pick(times)} - verified profile`;

      toast.classList.remove('hide');
      toast.classList.add('show');

      if (hideTimer) clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('hide');
      }, showDuration);
    };

    const startCycle = () => {
      showToast();
      if (timer) clearInterval(timer);
      timer = setInterval(showToast, cycleDelay);
    };

    const stopCycle = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
      if (hideTimer) {
        clearTimeout(hideTimer);
        hideTimer = null;
      }
      toast.classList.remove('show');
      toast.classList.remove('hide');
    };

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopCycle();
      } else {
        startCycle();
      }
    });

    startCycle();
  }

});
