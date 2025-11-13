'use client'

import { useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

interface PricingToggleProps {
    onPeriodChange: (yearly: boolean) => void
}

export function PricingToggle({ onPeriodChange }: PricingToggleProps) {
    const [yearly, setYearly] = useState(false)

    const handleToggle = (checked: boolean) => {
        setYearly(checked)
        onPeriodChange(checked)
    }

    return (
        <div className="flex items-center justify-center gap-4 mb-8">
            <Label htmlFor="billing" className="text-sm font-semibold text-[#0D121F]">Monthly</Label>
            <Switch
                id="billing"
                checked={yearly}
                onCheckedChange={handleToggle}
            />
            <Label htmlFor="billing" className="text-sm font-semibold text-[#0D121F]">Yearly</Label>
            <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">Save 15%</span>
        </div>
    )
}

