# Frontend AI Kit by MK

A Claude Code plugin with frontend skills, one agent per framework and frontend MCP servers.

## What is inside

| Part | Name | Purpose |
|---|---|---|
| Agents | `angular-dev`, `react-dev`, `vue-dev` | Framework specialists you call by name. Each preloads its framework skills plus the four below. |
| Skills | `css-styling` | Layout, responsive design, tokens, theming, dark mode with modern CSS |
| | `web-animations` | Transitions, keyframes, micro-interactions, View Transitions, reduced motion |
| | `advanced-animations` | Scroll-driven, timelines, FLIP, SVG, canvas/WebGL; hands off to GSAP when used |
| | `replicate-website` | Rebuild a site's design from a URL or screenshot in your project's framework |
| | `refresh-framework-skills` | Fetches the latest upstream skills into the project |
| MCP | Figma, Chrome DevTools, Context7 | Design to code, browser verification, current library docs |

## Install (Claude Code)

```
/plugin marketplace add Mohamed-Khalil67/frontend-ai-kit-by-Mk
/plugin install frontend-ai-kit@frontend-ai-kit-by-mk
```

Choose project or user scope when asked. Restart the session afterwards so agents and MCP servers load. To use a local copy instead: `/plugin marketplace add C:\Workspace\frontend-ai-kit`.

## Use

In any project:

- "use angular-dev to build this Figma frame: <link>"
- "use react-dev to make this page faster"
- "use vue-dev to add a Pinia store for the cart"
- "replicate this page: <url>" (the `replicate-website` skill)

On first use, the framework agent offers to install the official framework skills into the project's `.claude/skills/` (see below) and asks before fetching.

## Official framework skills

| Framework | Source | Publisher |
|---|---|---|
| Angular | `github.com/angular/skills` | Angular team |
| Vue | `github.com/vuejs-ai/skills` | Vue AI organization |
| React | `github.com/vercel-labs/agent-skills` (`react-best-practices`) | Vercel. The React team publishes none. |
| GSAP (optional, if the project uses it) | `github.com/greensock/gsap-skills` | GreenSock |
| Design (optional) | `github.com/anthropics/skills` (`frontend-design`) | Anthropic |

The agents run `skills/refresh-framework-skills/scripts/refresh-skills.mjs`, which shallow-clones the repos listed in `skills/refresh-framework-skills/sources.json` at their default branch, copies the listed skill folders into `<project>/.claude/skills/`, and records each commit in `.claude/skills/.frontend-ai-kit-lock.json`. It refreshes at most once a week. It never runs upstream code, never follows symlinks and never overwrites skills it did not install. Nothing is installed without your approval first. To refresh by hand: ask "refresh the framework skills".

These files become instructions Claude follows, so skim them the first time. Decide per project whether to commit or git-ignore the fetched folders.

## MCP servers

- **Figma** (`https://mcp.figma.com/mcp`): sign in with `/mcp`, then Authenticate.
- **Chrome DevTools** (`npx chrome-devtools-mcp@latest`): needs Node and Chrome. It controls its own Chrome instance.
- **Context7** (`https://mcp.context7.com/mcp`): works without a key; an optional key raises rate limits.
- **Angular CLI MCP (Angular projects only, not bundled):** `claude mcp add angular-cli -- npx -y @angular/cli mcp`. Docs: https://angular.dev/ai/mcp. Not bundled because it is unverified outside an Angular workspace.
- On Windows, if `npx`-based servers fail to start, change the entry in `.mcp.json` to `"command": "cmd", "args": ["/c", "npx", ...]`.
- **Motion (optional):** Motion publishes its own skill and installer, `npx motion-ai`. Run it yourself if you use the Motion library.

## Other tools (Cursor, Antigravity)

This plugin format is for Claude Code. The skills in `skills/` follow the Agent Skills format and may be installable elsewhere with `npx skills add Mohamed-Khalil67/frontend-ai-kit-by-Mk`, but that is untested here. The agents use Claude Code's subagent format and will not carry over. MCP servers must be added in each tool's own settings.

## Develop

```
claude plugin validate .
```

Each skill is `skills/<name>/SKILL.md`; each agent is `agents/<name>.md`. No licence is set yet; add one before making the repo public.
