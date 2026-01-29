import type { LucideIcon } from "lucide-react"

export interface OnboardingStep {
    title: string
    description: string
    icon: LucideIcon
    features?: string[]
    image?: string
    quote?: string
}

export interface OnboardingProps {
    steps: OnboardingStep[]
    currentStep: number
    onStepChange: (step: number) => void
    onComplete: () => void
    onSkip: () => void
}
