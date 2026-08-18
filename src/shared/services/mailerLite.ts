// As inscricoes passam pela API do Algarve Atlas em vez de falarem
// directamente com o MailerLite. Motivo: o Vite compila tudo o que esta em
// `import.meta.env` para dentro do bundle publico, por isso a chave do
// MailerLite ficava legivel para qualquer visitante que abrisse o JavaScript
// desta pagina. A API do Atlas guarda a chave do lado do servidor e ja fazia
// esta mesma inscricao para os formularios do site.
//
// `site: "newsletter"` diz a API que o lead veio da landing e nao do Atlas:
// nao leva a etiqueta de origem "Algarve Hub" e nao dispara o pixel do Atlas,
// que e diferente do desta pagina. O `source` fica no campo signup_source do
// MailerLite, que e como se mede de onde vem cada subscritor.
const API_URL =
    import.meta.env.VITE_ATLAS_API_URL || 'https://algarve-hub-api.onrender.com';

export const subscribeToNewsletter = async (
    email: string,
    source: string = 'landing'
): Promise<void> => {
    const response = await fetch(`${API_URL}/api/v1/newsletter/subscribe`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ email, source, site: 'newsletter' }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Newsletter subscription error:', errorData);
        throw new Error(errorData.detail || 'Failed to subscribe to newsletter');
    }
};
