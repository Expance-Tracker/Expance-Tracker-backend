import fetch from 'node-fetch';

export const getMonobankRates = async () => {
    const url = 'https://api.monobank.ua/bank/currency';
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Помилка запиту валют Monobank');
    }
    const data = await response.json();
    return data;
};

