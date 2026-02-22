---
quiz:
  auto_number: true
  shuffle_answers: true
---

# Probes

## What Problem Probes Solve

Containers can:

- Hang
- Deadlock
- Become partially functional
- Fail silently

Without health checks:

- Traffic keeps flowing to broken Pods
- Users experience timeouts
- Rolling updates stall
- Incidents last longer than necessary

Probes give Kubernetes visibility into container health.

## The Solution

Kubernetes provides three probe types:

- Liveness probe
- Readiness probe
- Startup probe

Each serves a different purpose.

Using them correctly is critical for production reliability.

## Liveness Probe

Purpose:

- Detects if a container is stuck or dead
- If it fails repeatedly → container is restarted

Use when:

- App can deadlock
- Process may hang without exiting
- You need automatic recovery

Important:

Liveness does NOT control traffic routing.
It only triggers restarts.

Misconfigured liveness probes can cause restart loops.

## Readiness Probe

Purpose:

- Determines if a Pod is ready to receive traffic
- If it fails → Pod is removed from Service endpoints

Use when:

- App depends on database connection
- App requires warm-up time
- App performs background initialization

A Pod can be:

Alive but not Ready.

This is normal and expected.

## Startup Probe

Purpose:

- Protects slow-starting applications
- Disables liveness/readiness until startup succeeds

Use when:

- Application takes a long time to boot
- You want to avoid premature restarts

Once startup probe succeeds:

- Liveness and readiness take over

Without it, liveness may kill slow apps repeatedly.

## Probe Mechanisms

Kubernetes supports:

- HTTP GET
- TCP socket
- Exec command

Choose based on what truly reflects application health.

Do not check only “process exists”.
Check meaningful health conditions.

## Probes and Rolling Updates

During rolling updates:

- Readiness determines when a Pod joins the Service
- New Pods must become Ready before old ones terminate

Misconfigured readiness probes can:

- Break zero-downtime deployments
- Cause traffic to hit uninitialized containers

Probes directly impact deployment safety.

## Mental Model

Liveness = Should I restart this container?  
Readiness = Should I send traffic to this Pod?  
Startup = Is the app done booting?  

They solve different problems.

Do not use one as a substitute for another.

## Common Mistakes

- Using liveness instead of readiness
- Aggressive probe timing causing restart storms
- No probes in production
- Probes checking shallow conditions only
- Forgetting startup probe for slow apps

Health checks should reflect real availability.

## Check Your Knowledge

<quiz>
Can a Pod be alive but not ready?
- [x] Yes, and it will not receive traffic
- [ ] No, readiness implies liveness
- [ ] Only in StatefulSets
- [ ] Only when HPA is enabled
</quiz>

<quiz>
What happens if a readiness probe fails?
- [x] The Pod is removed from Service endpoints
- [ ] The container is restarted
- [ ] The node is drained
- [ ] The PVC is deleted
</quiz>

<quiz>
Scenario: An application takes 90 seconds to start, and liveness keeps restarting it. What should you add?
- [x] Startup probe
- [ ] Increase replica count
- [ ] Add NodePort
- [ ] Remove liveness probe
</quiz>

<quiz>
Why are readiness probes important during rolling updates?
- [x] They prevent traffic from reaching uninitialized Pods
- [ ] They scale replicas automatically
- [ ] They resize volumes
- [ ] They modify DNS
</quiz>

<quiz>
Which probe type triggers container restarts?
- [x] Liveness probe
- [ ] Readiness probe
- [ ] Service probe
- [ ] DNS probe
</quiz>

<quiz>
Fill in the blank: Liveness probes handle [[automatic restarts]], while readiness probes control [[traffic routing]].
</quiz>

## References

- Kubernetes Documentation – Probes  
- The Kubernetes Book – Nigel Poulton