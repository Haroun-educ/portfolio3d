/**
 * Updates the URL hash when scrolling to a section
 * @param {string} sectionId - The ID of the section to scroll to
 */
export const updateUrlHash = (sectionId) => {
  // Update URL without scrolling
  if (sectionId && sectionId !== 'home') {
    window.history.pushState(null, null, `#${sectionId}`);
  } else {
    window.history.pushState(null, null, ' ');
  }
};

/**
 * Scrolls to a section with smooth behavior
 * @param {string} sectionId - The ID of the section to scroll to
 */
export const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    // Scroll to the element
    element.scrollIntoView({ behavior: 'smooth' });
    
    // Update URL hash after scrolling
    setTimeout(() => {
      updateUrlHash(sectionId);
    }, 500);
  }
};

/**
 * Detects which section is currently in view
 * @param {Array} sections - Array of section IDs to check
 * @returns {string} - The ID of the section in view
 */
export const detectSectionInView = (sections) => {
  for (const section of sections) {
    const element = document.getElementById(section);
    if (element) {
      const rect = element.getBoundingClientRect();
      // If the top of the section is near the top of the viewport
      if (rect.top <= 150) {
        return section;
      }
    }
  }
  return 'home';
};
