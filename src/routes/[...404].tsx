import { A } from "@solidjs/router";

export default function NotFound() {
  return (
    <main class="min-h-screen p-8 font-sans">
      <div class="mx-auto max-w-2xl space-y-6 text-center">
        <h1 class="my-16 text-6xl font-thin uppercase text-accent">
          Not Found
        </h1>
        <p class="mt-8 text-slate-600 dark:text-slate-400">
          Visit{" "}
          <a
            href="https://solidjs.com"
            target="_blank"
            class="text-accent hover:underline"
          >
            solidjs.com
          </a>{" "}
          to learn how to build Solid apps.
        </p>
        <p class="my-4 text-slate-600 dark:text-slate-400">
          <A href="/" class="text-accent hover:underline">
            Home
          </A>
          {" - "}
          <A href="/about" class="text-accent hover:underline">
            About Page
          </A>
        </p>
      </div>
    </main>
  );
}
