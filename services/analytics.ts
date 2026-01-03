export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};

export const trackLead = (source: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        // Standard GA4 event for generating a lead
        (window as any).gtag('event', 'generate_lead', {
            currency: 'EUR', // Optional, but good practice
            value: 0,
            source: source
        });

        // Also track as a custom event if needed for specific goals
        (window as any).gtag('event', 'lead_submission', {
            source: source
        });
    }
};
