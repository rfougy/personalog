import { EnvVarWarning } from '@/components/env-var-warning';
import HeaderAuth from '@/components/header-auth';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { hasEnvVars } from '@/utils/supabase/check-env-vars';
import { GeistSans } from 'geist/font/sans';
import { ThemeProvider } from 'next-themes';
import Link from 'next/link';
import './globals.css';
import { ToastProvider } from '@/components/ui/toast';
import { Toaster } from '@/components/ui/toaster';
import { createClient } from '@/utils/supabase/server';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from('users_profiles')
    .select(
      `
        profiles(*),
        user_id
      `
    )
    .eq('user_id', user?.id);

  if (error) console.error(error);

  const profile = data && data[0].profiles;
  const name = profile?.nickname
    ? profile?.nickname
    : profile?.name.split(' ')[0];
  const username = profile?.username;

  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ToastProvider>
            <main className="min-h-screen flex flex-col items-center">
              <Toaster />
              <div className="flex-1 w-full flex flex-col gap-20 items-center">
                <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                  <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                    <div className="flex gap-2 items-center font-semibold">
                      {user ? (
                        <Link href={`/${username}`}>
                          {name.toUpperCase()}'S PERSONALOG
                        </Link>
                      ) : (
                        <Link href={'/'}>PERSONALOG</Link>
                      )}
                      <ThemeSwitcher />
                    </div>
                    <div className="flex gap-2 items-center font-semibold">
                      {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                    </div>
                  </div>
                </nav>
                <div className="flex flex-col gap-20 w-full max-w-5xl p-5">
                  {children}
                </div>
                <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
                  <p>Personalog, 2025</p>
                </footer>
              </div>
            </main>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
