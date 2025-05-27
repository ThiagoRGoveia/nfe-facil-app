# NFe Fácil App

A modern web application for NFSe (Nota Fiscal de Serviços Eletrônica) management, built with Vue 3, Vite, Tailwind CSS, and a rich ecosystem of modern tools.

**Version:** 0.0.0

---

## Getting Started

### Development

To start the development server with hot-reload:

```bash
pnpm dev
```

The app will be accessible at [http://localhost:5173](http://localhost:5173) (default Vite port).

### Building for Production

To build the project for production:

```bash
pnpm build
```

The output will be in the `dist` directory.

### Type Checking

```bash
pnpm type-check
```

### Linting

```bash
pnpm lint
```

### Code Generation (GraphQL)

```bash
pnpm codegen
```

---

## Deployment

Deploy to Cloudflare Pages:

- **UAT:**
  ```bash
  pnpm deploy:uat
  ```
- **Production:**
  ```bash
  pnpm deploy:prod
  ```

---

## Scripts

| Script           | Description                                      |
|------------------|--------------------------------------------------|
| dev              | Start development server (Vite)                  |
| build            | Build for production                             |
| build:uat        | Build for UAT environment                        |
| build:prod       | Build for production environment                 |
| deploy:uat       | Build & deploy to Cloudflare Pages (UAT)         |
| deploy:prod      | Build & deploy to Cloudflare Pages (Production)  |
| lint             | Run ESLint with auto-fix                         |
| type-check       | Type-check with vue-tsc                          |
| codegen          | Run GraphQL codegen                              |
| codegen:watch    | Watch GraphQL codegen                            |
| preview          | Preview production build                         |

---

## Main Dependencies

- **Vue 3** (`vue`)
- **Vite** (`vite`)
- **Tailwind CSS** (`tailwindcss`, `tailwindcss-animate`, `tailwind-merge`)
- **Pinia** (state management)
- **Vue Router**
- **Apollo Client** (GraphQL)
- **Auth0** (`@auth0/auth0-vue`)
- **vee-validate** & **zod** (form validation)
- **lucide-vue-next**, **mdi/font** (icons)
- **reka-ui**, **clsx**, **class-variance-authority** (UI utilities)

See `package.json` for the full list.

---

## Environment Variables

- `VITE_GRAPHQL_URL` — Base URL for GraphQL API (used for API requests, support/contact form, etc.)

---

## Project Structure

- `src/` — Main source code
- `public/` — Static assets
- `dist/` — Production build output

---

## License

This project is private and not intended for public distribution.

---

## Contact & Support

See the in-app support page or [FAQ] for more information. For direct inquiries, use the support form in the app.

---

> Last updated: May 27, 2025
