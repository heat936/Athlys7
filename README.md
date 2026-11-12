# Runner Infrastructure

> Athlys CI/CD Independence — specification-driven engineering.

## Mission

Public runner bootstrap and execution contracts for reproducible Ubuntu 24.04 jobs. The existing private Athlys2 application repository remains separate; this repository is only CI infrastructure. No long-lived privileged credentials or production secrets.

## Governance

- GitHub Spec Kit is the required development framework.
- Every validation is bound to an immutable repository, ref, and commit SHA.
- A cache hit is not a fresh test execution; skipped checks are never reported as passed.
- Infrastructure startup failures are distinct from test or build failures.
- Least privilege, isolated execution, and secret minimization are mandatory.
- No merge, public release, deployment, DNS change, Supabase secret change, or migration without explicit human authorization.
- Preserve audit evidence: workflow, job, runner image, toolchain versions, commands, exit codes, logs, and artifact digests.

## Status

Repository bootstrap. The detailed constitution, specification, plan, and task breakdown will be maintained in the Spec Kit artifacts.

## Scope boundary

This repository is one component of the Athlys CI/CD Independence program. Cross-repository interfaces are governed by the central architecture specification; component-specific implementation must not modify another component's ownership boundary.
