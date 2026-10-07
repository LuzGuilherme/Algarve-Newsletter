// Sales page for "The Whole Algarve" (routes /guide and /pt/guia).
//
// Every figure and claim below is taken from the guide itself (Chapter 0, the
// "At a glance" boxes and the assembled book). Do not add numbers, reviews or
// promises that the guide does not make.

export const GUIDE = {
    // The checkout link (Lemon Squeezy, Gumroad, ...). The buy buttons point here:
    // the page must not be published while this is empty.
    checkoutUrl: '',
    price: '€14.99',
    pricePt: '14,99 €',
    samplePdf: '/guide/the-whole-algarve-sample.pdf',
    // The Portuguese edition does not exist yet. Set to true when it is on sale.
    ptEditionAvailable: false,
    ptCheckoutUrl: '',
};

export type Lang = 'en' | 'pt';

export const PAGES = [
    { src: '/guide/page-portimao-opener.jpg', en: 'A municipality chapter opens', pt: 'Abertura de um capítulo de concelho' },
    { src: '/guide/page-portimao-map.jpg', en: 'A map drawn for the guide', pt: 'Um mapa desenhado para o guia' },
    { src: '/guide/page-portimao-beaches.jpg', en: 'Beaches, each with a verdict', pt: 'Praias, cada uma com veredicto' },
    { src: '/guide/page-calendar.jpg', en: 'The calendar, month by month', pt: 'O calendário, mês a mês' },
    { src: '/guide/page-region-map.jpg', en: 'The region in twenty minutes', pt: 'A região em vinte minutos' },
    { src: '/guide/page-paperwork-opener.jpg', en: 'Living here: paperwork', pt: 'Viver cá: a papelada' },
    { src: '/guide/page-paperwork-chart.jpg', en: 'Who needs which permit', pt: 'Quem precisa de que autorização' },
    { src: '/guide/page-honest-bit.jpg', en: '"The honest bit" ends every chapter', pt: '"The honest bit" fecha cada capítulo' },
];

interface Copy {
    path: string;
    otherPath: string;
    otherLabel: string;
    htmlLang: string;
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
    ptDone: string;
    ptError: string;
    sample: string;
    sampleMicro: string;
    stats: { n: string; l: string }[];
    whyKicker: string;
    whyTitle: string;
    why: { t: string; d: string }[];
    verdictTitle: string;
    verdictLead: string;
    verdicts: { m: string; t: string; d: string }[];
    forKicker: string;
    forTitle: string;
    audiences: { t: string; d: string; where: string }[];
    insideKicker: string;
    insideTitle: string;
    insideLead: string;
    parts: { key: string; name: string; d: string }[];
    chaptersLabel: string;
    chaptersNote: string;
    lookKicker: string;
    lookTitle: string;
    lookLead: string;
    authorKicker: string;
    authorTitle: string;
    author: string[];
    priceKicker: string;
    priceTitle: string;
    priceNote: string;
    perPage: string;
    includes: string[];
    editionsTitle: string;
    enEdition: { t: string; s: string };
    ptEdition: { t: string; s: string; d: string };
    ptPlaceholder: string;
    ptCta: string;
    faqTitle: string;
    faq: { q: string; a: string }[];
    finalTitle: string;
    finalLead: string;
    credits: string;
}

