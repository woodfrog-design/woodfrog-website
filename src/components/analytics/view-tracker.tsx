'use client';

import { useEffect, useRef } from 'react';

interface ViewTrackerProps {
    id: string;
    type: 'blog' | 'job';
    incrementFn: (id: string) => Promise<void>;
}

export default function ViewTracker({ id, type, incrementFn }: ViewTrackerProps) {
    const tracked = useRef(false);

    useEffect(() => {
        if (!tracked.current) {
            incrementFn(id);
            tracked.current = true;
        }
    }, [id, incrementFn]);

    return null;
}
