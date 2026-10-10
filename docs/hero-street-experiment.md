# Experimental Kolkata street hero

Generated 10 October 2026 using built-in imagegen (one new generation followed by one targeted cleanup edit). Reference: the user-supplied street photograph, used as visual inspiration for an original scene. This is illustrative AI imagery, not a photo of an identified address, listing or client property.

Final asset: `public/images/kolkata-street-experiment-v1.webp`. The image is temporarily first in `components/home/hero-slides.ts`; remove the commented experimental record to restore the earlier opening. All four architectural assets are retained. No timing, copy, overlay or layout changes.

Original generated PNG: `/home/koushik/.codex/generated_images/01a11ce6-d9c7-7891-b837-e0bad6bd6a11/exec-f07111b7-a561-4c2c-8154-34b19b1a889c.png`.

Selected edited PNG: `/home/koushik/.codex/generated_images/01a11ce6-d9c7-7891-b837-e0bad6bd6a11/exec-d8b895d7-0516-49ee-9ce4-779837bf9f6d.png`.

Packaging: 1672 × 940, 313930 bytes; Sharp WebP quality 84, original dimensions retained, no crop. Generated output was inspected; a rooftop planting strip was removed using the built-in edit tool. Ground-level street trees remain.

Verification: scoped ESLint, TypeScript, production webpack build, formatting and whitespace checks pass. The real-hook/selector check verifies five-image cycling/manual resets/automatic pauses and selectors without Pause/Play. Production SSR retains readable hero copy and loads this experimental image first with high priority; original and optimized endpoints return HTTP 200. The asset was inspected, but live page crop/fade review remains pending under the recorded browser limitation.

## Full generation prompt

```text
Use case: photorealistic-natural
Asset type: experimental wide 16:9 background photograph for an existing Kolkata real estate website hero.
Primary request: An original Kolkata street photograph inspired by a tree-lined New Town residential boulevard, colorful Indian apartment blocks and a classic yellow Ambassador taxi, matching the supplied reference's sunny Kolkata neighborhood atmosphere.
Scene: a clean gently curving asphalt boulevard with blue-and-white curb paint, ground-level mature street trees, realistic mid/high-rise apartment facades in white with restrained pastel coral, ochre, turquoise and pale green panels. One classic Kolkata yellow Ambassador taxi with plausible chrome grille, round headlights and realistic proportions, three-quarter front view in the lower-right foreground. Only a couple of unobtrusive distant vehicles, no crowded traffic.
Composition: horizontal 16:9 wide photograph, street-level camera, natural 35mm perspective with straight architectural verticals. Recompose for a website hero rather than duplicating the reference: most apartment blocks/tree line occupy the right half and lower-left edge, sky dominates the upper-left 48% as calm uncluttered negative space behind large white headline. Taxi clearly visible toward lower right but not tight against edges, within a centre-right portrait crop. Broad road creates depth and a gentle diagonal toward the distance.
Style/light: photorealistic editorial travel/architectural photography, blue afternoon sky with a few soft white clouds, natural sun and believable shadows, crisp facade details, slightly warm stone and yellow car, restrained greens, understated saturation consistent with premium real estate hero photos. Recognizably Indian and Kolkata in atmosphere; an illustrative imagined location, not a labelled actual development.
Constraints: no vegetation or planters on any building balcony or rooftop; trees only along street/ground. No readable text, company logos, watermarks, signage or recognizable registration number, no artificial HDR, no fisheye, no impossible street or building geometry. No embedded website UI or typography.
```

## Full cleanup edit prompt

```text
Edit only the rooftop and balcony greenery in the supplied generated street photograph. Remove the small green hedge/planting strips at the top of the pale-green and white apartment block near the upper centre-right, and remove any other plants or vegetation attached to roofs, parapets or balconies on buildings. Replace those areas with matching plain cream/white concrete parapets and clean railings. Preserve ALL street trees and all ground-level landscaping exactly. Preserve the yellow Ambassador taxi, road, blue-and-white curbs, building colors/window geometry, composition, natural photographic style, sky and lighting. No additional objects, no text or watermark. This is a minimal cleanup; do not change the scene.
```
