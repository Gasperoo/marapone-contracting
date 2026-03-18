import React from 'react';
import { cn } from '../../lib/utils';
// CSS should be imported in a main layout or use global styles


export function Badge({ children, variant = "default", className, ...props }) {
    return (
        <span className={cn("gasper-badge", variant, className)} {...props}>
            {children}
        </span>
    );
}
