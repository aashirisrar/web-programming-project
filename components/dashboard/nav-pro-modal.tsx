"use client"

import { useProModal } from "@/app/hooks/useProModal"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useSidebar } from "@/components/ui/sidebar"
import { SafeUser } from "@/types"
import { Coins, Zap } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CreditsCounter } from "../credits-counter"

interface NavProModalProps {
    currentUser?: SafeUser | null
    isPro?: boolean
    credits: number;
}

export function NavProModal({ currentUser, isPro, credits }: NavProModalProps) {
    const proModal = useProModal()
    const { state } = useSidebar()
    const sidebar =useSidebar()

    if (state === "collapsed" && !sidebar.isMobile && !isPro) {
        return (<><div className='flex flex-col text-center items-center gap-1 font-medium'><Coins className="h-4 w-4" />{credits}</div>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="premium" className="p-0 h-8 w-8" onClick={() => proModal.onOpen()} >
                        <Zap className="text-white h-4 w-4" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Upgrade to Pro for more features</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider></>)
    }

    return (
        <>
            <CreditsCounter isPro={isPro} credits={credits} />
            {currentUser && !isPro && (
                <Card className="shadow-none">
                    <CardHeader className="p-4">
                        <CardTitle>Upgrade to Pro</CardTitle>
                        <CardDescription>
                            Unlock all features and get unlimited access to our support
                            team.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                        <Button
                            size="sm"
                            className="w-full"
                            onClick={() => proModal.onOpen()}
                        >
                            Upgrade
                        </Button>
                    </CardContent>
                </Card>
            )}
        </>
    )
}

