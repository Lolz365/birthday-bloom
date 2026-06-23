/**
 * 🌸 BIRTHDAY BLOOM - APP CORE
 * Authored by: NABORAJ SARKAR
 */

import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { SparkleEffect } from "./components/birthday/SparkleEffect";
import { CelebrationOverlay } from "./components/birthday/CelebrationOverlay";
import { PartyElements } from "./components/birthday/PartyElements";
import { ErrorBoundary } from "./components/ErrorBoundary";

const App = () => (
  <ErrorBoundary>
    <TooltipProvider>
      <Sonner />
      <SparkleEffect />
      <PartyElements />
      <CelebrationOverlay />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </ErrorBoundary>
);

export default App;
