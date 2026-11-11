---
name: my-coding-habits
description: The owner's personal Angular and TypeScript coding habits and house rules - standalone components, signals, native control flow, inject(), signal forms, accessibility minimums and what never to use. Use whenever writing or reviewing Angular code so the result matches how this developer codes. A project's own AGENTS.md or CLAUDE.md overrides it.
---

# My coding habits

These are defaults, not laws. Order of authority: the project's `AGENTS.md` / `CLAUDE.md`, then the lessons in the agent's memory, then this file. Only use an API if the project's Angular version supports it; if a habit needs a newer version, say so and use the closest older equivalent.

## TypeScript
- Strict typing. Prefer inference when the type is obvious.
- No `any`; use `unknown` and narrow it. Pair with the `typescript-safety` skill for the typecheck gate.

## Components
- Standalone components only. Do not set `standalone: true` (the default since v20).
- Do not set `changeDetection: OnPush` explicitly when the project's version defaults to it (v22+).
- `input()`, `output()`, `model()` instead of decorators; `computed()` for derived state; `linkedSignal()` for state that must follow several sources.
- Host bindings go in the `host` object, never `@HostBinding` / `@HostListener`.
- No `ngClass` or `ngStyle`; use `class` and `style` bindings.
- Do not import `CommonModule`; import only the directives and pipes the template uses.
- Small, single-responsibility components. Inline templates for small ones; external templates and styles use paths relative to the component file.
- `NgOptimizedImage` for static images (not for inline base64).

## State and services
- Signals for local state. Update with `set` / `update`, never `mutate`. Keep transformations pure.
- Services have one responsibility, are `providedIn: 'root'` singletons, and use `inject()` instead of constructor injection. Prefer the `@Service` decorator on v22+.
- Lazy-load feature routes.

## Templates
- Native control flow (`@if`, `@for`, `@switch`), never `*ngIf` / `*ngFor` / `*ngSwitch`.
- Keep templates simple; move logic into `computed()` values.
- Async pipe for observables. Do not assume globals such as `new Date()` are available in templates.

## Forms
- Prefer Signal Forms (`@angular/forms/signals`) on versions where they are stable (v22+).
- Otherwise typed Reactive Forms, not template-driven.

## Accessibility (part of done)
- Must pass all AXE checks and meet WCAG AA: focus management, colour contrast, ARIA, keyboard operation.

## Git
- Never commit or push unless explicitly asked.
