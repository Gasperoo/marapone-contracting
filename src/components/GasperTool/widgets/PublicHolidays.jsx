import React, { useState, useEffect } from 'react';
import { Card } from '../../ui/Card';
import { Calendar, Globe } from 'lucide-react';

export function PublicHolidays() {
    const [holidays, setHolidays] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHolidays = async () => {
            try {
                // Fetch next public holidays worldwide (limit to first 5 for widget)
                const response = await fetch('https://date.nager.at/api/v3/NextPublicHolidaysWorldwide');
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();
                setHolidays(data.slice(0, 5));
            } catch (error) {
                console.error("Holiday fetch error:", error);
                // Fallback / Mock data if API fails
                setHolidays([
                    { date: '2025-01-01', localName: 'New Year Day', countryCode: 'Global' },
                    { date: '2025-02-14', localName: 'Valentine Day', countryCode: 'Global' }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchHolidays();
    }, []);

    return (
        <Card className="p-5 glass-panel border-0 bg-white/5 relative overflow-hidden h-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-white flex items-center gap-2">
                    <Calendar size={18} className="text-purple-400" />
                    Global Holidays
                </h3>
            </div>

            <div className="space-y-3">
                {loading ? (
                    <div className="text-white/40 text-sm animate-pulse">Loading calendar...</div>
                ) : (
                    holidays.map((holiday, index) => (
                        <div key={index} className="flex items-center justify-between p-2 rounded hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                            <div className="flex items-center gap-3">
                                <div className="text-xs font-bold text-white/50 bg-white/10 px-2 py-1 rounded w-10 text-center">
                                    {holiday.countryCode || 'GLO'}
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-white">{holiday.localName}</div>
                                    <div className="text-xs text-white/40">{holiday.name}</div>
                                </div>
                            </div>
                            <div className="text-xs text-purple-300 font-mono">
                                {holiday.date}
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="mt-3 text-[10px] text-white/30 text-center">
                Powered by Nager.Date
            </div>
        </Card>
    );
}
