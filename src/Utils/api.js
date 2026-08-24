const AMERICAS_DESTINATIONS = [
    { name: { common: 'Argentina' } },
    { name: { common: 'Brasil' } },
    { name: { common: 'Canadá' } },
    { name: { common: 'Chile' } },
    { name: { common: 'Colombia' } },
    { name: { common: 'Costa Rica' } },
    { name: { common: 'Cuba' } },
    { name: { common: 'Ecuador' } },
    { name: { common: 'Estados Unidos' } },
    { name: { common: 'México' } },
    { name: { common: 'Panamá' } },
    { name: { common: 'Perú' } },
    { name: { common: 'República Dominicana' } },
    { name: { common: 'Uruguay' } },
];

export const fetchCountries = () =>
    new Promise((resolve) => {
        setTimeout(() => resolve(AMERICAS_DESTINATIONS), 400);
    });

export const getFlightPrice = (countryName) => {
    let hash = 0;
    for (let i = 0; i < countryName.length; i++) {
        hash = (hash * 31 + countryName.charCodeAt(i)) >>> 0;
    }
    return 120 + (hash % 880);
};

const FARE_OPTIONS = [
    { fareClass: 'Básico', multiplier: 1, dayOffset: 3, time: '06:15 a. m.' },
    { fareClass: 'Flex', multiplier: 1.18, dayOffset: 6, time: '01:40 p. m.' },
    { fareClass: 'Premium', multiplier: 1.55, dayOffset: 11, time: '08:05 p. m.' },
];

const formatFlightDate = (date) => {
    const formatted = date.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });
    return formatted.replace(/\./g, '');
};

export const getFlightOptions = (countryName) => {
    const basePrice = getFlightPrice(countryName);
    const today = new Date();

    return FARE_OPTIONS.map((fare, index) => {
        const date = new Date(today);
        date.setDate(date.getDate() + fare.dayOffset);

        return {
            id: `${countryName}-${index}`,
            fareClass: fare.fareClass,
            time: fare.time,
            date: formatFlightDate(date),
            price: Math.round((basePrice * fare.multiplier) / 5) * 5,
        };
    });
};

const PNR_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export const generatePNR = () => {
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += PNR_CHARS[Math.floor(Math.random() * PNR_CHARS.length)];
    }
    return code;
};

export const getAirportCode = (countryName) => {
    const clean = countryName
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/\s/g, '');
    return clean.slice(0, 3).toUpperCase();
};
