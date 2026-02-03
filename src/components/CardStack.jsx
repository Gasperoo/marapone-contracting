import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import '../styles/cardstack.css';

function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}

function wrapIndex(n, len) {
    if (len <= 0) return 0;
    return ((n % len) + len) % len;
}

function signedOffset(i, active, len, loop) {
    const raw = i - active;
    if (!loop || len <= 1) return raw;

    const alt = raw > 0 ? raw - len : raw + len;
    return Math.abs(alt) < Math.abs(raw) ? alt : raw;
}

function DefaultFanCard({ item, active }) {
    return (
        <div className="cardstack-card-inner">
            <div className="cardstack-card-image">
                {item.imageSrc ? (
                    <img
                        src={item.imageSrc}
                        alt={item.title}
                        draggable={false}
                        loading="eager"
                    />
                ) : (
                    <div className="cardstack-card-placeholder">
                        No image
                    </div>
                )}
            </div>

            <div className="cardstack-card-gradient" />

            <div className="cardstack-card-content">
                <div className="cardstack-card-title">{item.title}</div>
                {item.description && (
                    <div className="cardstack-card-description">{item.description}</div>
                )}
            </div>
        </div>
    );
}

export default function CardStack({
    items,
    initialIndex = 0,
    maxVisible = 7,
    cardWidth = 520,
    cardHeight = 320,
    overlap = 0.48,
    spreadDeg = 48,
    perspectivePx = 1100,
    depthPx = 140,
    tiltXDeg = 12,
    activeLiftPx = 22,
    activeScale = 1.03,
    inactiveScale = 0.94,
    springStiffness = 280,
    springDamping = 28,
    loop = true,
    autoAdvance = false,
    intervalMs = 2800,
    pauseOnHover = true,
    showDots = true,
    className,
    onChangeIndex,
    renderCard,
}) {
    const reduceMotion = useReducedMotion();
    const len = items.length;

    const [active, setActive] = useState(() => wrapIndex(initialIndex, len));
    const [hovering, setHovering] = useState(false);

    useEffect(() => {
        setActive((a) => wrapIndex(a, len));
    }, [len]);

    useEffect(() => {
        if (!len) return;
        onChangeIndex?.(active, items[active]);
    }, [active, items, len, onChangeIndex]);

    const maxOffset = Math.max(0, Math.floor(maxVisible / 2));
    const cardSpacing = Math.max(10, Math.round(cardWidth * (1 - overlap)));
    const stepDeg = maxOffset > 0 ? spreadDeg / maxOffset : 0;

    const canGoPrev = loop || active > 0;
    const canGoNext = loop || active < len - 1;

    const prev = useCallback(() => {
        if (!len || !canGoPrev) return;
        setActive((a) => wrapIndex(a - 1, len));
    }, [canGoPrev, len]);

    const next = useCallback(() => {
        if (!len || !canGoNext) return;
        setActive((a) => wrapIndex(a + 1, len));
    }, [canGoNext, len]);

    const onKeyDown = (e) => {
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
    };

    useEffect(() => {
        if (!autoAdvance || reduceMotion || !len || (pauseOnHover && hovering)) return;

        const id = window.setInterval(() => {
            if (loop || active < len - 1) next();
        }, Math.max(700, intervalMs));

        return () => window.clearInterval(id);
    }, [autoAdvance, intervalMs, hovering, pauseOnHover, reduceMotion, len, loop, active, next]);

    if (!len) return null;

    const activeItem = items[active];

    return (
        <div
            className={cn('cardstack-container', className)}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            <div
                className="cardstack-stage"
                style={{ height: Math.max(380, cardHeight + 80) }}
                tabIndex={0}
                onKeyDown={onKeyDown}
            >
                <div className="cardstack-bg-wash" aria-hidden="true" />
                <div className="cardstack-bg-spotlight" aria-hidden="true" />

                <div
                    className="cardstack-perspective-wrapper"
                    style={{ perspective: `${perspectivePx}px` }}
                >
                    <AnimatePresence initial={false}>
                        {items.map((item, i) => {
                            const off = signedOffset(i, active, len, loop);
                            const abs = Math.abs(off);
                            const visible = abs <= maxOffset;

                            if (!visible) return null;

                            const rotateZ = off * stepDeg;
                            const x = off * cardSpacing;
                            const y = abs * 10;
                            const z = -abs * depthPx;

                            const isActive = off === 0;
                            const scale = isActive ? activeScale : inactiveScale;
                            const lift = isActive ? -activeLiftPx : 0;
                            const rotateX = isActive ? 0 : tiltXDeg;
                            const zIndex = 100 - abs;

                            const dragProps = isActive
                                ? {
                                    drag: 'x',
                                    dragConstraints: { left: 0, right: 0 },
                                    dragElastic: 0.18,
                                    onDragEnd: (_e, info) => {
                                        if (reduceMotion) return;
                                        const travel = info.offset.x;
                                        const v = info.velocity.x;
                                        const threshold = Math.min(160, cardWidth * 0.22);

                                        if (travel > threshold || v > 650) prev();
                                        else if (travel < -threshold || v < -650) next();
                                    },
                                }
                                : {};

                            return (
                                <motion.div
                                    key={item.id}
                                    className={cn(
                                        'cardstack-card',
                                        isActive ? 'cardstack-card-active' : 'cardstack-card-inactive'
                                    )}
                                    style={{
                                        width: cardWidth,
                                        height: cardHeight,
                                        zIndex,
                                        transformStyle: 'preserve-3d',
                                    }}
                                    initial={
                                        reduceMotion
                                            ? false
                                            : {
                                                opacity: 0,
                                                y: y + 40,
                                                x,
                                                rotateZ,
                                                rotateX,
                                                scale,
                                            }
                                    }
                                    animate={{
                                        opacity: 1,
                                        x,
                                        y: y + lift,
                                        rotateZ,
                                        rotateX,
                                        scale,
                                    }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: springStiffness,
                                        damping: springDamping,
                                    }}
                                    onClick={() => setActive(i)}
                                    {...dragProps}
                                >
                                    <div
                                        className="cardstack-card-3d"
                                        style={{
                                            transform: `translateZ(${z}px)`,
                                            transformStyle: 'preserve-3d',
                                        }}
                                    >
                                        {renderCard ? (
                                            renderCard(item, { active: isActive })
                                        ) : (
                                            <DefaultFanCard item={item} active={isActive} />
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>

            {showDots && (
                <div className="cardstack-dots-container">
                    <div className="cardstack-dots">
                        {items.map((it, idx) => {
                            const on = idx === active;
                            return (
                                <button
                                    key={it.id}
                                    onClick={() => setActive(idx)}
                                    className={cn('cardstack-dot', on && 'cardstack-dot-active')}
                                    aria-label={`Go to ${it.title}`}
                                />
                            );
                        })}
                    </div>
                    {activeItem.href && (
                        <a
                            href={activeItem.href}
                            target="_blank"
                            rel="noreferrer"
                            className="cardstack-link-icon"
                            aria-label="Open link"
                        >
                            <svg
                                className="cardstack-icon"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                            </svg>
                        </a>
                    )}
                </div>
            )}
        </div>
    );
}
