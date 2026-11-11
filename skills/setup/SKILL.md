---
name: setup
description: Guided first-time setup for Frontend AI Kit by MK in the current Angular project - confirms the Angular version and commands, asks whether to use the angular-dev agent or the general skills only, offers to install the official Angular skills, checks which MCP servers are connected, and lists what the user still needs to do. Use right after installing the plugin, or when the user says set up the kit, should I use angular-dev, what do I need, or help me get started.
disable-model-invocation: true
---

# Frontend AI Kit setup

Run this once per project, right after installing the plugin. Keep every message short. Do not install plugins, edit settings or write files except where a step says so and the user agrees.

## Step 1: detect
Read `package.json` and `angular.json`. Report: Angular version, zone-based or zoneless, package manager (from the lockfile), UI library, test runner, and the real build, lint, test and typecheck commands. If this is not an Angular project (no `@angular/core`), say so: the kit's agent and framework skills target Angular only, but the general skills still work. If there is no `package.json`, ask whether this is a new project (`angular-new-app` covers that once the Angular skills are installed).

## Step 2: choose
Ask with AskUserQuestion, one question:
- `frontend-lead` (recommended): the lead agent for any frontend order; it delegates to the specialists. Start it with `claude --agent frontend-ai-kit:frontend-lead`
- `angular-dev`: just the Angular builder, with the official Angular skills, type safety and the general skills preloaded
- "No agent, skills only": use the CSS, animation, replicate-website and typescript-safety skills directly

## Step 3: Angular skills
For `angular-dev`, ask whether to install the official Angular skills now, and separately whether to add the optional UI UX Pro Max design skill (group `design`: a pinned third-party skill with a searchable design database and a stdlib-only Python script the agent runs; needs Python 3). They come from the Angular team's public repo (`github.com/angular/skills`, listed in `refresh-framework-skills/sources.json`) and become instructions Claude follows. If the user agrees, follow the `refresh-framework-skills` skill for group `angular` (and `design` if they chose it) and use `--yes` only because they agreed. If they decline, say the agent will ask again on first use. For "skills only", skip this step.

## Step 4: check tools
List which of these tools you can see in this session and which you cannot, without guessing:
- Figma: needed to build from a Figma link. If missing or unauthenticated: run `/mcp`, choose figma, Authenticate.
- Chrome DevTools: needed to check results in a browser. Needs Node and Chrome installed.
- Context7: current library docs. No key needed.
- Angular CLI MCP (`angular-cli`): best practices and docs search. If missing, the user runs (project scope) `/plugin install angular-mcp@frontend-ai-kit-by-mk`, then restarts the session. You cannot run `/plugin` commands yourself.

## Step 5: give the checklist
End with one short checklist, each line marked done or to do, with the exact command where one exists:
1. Restart the Claude Code session if you installed anything (agents and MCP servers load at session start).
2. Sign in to Figma through `/mcp` (if they will use Figma).
3. Enable the `angular-mcp` add-on.
4. Angular skills: installed now, or will be fetched on first agent use.
5. Decide whether to commit or git-ignore `.claude/skills/` in this project.
6. How to start, with examples: "use angular-dev to implement this Figma design: <link>", "use angular-dev to build the reviews page", "replicate this site: <url>", "animate the sidebar and check it in the browser".
Finish by asking what they want to build first.

## Rules
- Never claim a tool is connected unless you can see its tools in this session.
- Never ask for tokens or passwords; sign-in happens through `/mcp` in the user's browser.
- Do not commit or push.
