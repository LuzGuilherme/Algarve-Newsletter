// Sales page for "Algarve Ready-to-Go Trips" (routes /trips and /pt/roteiros).
//
// Every figure and claim below is taken from the book itself: the edition note
// (p. 2), "How to use these trips" (pp. 4-5), the "Choose your trip" grid,
// "Last checked" (p. 183) and the trips' own pages. Do not add numbers,
// reviews or promises that the book does not make. In particular, the facts
// were read ONLINE: do not claim visits or phone calls.
//
// The trip list (src/trips/data/trips.json) and every image in public/trips/
// are generated from the assembled books by guia/gumroad-trips/make_assets.py.

export type Lang = 'en' | 'pt';

export const TRIPS = {
    // Gumroad links. "?wanted=true" opens the checkout with the product in the basket.
    // Both products deliver the same two files: the English and the Portuguese edition.
    checkoutUrl: 'https://shop.algarvenewsletter.pt/l/algarve-ready-to-go-trips?wanted=true',
    ptCheckoutUrl: 'https://shop.algarvenewsletter.pt/l/algarve-roteiros-prontos?wanted=true',
    price: '€9.99',
    pricePt: '9,99 €',
    // The bundle with The Whole Algarve (four books' worth of files: both guides, both languages).
    bundleUrl: 'https://shop.algarvenewsletter.pt/l/whole-algarve-and-trips?wanted=true',
    ptBundleUrl: 'https://shop.algarvenewsletter.pt/l/algarve-inteiro-e-roteiros?wanted=true',
    bundlePrice: '€19.99',
    bundlePricePt: '19,99 €',
    // What the two bought apart would cost (The Whole Algarve is €14.99).
    bundleApart: '€24.98',
    bundleApartPt: '24,98 €',
    // The free trip: the book's cover and Trip 3 (Lagos), pp. 26-32 of the book.
    samplePdf: '/trips/algarve-ready-to-go-trips-sample.pdf',
    samplePdfPt: '/trips/algarve-roteiros-prontos-amostra.pdf',
    cover: '/trips/cover.jpg',
    ptCover: '/trips/pt-cover.jpg',
};

export const checkoutFor = (lang: Lang) => (lang === 'pt' ? TRIPS.ptCheckoutUrl : TRIPS.checkoutUrl);
export const bundleFor = (lang: Lang) => (lang === 'pt' ? TRIPS.ptBundleUrl : TRIPS.bundleUrl);
export const sampleFor = (lang: Lang) => (lang === 'pt' ? TRIPS.samplePdfPt : TRIPS.samplePdf);
export const coverFor = (lang: Lang) => (lang === 'pt' ? TRIPS.ptCover : TRIPS.cover);
export const pageSrc = (name: string, lang: Lang) => `/trips/${lang === 'pt' ? 'pt-' : ''}page-${name}.jpg`;
export const cardSrc = (n: number, lang: Lang) => `/trips/cards/${lang === 'pt' ? 'pt-' : ''}${String(n).padStart(2, '0')}.jpg`;

// The pages in the flipbook, in this order (book page in brackets).
export const PAGES = [
    { name: 'trip-cover', en: 'Trip 3 opens: the day at a glance', pt: 'Abre o roteiro 3: o dia num relance' },
    { name: 'trip-day', en: 'The day on one page: map and timetable', pt: 'O dia numa página: mapa e horário' },
    { name: 'trip-when', en: 'When it works: days and months', pt: 'Quando funciona: dias e meses' },
    { name: 'trip-stops', en: 'Stop by stop: why go, the facts, a tip', pt: 'Paragem a paragem: porquê ir, os factos, uma dica' },
    { name: 'trip-costs', en: 'Costs, sunsets, Plan B and the sources', pt: 'Custos, pôr do sol, Plano B e as fontes' },
    { name: 'choose', en: 'Choose your trip', pt: 'Escolhe o teu roteiro' },
    { name: 'months', en: 'Which months work', pt: 'Que meses funcionam' },
    { name: 'week', en: 'The week, with a car', pt: 'A semana, de carro' },
];

