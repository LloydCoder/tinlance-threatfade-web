import { describe, expect, it } from "vitest";
import { POST } from "@/app/api/playground/route";

describe("playground route", () => {
  it("rejects oversized request bodies", async () => {
    const request = new Request("http://localhost/api/playground", { method: "POST", headers: { "content-length": "4096" }, body: JSON.stringify({ scenario: "c2_quieting" }) });
    expect((await POST(request)).status).toBe(413);
  });
  it("rejects malformed scenario input", async () => {
    const request = new Request("http://localhost/api/playground", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ scenario: "../../etc/passwd" }) });
    expect((await POST(request)).status).toBe(400);
  });
});
