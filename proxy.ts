import { clerkMiddleware } from "@clerk/nextjs/server";

// Clerk middleware still runs so ClerkProvider can initialize, but no routes
// are gated — /dashboard is publicly accessible so visitors can try the tool
// without creating an account.
export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
