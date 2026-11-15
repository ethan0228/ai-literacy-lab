import { describe, expect, it } from 'vitest';
import { buildCsp } from './csp';

describe('buildCsp', () => {
  it('正式環境只允許本站資源', () => {
    const csp = buildCsp({ dev: false, forMeta: false });
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("connect-src 'self';");
    expect(csp).toContain("frame-ancestors 'self'");
    expect(csp).not.toContain('unsafe-eval');
    expect(csp).not.toContain('ws:');
  });

  it('開發模式額外允許 eval 與 WebSocket', () => {
    const csp = buildCsp({ dev: true, forMeta: false });
    expect(csp).toContain("'unsafe-eval'");
    expect(csp).toContain('ws:');
  });

  it('以 meta 標籤送出時不含 frame-ancestors', () => {
    expect(buildCsp({ dev: false, forMeta: true })).not.toContain('frame-ancestors');
  });
});
