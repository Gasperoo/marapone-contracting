import { clsx } from 'clsx';

export function cn(...inputs) {
    return clsx(inputs);
}

export function formatCurrency(amount, currency = 'CAD') {
    return new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: currency,
    }).format(amount);
}

export function formatDate(date) {
    const d = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('en-CA', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(d);
}

export function generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function formatPercentage(value, decimals = 2) {
    return `${value.toFixed(decimals)}%`;
}

export function simulateDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
