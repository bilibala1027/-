import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';

import './Masonry.css';

const useMedia = (queries, values, defaultValue) => {
  const get = () => values[queries.findIndex((query) => matchMedia(query).matches)] ?? defaultValue;
  const [value, setValue] = useState(get);

  useEffect(() => {
    const handler = () => setValue(get());
    queries.forEach((query) => matchMedia(query).addEventListener('change', handler));
    return () => queries.forEach((query) => matchMedia(query).removeEventListener('change', handler));
  }, [queries]);

  return value;
};

const useMeasure = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return undefined;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, size];
};

export default function Masonry({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
  onItemHover,
  onItemLeave,
  onItemClick,
}) {
  const responsiveColumns = useMedia(
    ['(min-width:1500px)', '(min-width:1100px)', '(min-width:720px)'],
    [3, 2, 2],
    1,
  );
  const columns = items.length === 1 ? 1 : responsiveColumns;
  const [containerRef, { width }] = useMeasure();
  const [visibleImageIds, setVisibleImageIds] = useState(() => new Set());
  const hasMounted = useRef(false);

  useEffect(() => {
    setVisibleImageIds(new Set());
    hasMounted.current = false;
  }, [items]);

  const grid = useMemo(() => {
    if (!width) return [];

    const gap = 12;
    const colHeights = new Array(columns).fill(0);
    const columnWidth = width / columns;

    return items.map((item) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = columnWidth * col;
      const height =
        item.naturalWidth && item.naturalHeight
          ? columnWidth * (item.naturalHeight / item.naturalWidth)
          : item.height / 2;
      const y = colHeights[col];

      colHeights[col] += height + gap;

      return { ...item, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width]);

  const totalHeight = useMemo(() => {
    if (!grid.length) return 620;
    return Math.max(...grid.map((item) => item.y + item.h)) + 14;
  }, [grid]);

  const getInitialPosition = (item) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;
    if (animateFrom === 'random') {
      const directions = ['top', 'bottom', 'left', 'right'];
      direction = directions[Math.floor(Math.random() * directions.length)];
    }

    switch (direction) {
      case 'top':
        return { x: item.x, y: -200 };
      case 'left':
        return { x: -200, y: item.y };
      case 'right':
        return { x: window.innerWidth + 200, y: item.y };
      case 'center':
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2,
        };
      case 'bottom':
      default:
        return { x: item.x, y: window.innerHeight + 200 };
    }
  };

  useEffect(() => {
    if (!containerRef.current || !grid.length) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      setVisibleImageIds(new Set(grid.map((item) => item.id)));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const nextIds = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target.getAttribute('data-key'))
          .filter(Boolean);

        if (!nextIds.length) return;

        setVisibleImageIds((currentIds) => {
          let changed = false;
          const next = new Set(currentIds);
          nextIds.forEach((id) => {
            if (!next.has(id)) {
              next.add(id);
              changed = true;
            }
          });
          return changed ? next : currentIds;
        });
      },
      { rootMargin: '720px 0px' },
    );

    grid.forEach((item) => {
      const element = containerRef.current?.querySelector(`[data-key="${item.id}"]`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [grid]);

  useLayoutEffect(() => {
    if (!grid.length) return undefined;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animationProps = {
        x: item.x,
        y: item.y,
        width: item.w,
        height: item.h,
      };

      if (!hasMounted.current) {
        gsap.fromTo(
          selector,
          {
            opacity: 0,
            ...getInitialPosition(item),
            width: item.w,
            height: item.h,
            ...(blurToFocus && { filter: 'blur(10px)' }),
          },
          {
            opacity: 1,
            ...animationProps,
            ...(blurToFocus && { filter: 'blur(0px)' }),
            duration: 0.8,
            ease: 'power3.out',
            delay: index * stagger,
          },
        );
      } else {
        gsap.to(selector, {
          ...animationProps,
          duration,
          ease,
          overwrite: 'auto',
        });
      }
    });

    hasMounted.current = true;
    return undefined;
  }, [grid, stagger, animateFrom, blurToFocus, duration, ease]);

  const handleMouseEnter = (event, item) => {
    const element = event.currentTarget;
    const selector = `[data-key="${item.id}"]`;

    onItemHover?.(item);

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: hoverScale,
        duration: 0.3,
        ease: 'power2.out',
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay');
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0.3,
          duration: 0.3,
        });
      }
    }
  };

  const handleMouseMove = (event) => {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    element.style.setProperty('--motion-x', `${x.toFixed(3)}`);
    element.style.setProperty('--motion-y', `${y.toFixed(3)}`);
    element.style.setProperty('--motion-img-x', `${(-x * 18).toFixed(2)}px`);
    element.style.setProperty('--motion-img-y', `${(-y * 18).toFixed(2)}px`);
    element.style.setProperty('--motion-glow-x', `${(x * 36).toFixed(2)}%`);
    element.style.setProperty('--motion-glow-y', `${(y * 36).toFixed(2)}%`);
    element.style.setProperty('--motion-sheen-x', `${(x * 18).toFixed(2)}%`);
    element.style.setProperty('--motion-sheen-y', `${(y * 18).toFixed(2)}%`);
  };

  const handleMouseLeave = (event, item) => {
    const element = event.currentTarget;
    const selector = `[data-key="${item.id}"]`;

    onItemLeave?.(item);

    element.style.setProperty('--motion-x', '0');
    element.style.setProperty('--motion-y', '0');
    element.style.setProperty('--motion-img-x', '0px');
    element.style.setProperty('--motion-img-y', '0px');
    element.style.setProperty('--motion-glow-x', '0%');
    element.style.setProperty('--motion-glow-y', '0%');
    element.style.setProperty('--motion-sheen-x', '0%');
    element.style.setProperty('--motion-sheen-y', '0%');

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay');
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3,
        });
      }
    }
  };

  return (
    <div ref={containerRef} className="list" style={{ height: totalHeight }}>
      {grid.map((item) => (
        <button
          key={item.id}
          type="button"
          data-key={item.id}
          className="item-wrapper"
          aria-label={`打开${item.title}图库`}
          onClick={() => onItemClick?.(item)}
          onFocus={() => onItemHover?.(item)}
          onBlur={() => onItemLeave?.(item)}
          onMouseEnter={(event) => handleMouseEnter(event, item)}
          onMouseMove={handleMouseMove}
          onMouseLeave={(event) => handleMouseLeave(event, item)}
        >
          <span className="item-img">
            <span
              className="item-img-layer"
              style={{ backgroundImage: visibleImageIds.has(item.id) ? `url(${item.img})` : undefined }}
            />
            {colorShiftOnHover && <span className="color-overlay" />}
          </span>
          {item.concept?.length ? (
            <span className="masonry-hover-panel" aria-hidden="true">
              {item.conceptHeading ? (
                <span className="masonry-hover-title">
                  <strong>{item.conceptHeading.cn}</strong>
                  <span>
                    {item.conceptHeading.en.map((line) => (
                      <em key={line}>{line}</em>
                    ))}
                  </span>
                </span>
              ) : null}
              <span className="masonry-hover-lines">
                {item.concept.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </span>
              {item.conceptHint ? (
                <span className="masonry-hover-hint">{item.conceptHint}</span>
              ) : null}
            </span>
          ) : null}
        </button>
      ))}
    </div>
  );
}
