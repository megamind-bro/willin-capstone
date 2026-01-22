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

<<<<<<< HEAD
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

=======
>>>>>>> 7ff756dd242acec0b0b08adace2c5bd46a0a693a
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
});

// Modal Logic
<<<<<<< HEAD
let currentPDF = null;
let currentPage = 1;
let totalPages = 0;

=======
>>>>>>> 7ff756dd242acec0b0b08adace2c5bd46a0a693a
function openPreview(title, contentUrl, type = 'pdf') {
    const modal = document.getElementById('previewModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const downloadLink = document.getElementById('downloadLink');
<<<<<<< HEAD
    const pdfNav = document.getElementById('pdfNav');
=======
>>>>>>> 7ff756dd242acec0b0b08adace2c5bd46a0a693a

    modalTitle.textContent = title;
    downloadLink.href = contentUrl;

    // Clear previous content
    modalBody.innerHTML = '';
<<<<<<< HEAD
    pdfNav.style.display = 'none';
    currentPDF = null;
    currentPage = 1;
    totalPages = 0;
=======
>>>>>>> 7ff756dd242acec0b0b08adace2c5bd46a0a693a

    if (type === 'video') {
        // For video, use iframe or video tag
        const iframe = document.createElement('iframe');
        iframe.src = contentUrl;
        iframe.allow = "autoplay; encrypted-media; picture-in-picture";
        iframe.allowFullscreen = true;
        modalBody.appendChild(iframe);
    } else if (type === 'image') {
        const img = document.createElement('img');
        img.src = contentUrl;
        modalBody.appendChild(img);
<<<<<<< HEAD
    } else if (type === 'powerpoint' || type === 'ppt') {
        // PowerPoint preview using Office Online Viewer
        renderPowerPoint(contentUrl, modalBody);
    } else {
        // Use PDF.js for PDF rendering
        pdfNav.style.display = 'flex';
=======
    } else {
        // Use PDF.js for PDF rendering
>>>>>>> 7ff756dd242acec0b0b08adace2c5bd46a0a693a
        renderPDF(contentUrl, modalBody);
    }

    modal.classList.add('active');
}

<<<<<<< HEAD
// PowerPoint rendering function
function renderPowerPoint(url, container) {
    // Check if URL is absolute (for GitHub Pages)
    const isAbsoluteUrl = url.startsWith('http://') || url.startsWith('https://');

    if (!isAbsoluteUrl) {
        // For local files or relative paths, show instructions
        container.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #fff; text-align: center; padding: 2rem;">
                <div>
                    <h3>PowerPoint Preview</h3>
                    <p style="margin: 1rem 0;">PowerPoint files can be previewed after deploying to GitHub Pages.</p>
                    <p style="font-size: 0.9rem; color: #999;">For now, please use the download button to view this file.</p>
                    <div style="margin-top: 2rem; padding: 1rem; background: rgba(212, 175, 55, 0.1); border-radius: 8px; border: 1px solid var(--accent-gold);">
                        <p style="font-size: 0.85rem; color: var(--accent-gold);"><strong>Alternative Options:</strong></p>
                        <p style="font-size: 0.85rem; margin-top: 0.5rem;">1. Upload to Google Drive and use shareable link</p>
                        <p style="font-size: 0.85rem;">2. Convert to PDF for universal preview</p>
                        <p style="font-size: 0.85rem;">3. Deploy to GitHub Pages for Office Viewer</p>
                    </div>
                </div>
            </div>
        `;
    } else {
        // Use Microsoft Office Online Viewer for absolute URLs
        const viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`;
        const iframe = document.createElement('iframe');
        iframe.src = viewerUrl;
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        container.appendChild(iframe);
    }
}

// PDF.js rendering function with page navigation
=======
// PDF.js rendering function
>>>>>>> 7ff756dd242acec0b0b08adace2c5bd46a0a693a
async function renderPDF(url, container) {
    try {
        // Create canvas container
        const canvasContainer = document.createElement('div');
<<<<<<< HEAD
        canvasContainer.id = 'pdfCanvasContainer';
        canvasContainer.style.cssText = 'overflow-y: auto; height: 100%; padding: 1rem; background: #1a1a1a; display: flex; align-items: center; justify-content: center;';
=======
        canvasContainer.style.cssText = 'overflow-y: auto; height: 100%; padding: 1rem; background: #1a1a1a;';
>>>>>>> 7ff756dd242acec0b0b08adace2c5bd46a0a693a
        container.appendChild(canvasContainer);

        // Load the PDF
        const loadingTask = pdfjsLib.getDocument(url);
<<<<<<< HEAD
        currentPDF = await loadingTask.promise;
        totalPages = currentPDF.numPages;

        // Update page info
        updatePageInfo();

        // Render first page
        await renderPage(currentPage);
=======
        const pdf = await loadingTask.promise;

        // Render all pages
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale: 1.5 });

            // Create canvas for this page
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            canvas.style.cssText = 'display: block; margin: 0 auto 1rem auto; box-shadow: 0 2px 8px rgba(0,0,0,0.3);';

            canvasContainer.appendChild(canvas);

            // Render page
            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            await page.render(renderContext).promise;
        }
>>>>>>> 7ff756dd242acec0b0b08adace2c5bd46a0a693a
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
<<<<<<< HEAD
        document.getElementById('pdfNav').style.display = 'none';
    }
}

async function renderPage(pageNum) {
    if (!currentPDF) return;

    const canvasContainer = document.getElementById('pdfCanvasContainer');
    canvasContainer.innerHTML = ''; // Clear previous page

    const page = await currentPDF.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1.5 });

    // Create canvas for this page
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    canvas.style.cssText = 'display: block; box-shadow: 0 2px 8px rgba(0,0,0,0.3);';

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

=======
    }
}

>>>>>>> 7ff756dd242acec0b0b08adace2c5bd46a0a693a
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
<<<<<<< HEAD

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
=======
>>>>>>> 7ff756dd242acec0b0b08adace2c5bd46a0a693a
