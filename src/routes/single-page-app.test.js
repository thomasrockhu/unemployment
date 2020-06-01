import { init } from "../app";
import request from "supertest";

const server = init();

describe("Router: Single page app", () => {
  it("renders to /guide", async () => {
    const res = await request(server).get("/guide");

    expect(res.status).toBe(200);
    expect(res.text).toMatch(/<html/);
  });

  it("/guide/ returns 200 status code", async () => {
    // The router will re-write this to the first tab.
    const res = await request(server).get("/guide/");

    expect(res.status).toBe(200);
    expect(res.text).toMatch(/<base href="\/">/);
  });

  it("/guide/benefits returns 200 status code", async () => {
    // No need to do a redirect here since we're loading a guide page.
    const res = await request(server).get("/guide/benefits");

    expect(res.status).toBe(200);
    expect(res.text).toMatch(/<html/);
  });

  it("/ uses <Redirect> to go to the guide", async () => {
    const res = await request(server).get("/");

    expect(res.status).toBe(200);
    expect(res.text).toMatch(/<html/);
  });

  it("/does-not-exist returns 404 status code", async () => {
    const res = await request(server).get("/does-not-exist");

    expect(res.status).toBe(404);
    expect(res.text).toMatch(/<html/);
  });
});
