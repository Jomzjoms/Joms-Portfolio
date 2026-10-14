/* ==========================================================================
   JOMS — Portfolio Script
   Vanilla JavaScript only. No dependencies.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------
     1. LOADING SCREEN
     Locks scroll, shows for a short beat, then reveals the site.
  ------------------------------------------------------------------ */
  const loader = document.getElementById('loader');
  document.body.classList.add('is-loading');

  window.addEventListener('load', () => {
    const MIN_DISPLAY_MS = 1200;
    setTimeout(() => {
      loader.classList.add('loader-hidden');
      document.body.classList.remove('is-loading');
      loader.addEventListener('transitionend', () => {
        loader.setAttribute('hidden', '');
      }, { once: true });
    }, MIN_DISPLAY_MS);
  });

  /* ------------------------------------------------------------------
     2. NAVIGATION — sticky blur, mobile menu, active link, smooth scroll
  ------------------------------------------------------------------ */
  const header = document.getElementById('site-header');
  const navToggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  navToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Highlight current section in nav while scrolling
  const sections = ['about', 'work', 'journey', 'contact']
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach(section => sectionObserver.observe(section));

  /* ------------------------------------------------------------------
     3. SCROLL REVEAL ANIMATIONS (IntersectionObserver, staggered)
  ------------------------------------------------------------------ */
  const revealTargets = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('is-visible'), i * 60);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => revealObserver.observe(el));

  /* ------------------------------------------------------------------
     4. PROJECT DATA
     Edit these arrays to add, remove, or update projects.
  ------------------------------------------------------------------ */
  const featuredProjects = [
    {
      title: 'J&D Apparel Clothing Website',
      category: 'E-Commerce',
      description: 'First year project: A clothing website concept with a focus on product presentation and user experience.',
      image: 'assets/projects/project-1.jpg',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      liveUrl: 'https://jomzjoms.github.io/JnD-apparel/',
      githubUrl: 'https://github.com/Jomzjoms/JnD-apparel'
    },
    {
      title: 'PHOTO BOOTH WEB APP',
      category: 'Web Application',
      description: 'A photo booth application allowing users to take pictures and choose a frame.',
      image: 'assets/projects/project-2.jpg',
      technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'VITE'],
      liveUrl: 'https://zmojz-photobooth.netlify.app/',
      githubUrl: 'https://github.com/Jomzjoms/zmojz-photobooth'
    },
    {
      title: 'Valentines Day Greeting Card',
      category: 'Web Application',
      description: 'A digital greeting card for Valentine\'s Day with custom flower color options.',
      image: 'assets/projects/project-3.jpg',
      technologies: ['HTML', 'CSS'],
      liveUrl: 'https://jomzjoms.github.io/Valentines-Day/result.html',
      githubUrl: 'https://github.com/Jomzjoms/Valentines-Day'
    },
  ];

  const liveProjects = [
    {
      title: 'Personal Portfolio',
      description: 'This site — a live front-end build you can browse right now.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/'
    },
    {
      title: 'J&D Apparel Website',
      description: 'A product-first e-commerce concept site, live and browsable.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/'
    },
    {
      title: 'Dentrust Booking Demo',
      description: 'A front-end demo of the clinic booking interface.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/'
    }
  ];

  const posters = [
    { title: 'Pierce the Veil', category: 'Lyric Poster', year: '2026', aspect: '3/4', image: 'assets/posters/poster-1.jpg' },
    { title: 'Skull with Butterfly shirt', category: 'Shirt Design', year: '2026', aspect: '2/2', image: 'assets/posters/poster-2.jpg' },
    { title: 'Skull with Rose', category: 'Love Quote Poster', year: '2026', aspect: '5/4', image: 'assets/posters/poster-6.jpg' },
    { title: 'Yoonchae', category: 'Grunge Artist Poster', year: '2026', aspect: '3/4', image: 'assets/posters/poster-4.jpg' },
    { title: 'Billie Eilish', category: 'Vintage style Poster', year: '2026', aspect: '3/4', image: 'assets/posters/poster-5.jpg' },
   { title: 'Marikina Chapter 37 Years Anniversary', category: 'Anniversary Poster', year: '2026', aspect: '6/4', image: 'assets/posters/poster-7.jpg' },
  ];

  /* ------------------------------------------------------------------
     5. RENDER: Selected Work
  ------------------------------------------------------------------ */
  const projectList = document.getElementById('project-list');

  const renderTechPills = (list) =>
    list.map(t => `<li class="tech-pill">${t}</li>`).join('');

  projectList.innerHTML = featuredProjects.map(project => `
    <article class="project-card" data-reveal>
      <div class="project-media">
        <img src="${project.image}" alt="${project.title} preview"
             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <div class="placeholder-block" style="display:flex;"><span>${project.title.split(' ').map(w => w[0]).slice(0,2).join('')}</span></div>
      </div>
      <div class="project-info">
        <span class="project-category">${project.category}</span>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-desc">${project.description}</p>
        <ul class="project-tech">${renderTechPills(project.technologies)}</ul>
        <div class="project-links">
          ${project.liveUrl ? `<a href="${project.liveUrl}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">View Project</a>` : ''}
          ${project.githubUrl ? `<a href="${project.githubUrl}" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">GitHub</a>` : ''}
        </div>
      </div>
    </article>
  `).join('');

  // Re-observe newly injected reveal elements
  document.querySelectorAll('#project-list [data-reveal]').forEach(el => revealObserver.observe(el));

  /* ------------------------------------------------------------------
     6. RENDER: Explore My Websites (live showcase)
  ------------------------------------------------------------------ */
  const liveGrid = document.getElementById('live-grid');

  liveGrid.innerHTML = liveProjects.map(project => `
    <article class="live-card" data-reveal>
      <h3 class="live-card-title">${project.title}</h3>
      <p class="live-card-desc">${project.description}</p>
      <ul class="live-card-tech">${renderTechPills(project.technologies)}</ul>
      <div class="live-card-links">
        <a href="${project.liveUrl}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">View Live Website ↗</a>
        <a href="${project.githubUrl}" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">View Source</a>
      </div>
    </article>
  `).join('');

  document.querySelectorAll('#live-grid [data-reveal]').forEach(el => revealObserver.observe(el));

  /* ------------------------------------------------------------------
     7. RENDER: Poster Gallery + Lightbox
  ------------------------------------------------------------------ */
  const posterGrid = document.getElementById('poster-grid');

  posterGrid.innerHTML = posters.map((poster, i) => `
    <figure class="poster-item" data-reveal data-index="${i}" tabindex="0" role="button"
            aria-label="View ${poster.title} artwork">
      <div class="poster-media" style="--ar:${poster.aspect};">
        <img src="${poster.image}" alt="${poster.title}"
             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <div class="placeholder-block" style="display:flex;"><span>0${i + 1}</span></div>
        <div class="poster-overlay">
          <span class="poster-view">View Artwork ↗</span>
          <span class="poster-name">${poster.title}</span>
          <span class="poster-meta">${poster.category} — ${poster.year}</span>
        </div>
      </div>
    </figure>
  `).join('');

  document.querySelectorAll('#poster-grid [data-reveal]').forEach(el => revealObserver.observe(el));

  /* ------------------------------------------------------------------
     8. LIGHTBOX
  ------------------------------------------------------------------ */
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxPlaceholder = document.getElementById('lightbox-placeholder');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxMeta = document.getElementById('lightbox-meta');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  let currentPosterIndex = 0;
  let lastFocusedElement = null;

  function openLightbox(index) {
    currentPosterIndex = index;
    const poster = posters[index];

    lightboxImage.src = poster.image;
    lightboxImage.alt = poster.title;
    lightboxImage.style.display = 'block';
    lightboxPlaceholder.style.display = 'none';

    lightboxImage.onerror = () => {
      lightboxImage.style.display = 'none';
      lightboxPlaceholder.style.display = 'flex';
      lightboxPlaceholder.textContent = poster.title.split(' ').map(w => w[0]).slice(0, 2).join('');
    };

    lightboxTitle.textContent = poster.title;
    lightboxMeta.textContent = `${poster.category} — ${poster.year}`;

    lastFocusedElement = document.activeElement;
    lightbox.removeAttribute('hidden');
    requestAnimationFrame(() => lightbox.classList.add('is-open'));
    document.body.classList.add('no-scroll');
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
    lightbox.addEventListener('transitionend', function handler() {
      lightbox.setAttribute('hidden', '');
      lightbox.removeEventListener('transitionend', handler);
    }, { once: true });
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  function showAdjacentPoster(direction) {
    const nextIndex = (currentPosterIndex + direction + posters.length) % posters.length;
    openLightbox(nextIndex);
  }

  posterGrid.addEventListener('click', (e) => {
    const item = e.target.closest('.poster-item');
    if (item) openLightbox(Number(item.dataset.index));
  });

  posterGrid.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const item = e.target.closest('.poster-item');
      if (item) {
        e.preventDefault();
        openLightbox(Number(item.dataset.index));
      }
    }
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', () => showAdjacentPoster(-1));
  lightboxNext.addEventListener('click', () => showAdjacentPoster(1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (lightbox.hasAttribute('hidden')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showAdjacentPoster(-1);
    if (e.key === 'ArrowRight') showAdjacentPoster(1);
  });

  /* ------------------------------------------------------------------
     9. CUSTOM CURSOR (desktop only)
  ------------------------------------------------------------------ */
 

});
