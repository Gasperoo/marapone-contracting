import React, { useEffect, useState } from "react"
import { motion } from "motion/react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "../lib/utils"

export function TubelightNavbar({ items, className }) {
    const location = useLocation()
    const [activeTab, setActiveTab] = useState(items[0].name)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        // Update active tab based on current path
        const currentItem = items.find(item => item.url === location.pathname)
        if (currentItem) {
            setActiveTab(currentItem.name)
        }
    }, [location.pathname, items])

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }

        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <div
            className={cn(
                "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6",
                className,
            )}
        >
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
                {items.map((item) => {
                    const Icon = item.icon
                    const isActive = activeTab === item.name

                    return (
                        <Link
                            key={item.name}
                            to={item.url}
                            onClick={() => setActiveTab(item.name)}
                            className={cn(
                                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                                "text-white/60 hover:text-[#5227FF]",
                                isActive && "bg-white/10 text-[#5227FF]",
                            )}
                        >
                            <span className="hidden md:inline">{item.name}</span>
                            <span className="md:hidden">
                                <Icon size={18} strokeWidth={2.5} />
                            </span>
                            {isActive && (
                                <motion.div
                                    layoutId="lamp"
                                    className="absolute inset-0 w-full bg-[#5227FF]/5 rounded-full -z-10"
                                    initial={false}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 30,
                                    }}
                                >
                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#5227FF] rounded-t-full">
                                        <div className="absolute w-12 h-6 bg-[#5227FF]/20 rounded-full blur-md -top-2 -left-2" />
                                        <div className="absolute w-8 h-6 bg-[#5227FF]/20 rounded-full blur-md -top-1" />
                                        <div className="absolute w-4 h-4 bg-[#5227FF]/20 rounded-full blur-sm top-0 left-2" />
                                    </div>
                                </motion.div>
                            )}
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
