import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { cn } from "../../lib/utils";
import { ChevronDown, Check } from "lucide-react";

// Context for Select state
const SelectContext = createContext(null);

export const Select = ({ children, value, onValueChange }) => {
    const [open, setOpen] = useState(false);

    return (
        <SelectContext.Provider value={{ value, onValueChange, open, setOpen }}>
            <div className="relative">{children}</div>
        </SelectContext.Provider>
    );
};

export const SelectTrigger = ({ children, className }) => {
    const { open, setOpen } = useContext(SelectContext);
    return (
        <button
            onClick={() => setOpen(!open)}
            className={cn(
                "flex h-10 w-full items-center justify-between rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
        >
            {children}
            <ChevronDown className="h-4 w-4 opacity-50" />
        </button>
    );
};

export const SelectValue = ({ placeholder }) => {
    const { value } = useContext(SelectContext);
    // This is a simplified version; ideally we'd map value back to children text.
    // For now, assume value is displayable or parent handles it.
    // In complex cases, we'd need to find the selected child's label.
    // To keep it simple for now, we render the value directly or placeholder.
    // A better approach in a custom select is passing options or using children inspection (harder).
    // Let's defer to the parent to show the selected label if needed, or just show value.
    // Actually, usually SelectValue automatically shows the selected item's text.
    // We'll rely on the user passing children that can be found.
    // Hack: We can't easily find the label without context of options.
    // We will assume the parent passes a display value or we show placeholder if empty.

    return <span>{value || placeholder}</span>;
};

export const SelectContent = ({ children, className }) => {
    const { open } = useContext(SelectContext);
    if (!open) return null;

    return (
        <div className={cn(
            "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border border-white/10 bg-[#1a1a1a] text-white shadow-md animate-in fade-in-80",
            className
        )}>
            <div className="p-1">{children}</div>
        </div>
    );
};

export const SelectItem = ({ children, value, className }) => {
    const { value: selectedValue, onValueChange, setOpen } = useContext(SelectContext);
    const isSelected = selectedValue === value;

    return (
        <div
            onClick={() => {
                onValueChange(value);
                setOpen(false);
            }}
            className={cn(
                "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-white/10 focus:bg-white/10 focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                isSelected && "bg-white/5",
                className
            )}
        >
            {isSelected && (
                <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                    <Check className="h-4 w-4" />
                </span>
            )}
            {children}
        </div>
    );
};
