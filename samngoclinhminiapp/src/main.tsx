import React from "react";
import { createRoot } from "react-dom/client";

import "@/css/tailwind.scss";
import "@/css/app.scss";

import AppShell from "@/app-shell";

const root = createRoot(document.getElementById("app")!);
root.render(
  <React.StrictMode>
    <AppShell />
  </React.StrictMode>
);