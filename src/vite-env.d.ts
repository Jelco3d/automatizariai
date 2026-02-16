/// <reference types="vite/client" />

interface Window {
  fbq: (...args: unknown[]) => void;
}

declare function fbq(...args: unknown[]): void;
