
# Useful Tools Directory

A modern, responsive web application showcasing a curated collection of useful tools and resources. Built with vanilla HTML, CSS, and JavaScript, featuring a clean professional design with customizable themes and powerful search functionality.

## Features

### Core Functionality
- **Dynamic Tool Directory**: Displays tools with categories, descriptions, and direct links
- **Real-time Search**: Instant search across tool names, descriptions, and categories
- **Category Filtering**: Filter tools by specific categories
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### User Experience
- **Multiple Color Themes**: 5 built-in color palettes (Default, Purple, Emerald, Orange, Monochrome)
- **Dark/Light Mode**: Toggle between light and dark themes
- **Theme Persistence**: User preferences saved locally
- **Smooth Animations**: Professional transitions and hover effects
- **Mobile-First Design**: Collapsible navigation and touch-friendly interface

### Contact System
- **Working Contact Form**: Integrated with Formspree for reliable message delivery
- **Form Validation**: Client-side validation with floating labels
- **Success/Error Feedback**: Clear user feedback for form submissions
- **Professional Layout**: Clean contact page with company information

## Live Demo

The project is deployed and running on Vercel. You can view it [here](https://useful-tools-alpha.vercel.app/).

## Technology

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Fonts**: Inter (Google Fonts)
- **Icons**: Custom SVG icons
- **Form Handling**: Formspree integration
- **Data Source**: Google Apps Script API
- **Hosting**: Vercel

## Project Structure

```
useful-tools/
├── index.html          # Main homepage
├── contact.html        # Contact page
├── styles.css          # Global styles and themes
├── script.js           # Main JavaScript functionality
└── README.md           # Project documentation
```


## Customization

### Color Themes

The application includes 5 pre-built color themes:

1. **Default** - Blue accent with clean whites/grays
2. **Purple** - Purple accent with modern styling
3. **Emerald** - Green accent with nature-inspired colors
4. **Orange** - Orange accent with warm tones
5. **Monochrome** - Black and white minimalist design


## Data Integration

The application fetches tool data from a Google Apps Script API. The expected data format:

```json
[
    {
        "Tool Name": "Example Tool",
        "Description": "Tool description here...",
        "Category": "Category Name",
        "Link": "https://example.com"
    }
]
```

## Responsive Design

The application is fully responsive with breakpoints:

- **Desktop**: 1200px and above
- **Tablet**: 768px to 1199px  
- **Mobile**: Below 768px

### Mobile Features

- Collapsible navigation menu
- Touch-optimized buttons and forms
- Optimized grid layouts
- Mobile-specific search and filtering

##  Features Overview

### Search Functionality
- **Instant Search**: Real-time filtering as you type
- **Multi-field Search**: Searches tool names, descriptions, and categories

### Theme System
- **5 Color Palettes**: Professional pre-built themes
- **Dark/Light Toggle**: Independent of color selection
- **Local Storage**: Preferences saved automatically
- **Smooth Transitions**: Animated theme changes

### Contact Form
- **Reliable Delivery**: Formspree integration ensures messages are delivered
- **Validation**: Client-side form validation
- **Loading States**: Visual feedback during submission
- **Error Handling**: Clear error messages and retry options

## Contributing

### To contribute to this project:

1. **Fork** the project on Replit
2. **Create** a new feature branch
3. **Make** your changes
4. **Test** thoroughly across devices
5. **Submit** a pull request with description

### Code Standards

- Use semantic HTML5 elements
- Follow BEM CSS naming convention where applicable
- Use ES6+ JavaScript features
- Maintain responsive design principles
- Include proper accessibility attributes


---



*For questions or support, use the contact form in the application.*


