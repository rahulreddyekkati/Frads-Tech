import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ReactCompareSlider,
    ReactCompareSliderImage
} from 'react-compare-slider';
import { portfolioProjects, seoMetrics } from '../../data/portfolioProjects';

export default function PortfolioCard() {
    const [recruiterView, setRecruiterView] = useState(false);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(0);
    const [showBooking, setShowBooking] = useState(false);
    const [animatedScores, setAnimatedScores] = useState({
        performance: 0,
        accessibility: 0,
        bestPractices: 0,
        seo: 0
    });

    // Animate SEO scores
    useEffect(() => {
        const duration = 2000;
        const steps = 60;
        const interval = duration / steps;

        let currentStep = 0;
        const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;

            setAnimatedScores({
                performance: Math.floor(seoMetrics.performance * progress),
                accessibility: Math.floor(seoMetrics.accessibility * progress),
                bestPractices: Math.floor(seoMetrics.bestPractices * progress),
                seo: Math.floor(seoMetrics.seo * progress)
            });

            if (currentStep >= steps) clearInterval(timer);
        }, interval);

        return () => clearInterval(timer);
    }, []);

    const handleBooking = () => {
        setShowBooking(true);
        setTimeout(() => setShowBooking(false), 3000);
    };

    const handleKeyDown = (e) => {
        if (!lightboxOpen) return;

        if (e.key === 'Escape') {
            setLightboxOpen(false);
        } else if (e.key === 'ArrowRight') {
            setSelectedProject((prev) => (prev + 1) % portfolioProjects.length);
        } else if (e.key === 'ArrowLeft') {
            setSelectedProject((prev) => (prev - 1 + portfolioProjects.length) % portfolioProjects.length);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxOpen]);

    return (
        <motion.div
            layout
            className="glass-card glass-card-hover p-6 flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Before & After</h3>

                {/* Recruiter Toggle */}
                <label className="flex items-center gap-2 cursor-pointer">
                    <span className="text-sm text-gray-400">Recruiter View</span>
                    <div className="relative">
                        <input
                            type="checkbox"
                            checked={recruiterView}
                            onChange={(e) => setRecruiterView(e.target.checked)}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-accent-cyan rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-cyan"></div>
                    </div>
                </label>
            </div>

            {/* Before/After Slider */}
            <div className="mb-4 rounded-xl overflow-hidden border border-white/10">
                <ReactCompareSlider
                    itemOne={
                        <div className="w-full h-64 bg-white p-6 flex flex-col">
                            <div className="text-gray-900 mb-4">
                                <h4 className="font-bold text-lg mb-2">Old Resume.pdf</h4>
                                <div className="space-y-2">
                                    <div className="h-2 bg-gray-300 w-3/4"></div>
                                    <div className="h-2 bg-gray-300 w-1/2"></div>
                                    <div className="h-2 bg-gray-300 w-2/3"></div>
                                    <div className="h-2 bg-gray-300 w-1/3"></div>
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col justify-end space-y-2">
                                <div className="bg-red-100 border-l-4 border-red-500 p-2 text-xs text-red-700">
                                    ❌ Not Mobile Friendly
                                </div>
                                <div className="bg-red-100 border-l-4 border-red-500 p-2 text-xs text-red-700">
                                    ❌ Slow Load Time
                                </div>
                            </div>
                        </div>
                    }
                    itemTwo={
                        <div className="w-full h-64 bg-gradient-to-br from-navy-secondary to-navy-tertiary p-6 flex flex-col">
                            <div className="mb-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-accent-cyan to-accent-blue"></div>
                                    <div>
                                        <div className="h-2 bg-white/30 w-24 mb-1"></div>
                                        <div className="h-2 bg-white/20 w-16"></div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="h-16 bg-accent-cyan/20 rounded border border-accent-cyan/30"></div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col justify-end space-y-2">
                                <div className="bg-green-100 border-l-4 border-green-500 p-2 text-xs text-green-700">
                                    ✓ 99/100 SEO
                                </div>
                                <div className="bg-green-100 border-l-4 border-green-500 p-2 text-xs text-green-700">
                                    ✓ One-Tap Contact
                                </div>
                            </div>
                        </div>
                    }
                />
            </div>

            {/* Portfolio Grid with Recruiter View Animation */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={recruiterView ? 'recruiter' : 'normal'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    layout
                    className={`mb-4 ${recruiterView ? 'space-y-3' : 'grid grid-cols-2 gap-3'}`}
                >
                    {recruiterView && (
                        <button className="w-full bg-gradient-to-r from-accent-cyan to-accent-blue text-navy-dark font-bold py-3 rounded-lg hover:shadow-lg transition-all">
                            📥 Download CV
                        </button>
                    )}

                    {portfolioProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            layout
                            onClick={() => {
                                setSelectedProject(index);
                                setLightboxOpen(true);
                            }}
                            className="bg-gradient-to-br from-accent-cyan/20 to-accent-blue/20 rounded-lg p-4 cursor-pointer hover:scale-105 transition-transform"
                        >
                            <h4 className="font-semibold text-sm mb-1">{project.title}</h4>
                            <p className="text-xs text-gray-400">{project.category}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>

            {/* SEO Badge */}
            <div className="bg-white/5 rounded-lg p-4 mb-4">
                <h4 className="text-sm font-semibold mb-3">Technical SEO Score</h4>
                <div className="grid grid-cols-2 gap-3">
                    {Object.entries(animatedScores).map(([key, value]) => (
                        <div key={key} className="text-center">
                            <div className="text-2xl font-bold text-accent-cyan mb-1">{value}</div>
                            <div className="text-xs text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Booking Calendar */}
            <button
                onClick={handleBooking}
                className="w-full bg-white/10 hover:bg-white/20 border border-white/20 py-3 rounded-lg transition-all flex items-center justify-center gap-2"
            >
                <span>📅</span>
                <span>Book Discovery Call</span>
            </button>

            {/* Lightbox Gallery */}
            <AnimatePresence>
                {lightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-8"
                        onClick={() => setLightboxOpen(false)}
                    >
                        <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
                            <button
                                onClick={() => setLightboxOpen(false)}
                                className="absolute -top-12 right-0 text-white text-2xl hover:text-accent-cyan transition-colors"
                            >
                                ✕
                            </button>

                            <motion.div
                                key={selectedProject}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-gradient-to-br from-navy-secondary to-navy-tertiary rounded-xl p-8"
                            >
                                <h2 className="text-3xl font-bold mb-4">{portfolioProjects[selectedProject].title}</h2>
                                <p className="text-gray-400 mb-4">{portfolioProjects[selectedProject].description}</p>
                                <div className="flex gap-2 flex-wrap">
                                    {portfolioProjects[selectedProject].tech.map(tech => (
                                        <span key={tech} className="px-3 py-1 bg-accent-cyan/20 text-accent-cyan rounded-full text-sm">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>

                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={() => setSelectedProject((prev) => (prev - 1 + portfolioProjects.length) % portfolioProjects.length)}
                                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                                >
                                    ← Previous
                                </button>
                                <button
                                    onClick={() => setSelectedProject((prev) => (prev + 1) % portfolioProjects.length)}
                                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                                >
                                    Next →
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Booking Confirmation */}
            <AnimatePresence>
                {showBooking && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed top-8 right-8 bg-green-500 text-white px-6 py-3 rounded-lg shadow-2xl z-50"
                    >
                        ✓ Discovery call booked — confirmation sent
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
