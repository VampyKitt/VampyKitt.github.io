/* Vanilla JavaScript Dimension Controller */
document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('nav ul li a');
    const articles = document.querySelectorAll('article');
    const mainWrapper = document.getElementById('main');
    const body = document.body;

    // Handle Article Navigation
    navItems.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href').replace('#', '');
            const targetArticle = document.getElementById(targetId);
            
            if (targetArticle) {
                e.preventDefault();
                
                // Toggle active states
                articles.forEach(art => art.classList.remove('active'));
                targetArticle.classList.add('active');
                
                // Dimension specific wrapper states
                mainWrapper.classList.add('is-article-visible');
                body.classList.add('is-article-visible');
            }
        });
    });

    // Handle Closing Articles
    document.querySelectorAll('.close').forEach(btn => {
        btn.addEventListener('click', () => {
            articles.forEach(art => art.classList.remove('active'));
            mainWrapper.classList.remove('is-article-visible');
            body.classList.remove('is-article-visible');
        });
    });

    // Lazy Loading Images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    lazyImages.forEach(img => imageObserver.observe(img));
});