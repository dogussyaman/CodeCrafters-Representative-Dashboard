"use client";

import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

interface OTPVerificationProps {
    otpValue: string;
    setOTPValue: (value: string) => void;
    onSubmit: () => void;
}

export function OTPVerification({ otpValue, setOTPValue, onSubmit }: OTPVerificationProps) {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-sm">Lütfen OTP kodunuzu girin.</p>
            <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                value={otpValue}
                onChange={(value) => setOTPValue(value)}
            >
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
            </InputOTP>
            <Button type="button" onClick={onSubmit} className="w-full">
                Giriş Yap
            </Button>
        </div>
    );
}
