# Assembly of the Poor (สมัชชาคนจน) Website

A Next.js website for Assembly of the Poor, built with headless WordPress backend.

## Tech Stack

- **Frontend:** Next.js 14 (App Router), React 18
- **Styling:** TailwindCSS with custom brand colors
- **Backend:** Headless WordPress (https://assemblyofthepoor.org)
- **Font:** Sarabun (Google Fonts) for Thai language support

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Access to WordPress admin credentials

### Installation

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Add your WordPress credentials:

```env
WP_USER=your_wp_admin_username
WP_PASS=your_wp_admin_password
NEXT_PUBLIC_API_URL=https://assemblyofthepoor.org/wp-json
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
aop-frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── about/              # About pages
│   │   ├── campaigns/          # Campaigns list and detail
│   │   ├── contact/            # Contact page
│   │   ├── get-involved/       # Get involved page
│   │   ├── history/            # History timeline
│   │   ├── media/              # Media hub and articles
│   │   ├── news/               # News listing
│   │   ├── search/             # Search functionality
│   │   ├── api/                # API routes
│   │   ├── layout.jsx          # Root layout
│   │   └── page.jsx            # Homepage
│   ├── components/             # Reusable components
│   │   ├── Navbar.jsx          # Navigation bar
│   │   └── Footer.jsx          # Footer
│   └── lib/                    # Utilities
│       └── api.js              # WordPress API integration
├── .env.local                  # Environment variables (not in git)
├── .env.example                # Example environment file
├── tailwind.config.js          # Tailwind configuration
└── package.json
```

## Features

- 🎨 Custom brand colors matching AOP visual identity
- 🌐 Full Thai language support with Sarabun font
- 📱 Fully responsive design
- 🔌 Headless WordPress integration
- 🔐 JWT authentication for API calls
- 📄 Dynamic routes for campaigns and articles
- 🔍 Search functionality
- 📰 News and media sections
- 🤝 Get involved and contact forms

## Brand Colors

- Dark Green: `#009253`
- Medium Green: `#67be6a`
- Light Green: `#d9e8c5`
- Red: `#803432`
- Yellow: `#faf4a6`
- Black: `#231f20`
- White: `#ffffff`

## API Integration

The site connects to WordPress REST API with JWT authentication:

- Campaigns: `/wp/v2/campaigns`
- Articles: `/wp/v2/articles`
- News: `/wp/v2/posts`
- Media: `/wp/v2/media`

All Custom Post Types expose ACF fields under the `acf` key.

## License

© 2024 สมัชชาคนจน - Assembly of the Poor. All rights reserved.
