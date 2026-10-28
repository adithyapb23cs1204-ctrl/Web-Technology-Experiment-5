const request = require('supertest');
const app = require('../server');

describe('Security & API Endpoint Tests', () => {
  it('Sanity test: Jest test runner is functioning', () => {
    expect(1 + 1).toBe(2);
  });

  it('GET / should respond with 200 and Helmet security headers', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    // Verify Helmet security headers are present
    expect(res.headers['x-dns-prefetch-control']).toBeDefined();
    expect(res.headers['x-frame-options']).toBeDefined();
    expect(res.headers['x-content-type-options']).toBe('nosniff');
  });

  it('GET /api/nonexistent should return 404 JSON', async () => {
    const res = await request(app).get('/api/nonexistent');
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it('Security: NoSQL Injection attempt in login should not bypass authentication', async () => {
    const maliciousPayload = {
      email: { "$ne": null },
      password: { "$ne": null }
    };

    const res = await request(app)
      .post('/api/auth/login')
      .send(maliciousPayload);

    // Should reject malicious object payload and not grant access (not 200 OK)
    expect([400, 401]).toContain(res.statusCode);
    expect(res.body.token).toBeUndefined();
  });
});
