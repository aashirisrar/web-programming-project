"use client";

import { MAX_FREE_CREDITS } from '@/constants';
import { Progress } from '@/components/ui/progress';
import { Coins } from 'lucide-react';

interface CreditsCounter {
    credits: number;
    isPro?: boolean;
}

export const CreditsCounter: React.FC<CreditsCounter> = ({ credits = 0, isPro = false }) => {
    if (isPro) return null;

    return (
        <div className="px-3">
            <div className="text-center text-sm mb-4 space-y-2">
                <p>
                    {credits} / {MAX_FREE_CREDITS} Free Generations
                </p>
                <Progress
                    className="h-3"
                    value={(credits / MAX_FREE_CREDITS) * 100}
                />
            </div>
        </div>
    );
};
