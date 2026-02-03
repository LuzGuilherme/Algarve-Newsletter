import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { subscribeToNewsletter } from '../../shared/services/mailerLite';
import { trackLead } from '../../shared/services/analytics';

interface UseNewsletterFormOptions {
    source: string;
    onSuccess?: () => void;
    redirectDelay?: number;
}

interface UseNewsletterFormReturn {
    email: string;
    setEmail: (email: string) => void;
    status: 'idle' | 'submitting' | 'success' | 'error';
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    errorMessage: string | null;
}

export const useNewsletterForm = (options: UseNewsletterFormOptions): UseNewsletterFormReturn => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('submitting');
        setErrorMessage(null);

        try {
            await subscribeToNewsletter(email);
            trackLead(options.source);
            setStatus('success');
            setEmail('');

            const delay = options.redirectDelay ?? 1500;
            setTimeout(() => {
                options.onSuccess?.();
                navigate('/thank-you');
            }, delay);
        } catch (error) {
            console.error(error);
            setStatus('error');
            setErrorMessage('Something went wrong. Please try again.');
        }
    };

    return { email, setEmail, status, handleSubmit, errorMessage };
};
