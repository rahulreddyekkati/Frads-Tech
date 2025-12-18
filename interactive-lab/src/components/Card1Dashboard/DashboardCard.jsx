import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { nicheData } from '../../data/dashboardData';
import { useTimer } from '../../hooks/useTimer';

export default function DashboardCard({ onMobileToggle, mobileView }) {
    const [selectedNiche, setSelectedNiche] = useState('gym');
    const [drillDown, setDrillDown] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const minutes = useTimer(5);

    const currentData = nicheData[selectedNiche];

    const handleNicheChange = (niche) => {
        if (niche !== selectedNiche) {
            setSelectedNiche(niche);
            setDrillDown(false);
        }
    };

    const handleBooking = () => {
        window.location.href = `mailto:hello@fradstech.com?subject=I want a dashboard for my ${currentData.name}`;
    };

    return (
        <motion.div
            layout
            className="glass-card glass-card-hover p-6 flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Header with Timestamp and Mobile Toggle */}
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-blink"></div>
                    <span className="text-xs text-gray-400">Last Updated: {minutes} minutes ago</span>
                </div>
                <button
                    onClick={onMobileToggle}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title="Toggle Mobile View"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                </button>
            </div>

            <h3 className="text-xl font-bold mb-4">Power BI Dashboard</h3>

            {/* Niche Switcher */}
            <div className="flex gap-2 mb-6 bg-white/5 p-1 rounded-lg">
                {['gym', 'retail', 'cafe'].map((niche) => (
                    <button
                        key={niche}
                        onClick={() => handleNicheChange(niche)}
                        className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${selectedNiche === niche
                            ? 'bg-accent-cyan text-navy-dark'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        {nicheData[niche].name}
                    </button>
                ))}
            </div>

            {/* Content with Fade Animation */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedNiche}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 flex flex-col"
                >
                    {/* KPI or Drill-Down */}
                    <AnimatePresence mode="wait">
                        {!drillDown ? (
                            <motion.div
                                key="kpi"
                                initial={{ scale: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                className="bg-gradient-to-br from-accent-cyan/20 to-accent-blue/20 rounded-xl p-6 mb-4 cursor-pointer hover:scale-105 transition-transform"
                                onClick={() => setDrillDown(true)}
                            >
                                <div className="text-sm text-gray-400 mb-2">{currentData.kpi.label}</div>
                                <div className="text-4xl font-bold text-accent-cyan">
                                    {currentData.kpi.prefix}{currentData.kpi.value.toLocaleString()}
                                </div>
                                <div className="text-xs text-gray-500 mt-2">Click to drill down</div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="drilldown"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="bg-gradient-to-br from-accent-cyan/20 to-accent-blue/20 rounded-xl p-6 mb-4"
                            >
                                <button
                                    onClick={() => setDrillDown(false)}
                                    className="text-sm text-accent-cyan hover:underline mb-4 flex items-center gap-1"
                                >
                                    ← Back
                                </button>
                                <div className="h-48">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={currentData.kpi.breakdown.labels.map((label, i) => ({
                                                    name: label,
                                                    value: currentData.kpi.breakdown.values[i]
                                                }))}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={40}
                                                outerRadius={70}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {currentData.kpi.breakdown.colors.map((color, index) => (
                                                    <Cell key={`cell-${index}`} fill={color} />
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                contentStyle={{ background: '#1e2447', border: '1px solid #00f5ff' }}
                                                formatter={(value) => `${value}%`}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        {currentData.metrics.map((metric, i) => (
                            <div key={i} className="bg-white/5 rounded-lg p-6 flex flex-col justify-center min-h-[120px]">
                                <div className="text-sm text-gray-400 mb-2">{metric.name}</div>
                                <div className={`text-3xl font-bold ${metric.color}`}>{metric.value}</div>
                            </div>
                        ))}
                    </div>

                    {/* Chart with Anomaly */}
                    <div className="bg-white/5 rounded-lg p-4 mb-4">
                        <div className="h-64 relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={currentData.chartData}>
                                    <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                                    <YAxis stroke="#6b7280" fontSize={12} />
                                    <Tooltip
                                        contentStyle={{ background: '#1e2447', border: '1px solid #00f5ff' }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#00f5ff"
                                        strokeWidth={2}
                                        dot={(props) => {
                                            if (props.index === currentData.anomaly.index) {
                                                return (
                                                    <circle
                                                        cx={props.cx}
                                                        cy={props.cy}
                                                        r={6}
                                                        fill="#ef4444"
                                                        className="animate-pulse-slow cursor-pointer"
                                                        onMouseEnter={() => setShowTooltip(true)}
                                                        onMouseLeave={() => setShowTooltip(false)}
                                                    />
                                                );
                                            }
                                            return <circle cx={props.cx} cy={props.cy} r={3} fill="#00f5ff" />;
                                        }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="forecast"
                                        stroke="#00f5ff"
                                        strokeWidth={2}
                                        strokeDasharray="5 5"
                                        opacity={0.5}
                                    />
                                </LineChart>
                            </ResponsiveContainer>

                            {/* Anomaly Tooltip */}
                            <AnimatePresence>
                                {showTooltip && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute top-0 left-0 right-0 bg-red-500/90 text-white p-3 rounded-lg text-sm z-10"
                                    >
                                        {currentData.anomaly.message}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <button
                        onClick={handleBooking}
                        className="w-full bg-gradient-to-r from-accent-cyan to-accent-blue text-navy-dark font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-accent-cyan/50 transition-all"
                    >
                        View Details
                    </button>
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}
