import { Metadata } from 'next';
import PrivacyClient from './PrivacyClient';

export const metadata: Metadata = {
    title: 'Privacy Policy',
};

export default function PrivacyPolicyPage() {
    return <PrivacyClient />;
}
