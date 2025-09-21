# Kenya Rugby Analytics Platform

A comprehensive AI-powered rugby match statistics analyzer for Kenya's Premier Rugby Clubs, built with React, TypeScript, and modern web technologies.

## 🏉 Features

### Core Analytics
- **Team Analytics**: Comprehensive team performance metrics, match summaries, and league standings
- **Player Analytics**: Individual player statistics, performance heatmaps, and career tracking
- **Match Analysis**: Detailed match breakdowns with possession, territory, and KPI tracking
- **League Overview**: Real-time league standings, statistics, and performance trends

### AI-Powered Insights
- **Match Predictions**: AI-driven match outcome predictions with confidence scoring
- **Tactical Recommendations**: Performance optimization suggestions for teams and players
- **Trend Analysis**: Historical performance pattern recognition and future projections
- **Performance Optimization**: Data-driven recommendations for training and strategy

### Interactive Features
- **Team Comparisons**: Side-by-side team performance analysis with detailed metrics
- **Player Comparisons**: Head-to-head player statistics and performance comparisons
- **Interactive Charts**: Recharts-powered visualizations with responsive design
- **Real-time Updates**: Live match data integration (planned for future implementation)

## 🏆 Kenya Premier Rugby Clubs

The platform features all 12 premier rugby clubs from Kenya:

1. **Kabras Sugar RFC** (Kakamega) - Founded 1979
2. **KCB Rugby Club** (Nairobi) - Founded 1998
3. **Menengai Oilers** (Nakuru) - Founded 2015
4. **Strathmore Leos** (Nairobi) - Founded 2001
5. **Kenya Harlequin FC** (Nairobi) - Founded 1926
6. **Mwamba RFC** (Nairobi) - Founded 1977
7. **Nondescripts RFC** (Nairobi) - Founded 1923
8. **K.U. Blak Blad** (Nairobi) - Founded 1970
9. **Nakuru RFC** (Nakuru) - Founded 1975
10. **Impala RFC** (Nairobi) - Founded 1968
11. **Kisumu RFC** (Kisumu) - Founded 1982
12. **South Coast Pirates** (Mombasa) - Founded 1995

## 🛠️ Technology Stack

### Frontend
- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **TanStack Router** - Type-safe routing
- **TanStack Query** - Server state management
- **Zustand** - Lightweight state management

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **ShadCN/UI** - Modern component library
- **Lucide React** - Beautiful icons
- **Recharts** - Responsive charts and data visualization

### Development Tools
- **ESLint** - Code linting and quality
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 📁 Project Structure

