# Advanced animation recipes

Load only the section you need. Check that APIs are supported by the project's browser target and library version before using them.

## CSS scroll-driven reveal
```css
@supports (animation-timeline: view()) {
  .reveal {
    animation: reveal linear both;
    animation-timeline: view();
    animation-range: entry 0% cover 30%;
  }
  @keyframes reveal { from { opacity: 0; transform: translateY(2rem); } to { opacity: 1; transform: none; } }
}
@media (prefers-reduced-motion: reduce) { .reveal { animation: none; } }
```
Outside `@supports`, fall back to `IntersectionObserver` toggling a class.

## Reading progress bar
`animation-timeline: scroll(root)` on a `transform: scaleX()` element, with `transform-origin: left`.

## FLIP (layout animation)
1. Read the element's `getBoundingClientRect()` (First).
2. Apply the change, read it again (Last).
3. Set `transform: translate(dx, dy) scale(sx, sy)` to invert, then animate to `none` with `element.animate()` (Play).
Read all rects before writing any styles.

## GSAP timeline pattern
```ts
const ctx = gsap.context(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 0.6 } });
  tl.from('.hero-title', { y: 40, opacity: 0 })
    .from('.hero-sub', { y: 24, opacity: 0 }, '-=0.3')
    .from('.hero-cta', { scale: 0.9, opacity: 0 }, '-=0.3');
}, scope);          // scope = element ref
// on destroy: ctx.revert();
```

## ScrollTrigger pin
Pin only when the section is shorter than the viewport; set `anticipatePin`, call `ScrollTrigger.refresh()` after fonts/images load, and gate with `gsap.matchMedia()` so reduced-motion and small screens skip pinning.

## SVG line draw
Set `pathLength="1"`, `stroke-dasharray: 1`, animate `stroke-dashoffset` from `1` to `0`.

## Canvas loop
Use `requestAnimationFrame`, a delta-time step, cancel on destroy, pause with `IntersectionObserver` and `document.visibilityState`, and size the canvas to CSS size times `min(devicePixelRatio, 2)`.

## Debugging checklist
- Jank: record a Performance trace; look for Layout and Recalculate Style inside the animation frames.
- Jumps on load: fonts or images changed layout after triggers were created; refresh triggers.
- Leaks: navigate away and back three times; heap and listener counts must not grow.
