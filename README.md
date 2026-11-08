# Frontend AI Kit by MK

A Claude Code plugin with frontend skills, one agent per framework and frontend MCP servers.

## What is inside

| Part | Name | Purpose |
|---|---|---|
| Agents | `angular-dev`, `react-dev`, `vue-dev` | Framework specialists you call by name. Each preloads its framework skills plus the four below. |
| Skills | `css-styling` | Layout, responsive design, tokens, theming, dark mode with modern CSS |
| | `web-animations` | Transitions, keyframes, micro-interactions, View Transitions, reduced motion |
| | `advanced-animations` | Scroll-driven, timelines, FLIP, SVG, canvas/WebGL |
| | `replicate-website` | Rebuild a site's design from a URL or screenshot in your project's framework |
| | `typescript-safety` | Strict typing rules and a typecheck gate for all three frameworks |
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
| React | `github.com/vercel-labs/agent-skills` (`vercel-react-best-practices`, `vercel-composition-patterns`, `vercel-react-view-transitions`) | Vercel. The React team publishes none. |
| Design (optional) | `github.com/anthropics/skills` (`frontend-design`) | Anthropic |

The agents run `skills/refresh-framework-skills/scripts/refresh-skills.mjs`, which shallow-clones the repos listed in `skills/refresh-framework-skills/sources.json` at their default branch, copies the listed skill folders into `<project>/.claude/skills/`, and records each commit in `.claude/skills/.frontend-ai-kit-lock.json`. It refreshes at most once a week. It never runs upstream code, never follows symlinks and never overwrites skills it did not install. Nothing is installed without your approval first. To refresh by hand: ask "refresh the framework skills".

These files become instructions Claude follows, so skim them the first time. Decide per project whether to commit or git-ignore the fetched folders.

## MCP servers

- **Figma** (`https://mcp.figma.com/mcp`): sign in with `/mcp`, then Authenticate.
- **Chrome DevTools** (`npx chrome-devtools-mcp@latest`): needs Node and Chrome. It controls its own Chrome instance.
- **Context7** (`https://mcp.context7.com/mcp`): works without a key; an optional key raises rate limits.
- On Windows, if `npx`-based servers fail to start, change the entry in `.mcp.json` to `"command": "cmd", "args": ["/c", "npx", ...]`.
- **Motion (optional):** Motion publishes its own skill and installer, `npx motion-ai`. Run it yourself if you use the Motion library.

### Framework MCP add-ons (install per project)

Plugin agents cannot scope an MCP server to themselves (the docs say `mcpServers` is ignored for plugin agents), so framework MCPs are separate add-on plugins. Install them at **project scope** in matching projects only:

| Add-on | Server | Publisher | Use for |
|---|---|---|---|
| `angular-mcp` | `npx -y @angular/cli mcp` | Angular team | `get_best_practices`, `search_documentation`, `list_projects`, dev server and build tools. Docs: https://angular.dev/ai/mcp |
| `nuxt-mcp` | `https://nuxt.com/mcp` | Nuxt team | Nuxt docs, modules, changelog |
| `next-mcp` | `npx -y next-devtools-mcp@latest` | Vercel | Runtime errors, logs, routes. Needs Next.js 16+ and a running dev server |

```
/plugin install angular-mcp@frontend-ai-kit-by-mk
```

There is **no official MCP for React core or Vue core**; the agents use Context7 and the framework docs for those. Not bundled: shadcn's MCP (`npx shadcn@latest mcp`, only useful with a `components.json`) and community TypeScript or Vue DevTools servers (not well established).

## Type safety

The `typescript-safety` skill is preloaded by all three agents: strict compiler settings, no `any`, validated API data, typed props, inputs, forms and stores, and a typecheck gate before finishing.

## Other tools (Cursor, Antigravity)

This plugin format is for Claude Code. The skills in `skills/` follow the Agent Skills format and may be installable elsewhere with `npx skills add Mohamed-Khalil67/frontend-ai-kit-by-Mk`, but that is untested here. The agents use Claude Code's subagent format and will not carry over. MCP servers must be added in each tool's own settings.

## Develop

```
claude plugin validate .
```

Each skill is `skills/<name>/SKILL.md`; each agent is `agents/<name>.md`. No licence is set yet; add one before making the repo public.
