# TODO

## CSS `@layer` Migration for Vanilla Extract

Vanilla Extract + Next.js has a known CSS ordering bug: when recipe variants are split across chunks, Next.js loads them in non-deterministic order. Since variant classes have equal specificity, whichever chunk loads last wins. This causes intermittent styling bugs where e.g. a `color: "success"` variant's `backgroundColor` overrides `style: "tertiary"`'s `backgroundColor: "transparent"`.

Current workaround: explicitly re-declare overridden properties in compound variants so they always win regardless of load order. This is fragile — every new variant combination needs to remember to do this.

Permanent fix: use CSS `@layer` (supported in Vanilla Extract 1.15+) to establish a deterministic cascade. Base variant styles go in a lower-priority layer, compound variants in a higher one. This makes load order irrelevant since layer priority is defined by declaration order, not stylesheet position.
