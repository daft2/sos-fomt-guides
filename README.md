# solid-template

A personal SolidStart starter template.

## Stack

- [SolidStart v2](https://start.solidjs.com)
- [Kobalte](https://kobalte.dev) — accessible UI primitives
- [Tailwind CSS](https://tailwindcss.com)
- [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)
- TypeScript + localStorage for client state

## Usage
```bash
git clone https://github.com/your-username/solid-template my-app
cd my-app
npm install
npm run dev
```

## Structure
```
src/
├── lib/
│   ├── storage.ts               # Typed localStorage helpers
│   └── createStorageSignal.ts   # Reactive signal backed by localStorage
└── routes/
    └── index.tsx                # Demo page
```