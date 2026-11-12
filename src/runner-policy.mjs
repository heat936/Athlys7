const SECRET_KEY=/(token|secret|password|private.?key|credential)/i;
const HOSTNAME=/^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i;
export function validateRunnerPolicy(policy) {
  const errors=[];
  if(policy?.image!=="ubuntu-24.04") errors.push("runner image must be ubuntu-24.04");
  if(policy?.ephemeral!==true) errors.push("runner must be ephemeral");
  if(!Number.isInteger(policy?.timeoutSeconds)||policy.timeoutSeconds<60||policy.timeoutSeconds>1800) errors.push("timeoutSeconds must be between 60 and 1800");
  if(!Number.isInteger(policy?.vcpus)||![1,2,4,8].includes(policy.vcpus)) errors.push("vcpus must be one of 1, 2, 4, 8");
  if(!Array.isArray(policy?.allowedDomains)||policy.allowedDomains.length===0) errors.push("allowedDomains must be a non-empty allowlist");
  else {
    const normalized=policy.allowedDomains.map((domain)=>typeof domain==="string"?domain.trim().toLowerCase():"");
    if(normalized.some((domain)=>!HOSTNAME.test(domain))) errors.push("allowedDomains must contain valid fully qualified hostnames without wildcards, schemes, paths, or ports");
    if(new Set(normalized).size!==normalized.length) errors.push("allowedDomains must not contain duplicates");
  }
  if(Object.keys(policy?.env??{}).some(k=>SECRET_KEY.test(k))) errors.push("secret-like environment variable names are forbidden in runner metadata");
  return errors;
}
export function runnerEvidence(policy, execution) {
  const errors=validateRunnerPolicy(policy);
  if(errors.length) throw new TypeError(errors.join("; "));
  if(!execution?.runnerId||!execution?.startedAt||!execution?.finishedAt) throw new TypeError("runnerId, startedAt and finishedAt are required");
  return {schemaVersion:"1.0",runnerId:execution.runnerId,image:policy.image,ephemeral:true,vcpus:policy.vcpus,timeoutSeconds:policy.timeoutSeconds,allowedDomains:[...new Set(policy.allowedDomains.map((domain)=>domain.trim().toLowerCase()))].sort(),startedAt:execution.startedAt,finishedAt:execution.finishedAt,environmentKeys:Object.keys(policy.env??{}).sort()};
}
