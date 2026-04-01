# Land Area Calculator

Land area calculator with Croatian domestic units (jutro, čhv, etc.) and metric units.

- Demo URL: https://land-calc.iokrono.com/
- Supports English and Croatian languages

## Tech Stack

- [Vite](https://vitejs.dev/) - Build tool and dev server
- [React](https://react.dev/) 18 with TypeScript
- [Material UI](https://mui.com/) - UI components
- [React Router](https://reactrouter.com/) v7 - Client-side routing
- [i18next](https://www.i18next.com/) - Internationalization
- [Vitest](https://vitest.dev/) - Unit testing

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page components
├── service/       # Business logic (area calculations)
├── types/         # TypeScript type definitions
├── hooks/         # Custom React hooks
├── i18n/          # i18n configuration
├── theme/         # MUI theme configuration
└── translations/  # Translation files (en, hr)
```

## Available Units

| Unit | Name | Conversion to m² |
|------|------|------------------|
| m² | Square meter | 1 |
| ar | Are | 100 |
| ha | Hectare | 10,000 |
| km² | Square kilometer | 1,000,000 |
| čhv | Čestvorni hvat | 3.596652 |
| jutro | Jutro | 5,754.642 |

## Available Scripts

### `npm run dev`

Runs the app in development mode with hot reload.

### `npm run build`

Builds the app for production to the `dist` folder.

### `npm run preview`

Preview the production build locally.

### `npm test`

Runs unit tests with Vitest in watch mode.

### `npm run test:coverage`

Runs tests with coverage report.

### `npm run lint`

Runs ESLint for code quality checks.

### `npm run typecheck`

Runs TypeScript type checking without emitting files.

## Deployment

The app can be deployed using Docker or Kubernetes.

### Docker

```bash
docker build -t land-calc .
docker run -p 8080:80 land-calc
```

### Kubernetes

Helm charts available in `k8s/` directory for cluster deployment.

## Features

- Multiple calculation rows
- Calculation history
- Conversion between units
- Responsive design
- Progressive Web App (PWA) support
- English and Croatian localization
- Cookie consent
- Dark mode support (via MUI theme)
