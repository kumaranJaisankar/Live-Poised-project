import "./global.css";
import { AppProvider } from "./Providers";
import { lazy, Suspense } from "react";
import { KeycloakProvider } from "@/components/auth/KeycloakProvider";

const ClientLayout = lazy(() =>
  Promise.resolve({
    default: ({ children }) => <KeycloakProvider>{children}</KeycloakProvider>,
  })
);

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      </head>
      <body className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 antialiased">
        <Suspense
          fallback={
            <div className="min-h-screen bg-white dark:bg-slate-950">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="animate-pulse h-8 w-32 bg-slate-200 dark:bg-slate-800 rounded mb-4"></div>
                <div className="animate-pulse h-4 w-64 bg-slate-200 dark:bg-slate-800 rounded"></div>
              </div>
            </div>
          }
        >
          {/* <ClientLayout>
            <AppProvider>{children}</AppProvider>
          </ClientLayout> */}
          <KeycloakProvider>
            <AppProvider>{children}</AppProvider>
          </KeycloakProvider>
        </Suspense>
      </body>
    </html>
  );
}
