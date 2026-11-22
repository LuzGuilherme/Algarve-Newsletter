// Sales page for "Algarve Ready-to-Go Trips" (routes /trips and /pt/roteiros).
//
// Every figure and claim below is taken from the book itself: the edition note
// (p. 2), "How to use these trips" (pp. 4-5), the "Choose your trip" grid,
// "Last checked" (p. 183) and the trips' own pages. Do not add numbers,
// reviews or promises that the book does not make. The checks on the ground and
// by phone are as stated by the author on 2026-11-22.
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
    // The bundle with The Whole Algarve (both books, both languages).
    bundleUrl: 'https://shop.algarvenewsletter.pt/l/whole-algarve-and-trips?wanted=true',
    ptBundleUrl: 'https://shop.algarvenewsletter.pt/l/algarve-inteiro-e-roteiros?wanted=true',
    bundlePrice: '€19.99',
    bundlePricePt: '19,99 €',
    // What the two bought apart would cost (The Whole Algarve is €14.99).
    bundleApart: '€24.98',
    bundleApartPt: '24,98 €',
    cover: '/trips/cover.jpg',
    ptCover: '/trips/pt-cover.jpg',
};

export const checkoutFor = (lang: Lang) => (lang === 'pt' ? TRIPS.ptCheckoutUrl : TRIPS.checkoutUrl);
export const bundleFor = (lang: Lang) => (lang === 'pt' ? TRIPS.ptBundleUrl : TRIPS.bundleUrl);
export const coverFor = (lang: Lang) => (lang === 'pt' ? TRIPS.ptCover : TRIPS.cover);
export const pageSrc = (name: string, lang: Lang) => `/trips/${lang === 'pt' ? 'pt-' : ''}page-${name}.jpg`;
export const cardSrc = (n: number, lang: Lang) => `/trips/cards/${lang === 'pt' ? 'pt-' : ''}${String(n).padStart(2, '0')}.jpg`;

