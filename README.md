# Runner Infrastructure

> Athlys CI/CD Independence — specification-driven component.

## Mission
Validates Ubuntu 24.04 ephemeral runner policy, bounded runtime/resources, explicit network allowlists, and secret-free runner metadata.

## Implemented vertical slice
- `src/runner-policy.mjs` — component implementation.
- `test/runner-policy.test.mjs` — deterministic Node.js built-in tests.
- `.specify/memory/constitution.md` and `specs/` — engineering constitution and component requirements, plan, and task tracking.
- `.github/workflows/spec-kit-verification.yml` — fresh Ubuntu 24.04 validation, pinned Spec Kit CLI install, isolated Spec Kit scaffold smoke test, and Node test run.

## Verification
- GitHub Actions: fresh run, no test cache.
- Runtime: Node.js 22 on Ubuntu 24.04.
- Spec Kit CLI: `specify-cli 1.4.1.dev0`, pinned to upstream commit `979b0a3c1277283371c9901ad0eed04b64a99997`.
- Component tests: **4/4 passed** on the latest completed run for this branch.
- The official CLI scaffold was generated in an isolated temporary directory. Existing repository specifications and constitution were not overwritten.

## Not yet production-ready
Cross-repository dispatch, a second independent CI provider, persistent evidence storage, signed attestations, SBOM generation, and full end-to-end pipeline orchestration remain open. No merge, release publication, or deployment is performed by this repository.

## Network allowlist validation
Runner policy accepts normalized fully qualified hostnames only and rejects wildcard, URL, path, port, and duplicate entries. This validates policy input; it does not itself enforce a network firewall.
