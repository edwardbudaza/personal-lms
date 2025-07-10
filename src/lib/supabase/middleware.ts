import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Keep this for Supabase session hydration
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Skip middleware logic for public static assets
  const isStaticAsset =
    pathname.startsWith('/_next') ||
    pathname.endsWith('.ico') ||
    pathname.match(/\.(svg|png|jpg|jpeg|webp|gif|mp4|ts)$/);

  if (isStaticAsset) return response;

  // Publicly accessible pages (unauthenticated)
  const publicPaths = ['/login', '/sign-up', '/forgot-password', '/reset-password', '/check-email'];

  const isPublic = publicPaths.some((path) => pathname.startsWith(path));
  const isAuthProtected = pathname.startsWith('/courses') || pathname.startsWith('/dashboard');

  if (!user && isAuthProtected && !isPublic) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login';
    loginUrl.searchParams.set('redirectedFrom', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If already logged in, redirect away from auth pages
  if (user && isPublic) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return response;
}
