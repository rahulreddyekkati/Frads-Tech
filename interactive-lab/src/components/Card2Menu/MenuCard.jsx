import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { menuItems, dietaryFilters } from '../../data/menuItems';

export default function MenuCard() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeDietary, setActiveDietary] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showUpsell, setShowUpsell] = useState(false);
    const [tableNumber, setTableNumber] = useState('12');
    const [showWhatsApp, setShowWhatsApp] = useState(false);

    const filteredItems = menuItems.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDietary = activeDietary.length === 0 ||
            activeDietary.some(filter => item.dietary.includes(filter));
        return matchesSearch && matchesDietary;
    });

    const handleItemClick = (item) => {
        setSelectedItem(item);
        if (item.upsell) {
            setShowUpsell(true);
            setTimeout(() => setShowUpsell(false), 3000);
        }
    };

    const toggleDietary = (filterId) => {
        setActiveDietary(prev =>
            prev.includes(filterId)
                ? prev.filter(f => f !== filterId)
                : [...prev, filterId]
        );
    };

    const handleOrder = () => {
        setShowWhatsApp(true);
        setTimeout(() => setShowWhatsApp(false), 2000);
    };

    return (
        <motion.div
            layout
            className="glass-card glass-card-hover p-6 flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
        >
            <h3 className="text-xl font-bold mb-6">Digital Menu</h3>

            <div className="flex flex-col items-center gap-6 flex-1">
                {/* Phone Frame */}
                <div className="flex flex-col items-center">
                    <div className={`relative w-72 h-[550px] rounded-[40px] p-3 shadow-2xl transition-colors duration-500 ${isDarkMode ? 'bg-gray-900' : 'bg-white'
                        }`}>
                        {/* Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>

                        {/* Screen */}
                        <div className={`w-full h-full rounded-[32px] overflow-hidden flex flex-col transition-colors duration-500 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-900'
                            }`}>
                            {/* Header */}
                            <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="font-bold text-lg">The Digital Bistro</h4>
                                    <button
                                        onClick={() => setIsDarkMode(!isDarkMode)}
                                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        {isDarkMode ? '☀️' : '🌙'}
                                    </button>
                                </div>

                                {/* Search */}
                                <input
                                    type="text"
                                    placeholder="Search menu..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className={`w-full px-3 py-2 rounded-lg text-sm transition-colors ${isDarkMode
                                        ? 'bg-gray-700 border-gray-600 placeholder-gray-400'
                                        : 'bg-white border-gray-300 placeholder-gray-500'
                                        } border focus:outline-none focus:ring-2 focus:ring-accent-cyan`}
                                />

                                {/* Dietary Filters */}
                                <div className="flex gap-2 mt-2 flex-wrap">
                                    {dietaryFilters.map(filter => (
                                        <button
                                            key={filter.id}
                                            onClick={() => toggleDietary(filter.id)}
                                            className={`px-2 py-1 rounded-full text-xs transition-all ${activeDietary.includes(filter.id)
                                                ? 'bg-accent-cyan text-navy-dark'
                                                : isDarkMode
                                                    ? 'bg-gray-700 text-gray-300'
                                                    : 'bg-gray-200 text-gray-700'
                                                }`}
                                        >
                                            {filter.icon} {filter.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Menu Items */}
                            <div className="flex-1 overflow-y-auto p-3 space-y-2">
                                <AnimatePresence mode="popLayout">
                                    {filteredItems.map(item => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            onClick={() => handleItemClick(item)}
                                            className={`p-3 rounded-lg cursor-pointer transition-all ${isDarkMode
                                                ? 'bg-gray-700 hover:bg-gray-600'
                                                : 'bg-white hover:bg-gray-100'
                                                } ${selectedItem?.id === item.id ? 'ring-2 ring-accent-cyan' : ''}`}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <h5 className="font-semibold text-sm">{item.name}</h5>
                                                    <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                        {item.description}
                                                    </p>
                                                    {item.dietary.length > 0 && (
                                                        <div className="flex gap-1 mt-1">
                                                            {item.dietary.map(d => (
                                                                <span key={d} className="text-xs">
                                                                    {dietaryFilters.find(f => f.id === d)?.icon}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                                <span className="font-bold text-accent-cyan ml-2">${item.price}</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* Order Button */}
                            <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                                <button
                                    onClick={handleOrder}
                                    className="w-full bg-gradient-to-r from-accent-cyan to-accent-blue text-navy-dark font-bold py-2 rounded-lg hover:shadow-lg transition-all"
                                >
                                    Order Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* QR Generator */}
                <div className="w-full max-w-xs">
                    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                        <h4 className="text-base font-semibold mb-4 text-center">Menu Admin</h4>
                        <input
                            type="text"
                            placeholder="Table #"
                            value={tableNumber}
                            onChange={(e) => setTableNumber(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg text-sm bg-white/10 border border-white/30 focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:border-transparent mb-4 text-center font-medium"
                        />
                        <div className="bg-white p-4 rounded-xl shadow-lg flex justify-center items-center">
                            <QRCodeSVG
                                value={`https://fradstech.com/menu?table=${tableNumber}`}
                                size={160}
                                level="H"
                                includeMargin
                            />
                        </div>
                        <p className="text-sm text-gray-300 mt-3 text-center font-medium">
                            Table {tableNumber}
                        </p>
                    </div>
                </div>
            </div>

            {/* Upsell Toast */}
            <AnimatePresence>
                {showUpsell && selectedItem?.upsell && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-accent-cyan to-accent-blue text-navy-dark px-6 py-3 rounded-lg shadow-2xl z-50"
                    >
                        <p className="font-medium">{selectedItem.upsell}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* WhatsApp Notification */}
            <AnimatePresence>
                {showWhatsApp && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed top-8 right-8 bg-green-500 text-white px-6 py-3 rounded-lg shadow-2xl z-50 flex items-center gap-2"
                    >
                        <span className="text-2xl">✓</span>
                        <p className="font-medium">Order sent to Kitchen via WhatsApp</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
