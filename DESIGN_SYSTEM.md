# Assembly of the Poor - Design System & Visual Guidelines

> **Reference**: `/branding-guildline/Key-visualสมัชชาคนจน-01_Page_*.jpg`
> **Last Updated**: 2026-01-30

This document serves as the comprehensive design system and visual identity reference for the Assembly of the Poor (สมัชชาคนจน) website. All components and pages should adhere to these guidelines to maintain brand consistency.

---

## Table of Contents
- [Brand Identity](#brand-identity)
- [Color Palette](#color-palette)
- [Typography](#typography)
- [Illustration Style](#illustration-style)
- [Pattern & Background](#pattern--background)
- [Logo Usage](#logo-usage)
- [Component Guidelines](#component-guidelines)
- [Layout Principles](#layout-principles)

---

## Brand Identity

### Core Concept
The Assembly of the Poor (สมัชชาคนจน) represents a network of grassroots communities fighting for justice and fundamental rights. The visual identity emphasizes:
- **Strength in Unity**: People standing together
- **Grassroots Movement**: Hand-drawn, organic illustration style
- **Hope & Resilience**: Vibrant greens representing growth and life
- **Accessibility**: Clear, bold typography and high contrast

### Brand Name
- **Thai**: สมัชชาคนจน
- **English**: ASSEMBLY OF THE POOR
- **Tagline Position**: English name typically appears in a badge/label above the Thai name

---

## Color Palette

### Primary Colors

#### 1. **Primary Green** (Main Brand Color)
- **Hex**: `#009253` (equivalent to `brand-green-dark` in config)
- **RGB**: `0, 146, 83`
- **Usage**: Primary backgrounds, main CTAs, headers, key brand elements
- **Accessibility**: Use with white text (AAA compliant)

#### 2. **Neutral Colors**

##### **Black/Charcoal**
- **Hex**: `#231F20` (equivalent to `brand-black`)
- **RGB**: `35, 31, 32`
- **Usage**: Body text, headings, footer backgrounds
- **Note**: Slightly warmer than pure black

##### **White / Light Tone**
- **Hex**: `#FFFFFF` (equivalent to `brand-white`)
- **Usage**: Backgrounds, text on dark surfaces, cards
- **Note**: Use sparingly, only for emphasis

### Grayscale (Supporting)
- **Light Gray**: `#F9FAFB` - Subtle backgrounds
- **Mid Gray**: `#6B7280` - Secondary text, disabled states
- **Dark Gray**: `#374151` - Tertiary text

---

## Typography

### Primary Typeface: Noto Sans Thai Looped

#### Characteristics
- **Design**: Modern, humanist sans-serif
- **Quality**: High legibility for Thai script
- **Weights Available**: Regular, Medium, Bold, ExtraBold
- **Use Cases**: All UI elements, body text, headings

#### Font Weights Mapping
```css
/* Primary Font Variable */
--font-noto-sans-thai-looped

/* Weight Usage */
font-weight: 400; /* Regular - Body text, paragraphs */
font-weight: 500; /* Medium - Subheadings, labels */
font-weight: 700; /* Bold - Headings, CTAs, navigation */
font-weight: 800; /* ExtraBold - Hero titles, major headings */
```

### Typography Scale

#### Headings
- **H1 (Hero)**: 
  - Desktop: `60px` (3.75rem) - `72px` (4.5rem)
  - Mobile: `48px` (3rem)
  - Weight: ExtraBold (800) or Bold (700)
  - Line Height: 1.1 - 1.2
  - Color: Primary Green or Black

- **H2 (Section Title)**:
  - Desktop: `36px` (2.25rem) - `48px` (3rem)
  - Mobile: `32px` (2rem)
  - Weight: Bold (700)
  - Line Height: 1.2 - 1.3

- **H3 (Subsection)**:
  - Desktop: `24px` (1.5rem) - `30px` (1.875rem)
  - Weight: Bold (700)
  - Line Height: 1.3 - 1.4

#### Body Text
- **Large Body**: `18px` (1.125rem) - `20px` (1.25rem)
  - Weight: Regular (400) or Medium (500)
  - Line Height: 1.6 - 1.8
  
- **Regular Body**: `16px` (1rem)
  - Weight: Regular (400)
  - Line Height: 1.6 - 1.7

- **Small Text**: `14px` (0.875rem)
  - Weight: Regular (400) or Medium (500)
  - Line Height: 1.5

#### Labels & Badges
- Size: `12px` (0.75rem) - `14px` (0.875rem)
- Weight: Bold (700) or Medium (500)
- Transform: Uppercase or Regular case
- Tracking: Slightly increased (0.025em - 0.05em)

### Typography Guidelines

#### Thai Text
- **Always use Noto Sans Thai Looped** for Thai script
- Ensure proper line height (1.6+) for readability
- Avoid excessive letter spacing
- Use bold weights for emphasis

#### English Text
- Use the same Noto Sans Thai Looped for consistency
- Can use sharper weights for headings
- Maintain high contrast for accessibility

#### Text Colors
- **Primary Text**: `#231F20` (brand-black)
- **Secondary Text**: `#6B7280` (gray-600)
- **Light Backgrounds**: Use dark text
- **Dark/Green Backgrounds**: Use white (`#FFFFFF`)
- **Accent Text**: Primary Green (`#009253`)

---

## Illustration Style

### Key Visual Elements

#### Character Illustrations
Based on the branding guideline (Page 4), the design uses:
- **Hand-drawn people**: Representing diverse community members
- **Line art style**: Simple, bold outlines
- **Monochromatic**: Typically in dark green (`#005F33`) or black
- **Poses**: Standing, raising hands, holding signs - depicting activism
- **Diversity**: Various ages, genders, and occupations

#### Illustration Characteristics
- **Organic & Human**: Not geometric or overly stylized
- **Bold Lines**: Clear, thick strokes (2-4px)
- **Simplified Forms**: Avoid excessive detail
- **Group Dynamics**: People standing together, unified
- **Cultural Authenticity**: Thai rural and urban community representation

#### Usage in UI
- **Hero Sections**: Large character groups
- **Icons**: Simplified versions of characters or actions
- **Backgrounds**: Pattern of characters (as seen in pattern-green.svg)
- **Decorative Elements**: Small character motifs

### Icons & Symbols
- **Style**: Line-based, matching illustration style
- **Weight**: Medium to bold (2-3px stroke)
- **Color**: Inherit from green palette or black
- **Examples**: Location pins, protest symbols, agricultural tools, community symbols

---

## Pattern & Background

### Pattern-Green.svg
**Location**: `/public/pattern/pattern-green.svg`

#### Characteristics
- **Content**: Repeating hand-drawn character illustrations
- **Colors**: Dark green (`#004332`) and medium green (`#11A35D`)
- **Density**: Medium-high detail
- **Tile**: Seamless repeating pattern

#### Usage Guidelines
```css
/* Hero Sections */
background: url('/pattern/pattern-green.svg');
opacity: 0.25 - 0.30; /* For readability */
position: absolute;
inset: 0;
z-index: -1;

/* Alternative: Dark Sections */
background: url('/pattern/pattern-green.svg');
opacity: 0.05 - 0.10; /* Subtle texture */
```

#### Best Practices
- **Always use as background layer** (not foreground)
- **Adjust opacity** based on text contrast needs
- **Pair with solid color background** (typically primary green)
- **Don't scale or distort** - allow natural tiling
- **Z-index management**: Keep behind content

### Background Variations
1. **Solid Green**: Clean, bold sections
2. **Pattern + Green**: Textured, organic feel
3. **Gradient Green**: Depth and dimension (use sparingly)
4. **Light Backgrounds**: Cream or light green for content sections

---

## Logo Usage

### Logo Configurations

#### 1. **Full Logo (Thai + English)**
```
สมัชชาคนจน
ASSEMBLY OF THE POOR
```
- **Primary Use**: Headers, footers, main branding
- **Color**: 
  - On light: Dark green or black
  - On dark/green: White or cream
  
#### 2. **English Badge Logo**
- **Format**: English text in rounded rectangle badge
- **Color**: White text on green background OR green text on cream/yellow
- **Usage**: Labels, tags, secondary branding

#### 3. **Icon/Favicon**
- Simplified "สมัชชาคนจน" lettermark or character illustration
- High contrast for small sizes

### Logo Guidelines
- **Clear Space**: Maintain minimum padding equal to cap height
- **Minimum Size**: 120px width for full logo, 80px for badge
- **Don't**: Distort, rotate, outline, add effects
- **Background**: Ensure sufficient contrast

---

## Component Guidelines

### Buttons

#### Primary Button
```css
background: #009253; /* Primary Green */
color: #FFFFFF;
font-weight: 700; /* Bold */
padding: 12px 32px;
border-radius: 999px; /* Fully rounded */
transition: all 300ms;

&:hover {
  background: #231F20; /* Black */
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 146, 83, 0.3);
}
```

#### Secondary Button
```css
background: #FAF4A6; /* Yellow */
color: #231F20; /* Black */
font-weight: 700;
padding: 12px 32px;
border-radius: 999px;

&:hover {
  background: #FFFFFF;
}
```

#### Outline Button
```css
background: transparent;
border: 2px solid currentColor;
color: #009253;
padding: 10px 30px;
border-radius: 999px;

&:hover {
  background: #009253;
  color: #FFFFFF;
}
```

### Cards

#### Standard Card
```css
background: #FFFFFF;
border: 1px solid #E5E7EB; /* Light gray */
border-radius: 24px; /* Generous rounding */
padding: 32px;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

&:hover {
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
  transition: all 300ms;
}
```

#### Featured Card
```css
background: linear-gradient(135deg, #009253 0%, #005F33 100%);
color: #FFFFFF;
border-radius: 24px;
padding: 48px;
```

### Badges/Labels
```css
background: #FDF8C0; /* Cream */
color: #231F20; /* Black */
border: 1px solid rgba(250, 244, 166, 0.5);
padding: 4px 12px;
border-radius: 999px;
font-size: 14px;
font-weight: 700;
text-transform: uppercase;
letter-spacing: 0.05em;
```

### Navigation

#### Desktop Navigation
- **Background**: White or transparent with backdrop blur
- **Text Color**: Black (inactive), Primary Green (active/hover)
- **Font Weight**: Bold (700)
- **Hover**: Smooth color transition (300ms)
- **Active Indicator**: Underline or background pill

#### Mobile Navigation
- **Menu Icon**: Hamburger (3 lines, green)
- **Overlay**: Full-screen, white or cream background
- **Links**: Large, touch-friendly (min 48px height)

### Forms

#### Input Fields
```css
background: #F9FAFB; /* Light gray */
border: 1px solid #E5E7EB;
border-radius: 12px;
padding: 12px 16px;
font-size: 16px;

&:focus {
  outline: none;
  border-color: #009253;
  box-shadow: 0 0 0 3px rgba(0, 146, 83, 0.1);
}
```

#### Submit Buttons
- Use Primary Button style
- Full width on mobile
- Add loading state with spinner

---

## Layout Principles

### Grid & Spacing

#### Container Widths
- **Max Width**: `1440px` (7xl)
- **Standard Container**: `1280px` (6xl)
- **Content Width**: `1024px` (4xl) for text-heavy pages
- **Padding**: `16px` (mobile), `24px` (tablet), `32px` (desktop)

#### Spacing Scale (Tailwind)
```
4px   → 1
8px   → 2
12px  → 3
16px  → 4
24px  → 6
32px  → 8
48px  → 12
64px  → 16
96px  → 24
128px → 32
```

### Section Structure

#### Hero Section
- **Height**: `60vh` - `100vh` (min 500px)
- **Background**: Primary Green + Pattern
- **Text Color**: White or Cream
- **Padding**: Large vertical spacing (96px - 128px)
- **Content**: Left-aligned or centered
- **CTA**: Prominent, at bottom of content

#### Content Sections
- **Padding**: `80px` (mobile), `120px` (desktop) vertical
- **Background**: Alternating white/light-green
- **Max Width**: Content container
- **Spacing Between Elements**: Consistent rhythm (24px, 32px, 48px)

#### Footer
- **Background**: Black (`#231F20`)
- **Text Color**: White (primary), Gray (secondary)
- **Structure**: Multi-column layout
- **Links**: Hover state with yellow accent
- **Social Icons**: Circular, with hover effects

### Responsive Breakpoints
```css
/* Mobile First */
sm: 640px   /* Small devices */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large screens */
```

### Animations & Transitions

#### Micro-interactions
- **Hover States**: 300ms ease
- **Active States**: 150ms ease
- **Page Transitions**: 400ms ease-in-out
- **Scroll Animations**: Fade-in-up, 600ms

#### Common Patterns
```css
/* Button Hover */
transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
transform: translateY(-2px);

/* Card Hover */
transition: all 300ms ease;
transform: translateY(-4px);
box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);

/* Fade In Up */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## Accessibility Guidelines

### Contrast Ratios
- **Normal Text**: Minimum 4.5:1
- **Large Text (18px+)**: Minimum 3:1
- **UI Elements**: Minimum 3:1

### Approved Color Combinations
✅ **High Contrast (AAA)**
- White (#FFFFFF) on Primary Green (#009253)
- Black (#231F20) on Cream (#FDF8C0)
- Black (#231F20) on Light Green (#D9E8C5)
- White (#FFFFFF) on Black (#231F20)

✅ **Good Contrast (AA)**
- Primary Green (#009253) on White (#FFFFFF)
- Dark Gray (#374151) on White (#FFFFFF)

❌ **Avoid**
- Yellow text on white backgrounds
- Light green text on white backgrounds
- Mid-gray text on colored backgrounds

### Interactive Elements
- **Focus States**: Visible outline or ring
- **Touch Targets**: Minimum 44x44px
- **Keyboard Navigation**: Full support
- **Screen Readers**: Semantic HTML, ARIA labels

---

## Best Practices Summary

### Do's ✅
- Use primary green as the dominant brand color
- Implement hand-drawn illustration style consistently
- Use fully rounded corners for buttons (border-radius: 999px)
- Apply generous spacing and padding
- Use bold typography for emphasis
- Maintain high color contrast for accessibility
- Use the pattern background subtly (low opacity)
- Implement smooth hover transitions
- Use Noto Sans Thai Looped for all text

### Don'ts ❌
- Don't use colors outside the defined palette
- Don't mix illustration styles
- Don't use overly complex gradients
- Don't ignore mobile responsiveness
- Don't use low-contrast color combinations
- Don't overuse animations or effects
- Don't distort the logo or pattern
- Don't use thin or light font weights for headings

---

## Component Checklist

When creating or modifying components, ensure:
- [ ] Colors from approved palette only
- [ ] Noto Sans Thai Looped font applied
- [ ] Proper heading hierarchy (H1 → H6)
- [ ] Adequate spacing (24px, 32px, 48px rhythm)
- [ ] Rounded corners (12px, 24px, or 999px)
- [ ] Hover states with 300ms transition
- [ ] Mobile-first responsive design
- [ ] Accessibility: color contrast, focus states
- [ ] Consistent with existing page patterns
- [ ] Pattern background (if applicable) with correct opacity

---

## Quick Reference

### Common CSS Variables
```css
/* Colors */
--brand-green-dark: #009253;
--brand-green-medium: #67be6a;
--brand-green-light: #d9e8c5;
--brand-secondary: #FDF8C0;
--brand-accent: #005F33;
--brand-yellow: #faf4a6;
--brand-red: #803432;
--brand-black: #231f20;
--brand-white: #ffffff;

/* Typography */
--font-noto-sans-thai-looped: "Noto Sans Thai Looped", sans-serif;

/* Spacing */
--spacing-xs: 0.5rem;   /* 8px */
--spacing-sm: 1rem;     /* 16px */
--spacing-md: 1.5rem;   /* 24px */
--spacing-lg: 2rem;     /* 32px */
--spacing-xl: 3rem;     /* 48px */
--spacing-2xl: 4rem;    /* 64px */
```

---

**End of Design System Documentation**

*For questions or clarifications, refer to the original branding files in `/branding-guildline/` or consult with the design team.*
