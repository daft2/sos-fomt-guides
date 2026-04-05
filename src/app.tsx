import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Nav from "~/components/Nav";
import { ThemeProvider } from "~/lib/theme";
import { I18nProvider } from "~/lib/i18n";
import { BookmarkProvider } from "~/lib/bookmarks";
import "./app.css";

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <BookmarkProvider>
          <Router
            root={props => (
              <>
                <Nav />
                <Suspense>{props.children}</Suspense>
              </>
            )}
          >
            <FileRoutes />
          </Router>
        </BookmarkProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
