// DOM Elements
const downloadBtns = document.querySelectorAll('#downloadBtn, #navDownloadBtn, #ctaDownloadBtn');
const installModal = document.getElementById('installModal');
const closeModal = document.getElementById('closeModal');
const installButton = document.querySelector('.install-button.primary');
const platformButtons = document.querySelectorAll('.platform-button');
const faqItems = document.querySelectorAll('.faq-item');
const previewVideo = document.getElementById('previewVideo');
const playBtn = document.getElementById('playBtn');
const downloadVideoBtn = document.getElementById('downloadVideoBtn');

// Video Player Functionality
if (playBtn && previewVideo) {
    playBtn.addEventListener('click', () => {
        previewVideo.play();
        playBtn.style.display = 'none';
    });

    previewVideo.addEventListener('pause', () => {
        playBtn.style.display = 'flex';
    });

    previewVideo.addEventListener('click', () => {
        if (previewVideo.paused) {
            previewVideo.play();
            playBtn.style.display = 'none';
        } else {
            previewVideo.pause();
            playBtn.style.display = 'flex';
        }
    });
}

// Download Video Button - Show Install Modal
if (downloadVideoBtn) {
    downloadVideoBtn.addEventListener('click', () => {
        installModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

// Open modal when any download button is clicked
downloadBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        installModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close modal when close button is clicked
closeModal.addEventListener('click', () => {
    installModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside the modal content
installModal.addEventListener('click', (e) => {
    if (e.target === installModal) {
        installModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && installModal.classList.contains('active')) {
        installModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Handle install button click - Download APK
installButton.addEventListener('click', () => {
    const originalText = installButton.innerHTML;
    installButton.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
        </svg>
        Downloading...
    `;
    installButton.disabled = true;
    
    // Download APK file from Google Drive
    const link = document.createElement('a');
    link.href = 'https://drive.google.com/uc?export=download&id=1Ho72UV0JEtN3_6PAOxvVuHBSuk5c67kD';
    link.download = 'VideoDown.apk';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    installButton.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        Download Started!
    `;
    installButton.style.background = '#16A34A';
    
    setTimeout(() => {
        installModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        setTimeout(() => {
            installButton.innerHTML = originalText;
            installButton.style.background = '';
            installButton.disabled = false;
        }, 300);
    }, 1500);
});

// Handle platform button clicks
platformButtons.forEach(button => {
    button.addEventListener('click', () => {
        const platform = button.textContent.trim();
        alert(`Redirecting to ${platform}...`);
    });
});

// FAQ Accordion
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other items
        faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Animation for feature cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .step-card, .testimonial-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Add spinning animation style
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    .spin {
        animation: spin 1s linear infinite;
    }
`;
document.head.appendChild(style);