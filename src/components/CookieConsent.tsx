import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Cookie } from "lucide-react";
import { Link } from "react-router-dom";

export const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
  };

  const denyCookies = () => {
    localStorage.setItem('cookie-consent', 'denied');
    setShowBanner(false);
  };

  const closeBanner = () => {
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Cookie className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-card-foreground mb-1">Folosim cookie-uri</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Acest site folosește cookie-uri pentru a îmbunătăți experiența dumneavoastră de navigare și pentru a analiza traficul. 
                Prin continuarea navigării, sunteți de acord cu utilizarea cookie-urilor.{" "}
                <Link 
                  to="/cookies" 
                  className="text-primary hover:text-primary/80 underline"
                >
                  Aflați mai multe
                </Link>
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={denyCookies}
              className="flex-1 md:flex-none"
            >
              Refuz
            </Button>
            <Button
              size="sm"
              onClick={acceptCookies}
              className="flex-1 md:flex-none"
            >
              Accept
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={closeBanner}
              className="p-2"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};