export const COPY: Record<Lang, Copy> = {
    en: {
        path: '/guide',
        otherPath: '/pt/guia',
        otherLabel: 'Português',
        htmlLang: 'en',
        metaTitle: 'The Whole Algarve · Edition 2027 · The honest guide to visiting and living here',
        metaDescription:
            'All sixteen municipalities of the Algarve and all twelve months, in 1,535 pages. No sponsors, no affiliate links, no star ratings. PDF and EPUB.',
        kicker: 'Edition 2027 · by Algarve Newsletter',
        subtitle: 'The honest guide to visiting and living here.',
        lead: 'All sixteen municipalities and all twelve months, in 1,535 pages. No sponsors, no affiliate links, no star ratings. What is worth your time, what isn’t, and why.',
        languageNote: 'In English',
        buy: 'Get the guide',
        buyShort: 'Get it',
        buyMicro: 'PDF and EPUB · yours as soon as you pay · corrections free throughout 2027',
        stickyNote: 'PDF and EPUB · 1,535 pages',
        ptDone: 'Done. We will write to you when the Portuguese edition is ready.',
        ptError: 'That didn’t go through. Please try again.',
        sample: 'Read 43 pages free',
        sampleMicro: 'The cover, “How to use this guide” and the whole Portimão chapter. No email needed.',
        stats: [
            { n: '1,535', l: 'pages' },
            { n: '43', l: 'chapters' },
            { n: '16', l: 'municipalities' },
            { n: '166', l: 'beaches' },
            { n: '222', l: 'festivals and events' },
        ],
        whyKicker: 'Why this one',
        whyTitle: 'A guide that has nothing to sell you but itself.',
        why: [
            {
                t: 'Nobody paid to be in it',
                d: 'No sponsors and no affiliate links. No free meals, rooms or tickets were accepted. The guide is paid for by the people who buy it.',
            },
            {
                t: 'It tells you what to skip',
                d: 'Most guides only recommend. This one has a mark for places that are not worth your time or money, and always gives the reason.',
            },
            {
                t: 'It says what it doesn’t know',
                d: 'Every chapter ends with a box called “The honest bit”. Where a 2027 festival date had not been announced, the page says so and gives the 2026 one.',
            },
            {
                t: 'It is dated, and corrected',
                d: 'Each chapter prints the month its facts were last checked. When something changes, the correction goes on a public page, free to read throughout 2027.',
            },
        ],
        verdictTitle: 'Four verdicts. No stars.',
        verdictLead:
            'A verdict answers the question you would ask a friend: is it worth going? No place gets one without two independent sources.',
        verdicts: [
            { m: '◆◆◆', t: 'Worth the trip', d: 'Plan a day around it. At most three in a municipality.' },
            { m: '◆◆', t: 'Worth a detour', d: 'Go if you are within half an hour.' },
            { m: '◆', t: 'If you’re nearby', d: 'Pleasant, but don’t cross the Algarve for it.' },
            { m: '✕', t: 'Skip it', d: 'Not worth your time or money. The reason is always given.' },
        ],
        forKicker: 'Who it is for',
        forTitle: 'One guide, three kinds of reader.',
        audiences: [
            {
                t: 'You are coming on holiday',
                d: 'When to come, where to stay, how many days and which route. Whether you need a car, and what to do without one. Then the town you chose, beach by beach and table by table.',
                where: 'Parts I to IV',
            },
            {
                t: 'You live here, or are about to',
                d: 'Residence papers, renting and buying, the health service, cars and driving, money and tax, everyday life, and a month-by-month list of what a resident has to do.',
                where: 'Part V · eight chapters',
            },
            {
                t: 'You are Portuguese',
                d: 'Sections written for Portuguese readers carry their own mark, so you can skip what you already know. A Portuguese edition is being prepared.',
                where: 'Marked throughout',
            },
        ],
        insideKicker: 'What is inside',
        insideTitle: 'Six parts, 43 chapters.',
        insideLead: 'Start with Chapter 1 if you don’t know the Algarve, and with the chapter of your own town if you do.',
        parts: [
            { key: 'Before you start', name: 'Before you start', d: 'Who writes it, how it was made and what the marks mean.' },
            { key: 'Part I', name: 'I · Orientation', d: 'The region in twenty minutes, when to come, where to stay, how many days.' },
            { key: 'Part II', name: 'II · Logistics without surprises', d: 'Getting here, hiring a car, doing without one, money and safety.' },
            { key: 'Part III', name: 'III · The sixteen municipalities', d: 'One chapter each, from Aljezur in the west to Alcoutim in the east.' },
            { key: 'Part IV', name: 'IV · Themes in depth', d: 'Beaches, the outdoors, eating, culture, the calendar, families, the honest Algarve.' },
            { key: 'Part V', name: 'V · Living in the Algarve', d: 'Paperwork, home, health, cars, money and tax, everyday life, fitting in, the resident’s year.' },
            { key: 'Part VI', name: 'VI · Tools', d: 'Phrases and glossaries, maps and resources, the indexes.' },
        ],
        chaptersLabel: 'chapters',
        chaptersNote: '',
        lookKicker: 'Look inside',
        lookTitle: 'Judge it by its pages.',
        lookLead: 'Eight pages as they are in the guide. Every photograph is real, of the place named, and credited beside the picture.',
        authorKicker: 'Who writes it',
        authorTitle: 'Written from Portimão, by someone born there.',
        author: [
            '“I was born in Portimão and brought up here, and thirty years on I still live here. That is where this guide starts, and it is also its limit. Nobody knows sixteen municipalities the way they know their own town, and I don’t pretend to.”',
            'So the guide was not written from memory. Each chapter was built from sources you can check: town halls, the state’s own pages, the regional and national press, timetables and price lists. Then it was read a second time against them, line by line.',
            'It is published by Algarve Newsletter, a free email in English that goes out on Mondays and Fridays to more than 2,000 readers.',
        ],
        priceKicker: 'Edition 2027',
        priceTitle: 'The Whole Algarve',
        priceNote: 'Launch price',
        perPage: 'About one cent a page.',
        includes: [
            'The whole guide as a PDF: 1,535 pages, with a clickable table of contents',
            'The same guide as an EPUB, for e-readers',
            'All sixteen municipalities, each with its own map',
            '166 beaches, 53 dishes explained, 222 festivals and events',
            'Eight chapters on living here, from residence papers to tax',
            'Corrections throughout 2027, free',
        ],
        editionsTitle: 'Two languages',
        enEdition: { t: 'English edition', s: 'Available now' },
        ptEdition: {
            t: 'Edição portuguesa',
            s: 'In preparation',
            d: 'The guide is being translated into Portuguese. The two editions will be sold side by side, so you can have either or both. Leave your email and we will tell you when it is ready.',
        },
        ptPlaceholder: 'Your email',
        ptCta: 'Tell me',
        faqTitle: 'Before you buy',
        faq: [
            {
                q: 'What exactly do I get?',
                a: 'Two files: a PDF of 1,535 A5 pages and an EPUB of the same guide. They are yours to keep and to read on any device.',
            },
            {
                q: 'I am only coming for a week. Is it too much?',
                a: 'You will not read it all, and it is not meant to be read that way. Chapters 1 to 4 help you choose when, where and for how long; after that you read the chapter of the town you chose. The free sample shows what one of those chapters is like.',
            },
            {
                q: 'Have you been to every place in it?',
                a: 'No, and the guide says so. A verdict is a judgement made from evidence, not the report of a visit: what published guides and the press say of a place, and what thousands of visitors wrote about it. A place with fewer than two independent sources gets no verdict.',
            },
            {
                q: 'How up to date is it?',
                a: 'Every chapter was checked in September or October 2026 and prints its own month. Prices are those of 2026. Corrections made since are listed at algarvenewsletter.pt/guide/changelog.',
            },
            {
                q: 'What happens when the 2028 edition comes out?',
                a: 'The guide is dated because it is meant to be redone each year. We have not yet decided how the 2028 edition will be offered to people who bought this one.',
            },
            {
                q: 'Is there a printed book?',
                a: 'Not for this edition. It is a PDF and an EPUB.',
            },
            {
                q: 'What if I find a mistake?',
                a: 'Tell us at algarvenewsletter.pt/guide/report or write to hello@algarvenewsletter.pt. We check it, correct it, and list the correction publicly.',
            },
        ],
        finalTitle: 'The Algarve, without the sales pitch.',
        finalLead: 'Sixteen municipalities, twelve months, 1,535 pages.',
        credits: 'Cover photograph: Cabo de São Vicente, by Matthias Süßen, CC BY-SA 4.0. Photographs on the sample pages are credited on the pages themselves.',
    },
    pt: {
        path: '/pt/guia',
        otherPath: '/guide',
        otherLabel: 'English',
        htmlLang: 'pt-PT',
        metaTitle: 'The Whole Algarve · Edição 2027 · O guia honesto para visitar e viver no Algarve',
        metaDescription:
            'Os dezasseis concelhos do Algarve e os doze meses do ano em 1535 páginas. Sem patrocínios, sem links de afiliado, sem estrelas. Em inglês, em PDF e EPUB.',
        kicker: 'Edição 2027 · pela Algarve Newsletter',
        subtitle: 'O guia honesto para quem visita o Algarve e para quem cá vive.',
        lead: 'Os dezasseis concelhos e os doze meses do ano, em 1535 páginas. Sem patrocínios, sem links de afiliado, sem estrelas. O que vale o seu tempo, o que não vale, e porquê.',
        languageNote: 'Em inglês · edição portuguesa em preparação',
        buy: 'Comprar o guia',
        buyShort: 'Comprar',
        buyMicro: 'PDF e EPUB · fica com eles assim que pagar · correcções grátis durante 2027',
        stickyNote: 'PDF e EPUB · 1535 páginas',
        ptDone: 'Feito. Escrevemos-lhe quando a edição portuguesa estiver pronta.',
        ptError: 'Não foi possível registar. Tente outra vez, por favor.',
        sample: 'Ler 43 páginas grátis',
        sampleMicro: 'A capa, o capítulo “How to use this guide” e o capítulo de Portimão inteiro. Em inglês, sem pedir email.',
        stats: [
            { n: '1535', l: 'páginas' },
            { n: '43', l: 'capítulos' },
            { n: '16', l: 'concelhos' },
            { n: '166', l: 'praias' },
            { n: '222', l: 'festas e eventos' },
        ],
        whyKicker: 'Porquê este',
        whyTitle: 'Um guia que não tem mais nada para lhe vender.',
        why: [
            {
                t: 'Ninguém pagou para lá estar',
                d: 'Não tem patrocinadores nem links de afiliado. Não aceitámos refeições, quartos ou bilhetes. Quem paga o guia é quem o compra.',
            },
            {
                t: 'Diz-lhe o que não vale a pena',
                d: 'Quase todos os guias só recomendam. Este tem uma marca para os sítios que não merecem o seu tempo nem o seu dinheiro, e explica sempre porquê.',
            },
            {
                t: 'Diz o que não sabe',
                d: 'Cada capítulo fecha com uma caixa chamada “The honest bit”. Quando a data de 2027 de uma festa ainda não tinha sido anunciada, a página di-lo e dá a de 2026.',
            },
            {
                t: 'Tem data, e é corrigido',
                d: 'Cada capítulo traz o mês em que os factos foram verificados pela última vez. Quando alguma coisa muda, a correcção fica numa página pública, de leitura livre durante todo o ano de 2027.',
            },
        ],
        verdictTitle: 'Quatro veredictos. Nenhuma estrela.',
        verdictLead:
            'Um veredicto responde à pergunta que faria a um amigo: vale a pena ir? Nenhum sítio recebe um sem duas fontes independentes.',
        verdicts: [
            { m: '◆◆◆', t: 'Worth the trip (vale a viagem)', d: 'Merece um dia inteiro. No máximo três por concelho.' },
            { m: '◆◆', t: 'Worth a detour (vale o desvio)', d: 'Vá, se estiver a menos de meia hora.' },
            { m: '◆', t: 'If you’re nearby (se estiver perto)', d: 'É agradável, mas não atravesse o Algarve por causa dele.' },
            { m: '✕', t: 'Skip it (evite)', d: 'Não vale o tempo nem o dinheiro. A razão vem sempre escrita.' },
        ],
        forKicker: 'Para quem é',
        forTitle: 'Um guia, três leitores.',
        audiences: [
            {
                t: 'Vem de férias',
                d: 'Quando vir, onde ficar, quantos dias e por que caminho. Se precisa de carro e como se arranja sem ele. Depois, a terra que escolheu, praia a praia e mesa a mesa.',
                where: 'Partes I a IV',
            },
            {
                t: 'Vive cá, ou está para vir',
                d: 'Autorizações de residência, arrendar e comprar casa, saúde, carro e carta, dinheiro e impostos, o dia-a-dia, e a lista, mês a mês, do que um residente tem de tratar.',
                where: 'Parte V · oito capítulos',
            },
            {
                t: 'É português',
                d: 'As secções escritas a pensar no leitor português têm uma marca própria, para saltar o que já sabe. Esta edição está em inglês; a portuguesa está a ser preparada.',
                where: 'Assinalado ao longo do guia',
            },
        ],
        insideKicker: 'O que traz',
        insideTitle: 'Seis partes, 43 capítulos.',
        insideLead: 'Se não conhece o Algarve, comece pelo capítulo 1. Se conhece, comece pelo da sua terra.',
        parts: [
            { key: 'Before you start', name: 'Antes de começar', d: 'Quem escreve, como foi feito e o que querem dizer as marcas.' },
            { key: 'Part I', name: 'I · Orientação', d: 'A região em vinte minutos, quando vir, onde ficar, quantos dias.' },
            { key: 'Part II', name: 'II · Logística sem surpresas', d: 'Como chegar, alugar carro, passar sem ele, dinheiro e segurança.' },
            { key: 'Part III', name: 'III · Os dezasseis concelhos', d: 'Um capítulo para cada um, de Aljezur, a oeste, a Alcoutim, a leste.' },
            { key: 'Part IV', name: 'IV · Temas a fundo', d: 'Praias, natureza, comer e beber, cultura, o calendário, famílias, o Algarve sem filtros.' },
            { key: 'Part V', name: 'V · Viver no Algarve', d: 'Papelada, casa, saúde, carro, dinheiro e impostos, o dia-a-dia, integrar-se, o ano do residente.' },
            { key: 'Part VI', name: 'VI · Ferramentas', d: 'Frases e glossários, mapas e recursos, os índices.' },
        ],
        chaptersLabel: 'capítulos',
        chaptersNote: 'Os títulos dos capítulos aparecem em inglês, como estão no guia.',
        lookKicker: 'Espreite por dentro',
        lookTitle: 'Julgue-o pelas páginas.',
        lookLead: 'Oito páginas tal como estão no guia. Todas as fotografias são reais, do sítio indicado, e têm o crédito ao lado.',
        authorKicker: 'Quem escreve',
        authorTitle: 'Escrito em Portimão, por quem lá nasceu.',
        author: [
            '“Nasci e cresci em Portimão e, trinta anos depois, continuo a viver cá. É daí que este guia parte, e é também esse o seu limite. Ninguém conhece dezasseis concelhos como conhece a sua terra, e eu não finjo que conheço.”',
            'Por isso o guia não foi escrito de memória. Cada capítulo foi feito a partir de fontes que qualquer pessoa pode consultar: câmaras municipais, páginas do Estado, imprensa regional e nacional, horários e tabelas de preços. Depois foi relido contra essas fontes, linha a linha.',
            'É publicado pela Algarve Newsletter, um email gratuito, em inglês, que sai às segundas e sextas para mais de 2000 leitores.',
        ],
        priceKicker: 'Edição 2027',
        priceTitle: 'The Whole Algarve',
        priceNote: 'Preço de lançamento',
        perPage: 'Cerca de um cêntimo por página.',
        includes: [
            'O guia completo em PDF: 1535 páginas, com índice clicável',
            'O mesmo guia em EPUB, para leitores de ebooks',
            'Os dezasseis concelhos, cada um com o seu mapa',
            '166 praias, 53 pratos explicados, 222 festas e eventos',
            'Oito capítulos sobre viver cá, da residência aos impostos',
            'Correcções grátis durante todo o ano de 2027',
        ],
        editionsTitle: 'Duas línguas',
        enEdition: { t: 'Edição inglesa', s: 'Já disponível' },
        ptEdition: {
            t: 'Edição portuguesa',
            s: 'Em preparação',
            d: 'O guia está a ser traduzido para português. As duas edições vão estar à venda lado a lado, para poder ficar com uma ou com as duas. Deixe o seu email e avisamos quando estiver pronta.',
        },
        ptPlaceholder: 'O seu email',
        ptCta: 'Avisem-me',
        faqTitle: 'Antes de comprar',
        faq: [
            {
                q: 'O guia está em português?',
                a: 'Ainda não. Esta edição está escrita em inglês. A edição portuguesa está a ser preparada e não tem data; se preferir esperar por ela, deixe o seu email na caixa “Duas línguas”, mais acima.',
            },
            {
                q: 'O que recebo, ao certo?',
                a: 'Dois ficheiros: um PDF com 1535 páginas em formato A5 e um EPUB com o mesmo guia. Ficam consigo e pode lê-los em qualquer aparelho.',
            },
            {
                q: 'Só venho uma semana. Não é demasiado?',
                a: 'Não vai lê-lo todo, nem foi feito para isso. Os capítulos 1 a 4 ajudam a escolher quando, onde e por quanto tempo; depois lê o capítulo da terra que escolheu. A amostra grátis mostra como é um desses capítulos.',
            },
            {
                q: 'Estiveram em todos os sítios de que falam?',
                a: 'Não, e o guia di-lo. Um veredicto é um juízo feito a partir de provas, não o relato de uma visita: o que os guias publicados e a imprensa dizem de um sítio, e o que milhares de visitantes escreveram sobre ele. Um sítio com menos de duas fontes independentes fica sem veredicto.',
            },
            {
                q: 'Está actualizado?',
                a: 'Todos os capítulos foram verificados em Setembro ou Outubro de 2026 e trazem o mês impresso. Os preços são os de 2026. As correcções feitas desde então estão em algarvenewsletter.pt/guide/changelog.',
            },
            {
                q: 'E quando sair a edição de 2028?',
                a: 'O guia tem data porque é para ser refeito todos os anos. Ainda não decidimos em que condições a edição de 2028 será oferecida a quem comprou esta.',
            },
            {
                q: 'Há edição em papel?',
                a: 'Desta edição, não. É um PDF e um EPUB.',
            },
            {
                q: 'E se encontrar um erro?',
                a: 'Diga-nos em algarvenewsletter.pt/guide/report ou escreva para hello@algarvenewsletter.pt. Verificamos, corrigimos e publicamos a correcção.',
            },
        ],
        finalTitle: 'O Algarve, sem conversa de vendedor.',
        finalLead: 'Dezasseis concelhos, doze meses, 1535 páginas.',
        credits: 'Fotografia da capa: Cabo de São Vicente, de Matthias Süßen, CC BY-SA 4.0. As fotografias das páginas de amostra têm o crédito nas próprias páginas.',
    },
};
