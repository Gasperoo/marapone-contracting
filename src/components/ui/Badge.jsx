import React from 'react';
import { cn } from '../../lib/utils';
import '../GasperTool/GasperTool.css'; // Ensure CSS is available

export function Badge({ children, variant = "default", className, ...props }) {
    return (
        <span className={cn("gasper-badge", variant, className)} {...props}>
            {children}
        </span>
    );
}
