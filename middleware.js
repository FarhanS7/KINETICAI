import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/interview(.*)",
  "/resume(.*)",
  "/ai-cover-letter(.*)",
  "/onboarding(.*)",
]);

export const middleware = clerkMiddleware(async (auth, req) => {
  console.log("Middleware triggered!");
  console.log("Requested Path:", req.nextUrl.pathname);

  const { userId, redirectToSignIn } = await auth();

  if (!userId && isProtectedRoute(req.nextUrl.pathname)) {
    console.log("User not authenticated. Redirecting to sign-in...");
    return redirectToSignIn();
  }

  console.log("User authenticated or route not protected. Proceeding...");
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
