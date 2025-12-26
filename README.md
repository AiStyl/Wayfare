# WAYFARE

**Compare. Plan. Book. Save.**

AI-powered travel intelligence platform with 12 tools to help you plan smarter trips and save money.

![WAYFARE](https://img.shields.io/badge/status-active-success)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8)

## 🛫 Overview

WAYFARE combines AI intelligence with real-time data from the world's best travel sources. We help travelers find the best flights, hotels, and experiences while maximizing their rewards.

## 🧰 12 Travel Tools

| Tool | Description | Revenue Model |
|------|-------------|---------------|
| **FlightRadar** | Fare tracking & price predictions | Skyscanner/Amadeus affiliate |
| **StayCompare** | Hotel price comparison across 10+ sites | Booking.com/Expedia affiliate |
| **TripForge** | AI-powered itinerary builder | Bundled booking affiliates |
| **PointsMax** | Credit card rewards optimizer | Credit card referrals |
| **VisaCheck** | Entry & visa requirements | iVisa affiliate |
| **PackSmart** | AI packing assistant | Amazon affiliate |
| **SafetyPulse** | Travel advisories & safety info | Travel insurance affiliate |
| **CurrencyIQ** | Exchange rates & fee avoidance | Wise/Revolut affiliate |
| **LocalLens** | Destination guides & hidden gems | Viator/GetYourGuide affiliate |
| **JetLagRx** | Jet lag recovery planner | Free tool |
| **RentalScout** | Car rental comparison | Car rental affiliate |
| **TripGuard** | Travel insurance comparison | Insurance affiliate |

## 🎨 Design System

- **Primary**: Coral (#f97356) - warm, travel-inspired
- **Secondary**: Midnight (#0f1729) - professional, trustworthy
- **Accents**: Gold (#f59e0b), Teal (#0d9488), Purple (#8b5cf6)
- **Typography**: Fraunces (display), DM Sans (body)

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
wayfare/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Homepage
│   │   ├── layout.tsx         # Root layout
│   │   ├── globals.css        # Global styles
│   │   ├── flights/           # FlightRadar tool
│   │   ├── hotels/            # StayCompare tool
│   │   ├── planner/           # TripForge tool
│   │   ├── points/            # PointsMax tool
│   │   ├── visa/              # VisaCheck tool
│   │   ├── packing/           # PackSmart tool
│   │   ├── safety/            # SafetyPulse tool
│   │   ├── currency/          # CurrencyIQ tool
│   │   ├── guides/            # LocalLens tool
│   │   ├── jetlag/            # JetLagRx tool
│   │   ├── cars/              # RentalScout tool
│   │   ├── insurance/         # TripGuard tool
│   │   ├── privacy/           # Privacy Policy
│   │   ├── terms/             # Terms of Service
│   │   └── about/             # About page
│   └── components/
│       ├── Nav.tsx            # Navigation
│       ├── Footer.tsx         # Footer
│       ├── ToolCard.tsx       # Tool card component
│       └── InfoCards.tsx      # Info card components
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

## 🔗 Data Sources & APIs

- **Flights**: Skyscanner, Amadeus
- **Hotels**: Booking.com, Expedia, TripAdvisor, Agoda
- **Safety**: U.S. State Department, CDC
- **Currency**: exchangerate.host, Wise API
- **Weather**: OpenWeather API

## 💰 Revenue Model

1. **Affiliate Commissions** - Booking referrals (flights, hotels, cars, insurance)
2. **Credit Card Referrals** - PointsMax card recommendations
3. **Featured Placements** - Clearly labeled sponsored content

## 📧 Contact

- **Email**: hello@wayfare.com
- **Powered by**: [QphiQ](https://qphiq.com)

## 📄 License

© 2024 WAYFARE. All rights reserved.