// The pages in the flipbook, in this order (book pages 26, 27, 28, 29, 32, 6, 10, 147).
export const PAGES = [
    { name: 'trip-cover', en: 'Trip 3: the day at a glance', pt: 'Roteiro 3: o dia num relance' },
    { name: 'trip-day', en: 'The day on one page: map and timetable', pt: 'O dia numa página: mapa e horário' },
    { name: 'trip-when', en: 'When it works: days and months', pt: 'Quando funciona: dias e meses' },
    { name: 'trip-stops', en: 'Stop by stop', pt: 'Paragem a paragem' },
    { name: 'trip-costs', en: 'Costs, sunset and Plan B', pt: 'Custos, pôr do sol e Plano B' },
    { name: 'choose', en: 'Choosing your trip', pt: 'Escolher o roteiro' },
    { name: 'months', en: 'Which months work', pt: 'Que meses funcionam' },
    { name: 'week', en: 'The week, by car', pt: 'A semana, de carro' },
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
    look: string;
    stamp: string;
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
    ctaKicker: string;
    ctaTitle: string;
    ctaText: string;
    ctaBundle: string;
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
        metaTitle: 'Algarve Ready-to-Go Trips · Edition 2027 · 21 trips planned hour by hour',
        metaDescription:
            'Day trips, weekends and a full week across the Algarve, from Aljezur to Alcoutim, planned hour by hour and checked. PDF in English and Portuguese.',
        kicker: 'Edition 2027 · by Algarve Newsletter',
        subtitle: 'Pick a trip. The planning’s done.',
        lead: 'Day trips, weekends and a full week across the Algarve, each planned hour by hour: where to go, in what order, where to eat, what it costs, and what to do if something’s shut. Every opening time was checked before it went in the book.',
        languageNote: 'English and Portuguese editions included',
        buy: 'Get the trips',
        buyShort: 'Get it',
        buyMicro: 'PDF · instant download · English and Portuguese',
        stickyNote: '21 trips · PDF · English and Portuguese',
        proof: 'By Algarve Newsletter, read by more than 2,000 people twice a week, and the makers of The Whole Algarve.',
        look: 'Look inside',
        stamp: 'trips',
        stats: [
            { n: '21', l: 'trips' },
            { n: '14', l: 'day trips' },
            { n: '3', l: 'weekends' },
            { n: '1', l: 'week by car' },
            { n: '103', l: 'places' },
        ],
        painKicker: 'Sound familiar?',
        painTitle: 'It’s the small things that ruin a day out.',
        painLead:
            'You drive across to a restaurant that turns out to be closed that day. The boat you planned around stopped running last month. You only find out when you get there. These trips found out first, so you don’t have to.',
        pains: [
            {
                t: 'The boat that stopped in October',
                d: 'The boat to Praia da Fábrica only runs from March to October. Trip 12 has a second, winter timetable that works without it.',
                trip: 'Trip 12 · Castro Marim and Cacela Velha',
            },
            {
                t: 'The ticket office that shut at 16:30',
                d: 'At weekends the train ticket offices close early: Olhão at 16:30, Tavira at 17:15. The Ria Formosa weekend tells you to buy your return ticket first.',
                trip: 'The Ria Formosa weekend',
            },
            {
                t: 'The Monday that doesn’t work',
                d: 'The day out with small children in Lagos works Monday to Saturday, except Mondays from October to March. You see it on the grid before you pick your day.',
                trip: 'Trip 25 · With children, 3 to 8',
            },
            {
                t: 'The restaurant closed for winter',
                d: 'By the time we wrote the trips, several restaurants from our own guide had closed, for the season or for good. Each day was planned around one that was open when we checked.',
                trip: 'Found while writing the book',
            },
        ],
        painEnd: 'Opening hours still change, so check before you go. But now you’ll know exactly what to check.',
        howKicker: 'Inside each trip',
        howTitle: 'One day, seven pages, nothing left to work out.',
        howLead: 'Every day trip follows the same seven pages. The first one is enough to tell you whether it’s your kind of day.',
        how: [
            { p: 'p. 1', t: 'At a glance', d: 'How long it takes, time at the wheel, cost per person and the best days to go.' },
            { p: 'p. 2', t: 'The day on one page', d: 'The map and the timetable, hour by hour.' },
            { p: 'p. 3', t: 'When it works', d: 'Which days and months it works, place by place.' },
            { p: 'pp. 4–6', t: 'Stop by stop', d: 'Why it’s worth it, what you need to know, and a tip.' },
            { p: 'p. 7', t: 'Costs, sunset and Plan B', d: 'What the day costs per person, sunset month by month, what to do if something’s shut or it rains, and every source.' },
        ],
        extrasTitle: 'The small things that save a day',
        extras: [
            { t: 'Two timetables', d: 'If the day changes with the season, the tide or the boats, you get two columns side by side. Both add up.' },
            { t: '“Map ↗” on every stop', d: 'Tap it in the PDF and Google Maps opens on the spot.' },
            { t: 'Always a Plan B', d: 'For when something’s shut, when it rains, or when the season changes.' },
            { t: 'Our verdicts', d: '◆◆◆ worth the trip, ◆◆ worth a detour, ◆ if you’re nearby. The same verdicts as in The Whole Algarve.' },
        ],
        chooseKicker: '21 trips',
        chooseTitle: 'Pick the trip that fits your day.',
        chooseLead: 'No car? A Sunday? Rain? Filter the trips by what the book itself says about each one.',
        filters: [
            { key: 'all', label: 'All 21' },
            { key: 'nocar', label: 'No car' },
            { key: 'sunday', label: 'On a Sunday' },
            { key: 'winter', label: 'In winter (Dec–Feb)' },
            { key: 'rain', label: 'When it rains' },
            { key: 'kids', label: 'With kids aged 3 to 8' },
        ],
        parts: { days: 'Day trips', weekends: 'Weekends', week: 'The week', themed: 'Themed days' },
        tripWord: 'Trip',
        bestDays: 'Best',
        noMatch: 'No trip in this book is made for that.',
        lookKicker: 'Look inside',
        lookTitle: 'See the pages before you buy.',
        lookLead: 'Flip through eight real pages: a full day in Lagos, then the pages that help you choose. Every photo is licensed and credited.',
        flipHint: 'Click a page to turn it',
        flipCover: 'The cover',
        flipEndTitle: '180 more pages like these.',
        flipEndText: 'All 21 trips, in English and Portuguese, for €9.99.',
        flipPrev: 'Previous pages',
        flipNext: 'Next pages',
        ctaKicker: 'Ready to go?',
        ctaTitle: 'All 21 trips for €9.99.',
        ctaText: 'Day trips, weekends and a full week, from Aljezur to Alcoutim. The English and Portuguese editions, in one purchase.',
        ctaBundle: 'Or get both books for €19.99',
        trustKicker: 'How we checked',
        trustTitle: 'Checked online, on the ground and by phone.',
        trust: [
            {
                t: 'Every fact has a source',
                d: 'Every opening time, price, closing day and season comes from a source read between 30 September and 22 November 2026. The last page of each trip lists them, with dates.',
            },
            { t: 'On the ground and by phone', d: 'We didn’t stop at websites: places were also checked in person and by phone.' },
            {
                t: 'Honest when unsure',
                d: 'If only one unofficial source gives a fact, the page says whose it is. If a time couldn’t be confirmed, it says “check”, or we swapped the place.',
            },
            { t: 'Read twice', d: 'Before it went into the book, every trip was re-read line by line against its sources.' },
        ],
        trustQuote: 'Opening hours do change, though. So the book still says: check before you go.',
        vsKicker: 'Which book is for you?',
        vsTitle: 'Two books. Use one, or both.',
        vsLead: 'The trips are built from The Whole Algarve. Each one ends with “Go deeper”, pointing you to the chapters to read next.',
        vsTrips: {
            t: 'Ready-to-Go Trips',
            s: 'You want the day planned',
            d: ['14 day trips, 3 weekends and a full week', 'Where to go, in what order, at what time', '188 pages: read only the trip you picked'],
        },
        vsGuide: {
            t: 'The Whole Algarve',
            s: 'You want to know everything',
            d: ['All 16 municipalities, all 12 months', 'Beaches, restaurants and places, each with a verdict', '1,535 pages, plus 8 chapters on living here'],
        },
        getKicker: 'Everything you get',
        priceTitle: 'Algarve Ready-to-Go Trips',
        priceKicker: 'Edition 2027',
        priceNote: 'Instant download',
        perBuy: 'English and Portuguese, one purchase.',
        includes: [
            'All 21 trips in one 188-page A5 PDF, with clickable contents',
            'Both editions: English, plus Portuguese (Algarve: Roteiros Prontos)',
            '14 day trips, 3 weekends, a week by car and 3 themed days',
            'A map and an hour-by-hour timetable for every day',
            '“Map ↗” on every stop, straight to Google Maps',
            'A Plan B in every trip for when something’s shut',
            'The year at a glance and an index of 103 places',
            'A code for one free month of Algarve Atlas Premium',
        ],
        bundleKicker: 'Bundle',
        bundleTitle: 'Add The Whole Algarve',
        bundleText: 'The trips plan your days. The guide covers everything else, from beaches to living here. Both books, in English and Portuguese.',
        bundleApartLabel: 'bought separately',
        bundleCta: 'Get both books',
        bonusKicker: 'Included',
        bonusTitle: 'One month of Algarve Atlas Premium, free',
        bonusText: 'Many 2027 festival dates weren’t out when this edition closed. Algarve Atlas, our events site, adds them as they’re announced, and the book includes a code for a free month of Premium.',
        bonusFine: 'For new subscribers. After the free month, Premium renews at the normal price (€2.99 a month in October 2026) until you cancel. The calendar itself is free.',
        faqTitle: 'Before you buy',
        faq: [
            {
                q: 'What exactly do I get?',
                a: 'Two PDFs: Algarve Ready-to-Go Trips in English and Algarve: Roteiros Prontos in Portuguese. Each has 188 A5 pages and all 21 trips. You download them straight after paying, and they’re yours to keep.',
            },
            {
                q: 'Does it work on my phone?',
                a: 'Yes. It’s an A5 PDF, so it reads well on a phone or tablet and prints on any home printer. Tap “Map ↗” and the stop opens in Google Maps.',
            },
            {
                q: 'Do I need a car?',
                a: 'Not for all of them. Six day trips need no car at all, three trips work partly without one, and the trip list shows which is which.',
            },
            {
                q: 'How up to date is it?',
                a: 'Every fact was checked between 30 September and 22 November 2026, and each trip prints its own dates. Prices are the ones published at the time. Opening hours can still change, so check before you go.',
            },
            {
                q: 'I already have The Whole Algarve. Why would I want this?',
                a: 'The guide tells you what’s worth it. The trips put it in order for you: the route, the times, the costs and a Plan B. Each trip points back to the guide chapters it comes from.',
            },
            {
                q: 'Is there an EPUB or a printed book?',
                a: 'No. The book is built on fixed pages, maps and grids, which an EPUB would scramble. If you prefer paper, the PDF prints well.',
            },
            {
                q: 'What if I find a mistake?',
                a: 'Email hello@algarvenewsletter.pt. We’ll check it and fix it.',
            },
        ],
        finalTitle: 'Your next day out, already planned.',
        finalLead: '21 trips, from Aljezur to Alcoutim.',
        credits:
            'Cover photos: Praia da Marinha from the cliff top, by Mike Finn, CC BY 4.0; Tavira from the castle, by Alexkom000, CC BY 4.0. Photos on the book pages shown here are credited on the pages themselves. Maps © OpenStreetMap contributors (ODbL).',
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
        metaTitle: 'Algarve: Roteiros Prontos · Edição 2027 · 21 roteiros planeados hora a hora',
        metaDescription:
            'Passeios de um dia, fins de semana e uma semana pelo Algarve, de Aljezur a Alcoutim, planeados hora a hora e confirmados. PDF em português e inglês.',
        kicker: 'Edição 2027 · pela Algarve Newsletter',
        subtitle: 'Escolhe o roteiro. O resto já está planeado.',
        lead: 'Passeios de um dia, fins de semana e uma semana inteira pelo Algarve, planeados hora a hora: aonde ir, por que ordem, onde comer, quanto custa e o que fazer se alguma coisa estiver fechada. Cada horário foi confirmado antes de entrar no livro.',
        languageNote: 'Inclui as edições em português e inglês',
        buy: 'Comprar os roteiros',
        buyShort: 'Comprar',
        buyMicro: 'PDF · descarregas logo após o pagamento · português e inglês',
        stickyNote: '21 roteiros · PDF · português e inglês',
        proof: 'Da Algarve Newsletter, lida por mais de 2000 pessoas duas vezes por semana, e dos autores de O Algarve Inteiro.',
        look: 'Espreitar por dentro',
        stamp: 'roteiros',
        stats: [
            { n: '21', l: 'roteiros' },
            { n: '14', l: 'passeios de um dia' },
            { n: '3', l: 'fins de semana' },
            { n: '1', l: 'semana de carro' },
            { n: '103', l: 'lugares' },
        ],
        painKicker: 'Já te aconteceu?',
        painTitle: 'O que estraga um passeio são os pormenores.',
        painLead:
            'Atravessas meio Algarve para almoçar e o restaurante está fechado nesse dia. O barco com que contavas deixou de andar no mês passado. Só descobres quando lá chegas. Estes roteiros descobriram antes, para não teres de ser tu.',
        pains: [
            {
                t: 'O barco que deixou de andar em outubro',
                d: 'O barco para a Praia da Fábrica só anda de março a outubro. O roteiro 12 traz um segundo horário, de inverno, que funciona sem ele.',
                trip: 'Roteiro 12 · Castro Marim e Cacela Velha',
            },
            {
                t: 'A bilheteira que fechou às 16:30',
                d: 'Ao fim de semana, as bilheteiras do comboio fecham cedo: Olhão às 16:30, Tavira às 17:15. O fim de semana da Ria Formosa avisa-te para comprares o regresso antes.',
                trip: 'O fim de semana da Ria Formosa',
            },
            {
                t: 'A segunda-feira que não dá',
                d: 'O passeio com crianças pequenas em Lagos funciona de segunda a sábado, menos às segundas de outubro a março. Vês isso na grelha antes de escolheres o dia.',
                trip: 'Roteiro 25 · Com crianças dos 3 aos 8',
            },
            {
                t: 'O restaurante fechado no inverno',
                d: 'Quando escrevemos os roteiros, vários restaurantes do nosso próprio guia tinham fechado, para a época ou de vez. Cada dia foi planeado à volta de um que estava aberto quando confirmámos.',
                trip: 'Descoberto ao escrever o livro',
            },
        ],
        painEnd: 'Os horários continuam a mudar, por isso confirma antes de ir. Mas agora sabes exatamente o que confirmar.',
        howKicker: 'Dentro de cada roteiro',
        howTitle: 'Um dia, sete páginas, nada por resolver.',
        howLead: 'Cada passeio de um dia segue as mesmas sete páginas. Basta a primeira para saberes se é o teu tipo de dia.',
        how: [
            { p: 'p. 1', t: 'Num relance', d: 'Quanto tempo leva, o tempo ao volante, o custo por pessoa e os melhores dias para ir.' },
            { p: 'p. 2', t: 'O dia numa página', d: 'O mapa e o horário, hora a hora.' },
            { p: 'p. 3', t: 'Quando funciona', d: 'Em que dias e meses funciona, lugar a lugar.' },
            { p: 'pp. 4–6', t: 'Paragem a paragem', d: 'Porque vale a pena, o que precisas de saber e uma dica.' },
            { p: 'p. 7', t: 'Custos, pôr do sol e Plano B', d: 'Quanto custa o dia por pessoa, a hora do pôr do sol mês a mês, o que fazer se alguma coisa estiver fechada ou se chover, e todas as fontes.' },
        ],
        extrasTitle: 'Os pormenores que salvam um dia',
        extras: [
            { t: 'Dois horários', d: 'Se o dia muda com a estação, a maré ou os barcos, tens duas colunas lado a lado. As duas batem certo.' },
            { t: '«Mapa ↗» em cada paragem', d: 'Tocas no PDF e o Google Maps abre no sítio certo.' },
            { t: 'Sempre um Plano B', d: 'Para quando alguma coisa está fechada, quando chove ou quando muda a estação.' },
            { t: 'Os nossos veredictos', d: '◆◆◆ vale a viagem, ◆◆ vale o desvio, ◆ se estiveres perto. Os mesmos de O Algarve Inteiro.' },
        ],
        chooseKicker: '21 roteiros',
        chooseTitle: 'Escolhe o roteiro que encaixa no teu dia.',
        chooseLead: 'Sem carro? Ao domingo? Com chuva? Filtra os roteiros pelo que o próprio livro diz de cada um.',
        filters: [
            { key: 'all', label: 'Todos (21)' },
            { key: 'nocar', label: 'Sem carro' },
            { key: 'sunday', label: 'Ao domingo' },
            { key: 'winter', label: 'No inverno (dez.–fev.)' },
            { key: 'rain', label: 'Com chuva' },
            { key: 'kids', label: 'Com crianças dos 3 aos 8' },
        ],
        parts: { days: 'Passeios de um dia', weekends: 'Fins de semana', week: 'A semana', themed: 'Dias temáticos' },
        tripWord: 'Roteiro',
        bestDays: 'Melhor',
        noMatch: 'Nenhum roteiro deste livro é feito para isso.',
        lookKicker: 'Espreita por dentro',
        lookTitle: 'Vê as páginas antes de comprar.',
        lookLead: 'Folheia oito páginas verdadeiras: um dia inteiro em Lagos e as páginas que te ajudam a escolher. Todas as fotografias são licenciadas e têm crédito.',
        flipHint: 'Clica numa página para a virar',
        flipCover: 'A capa',
        flipEndTitle: 'Mais 180 páginas como estas.',
        flipEndText: 'Os 21 roteiros, em português e inglês, por 9,99 €.',
        flipPrev: 'Páginas anteriores',
        flipNext: 'Páginas seguintes',
        ctaKicker: 'Pronto para sair?',
        ctaTitle: 'Os 21 roteiros por 9,99 €.',
        ctaText: 'Passeios de um dia, fins de semana e uma semana inteira, de Aljezur a Alcoutim. As edições em português e inglês, numa só compra.',
        ctaBundle: 'Ou leva os dois livros por 19,99 €',
        trustKicker: 'Como confirmámos',
        trustTitle: 'Confirmado online, no terreno e ao telefone.',
        trust: [
            {
                t: 'Cada facto tem fonte',
                d: 'Cada horário, preço, dia de fecho e época vem de uma fonte lida entre 30 de setembro e 22 de novembro de 2026. A última página de cada roteiro diz quais e quando.',
            },
            { t: 'No terreno e ao telefone', d: 'Não ficámos pelos sites: os lugares também foram confirmados no local e por telefone.' },
            {
                t: 'Honesto quando há dúvidas',
                d: 'Se um facto só tem uma fonte não oficial, a página diz de quem é. Se não foi possível confirmar uma hora, diz «confirma», ou trocámos o lugar.',
            },
            { t: 'Lido duas vezes', d: 'Antes de entrar no livro, cada roteiro foi relido linha a linha contra as suas fontes.' },
        ],
        trustQuote: 'Os horários mudam, claro. Por isso o livro continua a dizer: confirma antes de ir.',
        vsKicker: 'Qual é o teu livro?',
        vsTitle: 'Dois livros. Usa um, ou os dois.',
        vsLead: 'Os roteiros nascem de O Algarve Inteiro, e cada um fecha com «Para ir mais fundo»: os capítulos do guia a ler a seguir.',
        vsTrips: {
            t: 'Roteiros Prontos',
            s: 'Queres o dia já planeado',
            d: ['14 passeios de um dia, 3 fins de semana e uma semana inteira', 'Aonde ir, por que ordem, a que horas', '188 páginas: só lês o roteiro que escolheste'],
        },
        vsGuide: {
            t: 'O Algarve Inteiro',
            s: 'Queres saber tudo',
            d: ['Os 16 concelhos, os 12 meses', 'Praias, restaurantes e lugares, cada um com veredicto', '1535 páginas, mais 8 capítulos sobre viver cá'],
        },
        getKicker: 'Tudo o que levas',
        priceTitle: 'Algarve: Roteiros Prontos',
        priceKicker: 'Edição 2027',
        priceNote: 'Download imediato',
        perBuy: 'Português e inglês, numa só compra.',
        includes: [
            'Os 21 roteiros num PDF A5 de 188 páginas, com índice clicável',
            'As duas edições: português e inglês (Algarve Ready-to-Go Trips)',
            '14 passeios de um dia, 3 fins de semana, uma semana de carro e 3 dias temáticos',
            'Um mapa e um horário hora a hora para cada dia',
            '«Mapa ↗» em cada paragem, direto para o Google Maps',
            'Um Plano B em cada roteiro, para quando alguma coisa está fechada',
            'O ano num relance e um índice de 103 lugares',
            'Um código para um mês grátis de Algarve Atlas Premium',
        ],
        bundleKicker: 'Pacote',
        bundleTitle: 'Junta O Algarve Inteiro',
        bundleText: 'Os roteiros planeiam-te os dias. O guia trata do resto, das praias a viver cá. Os dois livros, em português e inglês.',
        bundleApartLabel: 'em separado',
        bundleCta: 'Quero os dois',
        bonusKicker: 'Incluído',
        bonusTitle: 'Um mês de Algarve Atlas Premium, grátis',
        bonusText: 'Muitas datas de festas de 2027 ainda não eram conhecidas quando fechámos esta edição. O Algarve Atlas, o nosso site de eventos, acrescenta-as à medida que são anunciadas, e o livro traz um código para um mês grátis de Premium.',
        bonusFine: 'Para novos subscritores. Depois do mês grátis, o Premium renova ao preço normal (2,99 € por mês em outubro de 2026) até cancelares. O calendário em si é grátis.',
        faqTitle: 'Antes de comprar',
        faq: [
            {
                q: 'O que recebo, ao certo?',
                a: 'Dois PDF: Algarve: Roteiros Prontos, em português, e Algarve Ready-to-Go Trips, em inglês. Cada um tem 188 páginas A5 e os 21 roteiros. Descarregas logo depois de pagar e ficam teus.',
            },
            {
                q: 'Funciona no telemóvel?',
                a: 'Sim. É um PDF A5: lê-se bem no telemóvel ou no tablet e imprime-se em qualquer impressora. Tocas em «Mapa ↗» e a paragem abre no Google Maps.',
            },
            {
                q: 'Preciso de carro?',
                a: 'Nem para todos. Seis passeios de um dia não precisam de carro, três roteiros fazem-se em parte sem ele, e a lista de roteiros mostra qual é qual.',
            },
            {
                q: 'Está atualizado?',
                a: 'Todos os factos foram confirmados entre 30 de setembro e 22 de novembro de 2026, e cada roteiro imprime as suas datas. Os preços são os publicados nessa altura. Os horários podem mudar, por isso confirma antes de ir.',
            },
            {
                q: 'Já tenho O Algarve Inteiro. Para que quero isto?',
                a: 'O guia diz-te o que vale a pena. Os roteiros põem tudo por ordem: o percurso, as horas, os custos e um Plano B. Cada roteiro remete para os capítulos do guia de onde vem.',
            },
            {
                q: 'Há EPUB ou livro em papel?',
                a: 'Não. O livro assenta em páginas fixas, mapas e grelhas, que um EPUB baralhava. Se preferires papel, o PDF imprime-se bem.',
            },
            {
                q: 'E se encontrar um erro?',
                a: 'Escreve para hello@algarvenewsletter.pt. Verificamos e corrigimos.',
            },
        ],
        finalTitle: 'O teu próximo passeio, já planeado.',
        finalLead: '21 roteiros, de Aljezur a Alcoutim.',
        credits:
            'Fotografias da capa: a Praia da Marinha vista do alto da falésia, de Mike Finn, CC BY 4.0; Tavira vista do castelo, de Alexkom000, CC BY 4.0. As fotografias das páginas do livro mostradas aqui têm o crédito nas próprias páginas. Mapas © contribuidores do OpenStreetMap (ODbL).',
    },
};
