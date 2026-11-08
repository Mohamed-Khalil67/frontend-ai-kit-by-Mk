---
name: setup
description: Guided first-time setup for Frontend AI Kit by MK in the current project - detects the framework, asks which agent to use (angular-dev, react-dev, vue-dev or none), offers to install the official framework skills, checks which MCP servers are connected, and lists what the user still needs to do. Use right after installing the plugin, or when the user says set up the kit, which agent should I use, what do I need, or help me get started.
disable-model-invocation: true
---

# Frontend AI Kit setup

Run this once per project, right after installing the plugin. Keep every message short. Do not install plugins, edit settings or write files except where a step says so and the user agrees.

## Step 1: detect
Read `package.json`. Report: framework (`@angular/core` → Angular, `react` → React, `vue` → Vue, also Next.js or Nuxt if present), version, package manager (from the lockfile), UI library, test runner, and the real build, lint, test and typecheck commands. If there is no `package.json`, say so and ask whether this is a new project (for Angular, `angular-new-app` covers that once its skills are installed).

## Step 2: choose the agent
Ask with AskUserQuestion, one question, the detected framework's agent first and marked recommended:
- `angular-dev`: Angular components, services, routing, forms, signals
- `react-dev`: React and Next.js
- `vue-dev`: Vue and Nuxt
- "No agent, skills only": use the CSS, animation, replicate-website and typescript-safety skills directly

Allow "Other" for a monorepo with several apps. If the user picks an agent that does not match the detected framework, say so once and follow their choice.

## Step 3: framework skills
Ask whether to install the official framework skills for the chosen agent now. They come from public GitHub repos listed in `refresh-framework-skills/sources.json` (Angular team, Vue AI organization, Vercel for React) and become instructions Claude follows. If the user agrees, follow the `refresh-framework-skills` skill for the matching group and use `--yes` only because they agreed. If they decline, say the agent will ask again on first use. For "skills only", skip this step.

## Step 4: check tools
List which of these tools you can see in this session and which you cannot, without guessing:
- Figma: needed to build from a Figma link. If missing or unauthenticated: run `/mcp`, choose figma, Authenticate.
- Chrome DevTools: needed to check results in a browser. Needs Node and Chrome installed.
- Context7: current library docs. No key needed.
- Framework MCP add-on, only for the chosen framework:
  - Angular: `angular-mcp` (best practices, docs search)
  - Nuxt: `nuxt-mcp`
  - Next.js 16+: `next-mcp`
  - React core and Vue core have none.
  If the add-on is missing, tell the user to run (project scope):
  `/plugin install angular-mcp@frontend-ai-kit-by-mk` (or `nuxt-mcp` / `next-mcp`), then restart the session. You cannot run `/plugin` commands yourself.

## Step 5: give the checklist
End with one short checklist, each line marked done or to do, with the exact command where one exists:
1. Restart the Claude Code session if you installed anything (agents and MCP servers load at session start).
2. Sign in to Figma through `/mcp` (if they will use Figma).
3. Enable the framework MCP add-on (if applicable).
4. Framework skills: installed now, or will be fetched on first agent use.
5. Decide whether to commit or git-ignore `.claude/skills/` in this project.
6. How to start, with examples for the chosen agent: "use angular-dev to implement this Figma design: <link>", "use angular-dev to build the reviews page", "replicate this site: <url>", "animate the sidebar and check it in the browser".
Finish by asking what they want to build first.

## Rules
- Never claim a tool is connected unless you can see its tools in this session.
- Never ask for tokens or passwords; sign-in happens through `/mcp` in the user's browser.
- Do not commit or push.
