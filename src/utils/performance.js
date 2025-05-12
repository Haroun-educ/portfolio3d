// Performance optimization utilities

/**
 * Lazy loads images when they enter the viewport
 * @param {HTMLImageElement} img - The image element to lazy load
 */
export const lazyLoadImage = (img) => {
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    img.loading = 'lazy';
  } else {
    // Fallback for browsers that don't support native lazy loading
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const image = entry.target;
          image.src = image.dataset.src;
          observer.unobserve(image);
        }
      });
    });
    observer.observe(img);
  }
};

/**
 * Optimizes image loading with progressive enhancement
 * @param {string} src - The image source URL
 * @param {Object} options - Options for image optimization
 * @returns {Promise<string>} - Promise that resolves to the optimized image URL
 */
export const optimizeImage = (src, options = {}) => {
  const {
    quality = 80,
    width = null,
    format = 'webp',
    blur = false
  } = options;

  return new Promise((resolve) => {
    // If no src or running in SSR, return original
    if (!src || typeof window === 'undefined') {
      resolve(src);
      return;
    }

    // Create a new image to load the source
    const img = new Image();

    img.onload = () => {
      try {
        // Create a canvas to manipulate the image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Set dimensions
        const targetWidth = width || img.width;
        const targetHeight = width ? Math.round(img.height * (width / img.width)) : img.height;

        canvas.width = targetWidth;
        canvas.height = targetHeight;

        // Apply blur if requested
        if (blur) {
          ctx.filter = 'blur(10px)';
        }

        // Draw image to canvas
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        // Convert to desired format with quality setting
        const optimizedSrc = canvas.toDataURL(`image/${format}`, quality / 100);

        resolve(optimizedSrc);
      } catch (error) {
        console.error('Image optimization failed:', error);
        resolve(src); // Fallback to original on error
      }
    };

    img.onerror = () => {
      console.error('Failed to load image for optimization');
      resolve(src); // Fallback to original on error
    };

    img.src = src;
  });
};

/**
 * Optimizes Three.js performance
 * @param {THREE.WebGLRenderer} renderer - The Three.js renderer
 */
export const optimizeThreeJsPerformance = (renderer) => {
  if (renderer) {
    // Optimize renderer
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for mobile

    // Enable power preference for better battery life on mobile
    renderer.powerPreference = 'high-performance';

    // Optimize shadow maps if used
    if (renderer.shadowMap.enabled) {
      renderer.shadowMap.autoUpdate = false;
      renderer.shadowMap.needsUpdate = true;
    }
  }
};

/**
 * Debounce function to limit how often a function can be called
 * @param {Function} func - The function to debounce
 * @param {number} wait - The time to wait in milliseconds
 * @returns {Function} - The debounced function
 */
export const debounce = (func, wait = 100) => {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
};

/**
 * Throttle function to limit how often a function can be called
 * @param {Function} func - The function to throttle
 * @param {number} limit - The time limit in milliseconds
 * @returns {Function} - The throttled function
 */
export const throttle = (func, limit = 100) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};
