// Local-only contract fixture for browser checks. Never forwards requests.
// No real accounts, email, passwords or durable sessions are created.
const http = require("node:http");
const user = {
  id: "local-preview",
  name: "Test Resident",
  email: "resident@example.com",
  emailVerified: true,
};
const server = http.createServer(async (request, response) => {
  const route = new URL(request.url, "http://127.0.0.1").pathname;
  response.setHeader("Content-Type", "application/json");
  const send = (status, data) => {
    response.writeHead(status);
    response.end(JSON.stringify(data));
  };
  if (request.method === "GET") {
    if (route === "/api/auth/get-session") return send(200, null);
    if (route.endsWith("/me"))
      return request.headers.cookie?.includes("access_token=local-verified")
        ? send(200, { user })
        : send(401, { message: "Not signed in" });
    return send(404, { message: "Local fixture has no such route" });
  }
  let raw = "";
  for await (const chunk of request) raw += chunk;
  let body;
  try {
    body = raw ? JSON.parse(raw) : {};
  } catch {
    return send(400, { message: "Invalid JSON" });
  }
  if (route.endsWith("/register")) {
    response.setHeader(
      "Set-Cookie",
      "access_token=local-provisional; HttpOnly; Path=/; SameSite=Lax",
    );
    return send(201, {
      user: { ...user, email: body.email, emailVerified: false },
    });
  }
  if (route.endsWith("/login"))
    return send(200, {
      success: true,
      requiresOtp: true,
      message: "A verification code has been sent to your email.",
      email: body.email,
    });
  if (
    route.endsWith("/verify-login-otp") ||
    route.endsWith("/verify-reset-otp")
  ) {
    if (body.otp !== "0123")
      return send(400, {
        success: false,
        message: "Invalid or expired code. Please try again.",
      });
    if (route.endsWith("/verify-login-otp")) {
      response.setHeader(
        "Set-Cookie",
        "access_token=local-verified; HttpOnly; Path=/; SameSite=Lax",
      );
      return send(200, {
        success: true,
        message: "Email verified",
        user: { ...user, email: body.email },
      });
    }
    return send(200, { message: "Reset code verified" });
  }
  if (route.endsWith("/logout") || route.endsWith("/sign-out")) {
    response.setHeader(
      "Set-Cookie",
      "access_token=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0",
    );
    return send(200, { message: "Signed out" });
  }
  if (route.endsWith("/forgot-password") || route.endsWith("/resend-otp"))
    return send(200, {
      message: "A new 4-digit code has been sent. Please check your email.",
    });
  if (route.endsWith("/reset-password"))
    return body.otp === "0123" && body.newPassword?.length >= 6
      ? send(200, { message: "Password updated" })
      : send(400, { message: "Invalid reset request" });
  send(404, { message: "Local fixture has no such route" });
});
server.listen(4187, "127.0.0.1", () =>
  console.log("Local auth fixture ready on 127.0.0.1:4187 (no outbound HTTP)"),
);
