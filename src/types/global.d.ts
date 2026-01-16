declare global {
  interface Window {
    GYG?: {
      Widget?: {
        init: () => void;
      };
    };
  }
}

export {};
