import { useState } from 'react';
import { motion } from 'framer-motion';
import './index.css';
import DashboardCard from './components/Card1Dashboard/DashboardCard';
import MenuCard from './components/Card2Menu/MenuCard';
import PortfolioCard from './components/Card3Portfolio/PortfolioCard';

function App() {
  const [mobileView, setMobileView] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-dark via-navy-secondary to-navy-dark relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-bold text-center mb-16 bg-gradient-to-r from-accent-cyan to-accent-blue bg-clip-text text-transparent"
        >
          Interactive Lab
        </motion.h1>

        {/* Cards Grid */}
        <motion.div
          layout
          className={`grid gap-8 ${mobileView
              ? 'grid-cols-1 max-w-md mx-auto'
              : 'grid-cols-1 lg:grid-cols-3 md:grid-cols-2'
            }`}
        >
          <DashboardCard onMobileToggle={() => setMobileView(!mobileView)} mobileView={mobileView} />
          <MenuCard />
          <PortfolioCard />
        </motion.div>
      </div>
    </div>
  );
}

export default App;
