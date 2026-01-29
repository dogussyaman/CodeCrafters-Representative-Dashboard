import { useState, useEffect } from "react";

export function useOnboardingState(storageKey = "state") {
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        const raw = localStorage.getItem(storageKey);
        if (!raw) return;

        try {
            const parsed = JSON.parse(raw);
            const value = parsed?.state?.onboardingCompleted ?? false;
            setCompleted(value);
        } catch (err) {
            console.error("Invalid JSON in localStorage", err);
        }
    }, [storageKey]);

    const save = (value: boolean) => {
        setCompleted(value);

        const raw = localStorage.getItem(storageKey);
        let parsed = raw ? JSON.parse(raw) : { state: {} };

        parsed.state.onboardingCompleted = value;

        localStorage.setItem(storageKey, JSON.stringify(parsed));
    };

    return [completed, save];
}
