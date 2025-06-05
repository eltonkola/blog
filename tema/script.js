// Common functionality
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            // Skip if href is just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Keyboard navigation enhancement
    document.addEventListener('keydown', function(e) {
        if (e.key === '/') {
            e.preventDefault();
            // Focus on search if it existed
            console.log('Search functionality would be triggered here');
        }
    });

    // Category tree functionality (only on home page)
    const categoryTree = document.querySelector('.category-tree');
    if (categoryTree) {
        // Simple category tree toggle
        document.querySelectorAll('.category-tree .category-item > .category-link').forEach(link => {
            link.addEventListener('click', function(e) {
                const subcategory = this.parentNode.querySelector('.subcategory');
                if (subcategory) {
                    e.preventDefault();
                    const categoryItem = this.parentNode;
                    const isExpanded = categoryItem.classList.contains('expanded');
                    
                    if (isExpanded) {
                        categoryItem.classList.remove('expanded');
                        subcategory.style.display = 'none';
                    } else {
                        categoryItem.classList.add('expanded');
                        subcategory.style.display = 'block';
                    }
                }
            });
        });

        // Initialize all subcategories as visible
        document.querySelectorAll('.subcategory').forEach(sub => {
            sub.style.display = 'block';
        });
        
        // Initialize all parent categories as expanded
        document.querySelectorAll('.category-tree .category-item').forEach(item => {
            if (item.querySelector('.subcategory')) {
                item.classList.add('expanded');
            }
        });

        // Reading time estimation
        document.querySelectorAll('.article-excerpt').forEach(excerpt => {
            const text = excerpt.textContent;
            const words = text.split(' ').length;
            const readingTime = Math.ceil(words / 200); // Average reading speed
            
            const metaElement = excerpt.parentNode.querySelector('.article-meta');
            if (metaElement && readingTime > 0) {
                const timeSpans = metaElement.querySelectorAll('span');
                const lastSpan = timeSpans[timeSpans.length - 1];
                if (lastSpan && lastSpan.textContent.includes('min read')) {
                    lastSpan.textContent = `${readingTime} min read`;
                }
            }
        });
    }

    // Reading progress bar (only on post page)
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        function updateProgressBar() {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        }
        window.addEventListener('scroll', updateProgressBar);
    }

    // Initialize Prism.js if available
    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    }
});