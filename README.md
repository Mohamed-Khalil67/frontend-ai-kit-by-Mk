# Frontend AI Kit by MK

A Claude Code plugin for Angular frontend work: one Angular agent, frontend skills and MCP servers.

## What is inside

| Part | Name | Purpose |
|---|---|---|
| Agent | `angular-dev` | Angular specialist you call by name. Preloads the official Angular skills, type safety and the skills below. |
| Skills | `setup` | Guided first-time setup: choose the agent, install the Angular skills, check MCP servers, get a to-do checklist |
| | `css-styling` | Layout, responsive design, tokens, theming, dark mode with modern CSS |
| | `web-animations` | Transitions, keyframes, micro-interactions, View Transitions, reduced motion |
| | `advanced-animations` | Scroll-driven, timelines, FLIP, SVG, canvas/WebGL |
| | `replicate-website` | Rebuild a site's design from a URL or screenshot in your Angular project |
| | `typescript-safety` | Strict typing rules and a typecheck gate for Angular |
| | `angular-patterns` | AsyncState unions and `@let` narrowing, declarative RxJS streams, signals with `ngModel`, `ng serve` port collisions on Windows |
| | `my-coding-habits` | The owner's personal Angular/TypeScript habits; the agent also learns new ones from corrections (user-scope memory) |
| | `refresh-framework-skills` | Fetches the latest official Angular skills into the project |
| MCP | Figma, Chrome DevTools, Context7 | Design to code, browser verification, current library docs |
| Add-on plugin | `angular-mcp` | The Angular team's CLI MCP (best practices, docs search) |

## Install (Claude Code)

```
/plugin marketplace add Mohamed-Khalil67/frontend-ai-kit-by-Mk
/plugin install frontend-ai-kit@frontend-ai-kit-by-mk
```

Choose project or user scope when asked. Restart the session so the agent and MCP servers load, then run the guided setup in your project:

```
/frontend-ai-kit:setup
```

It confirms your Angular version and commands, asks whether to use `angular-dev` or the skills only, offers to install the official Angular skills, checks which MCP servers are connected, and ends with a checklist of what you still need (Figma sign-in, `angular-mcp` add-on, restart).

To use a local copy instead: `/plugin marketplace add C:\Workspace\frontend-ai-kit`.

## Use

- "use angular-dev to build this Figma frame: <link>"
- "use angular-dev to add a reviews page"
- "replicate this page: <url>" (the `replicate-website` skill)
- "animate the sidebar and check it in the browser"

On first use, the agent offers to install the official Angular skills into the project's `.claude/skills/` (see below) and asks before fetching.

## Official Angular skills

| Source | Publisher |
|---|---|
| `github.com/angular/skills` (`angular-developer`, `angular-new-app`) | Angular team |
| `github.com/nextlevelbuilder/ui-ux-pro-max-skill` (`ui-ux-pro-max`, optional, pinned to a reviewed commit) | nextlevelbuilder (third party, MIT). A searchable design database plus stdlib-only Python scripts; needs Python 3. |

The agent runs `skills/refresh-framework-skills/scripts/refresh-skills.mjs`, which shallow-clones the repos listed in `skills/refresh-framework-skills/sources.json` at their default branch, copies the listed skill folders into `<project>/.claude/skills/`, and records each commit in `.claude/skills/.frontend-ai-kit-lock.json`. It refreshes at most once a week. It never runs upstream code, never follows symlinks and never overwrites skills it did not install. Nothing is installed without your approval first. To refresh by hand: ask "refresh the framework skills".

These files become instructions Claude follows, so skim them the first time. Decide per project whether to commit or git-ignore the fetched folders.

## MCP servers

- **Figma** (`https://mcp.figma.com/mcp`): sign in with `/mcp`, then Authenticate.
- **Chrome DevTools** (`npx chrome-devtools-mcp@latest`): needs Node and Chrome. It controls its own Chrome instance.
- **Context7** (`https://mcp.context7.com/mcp`): works without a key; an optional key raises rate limits.
- On Windows, if `npx`-based servers fail to start, change the entry in `.mcp.json` to `"command": "cmd", "args": ["/c", "npx", ...]`.

### Angular MCP add-on (install per project)

Plugin agents cannot scope an MCP server to themselves (the docs say `mcpServers` is ignored for plugin agents), so the Angular CLI MCP is a separate add-on plugin. Install it at **project scope** in Angular projects:

```
/plugin install angular-mcp@frontend-ai-kit-by-mk
```

It runs `npx -y @angular/cli mcp` and gives `get_best_practices`, `search_documentation`, `list_projects` and dev server and build tools. Docs: https://angular.dev/ai/mcp.

## Type safety

The `typescript-safety` skill is preloaded by `angular-dev`: strict compiler settings and `strictTemplates`, no `any`, validated API data, typed signal inputs, outputs and forms, and a typecheck gate before finishing.

## Other tools (Cursor, Antigravity)

This plugin format is for Claude Code. The skills in `skills/` follow the Agent Skills format and may be installable elsewhere with `npx skills add Mohamed-Khalil67/frontend-ai-kit-by-Mk`, but that is untested here. The agent uses Claude Code's subagent format and will not carry over. MCP servers must be added in each tool's own settings.

## Develop

```
claude plugin validate .
```

Each skill is `skills/<name>/SKILL.md`; the agent is `agents/angular-dev.md`. No licence is set yet; add one before making the repo public.
