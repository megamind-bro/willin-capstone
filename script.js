document.addEventListener('DOMContentLoaded', () => {
    // --- Dynamic Background Animation ---
    const canvas = document.getElementById('bgCanvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    // Configuration
    const particleCount = 100; // Adjustable density
    const connectionDist = 150;
    const mouseDist = 200;

    // Mouse tracking
    let mouse = { x: null, y: null };
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });
    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Resize handling
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    // Particle Class
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5; // Slow ambient movement
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            this.color = Math.random() > 0.9 ? '#d4af37' : 'rgba(255, 255, 255, 0.5)'; // Gold or White
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Mouse Interaction: Repel/Attract
            // Let's make it a subtle attraction for a "control" feel, or repulsion for "disturbance"
            // User asked for "mouse effect". A gentle attraction feels more "magical".
            if (mouse.x != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouseDist) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouseDist - distance) / mouseDist;
                    // Attraction (move towards mouse)
                    // If you split vx/vy into velocity and acceleration, this is smoother.
                    // For simple effect:
                    this.x += forceDirectionX * force * 1;
                    this.y += forceDirectionY * force * 1;
                }
            }
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Initialize Particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Animation Loop
    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Update and draw particles
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        // Draw connections
        connectParticles();

        requestAnimationFrame(animate);
    }

    function connectParticles() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDist) {
                    let opacityValue = 1 - (distance / connectionDist);
                    ctx.strokeStyle = 'rgba(255, 255, 255,' + (opacityValue * 0.1) + ')'; // Faint lines
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    animate();
    // --- End Dynamic Background ---

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // Smooth Scroll for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Placeholder interactions - REMOVED, replaced by global openPreview
    // const videoPlaceholders = document.querySelectorAll('.video-placeholder');
    // videoPlaceholders.forEach(vp => {
    //     vp.addEventListener('click', () => {
    //         alert('Video content will be uploaded here.');
    //     });
    // });

    // Configure PDF.js worker (if library is loaded)
    if (typeof pdfjsLib !== 'undefined') {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    }
});

