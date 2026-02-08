import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

export function generateId() {
    return Math.random().toString(36).substring(2, 9);
}

export function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}

export function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

export function formatPercentage(value) {
    return `${(value * 100).toFixed(1)}%`;
}

export function simulateDelay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
