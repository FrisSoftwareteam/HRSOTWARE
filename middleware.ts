import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware(async (auth, req) => {
  try {
    const { userId } = auth();
    if (!userId) throw new Error("Unauthorized");
    // return NextResponse.next();
  } catch (err) {
    console.error("Middleware error:", err);
    // return NextResponse.json({ error: "Middleware failed" }, { status: 500 });
  }
});
