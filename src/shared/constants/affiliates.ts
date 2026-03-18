/**
 * Affiliate configuration and URL builders
 */

export const GET_YOUR_GUIDE = {
  partnerId: 'YTNRNDJ',

  buildDeepLink: (gygUrl: string, campaign: string) => {
    const sep = gygUrl.includes('?') ? '&' : '?';
    return `${gygUrl}${sep}partner_id=YTNRNDJ&utm_medium=online_publisher&utm_source=algarve-newsletter&cmp=${campaign}`;
  },

  buildSearchLink: (query: string, campaign: string) => {
    const params = new URLSearchParams({
      q: query,
      partner_id: 'YTNRNDJ',
      utm_medium: 'online_publisher',
      utm_source: 'algarve-newsletter',
      cmp: campaign,
    });
    return `https://www.getyourguide.com/algarve-l66/s/?${params}`;
  },
};

export const DISCOVER_CARS = {
  baseUrl: 'https://www.discovercars.com/portugal/faro',
  affiliateId: 'Algarve-Newsletter',

  /**
   * Build affiliate link with tracking parameters
   */
  buildLink: (source: string, medium: string = 'affiliate') => {
    const params = new URLSearchParams({
      a_aid: 'Algarve-Newsletter',
      utm_source: 'algarve-newsletter',
      utm_medium: medium,
      utm_content: source,
    });
    return `https://www.discovercars.com/portugal/faro?${params.toString()}`;
  },

  /**
   * Widget configuration matching site colors
   */
  widgetConfig: {
    location: 'portugal/algarve',
    lang: 'en',
    currency: 'eur',
    // Customized to match site teal color scheme
    formBgColor: '#f1f5f9',      // slate-100
    submitBgColor: '#006D77',    // site primary teal
    submitFontColor: '#ffffff',  // white
    titleColor: '#0f172a',       // slate-900
  },
};
