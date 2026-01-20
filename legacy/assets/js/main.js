
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
        const indexedButtons = document.querySelectorAll('[data-hero-index]');
        const prevButton = document.querySelector('[data-hero-control="prev"]');
        const nextButton = document.querySelector('[data-hero-control="next"]');
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

        function setHeroIndex(index) {
            currentImageIndex = (index + heroImages.length) % heroImages.length;
            updateImageDisplay();
        }

        window.changeHeroImage = function (index) {
            setHeroIndex(index);
        }

        if (indexedButtons.length) {
            indexedButtons.forEach((btn) => {
                btn.addEventListener('click', () => {
                    const index = Number(btn.dataset.heroIndex || 0);
                    setHeroIndex(index);
                });
            });
        }

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                setHeroIndex(currentImageIndex - 1);
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                setHeroIndex(currentImageIndex + 1);
            });
        }

        // Initialize display
        updateImageDisplay();

        // Auto-rotate images every 5 seconds
        setInterval(() => {
            setHeroIndex(currentImageIndex + 1);
        }, 5000);
    }
});

// Navbar Component Logic
function loadNavbar() {
    const navbarHTML = `
    <header class="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-solid border-[#f4f2f0] dark:border-[#3d2b1d]">
        <div class="max-w-[1280px] mx-auto px-6 lg:px-10 flex items-center justify-between h-16">
            <a href="index.html" class="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer">
                <div class="size-8 text-primary">
                    <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor"></path>
                    </svg>
                </div>
                <h2 class="text-[#181411] dark:text-white text-xl font-bold leading-tight tracking-tight">Thai Haven Service</h2>
            </a>
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
                            <a href="service-partition.html" class="block px-4 py-3 text-sm text-[#181411] dark:text-white hover:bg-primary/10 hover:text-primary transition-colors">
                                <div class="font-medium">ฉากกั้นห้อง</div>
                                <div class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Room Partition</div>
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
            <div class="flex items-center gap-3">
                <button class="md:hidden inline-flex items-center justify-center size-10 rounded-lg border border-[#ece7e2] dark:border-[#3d2b1d] text-[#181411] dark:text-white hover:bg-[#f6f2ee] dark:hover:bg-[#2b1f17] transition-colors"
                    id="mobile-menu-toggle" aria-controls="mobile-menu" aria-expanded="false" aria-label="เปิดเมนู">
                    <span class="material-symbols-outlined text-2xl">menu</span>
                </button>
                <button class="btn btn-primary h-10 px-5 text-sm hidden md:inline-flex">
                    ขอใบเสนอราคา
                </button>
            </div>
        </div>
        <div id="mobile-menu" class="md:hidden hidden border-t border-[#f4f2f0] dark:border-[#3d2b1d] bg-white/95 dark:bg-background-dark/95">
            <div class="max-w-[1280px] mx-auto px-6 lg:px-10 py-4 flex flex-col gap-1">
                <!-- Main Menu Items -->
                <a class="text-base font-semibold text-[#181411] dark:text-white hover:text-primary transition-colors py-2" href="index.html" data-page="index.html">หน้าหลัก</a>
                
                <!-- Services Section -->
                <div class="mt-2 mb-1">
                    <a class="text-base font-semibold text-[#181411] dark:text-white hover:text-primary transition-colors py-2 block" href="allservices.html" data-page="allservices.html">บริการ</a>
                    <div class="pl-4 mt-1 flex flex-col gap-0.5 border-l-2 border-gray-200 dark:border-gray-700 ml-2">
                        <a class="text-sm font-normal text-[#6b584a] dark:text-gray-400 hover:text-primary transition-colors py-1.5" href="service-curtains.html">ผ้าม่านและมู่ลี่</a>
                        <a class="text-sm font-normal text-[#6b584a] dark:text-gray-400 hover:text-primary transition-colors py-1.5" href="service-wallpapers.html">วอลเปเปอร์ติดผนัง</a>
                        <a class="text-sm font-normal text-[#6b584a] dark:text-gray-400 hover:text-primary transition-colors py-1.5" href="service-flooring.html">พื้นไม้ SPC</a>
                        <a class="text-sm font-normal text-[#6b584a] dark:text-gray-400 hover:text-primary transition-colors py-1.5" href="service-builtin.html">เฟอร์นิเจอร์บิวท์อิน</a>
                        <a class="text-sm font-normal text-[#6b584a] dark:text-gray-400 hover:text-primary transition-colors py-1.5" href="service-awnings.html">กันสาดและหลังคา</a>
                        <a class="text-sm font-normal text-[#6b584a] dark:text-gray-400 hover:text-primary transition-colors py-1.5" href="service-partition.html">ฉากกั้นห้อง</a>
                        <a class="text-sm font-medium text-primary hover:text-primary/80 transition-colors py-1.5 mt-1" href="allservices.html">ดูบริการทั้งหมด →</a>
                    </div>
                </div>
                
                <!-- Other Main Menu Items -->
                <a class="text-base font-semibold text-[#181411] dark:text-white hover:text-primary transition-colors py-2" href="about.html" data-page="about.html">เกี่ยวกับเรา</a>
                <a class="text-base font-semibold text-[#181411] dark:text-white hover:text-primary transition-colors py-2" href="articles.html" data-page="articles.html">บทความ</a>
                <a class="text-base font-semibold text-[#181411] dark:text-white hover:text-primary transition-colors py-2" href="contact.html" data-page="contact.html">ติดต่อเรา</a>
                
                <!-- CTA Button -->
                <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button class="btn btn-primary h-11 px-5 text-sm w-full">
                        ขอใบเสนอราคา
                    </button>
                </div>
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
        const mobileNavLinks = navbarContainer.querySelectorAll('#mobile-menu a[data-page]');

        // Desktop nav active state
        navLinks.forEach(link => {
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

        // Mobile nav active state
        mobileNavLinks.forEach(link => {
            const linkPage = link.dataset.page;
            const normalizedCurrentPage = currentPage === '' ? 'index.html' : currentPage;
            
            if (linkPage === normalizedCurrentPage) {
                link.classList.add('text-primary', 'font-bold');
                link.classList.remove('text-[#181411]', 'dark:text-white', 'font-semibold');
            } else {
                // Restore original classes based on whether it's a main menu or submenu
                if (link.closest('.pl-4')) {
                    // Submenu item
                    link.classList.add('text-[#6b584a]', 'dark:text-gray-400', 'font-normal');
                    link.classList.remove('text-primary', 'font-bold', 'font-medium');
                } else {
                    // Main menu item
                    link.classList.add('text-[#181411]', 'dark:text-white', 'font-semibold');
                    link.classList.remove('text-primary', 'font-bold');
                }
            }
        });

        // Active state for service dropdown (Desktop)
        const servicePages = ['service-curtains.html', 'service-wallpapers.html', 'service-flooring.html', 'service-builtin.html', 'service-awnings.html', 'service-partition.html'];
        if (servicePages.includes(currentPage) || currentPage === 'allservices.html') {
            const serviceLink = navbarContainer.querySelector('nav .group > a[data-page="allservices.html"]');
            if (serviceLink) {
                serviceLink.classList.add('text-primary', 'font-bold');
                serviceLink.classList.remove('text-[#181411]', 'dark:text-white');
            }
            
            // Mobile menu: highlight "บริการ" link
            const mobileServiceLink = navbarContainer.querySelector('#mobile-menu a[href="allservices.html"][data-page="allservices.html"]');
            if (mobileServiceLink) {
                mobileServiceLink.classList.add('text-primary', 'font-bold');
                mobileServiceLink.classList.remove('text-[#181411]', 'dark:text-white', 'font-semibold');
            }
            
            // Mobile menu: highlight active service submenu item
            if (servicePages.includes(currentPage)) {
                const activeServiceLink = navbarContainer.querySelector(`#mobile-menu a[href="${currentPage}"]`);
                if (activeServiceLink) {
                    activeServiceLink.classList.add('text-primary', 'font-medium');
                    activeServiceLink.classList.remove('text-[#6b584a]', 'dark:text-gray-400', 'font-normal');
                }
            }
        }

        const toggleButton = navbarContainer.querySelector('#mobile-menu-toggle');
        const mobileMenu = navbarContainer.querySelector('#mobile-menu');
        const mobileMenuLinks = navbarContainer.querySelectorAll('#mobile-menu a');

        if (toggleButton && mobileMenu) {
            toggleButton.addEventListener('click', () => {
                const isOpen = !mobileMenu.classList.contains('hidden');
                mobileMenu.classList.toggle('hidden', isOpen);
                toggleButton.setAttribute('aria-expanded', (!isOpen).toString());
            });

            mobileMenuLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                    toggleButton.setAttribute('aria-expanded', 'false');
                });
            });
        }
    }
}

// Initialize Navbar on load
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('[data-react-navbar]')) {
        return;
    }
    const path = window.location.pathname || '';
    if (!path.endsWith('.html')) {
        return;
    }
    loadNavbar();
});
