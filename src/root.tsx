// @refresh reload
import { Suspense } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Link,
  Routes,
  Scripts,
} from "solid-start";
import { GlobalProvider, useGlobal } from "./components/GlobalProvider";

export default function Root() {
  return (
    <Html
      lang="en"
      class="select-none scroll-smooth"
      classList={{ "scroll-pt-16": !useGlobal()?.isMobile }}
    >
      <Head>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta name="description" content="Julie Saia Webdev Portfolio" />
        <Link
          rel="preload"
          href="https://fonts.gstatic.com/s/nunito/v24/XRXI3I6Li01BKofiOc5wtlZ2di8HDOUhdTQ3jw.woff2"
          as="font"
          type="font/woff2"
          crossorigin=""
        />
      </Head>
      <Body>
        <GlobalProvider>
          <Suspense>
            <ErrorBoundary>
              <Routes>
                <FileRoutes />
              </Routes>
            </ErrorBoundary>
          </Suspense>
          <Scripts />
        </GlobalProvider>
      </Body>
    </Html>
  );
}
