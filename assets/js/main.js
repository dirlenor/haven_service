
// Hero Slider Logic
document.addEventListener('DOMContentLoaded', () => {
    const heroImages = [
        document.getElementById('hero-image-1'),
        document.getElementById('hero-image-2'),
        document.getElementById('hero-image-3')
    ];

    // Only run if slider elements exist
    if (heroImages[0]) {
        const imageButtons = document.querySelectorAll('#hero-slider-controls button');
        let currentImageIndex = 0;

        function updateImageDisplay() {
            heroImages.forEach((img, index) => {
                if (index === currentImageIndex) {
                    img.classList.remove('opacity-0');
                    img.classList.add('opacity-100');
                } else {
                    img.classList.remove('opacity-100');
                    img.classList.add('opacity-0');
                }
            });

            if (imageButtons.length) {
                imageButtons.forEach((btn, index) => {
                    if (index === currentImageIndex) {
                        btn.classList.remove('bg-white/50');
                        btn.classList.add('bg-white');
                    } else {
                        btn.classList.remove('bg-white');
                        btn.classList.add('bg-white/50');
                    }
                });
            }
        }

        window.changeHeroImage = function (index) {
            currentImageIndex = index;
            updateImageDisplay();
        }

        // Initialize display
        updateImageDisplay();

        // Auto-rotate images every 5 seconds
        setInterval(() => {
            currentImageIndex = (currentImageIndex + 1) % heroImages.length;
            updateImageDisplay();
        }, 5000);
    }
});

// Navbar Component Logic
function loadNavbar() {
    const navbarHTML = `
    <header class="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-solid border-[#f4f2f0] dark:border-[#3d2b1d]">
        <div class="max-w-[1280px] mx-auto px-6 lg:px-10 flex items-center justify-between h-16">
            <div class="flex items-center gap-3">
                <div class="size-8 text-primary">
                    <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor"></path>
                    </svg>
                </div>
                <h2 class="text-[#181411] dark:text-white text-xl font-bold leading-tight tracking-tight">Thai Haven Service</h2>
            </div>
            <nav class="hidden md:flex items-center gap-8">
                <a class="text-sm font-medium hover:text-primary transition-colors" href="index.html" data-page="index.html">หน้าหลัก</a>
                <div class="relative group">
                    <a class="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1 cursor-pointer" href="allservices.html" data-page="allservices.html">
                        บริการ
                        <span class="material-symbols-outlined text-base transition-transform group-hover:rotate-180">expand_more</span>
                    </a>
                    <div class="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-[#2d2118] rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <div class="py-2">
                            <a href="service-curtains.html" class="block px-4 py-3 text-sm text-[#181411] dark:text-white hover:bg-primary/10 hover:text-primary transition-colors">
                                <div class="font-medium">ผ้าม่านและมู่ลี่</div>
                                <div class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Curtains & Blinds</div>
                            </a>
                            <a href="service-wallpapers.html" class="block px-4 py-3 text-sm text-[#181411] dark:text-white hover:bg-primary/10 hover:text-primary transition-colors">
                                <div class="font-medium">วอลเปเปอร์ติดผนัง</div>
                                <div class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Wallpapers</div>
                            </a>
                            <a href="service-flooring.html" class="block px-4 py-3 text-sm text-[#181411] dark:text-white hover:bg-primary/10 hover:text-primary transition-colors">
                                <div class="font-medium">พื้นไม้ SPC</div>
                                <div class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">SPC Flooring</div>
                            </a>
                            <a href="service-builtin.html" class="block px-4 py-3 text-sm text-[#181411] dark:text-white hover:bg-primary/10 hover:text-primary transition-colors">
                                <div class="font-medium">เฟอร์นิเจอร์บิวท์อิน</div>
                                <div class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Built-in Furniture</div>
                            </a>
                            <a href="service-awnings.html" class="block px-4 py-3 text-sm text-[#181411] dark:text-white hover:bg-primary/10 hover:text-primary transition-colors">
                                <div class="font-medium">กันสาดและหลังคา</div>
                                <div class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Awnings & Roofing</div>
                            </a>
                            <div class="border-t border-gray-100 dark:border-gray-700 mt-1"></div>
                            <a href="allservices.html" class="block px-4 py-3 text-sm text-primary font-medium hover:bg-primary/10 transition-colors">
                                ดูบริการทั้งหมด →
                            </a>
                        </div>
                    </div>
                </div>
                <a class="text-sm font-medium hover:text-primary transition-colors" href="about.html" data-page="about.html">เกี่ยวกับเรา</a>
                <a class="text-sm font-medium hover:text-primary transition-colors" href="articles.html" data-page="articles.html">บทความ</a>
                <a class="text-sm font-medium hover:text-primary transition-colors" href="contact.html" data-page="contact.html">ติดต่อเรา</a>
            </nav>
            <div class="flex items-center gap-4">
                <button class="btn btn-primary h-10 px-5 text-sm">
                    ขอใบเสนอราคา
                </button>
            </div>
        </div>
    </header>
    `;

    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        navbarContainer.innerHTML = navbarHTML;

        // Active State Logic
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = navbarContainer.querySelectorAll('nav > a[data-page]');

        navLinks.forEach(link => {
            // Check if data-page matches current page, handling empty path as index.html
            const linkPage = link.dataset.page;
            const normalizedCurrentPage = currentPage === '' ? 'index.html' : currentPage;
            
            if (linkPage === normalizedCurrentPage) {
                link.classList.add('text-primary', 'font-bold');
                link.classList.remove('text-[#181411]', 'dark:text-white');
            } else {
                link.classList.add('text-[#181411]', 'dark:text-white');
                link.classList.remove('text-primary', 'font-bold');
            }
        });

        // Active state for service dropdown
        const servicePages = ['service-curtains.html', 'service-wallpapers.html', 'service-flooring.html', 'service-builtin.html', 'service-awnings.html'];
        if (servicePages.includes(currentPage) || currentPage === 'allservices.html') {
            const serviceLink = navbarContainer.querySelector('nav .group > a[data-page="allservices.html"]');
            if (serviceLink) {
                serviceLink.classList.add('text-primary', 'font-bold');
                serviceLink.classList.remove('text-[#181411]', 'dark:text-white');
            }
        }
    }
}

// Initialize Navbar on load
document.addEventListener('DOMContentLoaded', () => {
    loadNavbar();
});
