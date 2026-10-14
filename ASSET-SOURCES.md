# Product photography sources

Demo frontend uses manufacturer / retailer product photography. Replace with commissioned shop photography before commercial launch. No Bambu Lab logo is used as the store identity.

- green.webp — Bambu Lab PLA Basic Bambu Green spool. Botland retailer mirror: https://cdn2.botland.store/130102/export.jpg ; source: https://trustmate.io/en/p/botland-store/product/24288/bambu-lab-pla-basic-1-75mm-1kg-filament-comes-with-a-reusable-spool-bambu-green
- green-sample.webp — official Bambu Green printed sample: https://cdn.shopify.com/s/files/1/0584/7236/6216/files/Bambu_Green.jpg?v=1739413402
- white.webp — PLA Matte Ivory White printed sample: https://cdn.shopify.com/s/files/1/0584/7236/6216/products/PLA-Matte_Ivory-White.png?v=1717490452
- black.webp — PLA Basic Black printed sample: https://cdn.shopify.com/s/files/1/0584/7236/6216/products/PLA-Basic_Black_e33768fd-c87a-4b2d-a3f7-0b3afc81f13f.png?v=1739413402
- blue.webp — PLA Basic Blue printed sample: https://cdn.shopify.com/s/files/1/0584/7236/6216/files/PLABasicBlue.jpg?v=1739413402
- orange.webp — PETG HF Orange printed sample: https://cdn.shopify.com/s/files/1/0645/5876/0155/files/PETG_HF_4.jpg?v=1721201479
- petg-white.webp — PETG HF White printed sample: https://cdn.shopify.com/s/files/1/0645/5876/0155/files/PETG_HF_7.jpg?v=1721201479
- hotend.webp — X1C complete hotend, 0.2 mm stainless steel: https://cdn.shopify.com/s/files/1/0645/5876/0155/files/0.2mm_38dd996b-b78a-41aa-be09-a0b4ebc08b6f.png?v=1723707422
- plate.webp — Textured PEI plate: https://cdn.shopify.com/s/files/1/0645/5876/0155/files/Textured_PEI_72683a6f-6e35-4f66-887c-0f3dfc4b1039.png?v=1735978918

## Client logos

Supplied by the user in this conversation; copied unchanged, with transparency preserved:

- clients/baxt-textile.png — image(1).png, BAXT-TEXTILE.
- clients/ngmk.png — image(2).png, NGMK.
- clients/nzbt.png — image(3).png, NZBT. The site crops its presentation frame with CSS while retaining the original source image.
- clients/narbahor-textile.png — image(4).png, the remaining client logo NARBAHOR TEXTILE.
- BAXT-AGRO remains a text label because its logo was not supplied.

## Expanded filament assortment

- Assortment source: user-provided bambu_filament.xlsx, sheet Филамент, rows 6–48. All 43 source rows are represented. PLA Silk rows with placeholder colors are one selectable-color item. Combined spool/refill rows produce two format options.
- Procurement planning locations do not establish actual Tashkent stock. Source retail-price and inventory cells were blank. Added products retain unknown prices and quantities; original demonstration prices and quantities are preserved for the existing prototype products.
- The normalized spreadsheet records are in app/data/filament-source.json. Product photo matches, exact CDN URLs, variant names and official page URLs are in app/data/filament-photos.json. Photos are from the public Bambu Lab EU product catalog, with a CDN width=640 presentation variant. Generic family pictures are labelled as such; missing or unconfirmed color combinations have no fabricated product photo.
- Parts compatibility checked against the official catalog: https://bambulab-eu.myshopify.com/products.json?limit=250&page=2 and page=3. The PEI plate on this site is the X1 Series/P1 Series/A1 option, not A1 mini or H2 variants. X1C complete hotend uses the X1/X1C connector set; other model families were not automatically assigned.
- Printer chooser includes A1 mini, A1, A2L, P1P, P1S, P2S, X1, X1C, X1E, X2D, H2S, H2D, H2D Pro and H2C. Material/nozzle/AMS restrictions for the newly listed engineering and support materials remain pending verification and are shown explicitly.

## Expanded consumables and service sets

- Source: user-provided bambu_rashodniki.xlsx. Расходники rows 6–35 are all represented; Наборы и сайт rows 4–8 supply two service sets, PLA/PETG cross-sells and supplier lead-time presentation.
- P1 and X1 complete hotends are separate variants, as are A1 hotends. P2S/H2D/H2C versions are not treated as a shared universal item. Smooth PEI and Cool Plate SuperTack are separate products. AMS Lite, AMS 2 Pro and AMS HT are separate systems.
- Retail prices, actual stock and lead times were not provided. New products are quotations with unknown price/stock; no example shipping period has been treated as a confirmed supplier lead time. The two pre-existing demonstration part prices and quantities are preserved.
- Normalized source records: app/data/parts-source.json. Product variants: app/parts.ts. Image provenance and selected manufacturer variants: app/data/parts-photos.json. Public official Bambu Lab EU catalog snapshots are the same selected product source used for the filament import. Shared/family images are labelled. Broad repair entries and hardware requiring an exact model are staged for model selection and explicitly pending compatibility confirmation.
- Third-party dryer, vacuum storage bags and generic cleaning tools are not assigned a fabricated Bambu Lab manufacturer. Service sets are Forma 3D bundles, with their source-specified component lists, not official Bambu Lab product bundles.
