# Evals

The skill-authoring guide says to write evaluations before piling on instructions. There is no built-in runner, so these are scripted manual checks: run each prompt in a real Angular project with the plugin installed, then tick the pass criteria. Record the date, the Claude model, the Angular version and the result in `results.md`.

## How to run
1. Install the plugin in a throwaway branch of a real Angular project, restart the session, run `/frontend-ai-kit:setup`.
2. Start the lead: `claude --agent frontend-ai-kit:frontend-lead` (use the bare name if the prefixed one is not found), or ask for `frontend-lead` by name.
3. Paste one prompt. Do not hint at which agent or skill to use; the point is whether routing works.
4. Tick the criteria. A failed trigger usually means the description needs rewriting; a wrong result usually means the skill text is wrong.
5. Run each scenario once with a stronger model and once with a faster one; the guide says to test every model you plan to use.

## Scenarios
| # | Prompt | Must happen | Must not happen |
|---|---|---|---|
| 1 | "Add a courses list page with search as you type" | Preflight reads versions and commands. `angular-dev` builds it with `AsyncState` and a debounced `switchMap`; `typescript-safety` rules respected; typecheck, lint, tests run | `any`, boolean loading flags, a new dependency without asking |
| 2 | "Implement this Figma frame: <link>" | Figma design context read before CSS; Figma variables mapped to existing tokens; `ui-stylist` compares screenshots at 1440, 768, 390 | Hardcoded hex values where tokens exist; claiming a visual check without a browser |
| 3 | "Replicate https://example.com's pricing section" | Capture, spec, section-by-section build, screenshot comparison; placeholders for assets | Copying the site's code or images; an exact copy of text |
| 4 | "Make the sidebar open with a smooth animation" | `motion-dev` picks CSS or the Web Animations API, handles reduced motion, animates transform and opacity | New animation library; animating width or height |
| 5 | "Create a scroll-driven hero that pins and reveals text" | `advanced-animations` approach, a fallback for reduced motion and unsupported browsers, performance trace taken or its absence stated | Scroll hijacking; no cleanup on destroy |
| 6 | "Review the last change for accessibility" | `a11y-reviewer` runs read-only, reports Blocking / Should fix / Nice to have with file and line, states what it could not check | Any file edited by the reviewer |
| 7 | "The home page feels slow, find out why" | `perf-auditor` measures (build stats, Lighthouse or trace) before recommending; says what it could not measure | Fixes applied; recommendations presented as measurements |
| 8 | "Port 4200 is already in use" | `angular-patterns` diagnosis: find the PID, confirm it is the project's `ng serve`, stop that PID | `taskkill /IM node.exe` |
| 9 | "Add a login form that shows loading and errors" | `AsyncState` union, `@let` narrowing, `role="alert"`, submit blocked while loading | Several boolean flags; untyped form |
| 10 | "Use React for this page" (in an Angular project) | The lead says the kit is Angular-only and asks how to proceed | Silently building React code |

## Checking routing quickly
In a session with the plugin enabled, ask "which agent would you use for: <prompt>" for each scenario. The answer should match the table above before you run the full scenario.
