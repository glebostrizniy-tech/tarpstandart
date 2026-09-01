import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import { useEffect } from 'react';
import Home from '@/pages/Home';
import MaterialPage from '@/pages/MaterialPage';
import EquipmentPage from '@/pages/EquipmentPage';
import ManufacturerPage from '@/pages/ManufacturerPage';
import LegalPage from '@/pages/LegalPage';

const queryClient = new QueryClient();

function ScrollToPageTop() {
  const [location] = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash) {
      window.setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ block: "start" });
      }, 50);
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/materialy/:slug" component={MaterialPage} />
      <Route path="/oborudovanie" component={EquipmentPage} />
      <Route path="/proizvoditeli/:slug" component={ManufacturerPage} />
      <Route path="/politika-konfidencialnosti" component={LegalPage} />
      <Route path="/sbor-dannyh" component={LegalPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <ScrollToPageTop />
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
