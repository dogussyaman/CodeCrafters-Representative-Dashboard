/**
 * Type declarations for @supabase/ssr when the package is not yet installed.
 * Run `npm install` in the project root to install @supabase/ssr and @supabase/supabase-js.
 */
declare module "@supabase/ssr" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type SupabaseClient = any;

  export function createBrowserClient(url: string, key: string): SupabaseClient;

  export function createServerClient(
    url: string,
    key: string,
    options: {
      cookies: {
        getAll(): { name: string; value: string }[];
        setAll(cookies: { name: string; value: string; options?: Record<string, unknown> }[]): void;
      };
    }
  ): Promise<SupabaseClient>;
}
