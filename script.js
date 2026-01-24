/**
 * NextGen Systems Limited - Project Script
 * Handles: Mobile Menu, Smooth Scrolling, and Navbar Effects
 */

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('#mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');

    // --- 1. Mobile Menu Logic ---
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            // Toggle the 'active' class for the hamburger animation and menu visibility
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
    }

    // --- 2. Smooth Scroll & Auto-Close Menu ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }

                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset for sticky navbar
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 3. Navbar Scroll Effects ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = "rgba(255, 255, 255, 0.95)";
            navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.08)";
            navbar.style.padding = "15px 8%"; // Slight shrink effect
        } else {
            navbar.style.background = "rgba(255, 255, 255, 0.8)";
            navbar.style.boxShadow = "none";
            navbar.style.padding = "20px 8%";
        }
    });

    // --- 4. Form Submission Feedback (Optional) ---
    const demoForm = document.querySelector('form');
    if (demoForm) {
        demoForm.addEventListener('submit', () => {
            // Since you are using Formspree, the redirect happens automatically.
            // This just provides a quick UI hint.
            const btn = demoForm.querySelector('button');
            btn.innerText = "Sending...";
            btn.style.opacity = "0.7";
        });
    }
});