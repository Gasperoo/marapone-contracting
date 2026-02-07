
// Service to fetch live data from free APIs

export const getLiveCurrencyRates = async (base = 'USD') => {
    try {
        const response = await fetch(`https://open.er-api.com/v6/latest/${base}`);
        if (!response.ok) throw new Error('Failed to fetch currency data');
        const data = await response.json();
        return {
            EUR: data.rates.EUR,
            GBP: data.rates.GBP,
            CNY: data.rates.CNY,
            JPY: data.rates.JPY,
            lastUpdate: data.time_last_update_utc
        };
    } catch (error) {
        console.error('Currency Fetch Error:', error);
        return null;
    }
};

export const getPortWeather = async (lat, lon) => {
    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m&hourly=temperature_2m,precipitation_probability`
        );
        if (!response.ok) throw new Error('Failed to fetch weather data');
        return await response.json();
    } catch (error) {
        console.error('Weather Fetch Error:', error);
        return null;
    }
};

export const PORTS = {
    SHANGHAI: { name: 'Shanghai', lat: 31.2304, lon: 121.4737 },
    ROTTERDAM: { name: 'Rotterdam', lat: 51.9225, lon: 4.47917 },
    LOS_ANGELES: { name: 'Los Angeles', lat: 33.7288, lon: -118.2620 },
    SINGAPORE: { name: 'Singapore', lat: 1.3521, lon: 103.8198 }
};
