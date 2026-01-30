"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/spinner";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { GoogleButton } from "./social-auth/google-button";
import { SocialAuthDivider } from "./social-auth-divider";

interface LoginCredentialsFormProps {
    control: Control<any>;
    onSubmit: () => void;
    isLoading?: boolean;
}

export function LoginCredentialsForm({ control, onSubmit, isLoading }: LoginCredentialsFormProps) {
    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-4">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-medium">Hesabınıza giriş yapın</h1>
                <p className="text-muted-foreground text-sm">Giriş yapmak için bilgilerinizi girin.</p>
            </div>
            <div className="space-y-4">
                <GoogleButton className="w-full" />
                <SocialAuthDivider />
            </div>
            <FormField
                control={control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>E-posta adresi</FormLabel>
                        <FormControl>
                            <Input id="email" type="email" autoComplete="email" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Şifre</FormLabel>
                        <FormControl>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                autoComplete="current-password"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name="remember"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center">
                        <FormControl>
                            <Checkbox
                                id="login-remember"
                                checked={true}
                                onCheckedChange={field.onChange}
                                className="size-4"
                            />
                        </FormControl>
                        <FormLabel htmlFor="login-remember" className="text-muted-foreground ml-1 text-sm font-medium">
                            Beni 30 gün hatırla
                        </FormLabel>
                    </FormItem>
                )}
            />
            <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading && <Spinner className="mr-2 size-4" />}
                {isLoading ? "Giriş yapılıyor…" : "Giriş Yap"}
            </Button>
        </form>
    );
}