export type Filter = 'all' | 'nocar' | 'sunday' | 'winter' | 'rain' | 'kids';

interface Copy {
    path: string;
    otherPath: string;
    otherLabel: string;
    htmlLang: string;
    title: string;
    titleA: string;
    titleB: string;
    titleC: string;
    metaTitle: string;
    metaDescription: string;
    kicker: string;
    subtitle: string;
    lead: string;
    languageNote: string;
    buy: string;
    buyShort: string;
    buyMicro: string;
    stickyNote: string;
    proof: string;
    sample: string;
    stats: { n: string; l: string }[];
    painKicker: string;
    painTitle: string;
    painLead: string;
    pains: { t: string; d: string; trip: string }[];
    painEnd: string;
    howKicker: string;
    howTitle: string;
    howLead: string;
    how: { p: string; t: string; d: string }[];
    extrasTitle: string;
    extras: { t: string; d: string }[];
    chooseKicker: string;
    chooseTitle: string;
    chooseLead: string;
    filters: { key: Filter; label: string }[];
    parts: Record<string, string>;
    tripWord: string;
    pageWord: string;
    bestDays: string;
    noMatch: string;
    lookKicker: string;
    lookTitle: string;
    lookLead: string;
    flipHint: string;
    flipCover: string;
    flipEndTitle: string;
    flipEndText: string;
    flipPrev: string;
    flipNext: string;
    freeKicker: string;
    freeTitle: string;
    freeText: string;
    freeCta: string;
    freeMicro: string;
    trustKicker: string;
    trustTitle: string;
    trust: { t: string; d: string }[];
    trustQuote: string;
    vsKicker: string;
    vsTitle: string;
    vsLead: string;
    vsTrips: { t: string; s: string; d: string[] };
    vsGuide: { t: string; s: string; d: string[] };
    getKicker: string;
    priceTitle: string;
    priceKicker: string;
    priceNote: string;
    perBuy: string;
    includes: string[];
    bundleKicker: string;
    bundleTitle: string;
    bundleText: string;
    bundleApartLabel: string;
    bundleCta: string;
    bonusKicker: string;
    bonusTitle: string;
    bonusText: string;
    bonusFine: string;
    faqTitle: string;
    faq: { q: string; a: string }[];
    finalTitle: string;
    finalLead: string;
    credits: string;
}

