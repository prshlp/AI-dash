# AI-dash Alumni Portal

A modern, AI-powered alumni portal for Williams College with intelligent networking features and seamless user experience.

## 🚀 Features

- **AI-Powered Assistant**: Intelligent chatbot for alumni networking, event discovery, and career guidance
- **Alumni Directory**: Comprehensive searchable directory with advanced filtering
- **Event Management**: Discover and manage alumni events with RSVP functionality
- **Modern UI/UX**: Beautiful, responsive design with accessibility in mind
- **Real-time Updates**: Dynamic content loading with version management
- **Mobile-First**: Optimized for all devices and screen sizes

## 🏗️ Architecture

### Hosting Model

This portal uses a hybrid hosting approach optimized for CRM integration:

- **Single CRM File**: Only `index.html` is hosted within the CRM portal
- **CDN Assets**: All other files (JS, CSS, schemas) are served from GitHub via jsDelivr CDN
- **Version Management**: Centralized versioning system for easy updates

### File Structure

```
AI-dash/
├── index.html              # Main entry point (hosted in CRM)
├── config.js              # Configuration and version management
├── main.js                # Main application logic
├── styles.css             # Complete styling and responsive design
├── schemas/               # JSON schemas for data validation
│   ├── alumni.schema.json
│   ├── event.schema.json
│   └── message.schema.json
└── README.md              # This file
```

## 🔧 Configuration

The portal is configured through `config.js`:

```javascript
const CONFIG = {
  VERSION: "1.0.0",                                              // Current version
  CDN_BASE: "https://cdn.jsdelivr.net/gh/prshlp/AI-dash@main/", // CDN base URL
  API_URL: "https://connect.williams.edu/manage/database/gpt",   // AI API endpoint
  assetUrl(path) {                                               // Asset URL helper
    return `${this.CDN_BASE}${path}?v=${this.VERSION}`;
  }
};
```

## 📦 Deployment

### Initial Setup

1. **Deploy to GitHub**:
   ```bash
   git clone https://github.com/prshlp/AI-dash.git
   cd AI-dash
   git add .
   git commit -m "Initial alumni portal deployment"
   git push origin main
   ```

2. **CRM Integration**:
   - Copy `index.html` to your CRM portal
   - Ensure the script tag references the correct version:
     ```html
     <script src="https://cdn.jsdelivr.net/gh/prshlp/AI-dash@main/config.js?v=1.0.0"></script>
     ```

### Version Updates

To deploy updates without touching the CRM:

1. **Update Application Files**:
   ```bash
   # Make your changes to main.js, styles.css, etc.
   git add .
   git commit -m "Update: [your changes]"
   git push origin main
   ```

2. **Bump Version**:
   ```javascript
   // In config.js
   const CONFIG = {
     VERSION: "1.0.1", // Increment version
     // ... rest of config
   };
   ```

3. **Update CRM Reference**:
   ```html
   <!-- In index.html (CRM) - only change the version number -->
   <script src="https://cdn.jsdelivr.net/gh/prshlp/AI-dash@main/config.js?v=1.0.1"></script>
   ```

### CDN Cache Busting

The portal uses versioned URLs for cache busting:
- `config.js` is loaded with explicit version in `index.html`
- All other assets use `CONFIG.assetUrl()` for automatic versioning
- jsDelivr CDN provides fast, reliable asset delivery

## 🔌 API Integration

### AI Assistant

The portal integrates with Williams College's AI API:

```javascript
// API Configuration
API_URL: "https://connect.williams.edu/manage/database/gpt"

// Request Format
fetch(CONFIG.API_URL, {
  method: 'POST',
  credentials: 'include',      // Uses existing CRM authentication
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({ message: userMessage })
})
```

### Authentication

- **Seamless Integration**: Uses existing CRM session authentication
- **No API Keys Required**: Leverages `credentials: 'include'` for session-based auth
- **Secure**: All requests go through authenticated CRM context

## 🎨 UI/UX Features

### Design System

- **Modern Aesthetic**: Clean, professional design with Williams College branding
- **Responsive Layout**: Mobile-first approach with breakpoints at 768px and 480px
- **Accessibility**: WCAG 2.1 AA compliant with proper focus management
- **Dark Mode Ready**: CSS custom properties for easy theme switching

### User Experience

- **Fast Loading**: Optimized asset loading with progressive enhancement
- **Smooth Animations**: 60fps animations with `prefers-reduced-motion` support
- **Error Handling**: Graceful error states with user-friendly messages
- **Offline Ready**: Designed for progressive web app capabilities

## 📊 Data Schemas

The portal includes comprehensive JSON schemas for data validation:

### Alumni Schema (`schemas/alumni.schema.json`)
- Personal and professional information
- Education and work history
- Privacy preferences
- Mentorship capabilities

### Event Schema (`schemas/event.schema.json`)
- Event details and logistics
- Registration and capacity management
- Virtual and physical location support
- Speaker and agenda management

