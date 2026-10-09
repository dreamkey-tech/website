# Landing page continuation

## Design and scope

Reading this as a Kolkata residential real estate landing page with the clean, photographic editorial language of the user's reference. Design variance 6, motion intensity 3, visual density 3: asymmetric property sizes, generous whitespace, and small interaction cues. The existing Jakarta / Playfair italic pairing, neutral semantic colors, gold accent, image radii, and pill actions are retained. Native CSS modules and existing Phosphor icons provide the implementation; no new dependency is needed.

The prior page moved from the new light hero and design gallery into dark carousel, comparison, process, trust-statistic, FAQ, and simulated enquiry sections. Those sections are no longer rendered on the landing page. Their source files remain available for other work. The hero, high-rise image, search, and staggered design gallery are unchanged.

The new sequence is hero, design gallery, property management banner, Best properties, client stories, compact enquiry CTA, and light footer. `properties`, `testimonials`, `contact`, and `contact-form` anchors remain available. Root metadata, route slugs, logo, privacy text, and terms text are preserved.

## Components and content

- `PropertyManagement` uses the existing generated Kolkata office photograph. The copy stays within the owner services already described by the project: presentation, enquiries, and tenant connections. It links to Contact.
- `BestProperties` and `HomePropertyCard` share the Buy catalog. Three illustrative properties appear in a grid with one larger photograph. Prices, configurations, sizes, and descriptions come from existing records. Cards open Contact with the property prefilled. View all properties navigates to Buy.
- `ClientStories` supplies the editorial heading and explicit sample-content note. `TestimonialSlider` retains the five existing quotes and attributions, replaces random remote avatars with initials, removes unverified rating statistics, and uses manual previous/next controls. The quote transition respects reduced motion; a stable polite live region announces changes. There is no autoplay.
- `HomeContactCTA` replaces the old form, which only simulated a submission with a timeout, with a real Contact link and telephone link. The working Contact form remains the enquiry destination.
- `HomeFooter` provides property, company, contact, and legal links in the current light theme. Business contact details and the original copyright/compliance copy are retained. Dead social placeholders are omitted. `SiteFooter` selects this footer only for `/`; interior and authentication route behavior remains unchanged.

The page continues to render on the server using `connection()`. Only testimonial navigation needs new client state. Styling uses the existing `--home-*` tokens, including the future dark palette. No theme toggle or active dark mode is added.

## Validation

Source snapshots, protected-file hashes, SSR HTML, browser screenshots, and Lighthouse output are saved under `output/landing/`. Checks cover the production build, scoped lint, unchanged hero/gallery/interior/legal sources, retained testimonial copy, server-rendered sections, functional testimonial navigation, enquiry prefilling, Buy navigation, mobile overflow, and light/dark styling. Generated property images and inventory remain illustrative, and testimonials require client confirmation before being treated as verified reviews.

The final production build and scoped lint passed. Browser checks covered 320, 390, and 768 pixel widths, desktop layout, keyboard testimonial navigation, all five quotes, and enquiry destinations. No horizontal overflow was found. A temporary static dark-theme snapshot verified the neutral surfaces and contrasting text, then was removed; the site remains in light mode. Mobile Lighthouse scored 92 performance, 100 accessibility, 96 best practices, and 100 SEO, with CLS 0, LCP 3.3 seconds, and TBT 80 ms. The best-practices console warning comes from the existing unauthenticated account request returning HTTP 401. The LCP target of 2.5 seconds was not reached in this throttled run; the preserved hero is eagerly loaded and correctly marked with high fetch priority.

Pre-flight review retains the explicitly approved hero and gallery, including their existing headline and hover behavior. New sections use four different layout families (photographic banner, asymmetric grid, editorial quote panel, and compact contact CTA), consistent radii and one accent. Image sizes are reserved, all new controls have labels and focus styles, no review ratings or aggregate trust statistics are invented, and the only new entrance animation communicates a manually selected testimonial change.
