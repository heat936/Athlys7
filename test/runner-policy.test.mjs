import test from "node:test";import assert from "node:assert/strict";import {validateRunnerPolicy,runnerEvidence} from "../src/runner-policy.mjs";
const policy={image:"ubuntu-24.04",ephemeral:true,timeoutSeconds:600,vcpus:2,allowedDomains:["github.com"],env:{CI:"true"}};
test("accepts bounded ephemeral runner policy",()=>assert.deepEqual(validateRunnerPolicy(policy),[]));
test("rejects persistent and secret-bearing runner config",()=>assert.ok(validateRunnerPolicy({...policy,ephemeral:false,env:{ACCESS_TOKEN:"x"}}).length>=2));
test("emits auditable metadata without environment values",()=>{const e=runnerEvidence(policy,{runnerId:"runner-1",startedAt:"2026-01-01T00:00:00Z",finishedAt:"2026-01-01T00:01:00Z"});assert.deepEqual(e.environmentKeys,["CI"]);assert.equal("env" in e,false);});
