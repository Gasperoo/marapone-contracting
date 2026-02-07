import React from 'react';
import { cn } from '../../lib/utils';

export function Label({ className, ...props }) {
    // Style matches the glassmorphism aesthetic
    return <label className={cn("text-sm font-medium leading-none text-white/90", className)} {...props} />;
}
