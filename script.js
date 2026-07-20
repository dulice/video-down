// DOM Elements
const downloadBtns = document.querySelectorAll('#downloadBtn, #navDownloadBtn, #ctaDownloadBtn');
const installModal = document.getElementById('installModal');
const closeModal = document.getElementById('closeModal');
const installButton = document.querySelector('.install-button.primary');
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

// Download URL
const downloadUrl = 'https://www.dropbox.com/scl/fi/y5p5jzcysbxynsk6z900u/VideoDown.apk?rlkey=hhs93xh17jijkixhwpknmm7oz&st=1rvrvmjj&dl=1';

function triggerDownload() {
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = '';
    a.target = '_self';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Download Video Button - Show Install Modal
if (downloadVideoBtn) {
    downloadVideoBtn.addEventListener('click', () => {
        installModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

// Download directly when any download button is clicked
downloadBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        triggerDownload();
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
    triggerDownload();
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