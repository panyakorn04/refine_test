import {
  Refine,
  GitHubBanner,
  WelcomePage,
  Authenticated,
} from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  AuthPage,
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
} from "@refinedev/mui";

import { CssBaseline, GlobalStyles } from "@mui/material";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import routerBindings, {
  NavigateToResource,
  CatchAllNavigate,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { Header } from "./components/header";
import { MuiInferencer } from "@refinedev/inferencer/mui";

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <Refine
                routerProvider={routerBindings}
                dataProvider={dataProvider(
                    "https://api.fake-rest.refine.dev",
                )}
                notificationProvider={notificationProvider}
                resources={[
                  {
                    name: "blog_posts",
                    list: "/blog-posts",
                    show: "/blog-posts/show/:id",
                    create: "/blog-posts/create",
                    edit: "/blog-posts/edit/:id",
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                }}
            >
              <Routes>
                <Route
                    element={
                      <ThemedLayoutV2>
                        <Outlet />
                      </ThemedLayoutV2>
                    }
                >
                  <Route
                      index
                      element={
                        <NavigateToResource resource="blog_posts" />
                      }
                  />
                  <Route path="blog-posts">
                    <Route index element={<MuiInferencer />} />
                    <Route
                        path="show/:id"
                        element={<MuiInferencer />}
                    />
                    <Route
                        path="edit/:id"
                        element={<MuiInferencer />}
                    />
                    <Route
                        path="create"
                        element={<MuiInferencer />}
                    />
                  </Route>
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
              </Routes>
              <UnsavedChangesNotifier />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
