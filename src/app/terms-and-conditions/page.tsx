import { Metadata } from 'next';
import TermsClient from './TermsClient';

export const metadata: Metadata = {
    title: 'Terms and conditions',
};

export default function TermsPage() {
    return <TermsClient />;
}
