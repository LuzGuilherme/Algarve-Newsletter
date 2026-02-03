const API_KEY = import.meta.env.VITE_MAILERLITE_API_KEY;
const GROUP_ID = import.meta.env.VITE_MAILERLITE_GROUP_ID;

if (!API_KEY || API_KEY === 'your_mailerlite_api_key_here') {
    console.warn('MailerLite API key not configured. Please set VITE_MAILERLITE_API_KEY in .env.local');
}

export const subscribeToNewsletter = async (email: string): Promise<void> => {
    if (!API_KEY || API_KEY === 'your_mailerlite_api_key_here') {
        throw new Error('Newsletter service not configured. Please contact support.');
    }
    const url = 'https://connect.mailerlite.com/api/subscribers';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            email: email,
            groups: [GROUP_ID]
        })
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('MailerLite subscription error:', errorData);
        throw new Error(errorData.message || 'Failed to subscribe to newsletter');
    }
};