export const COPY: Record<Lang, Copy> = {
    en: {
        path: '/trips',
        otherPath: '/pt/roteiros',
        otherLabel: 'Português',
        htmlLang: 'en',
        title: 'Algarve Ready-to-Go Trips',
        titleA: 'Algarve',
        titleB: 'Ready-to-Go',
        titleC: 'Trips',
        metaTitle: 'Algarve Ready-to-Go Trips · Edition 2027 · 21 trips, already planned',
        metaDescription:
            'Fourteen full days, three weekends, a week and three themed days, from Aljezur to Alcoutim. Every hour, price and closing day checked. PDF, in English and Portuguese.',
        kicker: 'Edition 2027 · by Algarve Newsletter',
        subtitle: 'The trips you would plan for a friend, already done.',
        lead: 'Twenty-one days, weekends and a week, from Aljezur to Alcoutim. Where to go, in what order and at what time, what it costs, and what to do when something is shut. Every hour and closing day checked.',
        languageNote: 'In English · the Portuguese edition is included',
        buy: 'Get the trips',
        buyShort: 'Get it',
        buyMicro: 'PDF · yours as soon as you pay · English and Portuguese',
        stickyNote: '21 trips · PDF · English and Portuguese',
        proof: 'From the people behind Algarve Newsletter and The Whole Algarve, the guide these trips are built from.',
        sample: 'Read a whole trip free',
        stats: [
            { n: '21', l: 'trips' },
            { n: '14', l: 'full days' },
            { n: '3', l: 'weekends' },
            { n: '103', l: 'places' },
            { n: '188', l: 'pages' },
        ],
        painKicker: 'Why plan it in advance',
        painTitle: 'A day in the Algarve goes wrong in small ways.',
        painLead:
            'Nothing dramatic. A boat that stopped running last month, a lunch place shut on the one day you came, a ticket office that closed before you got back. You find out when you get there. These trips found out first.',
        pains: [
            {
                t: 'The boat that stops in October',
                d: 'The boat across to Praia da Fábrica runs from March to October. The trip gives you a winter timetable that works without it.',
                trip: 'Trip 12 · Castro Marim and Cacela Velha',
            },
            {
                t: 'The ticket office that shuts at 16:30',
                d: 'At weekends the station ticket offices close early: Olhão at 16:30, Tavira at 17:15. The trip tells you to buy the evening return before.',
                trip: 'The Ria Formosa weekend',
            },
            {
                t: 'The Monday that doesn’t work',
                d: 'The day for small children in Lagos works Monday to Saturday, but not on Mondays from October to March. The grid shows it before you choose the day.',
                trip: 'Trip 25 · With children, 3 to 8',
            },
            {
                t: 'The restaurant closed for the winter',
                d: 'Before each day was written, its restaurants were looked up. Several from our own guide had closed, for the season or for good, and the day was planned around another.',
                trip: 'Found while writing the book',
            },
        ],
        painEnd: 'Hours change, so the book still says: check before you go. But you will know what to check.',
        howKicker: 'How a trip works',
        howTitle: 'Seven pages. One day. Nothing left to plan.',
        howLead: 'A full day always has seven pages, in the same order. Read the first page and you know whether the day is for you.',
        how: [
            { p: 'p. 1', t: 'The trip at a glance', d: 'The hours, the time at the wheel, the cost and the best days.' },
            { p: 'p. 2', t: 'The day on one page', d: 'The map and the timetable, hour by hour.' },
            { p: 'p. 3', t: 'When it works', d: 'The days of the week and the twelve months, one row for each place that opens and shuts.' },
            { p: 'pp. 4–6', t: 'Stop by stop', d: 'Why go, the facts that matter, and a tip.' },
            { p: 'p. 7', t: 'Costs, sunsets and Plan B', d: 'What the day costs a head, sunset month by month, what to do when something is shut or it rains, and the sources.' },
        ],
        extrasTitle: 'Little things that save the day',
        extras: [
            { t: 'Two timetables', d: 'When the day changes with the season, the tide, the boats or the weather, the timetable has two columns, and the times add up in both.' },
            { t: '“Map ↗” on every stop', d: 'Tap it in the PDF and the place opens in Google Maps.' },
            { t: 'A Plan B, always', d: 'For the day something is shut, for rain and for the season: where the day changes and what to do instead.' },
            { t: 'Verdicts you can trust', d: 'The ◆◆◆, ◆◆ and ◆ beside a stop are those of The Whole Algarve: worth the trip, worth a detour, if you’re nearby.' },
        ],
        chooseKicker: 'Choose your trip',
        chooseTitle: 'Twenty-one trips. Pick by the day you have.',
        chooseLead: 'Every filter uses what the trip itself says: the days it works, the months, and whether it needs a car.',
        filters: [
            { key: 'all', label: 'All 21' },
            { key: 'nocar', label: 'No car' },
            { key: 'sunday', label: 'Works on a Sunday' },
            { key: 'winter', label: 'December to February' },
            { key: 'rain', label: 'When it rains' },
            { key: 'kids', label: 'With children, 3 to 8' },
        ],
        parts: { days: 'Full days', weekends: 'Weekends', week: 'The week', themed: 'Themed days' },
        tripWord: 'Trip',
        pageWord: 'p.',
        bestDays: 'Best',
        noMatch: 'No trip in this book is made for that.',
        lookKicker: 'Look inside',
        lookTitle: 'Judge it by its pages.',
        lookLead: 'Turn eight pages as they are in the book: a whole day in Lagos, then the pages that help you choose. Every photograph is licensed and credited beside it.',
        flipHint: 'Click a page to turn it',
        flipCover: 'The cover',
        flipEndTitle: '180 more pages where these came from.',
        flipEndText: 'Trip 3 is free to read in full, below.',
        flipPrev: 'Previous pages',
        flipNext: 'Next pages',
        freeKicker: 'Try one first',
        freeTitle: 'A whole day in Lagos, free.',
        freeText:
            'Trip 3, “The point before the boats”: the cliff path to the Ponta da Piedade, grilled fish in the old town, the church inside the museum and the long beach. A day on foot, no car. All seven pages, exactly as in the book.',
        freeCta: 'Download Trip 3 (PDF)',
        freeMicro: 'No email needed. 8 pages, with the book’s cover.',
        trustKicker: 'What “checked” means',
        trustTitle: 'Every hour has a source.',
        trust: [
            { t: 'Read, then printed', d: 'Every hour, price, closing day and season in the book comes from a source we read, between 30 September and 22 November 2026.' },
            { t: 'Named on the last page', d: 'Each trip ends with “Last checked”: which sources, and on which day. Page 183 gives every trip’s dates.' },
            { t: 'Honest when unsure', d: 'When only one unofficial source gives a fact, the page says whose it is (“says its Google listing”). When a time could not be confirmed, it says “check”, or we changed the place.' },
            { t: 'Read a second time', d: 'Each trip was then re-read against its sources by a separate checker, line by line, before it went into the book.' },
        ],
        trustQuote: 'Hours change: check before you go. That line is in the book too.',
        vsKicker: 'This one, or the big one?',
        vsTitle: 'Two books, two ways to see the Algarve.',
        vsLead: 'The trips are built from The Whole Algarve, and each one ends with “Go deeper”: the chapters of the guide to read next.',
        vsTrips: {
            t: 'Ready-to-Go Trips',
            s: 'You want the day planned',
            d: ['21 days, weekends and a week', 'Where, in what order, at what time', '188 pages: you read only the trip you chose'],
        },
        vsGuide: {
            t: 'The Whole Algarve',
            s: 'You want to know everything',
            d: ['All sixteen municipalities, all twelve months', 'Beaches, tables and places, each with a verdict', '1,535 pages, and eight chapters on living here'],
        },
        getKicker: 'What you get',
        priceTitle: 'Algarve Ready-to-Go Trips',
        priceKicker: 'Edition 2027',
        priceNote: 'One price',
        perBuy: 'Both editions, one purchase.',
        includes: [
            'All 21 trips in one PDF of 188 A5 pages, with a clickable table of contents',
            'Both editions in one purchase: English, and Portuguese (Algarve: Roteiros Prontos)',
            '14 full days, 3 weekends, a week with a car and 3 themed days',
            'A map and an hour-by-hour timetable for every day',
            '“Map ↗” on every stop, to open it in Google Maps',
            'A Plan B in every trip, for the day something is shut',
            'The year at a glance, and an index of 103 places',
            'A code for one free month of Algarve Atlas Premium',
        ],
        bundleKicker: 'Better together',
        bundleTitle: 'Add The Whole Algarve',
        bundleText: 'The trips tell you what to do on Tuesday. The guide tells you everything else. Both books, both languages, one purchase.',
        bundleApartLabel: 'apart',
        bundleCta: 'Get both',
        bonusKicker: 'Included',
        bonusTitle: 'One month of Algarve Atlas Premium, free',
        bonusText: 'Many festivals had no 2027 date when this edition closed. Algarve Atlas, our events site, adds them as they are announced. The book carries a code for a free month of its Premium tier.',
        bonusFine: 'For new subscribers. After the free month, Premium renews at the normal price (€2.99 a month in October 2026) until you cancel. The calendar itself is free.',
        faqTitle: 'Before you buy',
        faq: [
            {
                q: 'What exactly do I get?',
                a: 'Two PDFs: the English edition, Algarve Ready-to-Go Trips, and the Portuguese one, Algarve: Roteiros Prontos. Each has 188 A5 pages and all 21 trips. They are yours to keep.',
            },
            {
                q: 'Can I use it on my phone?',
                a: 'Yes. It is an A5 PDF: it reads well on a tablet, works on a phone, and prints on any home printer. “Map ↗” opens each stop in Google Maps.',
            },
            {
                q: 'Do I need a car?',
                a: 'For some trips. Six full days need no car at all, three trips work partly without one, and the “Choose your trip” grid says which is which.',
            },
            {
                q: 'How up to date is it?',
                a: 'The facts were read between 30 September and 22 November 2026, and each trip prints its own dates. Prices are those published at the time. Hours change, so check before you go.',
            },
            {
                q: 'I already have The Whole Algarve. Do I need this?',
                a: 'The guide tells you what is worth your time; the trips put it in order, with the hours, the costs and a Plan B. Every trip points back to the chapters of the guide it comes from.',
            },
            {
                q: 'Is there an EPUB or a printed book?',
                a: 'No. It is a book of fixed pages, maps and grids, and an EPUB would break them. The PDF prints well if you want paper.',
            },
            {
                q: 'What if I find a mistake?',
                a: 'Write to hello@algarvenewsletter.pt. We check it and correct it.',
            },
        ],
        finalTitle: 'Your next free day, already planned.',
        finalLead: 'Twenty-one trips, from Aljezur to Alcoutim.',
        credits:
            'Cover photographs: Praia da Marinha from the cliff top, by Mike Finn, CC BY 4.0; Tavira from the castle, by Alexkom000, CC BY 4.0. Photographs on the sample pages are credited on the pages themselves. Maps © OpenStreetMap contributors (ODbL).',
    },
    pt: {
        path: '/pt/roteiros',
        otherPath: '/trips',
        otherLabel: 'English',
        htmlLang: 'pt-PT',
        title: 'Algarve: Roteiros Prontos',
        titleA: 'Algarve:',
        titleB: 'Roteiros',
        titleC: 'Prontos',
        metaTitle: 'Algarve: Roteiros Prontos · Edição 2027 · 21 roteiros já planeados',
        metaDescription:
            'Catorze dias inteiros, três fins de semana, uma semana e três dias temáticos, de Aljezur a Alcoutim. Cada horário, preço e dia de fecho verificado. PDF, em português e em inglês.',
        kicker: 'Edição 2027 · pela Algarve Newsletter',
        subtitle: 'Os passeios que planearias para um amigo, já feitos.',
        lead: 'Vinte e um dias, fins de semana e uma semana, de Aljezur a Alcoutim. Aonde ir, por que ordem e a que horas, quanto custa e o que fazer quando alguma coisa está fechada. Cada horário e dia de fecho verificado.',
        languageNote: 'Em português · a edição inglesa vem incluída',
        buy: 'Comprar os roteiros',
        buyShort: 'Comprar',
        buyMicro: 'PDF · ficas com ele assim que pagares · português e inglês',
        stickyNote: '21 roteiros · PDF · português e inglês',
        proof: 'De quem faz a Algarve Newsletter e O Algarve Inteiro, o guia de onde estes roteiros saem.',
        sample: 'Lê um roteiro inteiro grátis',
        stats: [
            { n: '21', l: 'roteiros' },
            { n: '14', l: 'dias inteiros' },
            { n: '3', l: 'fins de semana' },
            { n: '103', l: 'lugares' },
            { n: '188', l: 'páginas' },
        ],
        painKicker: 'Porquê planear antes',
        painTitle: 'Um dia no Algarve estraga-se com pequenas coisas.',
        painLead:
            'Nada de dramático. Um barco que deixou de andar no mês passado, o restaurante fechado no único dia em que lá foste, uma bilheteira que fechou antes de voltares. Descobres quando chegas. Estes roteiros descobriram primeiro.',
        pains: [
            {
                t: 'O barco que pára em outubro',
                d: 'O barco para a Praia da Fábrica anda de março a outubro. O roteiro dá-te um horário de inverno que funciona sem ele.',
                trip: 'Roteiro 12 · Castro Marim e Cacela Velha',
            },
            {
                t: 'A bilheteira que fecha às 16:30',
                d: 'Ao fim de semana as bilheteiras das estações fecham cedo: Olhão às 16:30, Tavira às 17:15. O roteiro diz-te para comprares antes o regresso da tarde.',
                trip: 'O fim de semana da Ria Formosa',
            },
            {
                t: 'A segunda-feira que não dá',
                d: 'O dia para crianças pequenas em Lagos funciona de segunda a sábado, mas não à segunda de outubro a março. A grelha mostra-o antes de escolheres o dia.',
                trip: 'Roteiro 25 · Com crianças dos 3 aos 8',
            },
            {
                t: 'O restaurante fechado para o inverno',
                d: 'Antes de escrever cada dia, procurámos os seus restaurantes. Vários do nosso próprio guia tinham fechado, para a época ou de vez, e o dia foi planeado à volta de outro.',
                trip: 'Descoberto ao escrever o livro',
            },
        ],
        painEnd: 'Os horários mudam, por isso o livro continua a dizer: confirma antes de ir. Mas vais saber o que confirmar.',
        howKicker: 'Como é um roteiro',
        howTitle: 'Sete páginas. Um dia. Nada por planear.',
        howLead: 'Um dia inteiro tem sempre sete páginas, pela mesma ordem. Lês a primeira e sabes se o dia é para ti.',
        how: [
            { p: 'p. 1', t: 'O roteiro num relance', d: 'As horas, o tempo ao volante, o custo e os melhores dias.' },
            { p: 'p. 2', t: 'O dia numa página', d: 'O mapa e o horário, hora a hora.' },
            { p: 'p. 3', t: 'Quando funciona', d: 'Os dias da semana e os doze meses, uma linha para cada sítio que abre e fecha.' },
            { p: 'pp. 4–6', t: 'Paragem a paragem', d: 'Porquê ir, os factos que contam e uma dica.' },
            { p: 'p. 7', t: 'Custos, pôr do sol e Plano B', d: 'Quanto custa o dia por pessoa, o pôr do sol mês a mês, o que fazer quando alguma coisa está fechada ou chove, e as fontes.' },
        ],
        extrasTitle: 'Pequenas coisas que salvam o dia',
        extras: [
            { t: 'Dois horários', d: 'Quando o dia muda com a estação, a maré, os barcos ou o tempo, o horário tem duas colunas, e as horas batem certo nas duas.' },
            { t: '«Mapa ↗» em cada paragem', d: 'Toca-lhe no PDF e o lugar abre no Google Maps.' },
            { t: 'Um Plano B, sempre', d: 'Para o dia em que alguma coisa fecha, para a chuva e para a época: onde o dia muda e o que fazer em vez disso.' },
            { t: 'Veredictos de confiança', d: 'Os ◆◆◆, ◆◆ e ◆ ao lado de uma paragem são os de O Algarve Inteiro: vale a viagem, vale o desvio, se estiveres perto.' },
        ],
        chooseKicker: 'Escolhe o teu roteiro',
        chooseTitle: 'Vinte e um roteiros. Escolhe pelo dia que tens.',
        chooseLead: 'Cada filtro usa o que o próprio roteiro diz: os dias em que funciona, os meses e se precisa de carro.',
        filters: [
            { key: 'all', label: 'Os 21' },
            { key: 'nocar', label: 'Sem carro' },
            { key: 'sunday', label: 'Funciona ao domingo' },
            { key: 'winter', label: 'De dezembro a fevereiro' },
            { key: 'rain', label: 'Quando chove' },
            { key: 'kids', label: 'Com crianças dos 3 aos 8' },
        ],
        parts: { days: 'Dias inteiros', weekends: 'Fins de semana', week: 'A semana', themed: 'Dias temáticos' },
        tripWord: 'Roteiro',
        pageWord: 'p.',
        bestDays: 'Melhor',
        noMatch: 'Nenhum roteiro deste livro é feito para isso.',
        lookKicker: 'Espreita por dentro',
        lookTitle: 'Julga-o pelas páginas.',
        lookLead: 'Folheia oito páginas tal como estão no livro: um dia inteiro em Lagos e as páginas que te ajudam a escolher. Todas as fotografias são licenciadas e têm o crédito ao lado.',
        flipHint: 'Clica numa página para a virar',
        flipCover: 'A capa',
        flipEndTitle: 'Há mais 180 páginas como estas.',
        flipEndText: 'O roteiro 3 lê-se inteiro, grátis, aqui em baixo.',
        flipPrev: 'Páginas anteriores',
        flipNext: 'Páginas seguintes',
        freeKicker: 'Experimenta um primeiro',
        freeTitle: 'Um dia inteiro em Lagos, grátis.',
        freeText:
            'O roteiro 3, «A ponta antes dos barcos»: o caminho da falésia até à Ponta da Piedade, peixe grelhado na cidade velha, a igreja dentro do museu e a praia comprida. Um dia a pé, sem carro. As sete páginas, tal como estão no livro.',
        freeCta: 'Descarregar o roteiro 3 (PDF)',
        freeMicro: 'Sem email. 8 páginas, com a capa do livro.',
        trustKicker: 'O que quer dizer «verificado»',
        trustTitle: 'Cada horário tem uma fonte.',
        trust: [
            { t: 'Lido, depois impresso', d: 'Cada horário, preço, dia de fecho e época do livro vem de uma fonte que lemos, entre 30 de setembro e 22 de novembro de 2026.' },
            { t: 'Nomeado na última página', d: 'Cada roteiro fecha com «Última verificação»: que fontes, e em que dia. A página 183 dá as datas de todos.' },
            { t: 'Honesto quando não sabe', d: 'Quando um facto só tem uma fonte não oficial, a página diz de quem é («diz a ficha do Google»). Quando não foi possível confirmar uma hora, diz «confirma», ou trocámos o lugar.' },
            { t: 'Lido uma segunda vez', d: 'Depois, cada roteiro foi relido contra as suas fontes por um verificador à parte, linha a linha, antes de entrar no livro.' },
        ],
        trustQuote: 'Os horários mudam: confirma antes de ir. Essa frase também está no livro.',
        vsKicker: 'Este, ou o grande?',
        vsTitle: 'Dois livros, duas maneiras de ver o Algarve.',
        vsLead: 'Os roteiros saem de O Algarve Inteiro, e cada um fecha com «Para ir mais fundo»: os capítulos do guia a ler a seguir.',
        vsTrips: {
            t: 'Roteiros Prontos',
            s: 'Queres o dia planeado',
            d: ['21 dias, fins de semana e uma semana', 'Aonde, por que ordem, a que horas', '188 páginas: só lês o roteiro que escolheste'],
        },
        vsGuide: {
            t: 'O Algarve Inteiro',
            s: 'Queres saber tudo',
            d: ['Os dezasseis concelhos, os doze meses', 'Praias, mesas e lugares, cada um com veredicto', '1535 páginas, e oito capítulos sobre viver cá'],
        },
        getKicker: 'O que levas',
        priceTitle: 'Algarve: Roteiros Prontos',
        priceKicker: 'Edição 2027',
        priceNote: 'Um só preço',
        perBuy: 'As duas edições, uma só compra.',
        includes: [
            'Os 21 roteiros num PDF de 188 páginas A5, com índice clicável',
            'As duas edições numa só compra: a portuguesa e a inglesa (Algarve Ready-to-Go Trips)',
            '14 dias inteiros, 3 fins de semana, uma semana de carro e 3 dias temáticos',
            'Um mapa e um horário hora a hora para cada dia',
            '«Mapa ↗» em cada paragem, para a abrir no Google Maps',
            'Um Plano B em cada roteiro, para o dia em que alguma coisa fecha',
            'O ano num relance, e um índice de 103 lugares',
            'Um código para um mês grátis de Algarve Atlas Premium',
        ],
        bundleKicker: 'Melhor juntos',
        bundleTitle: 'Junta O Algarve Inteiro',
        bundleText: 'Os roteiros dizem-te o que fazer na terça-feira. O guia diz-te o resto. Os dois livros, nas duas línguas, numa só compra.',
        bundleApartLabel: 'em separado',
        bundleCta: 'Comprar os dois',
        bonusKicker: 'Incluído',
        bonusTitle: 'Um mês de Algarve Atlas Premium, grátis',
        bonusText: 'Muitas festas não tinham data de 2027 quando fechámos esta edição. O Algarve Atlas, o nosso site de eventos, acrescenta-as à medida que são anunciadas. O livro traz um código para um mês grátis do plano Premium.',
        bonusFine: 'Para novos subscritores. Depois do mês grátis, o Premium renova ao preço normal (2,99 € por mês em outubro de 2026) até cancelares. O calendário em si é grátis.',
        faqTitle: 'Antes de comprar',
        faq: [
            {
                q: 'O que recebo, ao certo?',
                a: 'Dois PDF: a edição portuguesa, Algarve: Roteiros Prontos, e a inglesa, Algarve Ready-to-Go Trips. Cada um tem 188 páginas A5 e os 21 roteiros. Ficam contigo.',
            },
            {
                q: 'Dá para usar no telemóvel?',
                a: 'Sim. É um PDF A5: lê-se bem num tablet, funciona no telemóvel e imprime-se em qualquer impressora. O «Mapa ↗» abre cada paragem no Google Maps.',
            },
            {
                q: 'Preciso de carro?',
                a: 'Para alguns roteiros. Seis dias inteiros não precisam de carro nenhum, três roteiros funcionam em parte sem ele, e a grelha «Escolhe o teu roteiro» diz qual é qual.',
            },
            {
                q: 'Está atualizado?',
                a: 'Os factos foram lidos entre 30 de setembro e 22 de novembro de 2026, e cada roteiro imprime as suas datas. Os preços são os publicados nessa altura. Os horários mudam: confirma antes de ir.',
            },
            {
                q: 'Já tenho O Algarve Inteiro. Preciso disto?',
                a: 'O guia diz-te o que vale o teu tempo; os roteiros põem-no por ordem, com as horas, os custos e um Plano B. Cada roteiro remete para os capítulos do guia de onde sai.',
            },
            {
                q: 'Há EPUB ou edição em papel?',
                a: 'Não. É um livro de páginas fixas, mapas e grelhas, e um EPUB desfazia-os. O PDF imprime-se bem, se quiseres papel.',
            },
            {
                q: 'E se encontrar um erro?',
                a: 'Escreve para hello@algarvenewsletter.pt. Verificamos e corrigimos.',
            },
        ],
        finalTitle: 'O teu próximo dia livre, já planeado.',
        finalLead: 'Vinte e um roteiros, de Aljezur a Alcoutim.',
        credits:
            'Fotografias da capa: a Praia da Marinha vista do alto da falésia, de Mike Finn, CC BY 4.0; Tavira vista do castelo, de Alexkom000, CC BY 4.0. As fotografias das páginas de amostra têm o crédito nas próprias páginas. Mapas © contribuidores do OpenStreetMap (ODbL).',
    },
};
