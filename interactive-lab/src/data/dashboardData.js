// Dashboard data for different niches
export const nicheData = {
    gym: {
        name: 'Gym',
        kpi: {
            value: 124580,
            label: 'Total Revenue',
            prefix: '$',
            breakdown: {
                labels: ['Subscriptions', 'Supplements'],
                values: [70, 30],
                colors: ['#00f5ff', '#0066ff']
            }
        },
        metrics: [
            { name: 'Member Churn', value: '12%', trend: 'down', color: 'text-red-400' },
            { name: 'Peak Hours', value: '6-8 PM', trend: 'neutral', color: 'text-accent-cyan' }
        ],
        chartData: [
            { date: 'Mon', value: 4200, forecast: null },
            { date: 'Tue', value: 3800, forecast: null },
            { date: 'Wed', value: 5100, forecast: null },
            { date: 'Thu', value: 4600, forecast: null },
            { date: 'Fri', value: 5800, forecast: null },
            { date: 'Sat', value: 6200, forecast: null },
            { date: 'Sun', value: 5400, forecast: null },
            { date: 'Mon+', value: null, forecast: 4800 },
            { date: 'Tue+', value: null, forecast: 5200 },
        ],
        anomaly: {
            index: 1,
            message: 'Warning: Membership cancellations increased by 15% this Tuesday. Would you like to see the list of members?'
        }
    },
    retail: {
        name: 'Retail',
        kpi: {
            value: 89340,
            label: 'Total Revenue',
            prefix: '$',
            breakdown: {
                labels: ['Electronics', 'Clothing', 'Home'],
                values: [45, 35, 20],
                colors: ['#00f5ff', '#0066ff', '#4f46e5']
            }
        },
        metrics: [
            { name: 'Inventory Turnover', value: '8.2x', trend: 'up', color: 'text-green-400' },
            { name: 'Avg Basket Size', value: '$67', trend: 'up', color: 'text-green-400' }
        ],
        chartData: [
            { date: 'Mon', value: 3200, forecast: null },
            { date: 'Tue', value: 3600, forecast: null },
            { date: 'Wed', value: 4100, forecast: null },
            { date: 'Thu', value: 3900, forecast: null },
            { date: 'Fri', value: 5200, forecast: null },
            { date: 'Sat', value: 6800, forecast: null },
            { date: 'Sun', value: 5100, forecast: null },
            { date: 'Mon+', value: null, forecast: 4200 },
            { date: 'Tue+', value: null, forecast: 4600 },
        ],
        anomaly: {
            index: 3,
            message: 'Notice: Thursday sales dipped 15% below average. Check staffing levels and promotions.'
        }
    },
    cafe: {
        name: 'Cafe',
        kpi: {
            value: 56720,
            label: 'Total Revenue',
            prefix: '$',
            breakdown: {
                labels: ['Food', 'Beverages', 'Pastries'],
                values: [50, 35, 15],
                colors: ['#00f5ff', '#0066ff', '#8b5cf6']
            }
        },
        metrics: [
            { name: 'Avg Order Value', value: '$18.50', trend: 'up', color: 'text-green-400' },
            { name: 'Rush Hour Sales', value: '7-9 AM', trend: 'neutral', color: 'text-accent-cyan' }
        ],
        chartData: [
            { date: 'Mon', value: 2400, forecast: null },
            { date: 'Tue', value: 2600, forecast: null },
            { date: 'Wed', value: 2800, forecast: null },
            { date: 'Thu', value: 2500, forecast: null },
            { date: 'Fri', value: 3200, forecast: null },
            { date: 'Sat', value: 4100, forecast: null },
            { date: 'Sun', value: 3800, forecast: null },
            { date: 'Mon+', value: null, forecast: 2900 },
            { date: 'Tue+', value: null, forecast: 3100 },
        ],
        anomaly: {
            index: 0,
            message: 'Insight: Monday morning traffic is 20% lower. Consider a breakfast special promotion.'
        }
    }
};