// Abstract Language Toggle
function switchAbstract(lang) {
    // Hide all contents
    document.getElementById('abstract-en').style.display = 'none';
    document.getElementById('abstract-sw').style.display = 'none';
    document.getElementById('abstract-ind').style.display = 'none';

    // Show selected
    const selected = document.getElementById('abstract-' + lang);
    if (selected) selected.style.display = 'block';

    // Update buttons
    const buttons = document.querySelectorAll('.toggle-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Set active button (simple approach based on click even would be passed, but here we can just find by onclick attribute matching or index)
    // Actually, let's just re-select based on the onclick text for simplicity or pass event. 
    // Optimization: Just rely on the click event target if passed, but simpler:
    // We will just find the button that called this.
    // Since we didn't pass 'this', let's manually update based on specific logic or simple looping.
    // Let's iterate and check onclick attribute
    buttons.forEach(btn => {
        if (btn.getAttribute('onclick').includes(`'${lang}'`)) {
            btn.classList.add('active');
        }
    });
}


// Modal Logic
let currentPDF = null;
let currentPage = 1;
let totalPages = 0;
function openPreview(title, contentUrl, type = 'pdf') {
    const modal = document.getElementById('previewModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const downloadLink = document.getElementById('downloadLink');
    const pdfNav = document.getElementById('pdfNav');

    modalTitle.textContent = title;
    downloadLink.href = contentUrl;

    // Clear previous content
    modalBody.innerHTML = '';
    pdfNav.style.display = 'none';
    currentPDF = null;
    currentPage = 1;
    totalPages = 0;

    if (type === 'video') {
        // Use native video tag for better compatibility
        const video = document.createElement('video');
        video.src = contentUrl;
        video.controls = true;
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.backgroundColor = '#000';
        modalBody.appendChild(video);
        // Try to play automatically
        video.play().catch(e => console.log('Auto-play prevented:', e));
    } else if (type === 'image') {
        const img = document.createElement('img');
        img.src = contentUrl;
        modalBody.appendChild(img);
    } else if (type === 'powerpoint' || type === 'ppt') {
        // PowerPoint preview using Office Online Viewer
        renderPowerPoint(contentUrl, modalBody);
    } else {
        // Use PDF.js for PDF rendering
        pdfNav.style.display = 'flex';
        renderPDF(contentUrl, modalBody);
    }

    modal.classList.add('active');
}

// --- Abstract Modal Logic ---
const abstractContent = {
    en: {
        title: "Innovation in the Digital Age",
        text: `
            <h3>Abstract</h3>
            <p>This project explores the intersection of traditional cultural values and modern digital innovation. By leveraging web technologies, we aim to preserve and present cultural narratives in a way that is accessible to a global audience.</p>
            <p>The study focuses on three key areas: digital preservation, interactive storytelling, and cross-cultural communication. Through a series of case studies and practical implementations, we demonstrate how technology can serve as a bridge between the past and the future.</p>
            <p><strong>Keywords:</strong> Innovation, Culture, Technology, Digital Preservation, Web Development.</p>
        `
    },
    sw: {
        title: "Ubunifu katika Enzi ya Kidijitali",
        text: `
            <h3>Muhtasari</h3>
            <p>Mradi huu unachunguza makutano ya maadili ya kitamaduni na ubunifu wa kisasa wa kidijitali. Kwa kutumia teknolojia za wavuti, tunalenga kuhifadhi na kuwasilisha masimulizi ya kitamaduni kwa njia inayofikiwa na hadhira ya kimataifa.</p>
            <p>Utafiti unazingatia maeneo matatu muhimu: uhifadhi wa kidijitali, usimulizi wa hadithi, na mawasiliano ya tamaduni mbalimbali. Kupitia mfululizo wa masomo na utekelezaji wa vitendo, tunaonyesha jinsi teknolojia inavyoweza kutumika kama daraja kati ya zamani na siku zijazo.</p>
            <p><strong>Maneno Muhimu:</strong> Ubunifu, Utamaduni, Teknolojia, Uhifadhi wa Kidijitali, Maendeleo ya Wavuti.</p>
        `
    },
    ind: {
        title: "Innovation in Indigenous Context",
        text: `
            <h3>Indigenous Abstract</h3>
            <p>[Indigenous Language Placeholder] This section will contain the abstract in the local indigenous language, focusing on the same themes of innovation and cultural preservation.</p>
            <p>It is crucial to represent these ideas in the native tongue to ensure authenticity and respect for the heritage being discussed.</p>
            <p><strong>Keywords:</strong> [Indigenous Keywords]</p>
        `
    }
};

function openAbstractModal() {
    const modal = document.getElementById('previewModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const downloadLink = document.getElementById('downloadLink');
    const pdfNav = document.getElementById('pdfNav');

    modalTitle.textContent = "Project Abstract";
    downloadLink.style.display = 'none'; // Hide download button for abstract
    pdfNav.style.display = 'none';

    // Clear previous content
    modalBody.innerHTML = '';
    modalBody.style.overflowY = 'auto'; // Ensure text can scroll if needed
    modalBody.style.background = 'var(--bg-primary)'; // Use standard background logic for text

    // Create Tabs
    const tabContainer = document.createElement('div');
    tabContainer.className = 'tab-container';

    // Create Buttons
    const btnEn = createTabBtn('English', 'en', true);
    const btnSw = createTabBtn('Kiswahili', 'sw', false);
    const btnInd = createTabBtn('Indigenous', 'ind', false);

    tabContainer.appendChild(btnEn);
    tabContainer.appendChild(btnSw);
    tabContainer.appendChild(btnInd);

    modalBody.appendChild(tabContainer);

    // Create Content Container
    const contentContainer = document.createElement('div');
    contentContainer.className = 'abstract-content';
    contentContainer.id = 'abstractTextContainer';
    // Set initial content (English)
    contentContainer.innerHTML = `<div class="abstract-text active">${abstractContent.en.text}</div>`;

    modalBody.appendChild(contentContainer);

    modal.classList.add('active');
}

function createTabBtn(label, lang, isActive) {
    const btn = document.createElement('button');
    btn.className = `tab-btn ${isActive ? 'active' : ''}`;
    btn.textContent = label;
    btn.onclick = () => switchAbstractLanguage(lang, btn);
    return btn;
}

function switchAbstractLanguage(lang, clickedBtn) {
    const container = document.getElementById('abstractTextContainer');

    // Update Content
    if (abstractContent[lang]) {
        container.innerHTML = `<div class="abstract-text active">${abstractContent[lang].text}</div>`;
    }

    // Update Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    clickedBtn.classList.add('active');
}

function renderPowerPoint(url, container) {
    // Check if URL is absolute (for GitHub Pages)
    const isAbsoluteUrl = url.startsWith('http://') || url.startsWith('https://');

    let viewerUrl = url;

    if (!isAbsoluteUrl) {
        // Auto-detect GitHub Pages environment and construct absolute URL
        const hostname = window.location.hostname;
        const isGitHubPages = hostname.includes('github.io');

        if (isGitHubPages) {
            // Construct absolute URL for GitHub Pages
            const baseUrl = window.location.origin + window.location.pathname.replace('index.html', '');
            viewerUrl = baseUrl + url;
        } else {
            // For local development, show download message
            container.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #fff; text-align: center; padding: 2rem;">
                    <div>
                        <h3>PowerPoint Preview</h3>
                        <p style="margin: 1rem 0;">PowerPoint files can be previewed after deploying to GitHub Pages.</p>
                        <p style="font-size: 0.9rem; color: #999;">For local testing, please use the download button.</p>
                        <div style="margin-top: 2rem; padding: 1rem; background: rgba(212, 175, 55, 0.1); border-radius: 8px; border: 1px solid var(--accent-gold);">
                            <p style="font-size: 0.85rem; color: var(--accent-gold);"><strong>Note:</strong></p>
                            <p style="font-size: 0.85rem; margin-top: 0.5rem;">If you see this on GitHub Pages, the file may not exist or the path is incorrect.</p>
                        </div>
                    </div>
                </div>
            `;
            return;
        }
    }

    // Use Microsoft Office Online Viewer
    const encodedUrl = encodeURIComponent(viewerUrl);
    const officeViewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodedUrl}`;


    const iframe = document.createElement('iframe');
    iframe.src = officeViewerUrl;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    container.appendChild(iframe);
}

// PDF.js rendering function with page navigation
async function renderPDF(url, container) {
    try {
        if (typeof pdfjsLib === 'undefined') {
            throw new Error('PDF.js library not loaded. Please check your internet connection.');
        }

        // Create canvas container
        const canvasContainer = document.createElement('div');
        canvasContainer.id = 'pdfCanvasContainer';
        canvasContainer.style.cssText = 'overflow-y: auto; height: 100%; width: 100%; padding: 1rem; background: #1a1a1a; display: flex; align-items: flex-start; justify-content: center;';
        container.appendChild(canvasContainer);

        // Load the PDF
        const loadingTask = pdfjsLib.getDocument(url);
        currentPDF = await loadingTask.promise;
        totalPages = currentPDF.numPages;

        // Update page info
        updatePageInfo();

        // Render first page
        await renderPage(currentPage);

        // Handle window resize to re-render PDF
        window.addEventListener('resize', handlePdfResize);

    } catch (error) {
        console.error('Error loading PDF:', error);
        container.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #fff; text-align: center; padding: 2rem;">
                <div>
                    <h3>Unable to preview PDF</h3>
                    <p>Please use the download button to view this file.</p>
                    <p style="font-size: 0.9rem; color: #999; margin-top: 1rem;">Error: ${error.message}</p>
                </div>
            </div>
        `;
        document.getElementById('pdfNav').style.display = 'none';
    }
}

let resizeTimeout;
function handlePdfResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (currentPDF) renderPage(currentPage);
    }, 200);
}

async function renderPage(pageNum) {
    if (!currentPDF) return;

    const canvasContainer = document.getElementById('pdfCanvasContainer');

    // Calculate available width (minus padding)
    const containerWidth = canvasContainer.clientWidth - 40;

    const page = await currentPDF.getPage(pageNum);

    // Calculate scale to fit width
    const unscaledViewport = page.getViewport({ scale: 1 });
    const scale = Math.min(containerWidth / unscaledViewport.width, 2.0); // Cap max scale at 2.0

    const viewport = page.getViewport({ scale: scale });

    canvasContainer.innerHTML = ''; // Clear previous page

    // Create canvas for this page
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    canvas.style.cssText = 'display: block; box-shadow: 0 4px 15px rgba(0,0,0,0.5); max-width: 100%;';

    canvasContainer.appendChild(canvas);

    // Render page
    const renderContext = {
        canvasContext: context,
        viewport: viewport
    };
    await page.render(renderContext).promise;
}

function changePage(delta) {
    if (!currentPDF) return;

    const newPage = currentPage + delta;
    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        renderPage(currentPage);
        updatePageInfo();
    }
}

function updatePageInfo() {
    const pageInfo = document.getElementById('pageInfo');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');

    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}
function closeModal() {
    const modal = document.getElementById('previewModal');
    const modalBody = document.getElementById('modalBody');

    modal.classList.remove('active');

    // Clear content after transition to stop video/clean up
    setTimeout(() => {
        modalBody.innerHTML = '';
    }, 300);
}

// Close on outside click
window.addEventListener('click', (e) => {
    const modal = document.getElementById('previewModal');
    if (e.target === modal) {
        closeModal();
    }
});
// Photo Essay Slideshow
let slideIndex = 1;
let slideTimer;

// Initialize slideshow when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    showSlides(slideIndex);
    startAutoPlay();
});

function changeSlide(n) {
    showSlides(slideIndex += n);
    resetAutoPlay();
}

function currentSlide(n) {
    showSlides(slideIndex = n);
    resetAutoPlay();
}

function showSlides(n) {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");

    if (!slides.length) return; // Exit if no slides found

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }

    // Remove active class from all dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }

    // Show current slide and activate dot
    slides[slideIndex - 1].classList.add("active");
    if (dots.length > 0) {
        dots[slideIndex - 1].classList.add("active");
    }
}

function startAutoPlay() {
    slideTimer = setInterval(() => {
        slideIndex++;
        showSlides(slideIndex);
    }, 5000); // Change slide every 5 seconds
}

function resetAutoPlay() {
    clearInterval(slideTimer);
    startAutoPlay();
}

// Pause slideshow on hover
document.addEventListener('DOMContentLoaded', () => {
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', () => {
            clearInterval(slideTimer);
        });

        slideshowContainer.addEventListener('mouseleave', () => {
            startAutoPlay();
        });
    }
});