### Message Schema (`schemas/message.schema.json`)
- AI conversation management
- Intent recognition and entity extraction
- Feedback and analytics tracking
- Message threading and history

## 🚀 Performance Optimizations

### Loading Strategy

1. **Critical Path**: `index.html` → `config.js` → `styles.css` + `main.js`
2. **Parallel Loading**: CSS and JS load simultaneously
3. **Progressive Enhancement**: Core functionality works before full JS load
4. **Lazy Loading**: Non-critical features load on demand

### CDN Benefits

- **Global Distribution**: jsDelivr's worldwide CDN network
- **HTTP/2 Support**: Multiplexed connections for faster loading
- **Compression**: Automatic gzip/brotli compression
- **Caching**: Intelligent caching with version-based invalidation

## 🔧 Development

### Local Development

1. **Clone Repository**:
   ```bash
   git clone https://github.com/prshlp/AI-dash.git
   cd AI-dash
   ```

2. **Serve Locally**:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using Live Server (VS Code extension)
   # Right-click index.html → "Open with Live Server"
   ```

3. **Test Changes**:
   - Make changes to files
   - Refresh browser to see updates
   - Test responsive design with DevTools

### Code Quality

- **Standards**: ES6+ JavaScript with modern browser support
- **Accessibility**: Semantic HTML with ARIA labels
- **Performance**: Optimized CSS with efficient selectors
- **Maintainability**: Modular code structure with clear separation

## 📱 Browser Support

- **Modern Browsers**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **Mobile**: iOS Safari 13+, Chrome Mobile 80+
- **Features**: ES6+ modules, CSS Grid, Flexbox, CSS Custom Properties
- **Fallbacks**: Graceful degradation for older browsers

## 🔒 Security

### Data Protection

- **No Local Storage**: Sensitive data not stored client-side
- **HTTPS Only**: All communications over secure connections
- **CRM Integration**: Leverages existing security infrastructure
- **Input Validation**: Client and server-side validation

### Privacy

- **Session-Based**: No persistent user tracking
- **Minimal Data**: Only necessary information processed
- **Compliance**: Follows Williams College privacy policies
- **Transparency**: Clear data usage in AI interactions

## 📈 Analytics & Monitoring

### Performance Metrics

- **Core Web Vitals**: LCP, FID, CLS optimization
- **Loading Performance**: Asset loading times and optimization
- **User Experience**: Interaction tracking and error monitoring
- **AI Performance**: Response times and success rates

### Usage Analytics

- **Feature Usage**: Track popular portal features
- **Search Patterns**: Alumni directory search behavior
- **AI Interactions**: Conversation quality and effectiveness
- **Error Tracking**: Monitor and resolve issues proactively

## 🛠️ Troubleshooting

### Common Issues

1. **Assets Not Loading**:
   - Check jsDelivr CDN status
   - Verify version numbers match
   - Clear browser cache

2. **AI API Errors**:
   - Confirm CRM authentication
   - Check network connectivity
   - Verify API endpoint URL

3. **Mobile Display Issues**:
   - Test viewport meta tag
   - Verify responsive CSS
   - Check touch event handling

### Debug Mode

Enable debug logging by adding to URL:
```
?debug=true
```

This will log:
- Asset loading progress
- API request/response details
- UI interaction events
- Performance metrics

## 🚀 Future Enhancements

### Planned Features

- **Push Notifications**: Event reminders and network updates
- **Advanced Search**: AI-powered semantic search across alumni data
- **Video Integration**: Virtual event streaming and networking
- **Mobile App**: Native iOS/Android applications
- **Blockchain Integration**: Verified alumni credentials

### Technical Roadmap

- **PWA Support**: Full progressive web app capabilities
- **Offline Mode**: Core functionality without internet
- **Real-time Chat**: Instant messaging between alumni
- **Advanced Analytics**: ML-powered insights and recommendations

## 📞 Support

### Documentation

- **Technical Docs**: [GitHub Wiki](https://github.com/prshlp/AI-dash/wiki)
- **API Reference**: [API Documentation](https://connect.williams.edu/api/docs)
- **Design System**: [UI Components Guide](https://github.com/prshlp/AI-dash/blob/main/DESIGN.md)

### Contact

- **Technical Support**: [tech-support@williams.edu](mailto:tech-support@williams.edu)
- **Feature Requests**: [GitHub Issues](https://github.com/prshlp/AI-dash/issues)
- **Alumni Relations**: [alumni@williams.edu](mailto:alumni@williams.edu)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎓 About Williams College

Williams College is a private liberal arts college in Williamstown, Massachusetts, founded in 1793. Known for its strong alumni network and commitment to excellence in education, Williams continues to foster lifelong connections among its graduates through innovative platforms like this AI-powered portal.

---

**Built with ❤️ for the Williams College Alumni Community**

*Version 1.0.0 - Initial Release*