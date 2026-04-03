# Contributing

Thanks for your interest in contributing! This guide will help you get started.

## Development Setup

```bash
git clone https://github.com/llupRisinglll/solidjs-crossplatform-starter.git
cd solidjs-crossplatform-starter
npm install
npm run dev
```

The dev server starts at [http://localhost:3456](http://localhost:3456).

## Before You Submit

1. **Run the linter** — `npm run lint` must pass with no errors
2. **Run the formatter** — `npm run format` to ensure consistent style
3. **Run the build tests** — `npm run test:build` to verify all three platform builds still work
4. **Test your changes** on the dev server and, if possible, in a desktop build (`npm run build:desktop`)

## Pull Request Guidelines

- **Keep PRs small and focused.** One feature or fix per PR.
- **Write clear commit messages.** Use conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`.
- **Update the README** if your change adds a new feature, script, or config option.
- **Add or update tests** if your change affects the build pipeline or platform detection.
- **Don't break existing platforms.** If you change the build config, make sure `build:web`, `build:mobile`, and `build:desktop` all still work.

## What to Contribute

Here are some areas where help is welcome:

- **New sample components** — Demonstrate more SolidJS patterns (context, portals, lazy loading)
- **Platform-specific features** — Add Capacitor or Tauri plugin examples
- **Testing** — Expand the test suite beyond build verification
- **Documentation** — Improve guides, add diagrams, fix typos
- **Bug fixes** — Check the [issues](https://github.com/llupRisinglll/solidjs-crossplatform-starter/issues) tab

## Project Architecture

- **`app.config.ts`** — SolidStart + Vite config, platform detection, native dep stubbing
- **`src/routes/`** — File-based routing (SolidStart convention)
- **`src/lib/`** — Shared utilities (platform detection, transitions, gestures)
- **`src-tauri/`** — Tauri desktop config and Rust backend
- **`tests/build/`** — Vitest E2E build verification

## Code Style

- TypeScript strict mode
- Prettier for formatting (config in `.prettierrc`)
- ESLint with SolidJS, TypeScript, and a11y plugins (config in `eslint.config.js`)
- Use `<For>` for lists, `<Show>` for conditionals (ESLint enforces this)
- Use `onInput` instead of `onChange` for controlled inputs

## Reporting Issues

When filing a bug report, include:

- Your OS and version
- Node.js version (`node -v`)
- Which platform build is affected (web, mobile, desktop, or all)
- Steps to reproduce
- Expected vs actual behavior

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
