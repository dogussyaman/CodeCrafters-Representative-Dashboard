"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { OnboardingProps } from "./types/onboarding"
import { useRouter } from "next/navigation"
import { usePreferencesStore } from "@/stores/preferences/preferences-provider"

export function Onboarding({ steps, currentStep, onStepChange }: OnboardingProps) {
    const isLastStep = currentStep === steps.length - 1
    const step = steps[currentStep]
    const Icon = step.icon
    const router = useRouter()
    const setOnboardingCompleted = usePreferencesStore((state) => state.setOnboardingCompleted)

    const goToDashboard = () => {
        setOnboardingCompleted(true)
        router.push("/dashboard/default")
    }

    const onSkip = () => {
        setOnboardingCompleted(true)
        router.push("/dashboard/default")
    }

    return (
        <div className="min-h-screen bg-background grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
            {/* Left Side - Image/Visual */}
            <div className="hidden lg:flex relative bg-muted/30 items-center justify-center p-12 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, scale: 0.95, x: -20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 1.05, x: 20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="relative w-full h-full max-h-[800px] rounded-3xl border shadow-2xl overflow-hidden bg-background/50 backdrop-blur-sm"
                    >
                        {step.image ? (
                            <div className="relative w-full h-full">
                                {/* Using img tag as placeholder until Next.js Image is configured/files exist */}
                                <img
                                    src={step.image}
                                    alt={step.title}
                                    className="w-full h-full object-cover object-center"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-background/20 to-transparent" />
                            </div>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-accent/5">
                                <Icon className="w-32 h-32 text-muted-foreground/20" />
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Background decoration */}
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50" />
            </div>

            {/* Right Side - Content */}
            <div className="flex flex-col h-full relative">
                {/* Header */}
                <header className="flex items-center justify-between p-8 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                            <span className="font-bold text-lg">⌘</span>
                        </div>
                        <span className="font-bold text-xl tracking-tight">CodeCraftX MT</span>
                    </div>
                    <Button variant="ghost" onClick={onSkip} className="text-muted-foreground hover:text-foreground">
                        Atla
                    </Button>
                </header>

                {/* Main Content */}
                <main className="flex-1 flex flex-col justify-center px-8 sm:px-12 md:px-16 max-w-3xl mx-auto w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-8"
                        >
                            {/* Mobile Image (Visible only on small screens) */}
                            <div className="lg:hidden w-full aspect-video rounded-2xl bg-muted overflow-hidden mb-6 border shadow-sm">
                                {step.image ? (
                                    <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Icon className="w-12 h-12 text-muted-foreground/20" />
                                    </div>
                                )}
                            </div>

                            {/* Step Indicator (X / Y) */}
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider">
                                <span>Adım {currentStep + 1} / {steps.length}</span>
                            </div>

                            <div className="space-y-4">
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance text-foreground">
                                    {step.title}
                                </h1>
                                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
                                    {step.description}
                                </p>
                            </div>

                            {/* Quote (if exists) */}
                            {step.quote && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="pt-2"
                                >
                                    <p className="text-center text-base md:text-lg font-medium text-muted-foreground italic">
                                        "{step.quote}"
                                    </p>
                                </motion.div>
                            )}

                            {/* Features Grid */}
                            {step.features && step.features.length > 0 && (
                                <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 ${step.quote ? 'pt-6' : 'pt-4'}`}>
                                    {step.features.map((feature, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 + (index * 0.05) }}
                                            className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 border border-secondary"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                                                <Check className="w-4 h-4" />
                                            </div>
                                            <span className="text-sm font-medium">{feature}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </main>

                {/* Footer */}
                <footer className="p-8 shrink-0">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 max-w-3xl mx-auto w-full">
                        {/* Progress Bars */}
                        <div className="flex gap-1.5 w-full sm:w-auto overflow-hidden">
                            {steps.map((_, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        "h-1.5 rounded-full transition-all duration-300 w-full sm:w-8",
                                        index <= currentStep ? "bg-primary" : "bg-primary/10"
                                    )}
                                />
                            ))}
                        </div>

                        {/* Navigation Controls */}
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => onStepChange(currentStep - 1)}
                                disabled={currentStep === 0}
                                className="w-12 h-12 rounded-full border-2 hover:bg-secondary transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </Button>

                            {isLastStep ? (
                                <Button
                                    onClick={goToDashboard}
                                    className="flex-1 sm:flex-none h-12 rounded-full px-8 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
                                >
                                    Dashboard'a Git
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => onStepChange(currentStep + 1)}
                                    className="flex-1 sm:flex-none h-12 rounded-full px-8 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all group"
                                >
                                    Devam Et
                                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            )}
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}