```
src/
├── components/
│   ├── rugby/                 # Rugby-specific components
│   │   ├── StatCard.tsx      # Statistics display card
│   │   ├── ChartWrapper.tsx  # Chart container component
│   │   ├── TeamCard.tsx      # Team information card
│   │   └── HeatmapPlaceholder.tsx # Performance heatmap
│   └── ui/                   # ShadCN/UI components
├── features/
│   ├── teams/                # Teams feature
│   │   ├── index.tsx         # Teams overview page
│   │   └── team-detail.tsx   # Individual team page
│   ├── players/              # Players feature
│   │   ├── index.tsx         # Players overview page
│   │   └── player-detail.tsx # Individual player page
│   ├── comparisons/          # Comparisons feature
│   │   └── index.tsx         # Team/Player comparisons
│   ├── insights/             # AI Insights feature
│   │   └── index.tsx         # AI analytics dashboard
│   └── dashboard/            # Main dashboard
│       └── index.tsx         # Dashboard overview
├── services/
│   ├── api.ts               # API service layer
│   └── mockData.ts          # Mock data for development
├── stores/
│   └── rugby-store.ts       # Zustand global state
├── routes/
│   └── _authenticated/      # Protected routes
│       ├── teams/           # Team routes
│       ├── players/         # Player routes
│       ├── comparisons/     # Comparison routes
│       └── insights/        # Insights routes
└── lib/
    └── utils.ts             # Utility functions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shadcn-admin-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

## 📊 Key Metrics Tracked

### Team Metrics
- **Performance**: Wins, losses, draws, points
- **Scoring**: Tries, conversions, penalties, drop goals
- **Possession**: Ball possession percentage
- **Territory**: Territorial control percentage
- **Set Pieces**: Scrum success rate, lineout success rate
- **Discipline**: Fair play rating and penalty tracking

### Player Metrics
- **Attacking**: Tries scored, meters gained, kicking meters
- **Defensive**: Tackles made, defensive actions
- **Set Pieces**: Lineouts won, scrums won
- **Discipline**: Penalties conceded, yellow/red cards

### Match Analytics
- **Score Breakdown**: Detailed try, conversion, penalty scoring
- **Possession**: Team possession percentages
- **Territory**: Territorial control analysis
- **Set Piece Performance**: Scrum and lineout statistics
- **Match Flow**: Timeline of key events and momentum shifts

## 🤖 AI Features (Planned)

### Phase 1: Data Foundation ✅
- Historical match data collection
- Player and team statistics database
- Performance metrics tracking

### Phase 2: Basic Predictions (Planned)
- Match outcome predictions
- Score predictions
- Performance trend analysis

### Phase 3: Advanced Analytics (Planned)
- Player performance optimization
- Tactical recommendation engine
- Injury risk assessment
- Recruitment recommendations

### Phase 4: Real-time Insights (Planned)
- Live match analysis
- In-game tactical suggestions
- Real-time performance monitoring

## 🎨 Design System

### Color Palette
- **Primary**: Deep blue (#1e40af) and green (#059669) accents
- **Secondary**: Light backgrounds with subtle shadows
- **Success**: Green (#10b981)
- **Warning**: Yellow (#f59e0b)
- **Danger**: Red (#ef4444)

### Typography
- **Headings**: Bold, clear hierarchy
- **Body**: Readable, accessible font sizes
- **Data**: Monospace for statistics

### Components
- **Cards**: Rounded corners with subtle shadows
- **Charts**: Interactive with hover states
- **Navigation**: Clean, intuitive sidebar
- **Responsive**: Mobile-first design approach

## 📱 Responsive Design

The platform is fully responsive and optimized for:
- **Desktop**: Full feature set with side-by-side comparisons
- **Tablet**: Adapted layouts with collapsible sections
- **Mobile**: Touch-friendly interface with stacked layouts

## 🔧 Configuration

### Environment Variables
```env
VITE_API_BASE_URL=your_api_url
VITE_APP_TITLE=Kenya Rugby Analytics
```

### Theme Configuration
The platform supports light/dark themes with system preference detection.

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

### Linting
```bash
npm run lint
```

## 📈 Performance

- **Code Splitting**: Automatic route-based code splitting
- **Memoization**: React.memo and useMemo for optimization
- **Lazy Loading**: Dynamic imports for heavy components
- **Bundle Optimization**: Tree shaking and minification

## 🔮 Future Enhancements

### Planned Features
- **Live Match Streaming**: Real-time match updates
- **Mobile App**: React Native mobile application
- **Social Features**: Fan engagement and social sharing
- **Advanced Analytics**: Machine learning predictions
- **Export Features**: PDF/CSV report generation
- **Multi-language**: Swahili and English support

### API Integration
- **WebSocket**: Real-time data updates
- **REST API**: Backend integration
- **Authentication**: User management system
- **File Upload**: Image and document handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Kenya Rugby Union** for supporting rugby development
- **Premier Rugby Clubs** for providing data and insights
- **ShadCN/UI** for the beautiful component library
- **Recharts** for excellent charting capabilities
- **TanStack** for powerful React tools

## 📞 Support

For support and questions:
- **Email**: support@kenyarugby.co.ke
- **Website**: https://kenyarugby.co.ke
- **Documentation**: [Project Wiki](link-to-wiki)

---

**Built with ❤️ for Kenya Rugby** 🏉
