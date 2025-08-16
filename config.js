/**
 * AI-dash Alumni Portal Configuration
 * This file manages versioning and asset loading for the portal
 */
const CONFIG = {
  VERSION: "1.0.1",
  CDN_BASE: "https://cdn.jsdelivr.net/gh/prshlp/AI-dash@main/",
  API_URL: "https://connect.williams.edu/manage/database/gpt",
  
  /**
   * Helper function to generate versioned asset URLs
   * @param {string} path - The asset path
   * @returns {string} - The complete URL with version parameter
   */
  assetUrl(path) {
    return `${this.CDN_BASE}${path}?v=${this.VERSION}`;
  }
};

// Make CONFIG available globally
window.CONFIG = CONFIG;
