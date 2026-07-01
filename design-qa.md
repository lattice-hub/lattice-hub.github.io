source visual truth path: /var/folders/tb/h_l55gfs30d5ky84jtffppd40000gn/T/TemporaryItems/NSIRD_screencaptureui_qRbhrs/截屏2026-06-22 16.01.06.png
implementation screenshot path: /Users/chuntao.liao/Github/pole-io/website/docs/design-qa/homepage-implementation-1920x1280.png
viewport: 1920 x 1280
state: homepage default Agent Discovery slide

**Full-View Comparison Evidence**

- Header matches the reference structure: left Lattice Hub mark, centered docs/components/blog/reports navigation, GitHub link, and primary 阅读文档 button.
- Hero composition matches the reference state: left Agent Discovery headline, subtitle, two CTA buttons, status lines, side arrows, bottom pager, and right-side Registry relationship graphic.
- Implementation intentionally keeps existing route targets and carousel behavior while matching the screenshot's default visual state.

**Focused Region Comparison Evidence**

- Header/logo: replaced the prior single icon with a five-node blue mark inside the rounded square to match the screenshot direction.
- Typography/copy: headline copy, eyebrow, subtitle, CTA labels, and status text match the source screenshot.
- Registry visual: central Registry block, four capability nodes, dashed A2A nodes, and thick black connector arcs are represented in the same layout family as the source.

**Findings**

- No P0/P1/P2 findings remain after the latest patch.

**Required Fidelity Surfaces**

- Fonts and typography: implementation uses system sans plus monospace fallbacks to reproduce the screenshot hierarchy, large heavy headline, monospaced eyebrow/status labels, and node labels. The exact production font from the screenshot is not available in-repo, but visual weight and wrapping now match the target state.
- Spacing and layout rhythm: header height, left margin, hero text block, CTA placement, bottom pager, and Registry graph coordinates were measured at 1920 x 1280 and tuned to the reference.
- Colors and visual tokens: cold blue palette, pale blue hero background, white header, blue primary buttons, muted gray copy, and light card borders match the screenshot direction.
- Image quality and asset fidelity: no external raster assets are required; the visible product relationship graphic is implemented as page UI so it remains crisp and responsive.
- Copy and content: homepage default slide text matches the screenshot's Agent Discovery content.

**Patches Made Since Previous QA Pass**

- Rebuilt SiteHeader to match screenshot navigation and right-side CTA.
- Rebuilt HomeHero default slide around the screenshot's Agent Discovery composition.
- Added node-style Lattice Hub mark.
- Reworked hero CSS for 1920 x 1280 spacing, headline wrap, CTA sizing, status rows, side arrows, bottom pager, and Registry graph placement.
- Hid Next dev portal chrome in local preview.

**Follow-up Polish**

- P3: The GitHub icon is approximated with the closest available in-repo icon because the current lucide-react package does not expose a GitHub mark.
- P3: The connector curves are CSS-rendered approximations of the screenshot arcs; a future brand asset could replace them if pixel-perfect vector artwork is provided.

final result: passed
