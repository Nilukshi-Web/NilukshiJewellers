# AMARÉ Jewellers — Website Manager Guide

A plain-English guide to running your website. No technical knowledge needed.

Everything you see on the website — products, photos, prices, phone numbers, page text, the menu — is controlled from one place called the **admin panel**. This guide shows you where each thing lives and exactly what changes on the live website when you edit it.

---

## Table of contents

1. [Logging in](#1-logging-in)
2. [How the website is put together (the big picture)](#2-how-the-website-is-put-together-the-big-picture)
3. [Photos & images](#3-photos--images)
4. [Products — adding and editing](#4-products--adding-and-editing)
5. [Categories](#5-categories)
6. [Metals (Yellow / White / Rose Gold)](#6-metals-yellow--white--rose-gold)
7. [Site Settings — phone, WhatsApp, address, social links](#7-site-settings--phone-whatsapp-address-social-links)
8. [The top menu (Header)](#8-the-top-menu-header)
9. [The Footer](#9-the-footer)
10. [Pages & building blocks (homepage sections, About, Contact)](#10-pages--building-blocks)
11. [Forms & customer messages](#11-forms--customer-messages)
12. [Saving, publishing & previewing](#12-saving-publishing--previewing)
13. [Quick "how do I…" list](#13-quick-how-do-i-list)
14. [Good habits & things to avoid](#14-good-habits--things-to-avoid)

---

## 1. Logging in

1. Go to **your-website-address.com/admin**
2. Enter your email and password.
3. You'll land on the **Dashboard**. On the left is a menu listing everything you can manage.

> **Tip:** Change your password after your first login. Click your name at the bottom-left → **Account**.

---

## 2. How the website is put together (the big picture)

Think of the admin panel as having two kinds of things:

- **Collections** — lists of items you add to, like Products, Categories, and Photos. (You'll create many of each.)
- **Globals** — single settings that appear site-wide, like your phone number, the menu, and the footer. (There's only one of each; you edit it, you don't add more.)

Your website is organised into **four shopping areas** (we call them "sections"):

| Section | Web address | What goes here |
|---|---|---|
| **Jewellery** | `/jewellery` | Rings, necklaces, earrings, etc. Split by metal (Yellow / White / Rose Gold). |
| **Gems** | `/gems` | Loose diamonds and stones. |
| **Silver Articles** | `/silver` | Silver cuffs, trays, etc. |
| **Custom Jewellery** | `/custom` | Made-to-order pieces + the enquiry form. |

Every product you add belongs to **one** of these sections. That choice decides which page it shows up on.

---

## 3. Photos & images

Before adding a product, it helps to know how photos work.

- All photos live in the **Media** collection (in the left menu).
- You can upload a photo directly while adding a product, or upload in bulk in **Media** first.
- Photos are automatically stored and delivered fast worldwide, and the system automatically makes smaller versions for phones — you don't need to resize anything.

**Please always fill in the "Alt text" box** when you upload a photo. Write a short description of what's in the picture (e.g. "Gold necklace with blue sapphires"). This helps Google find your products and helps visually-impaired visitors.

**Good photo tips:**
- Use tall/portrait or square photos for products — they look best in the product grid.
- Aim for clear, well-lit photos at least 900 pixels wide.

---

## 4. Products — adding and editing

This is the thing you'll do most. Go to **Products** in the left menu → click **Create New** (top right). To edit an existing one, just click its name in the list.

Here's every field and **exactly what it changes on the live site:**

| Field | What to put | Where it shows on the website |
|---|---|---|
| **Name** | The product's name, e.g. "Vasanti Bridal Necklace" | The title under the photo, on the product's own page, and the browser tab. |
| **Section** | Choose Jewellery, Gems, Silver Articles, or Custom Jewellery | Decides **which page** the product appears on. This is the most important choice. |
| **Metal** | Yellow / White / Rose Gold (**only appears if Section = Jewellery**) | Decides which metal tab the product shows under on the Jewellery page, and in the drop-down menu. |
| **Category** | e.g. Rings, Necklaces, Natural Diamonds (the list changes based on the Section you picked) | Decides which filter tab the product appears under. |
| **Images** | Upload one or more photos | The **first photo** is used on the product card in the grid. All photos appear as a gallery on the product's own page. **At least one photo is required.** |
| **Price** | A number in LKR, e.g. `485000` (no commas, no "LKR") | Shown under the name. **Leave it blank** and the site automatically shows "Price on request" instead. |
| **Available** | Tick = in stock, untick = sold out | If unticked, a **"Sold Out"** badge appears on the photo. The product still shows — it's not hidden. |
| **Featured** | Tick to feature this piece | Featured products can appear in the **"This Season's Edit"** section on the homepage. |
| **Description** | A short paragraph about the piece | The main text on the product's page, under the price. |
| **The Story** | Optional — the story or inspiration behind the piece | Appears in a highlighted "The Story" box on the product page. Leave blank to hide the box. |
| **Specifications** | Material, Size, Stone Type, Stone Colour, Cut, Count, Carat | Shown as a neat details table on the product page. **Any box you leave empty is simply hidden** — you don't need to fill them all. |

**When you're done:** click **Save** (or **Publish** — see [Section 12](#12-saving-publishing--previewing)). The product appears on the site right away.

> **The "slug":** You'll see a **Slug** field (usually filled in automatically from the name, e.g. `vasanti-bridal-necklace`). This is the product's web address. You can leave it as-is. Only change it if you know what you're doing, because changing it changes the product's link.

### To delete a product
Open it and click the **⋮** (or the delete option), or tick it in the list and choose Delete. It disappears from the site immediately.

---

## 5. Categories

Categories are the **filter tabs** buyers use, like "Rings", "Earrings", "Natural Diamonds". They live in **Product Categories** in the left menu.

Each category has:

| Field | What it does |
|---|---|
| **Title** | The name shown on the tab, e.g. "Rings". |
| **Section** | Which shopping area this category belongs to (Jewellery, Gems, Silver, or Custom). |
| **Order** | A number that sets the position. **Lower numbers appear first** (0, 1, 2…). |

**What happens on the site when you add a category:**
- It automatically appears as a **filter tab** on that section's page.
- If it's a **Jewellery** category, it also appears in the **drop-down menu** under "Jewellery" at the top of the site (for every metal).

**Example:** Add a category called "Anklets" with Section = Jewellery. Now shoppers can filter Jewellery by "Anklets", and it shows in the top menu. Then, when adding an anklet product, you can pick "Anklets" as its Category.

> **Remember:** creating a category doesn't move any products by itself. A product only appears under a category once you open that product and set its **Category** (and matching **Section**) to it.

---

## 6. Metals (Yellow / White / Rose Gold)

Metals are the tone tabs for jewellery. They live in **Metals** in the left menu. You probably won't touch these often, but here's how they work:

| Field | What it does |
|---|---|
| **Name** | e.g. "Yellow Gold". |
| **Swatch Color** | The little colour dot shown next to the metal name. Enter a hex colour code like `#C9A24B`. |
| **Order** | Position — lower numbers first. |

**Where metals show up:**
- As the **coloured cards** on the homepage ("Yellow Gold / White Gold / Rose Gold").
- As the **tabs** at the top of the Jewellery page.
- As the **columns** in the "Jewellery" drop-down menu.

If you ever start selling, say, **Platinum**, just add a new Metal here and it appears everywhere automatically. Then jewellery products can be assigned to it.

---

## 7. Site Settings — phone, WhatsApp, address, social links

This one Global controls your contact details **everywhere** on the site at once. Find it under **Site Settings** in the left menu.

| Field | Where it appears on the site |
|---|---|
| **WhatsApp** (digits only, with country code, e.g. `94771234567`) | Every "WhatsApp Us" button — on product pages, the Custom page, the Contact page, and the footer. |
| **Phone** | The "Call Us" links on the Contact page, product pages, and footer. |
| **Email** | The Contact page and footer. |
| **Opening Hours** | The Contact page and footer. |
| **Address** | The thin bar at the very top of every page, the Contact page, and the footer. |
| **Instagram URL / Facebook URL** | The social icons in the footer, on product pages, and the Contact page. |

### WhatsApp Prefilled Messages
When a customer taps a WhatsApp button, a message is already typed for them. You can edit the wording here:

- **General** — used by plain "WhatsApp us" links.
- **Product** — used on product pages. The words `{product}` and `{price}` are **automatically replaced** with the real product name and price. Keep them in the text.
- **Custom** — used by the Custom Jewellery WhatsApp button.

> **Change your phone number once here, and it updates across the entire website.** You never have to hunt through pages.

---

## 8. The top menu (Header)

Controls the bar at the top of every page. Find it under **Header** in the left menu.

| Field | What it does |
|---|---|
| **Brand Name** | The big logo word, "AMARÉ". |
| **Brand Tagline** | The small word under the logo, "JEWELLERS". |
| **Top Bar Text** | The label of the contact link in the thin bar at the very top ("Contact Us"). |
| **Nav Items** | The list of menu links across the top. |

**Adding or changing a menu link:** Under **Nav Items**, each row is one menu link.
- **Link** — choose an internal page (like Jewellery) or type a custom web address, and give it a label.
- **Show jewellery mega menu** — tick this **only** on the "Jewellery" link. It makes the big drop-down (with all the metals and categories) appear when a visitor hovers over it.

> Drag the rows up/down to reorder the menu.

---

## 9. The Footer

Controls the dark strip at the bottom of every page. Find it under **Footer** in the left menu.

| Field | What it does |
|---|---|
| **Blurb** | The short paragraph under the logo in the footer. |
| **Visit / Contact / Follow Headings** | The little titles above each footer column. |
| **Copyright** | The line at the very bottom (e.g. "© 2026 AMARÉ Jewellers…"). |
| **Nav Items** | Optional extra links in the footer (e.g. a "Contact page" link). |

> Remember: the footer's **address, phone, email and social icons** come from **Site Settings** (Section 7), not from here.

---

## 10. Pages & building blocks

Your Home, About, Contact, Jewellery, Gems, Silver, and Custom pages all live in the **Pages** collection. Each page is built from stackable **blocks** — think of them as LEGO pieces you can add, remove, and drag to reorder.

To edit a page: open **Pages** → click the page → scroll to the **Content** area where the blocks are listed. Click a block to open it. Use **Add Block** to add a new section, and drag the handles to reorder.

Here are the blocks and what each shows:

| Block | What it shows | Key settings |
|---|---|---|
| **Hero Carousel** | The big rotating banner at the top of the homepage. | Eyebrow (small line), Heading, Subheading, the rotating **Slides** (images), and buttons. |
| **Metal Showcase** | The row of Yellow/White/Rose Gold cards. | Pulls metals automatically; you can change the button label ("Shop now"). |
| **Featured Products** | A grid of highlighted products (e.g. "This Season's Edit"). | Title, and how products are chosen: **Featured** (products you ticked "Featured"), **Latest**, or **hand-pick** your own. |
| **Promo Strip** | The coloured full-width banner with a heading and a button (e.g. the gems banner). | Heading, text, and a button. |
| **Product Catalog** | The actual product grid with filter tabs. This is what makes the Jewellery/Gems/Silver pages work. | **Section** (which products to show), Title, an intro line, and the "nothing here yet" message. |
| **Custom Commission** | The Custom Jewellery intro, WhatsApp button, and recent custom work. | Title, intro text, button label, and how many pieces to show. |
| **Contact Channels** | The grid of WhatsApp / Call / Instagram / Facebook cards. | Title and eyebrow. Details come from Site Settings. |
| **Content** | Plain text with headings and paragraphs (used for the About page). | A rich-text editor — type like a normal document. |
| **Form** | Drops in a form (like the contact or enquiry form). | Choose which form to show. |

> **You usually won't need to rebuild pages** — they're already set up. This section is here so you understand what each part of a page is, and so you can tweak wording (like the homepage heading) with confidence.

**Common edit example:** To change the homepage headline, open **Pages → Home → Hero Carousel block → Heading**, type the new text, and Publish.

---

## 11. Forms & customer messages

- **Forms** (left menu) — the contact form and the custom enquiry form. You can rename fields, add fields, and edit the "thank you" message shown after someone submits.
- **Form Submissions** (left menu) — **every message a customer sends through a form lands here.** Open one to read the customer's details.

> **Check Form Submissions regularly** so you don't miss enquiries. (These are separate from WhatsApp messages, which go straight to your phone.)

---

## 12. Saving, publishing & previewing

- Most pages and products have **Save Draft** and **Publish** buttons.
  - **Draft** = saved privately, **not visible** to the public yet.
  - **Publish** = live on the website.
- Products and settings usually update the live site **within a few seconds** of publishing.
- On **Pages**, you can use **Preview** / **Live Preview** to see your changes before publishing.
- If you change something and it doesn't appear immediately, wait a moment and refresh — the site briefly caches content for speed.

---

## 13. Quick "how do I…" list

| I want to… | Go here |
|---|---|
| Add a new product | **Products → Create New** |
| Mark something sold out | Open the product → untick **Available** → Publish |
| Change a price / show "Price on request" | Open the product → **Price** (blank = on request) → Publish |
| Feature a product on the homepage | Open the product → tick **Featured** → Publish |
| Add a new filter (e.g. "Anklets") | **Product Categories → Create New** (pick the right Section) |
| Change your phone / WhatsApp / address | **Site Settings** |
| Edit the WhatsApp auto-message | **Site Settings → WhatsApp Prefilled Messages** |
| Change a top-menu link | **Header → Nav Items** |
| Edit footer text or copyright | **Footer** |
| Change the homepage banner text/images | **Pages → Home → Hero Carousel** |
| Edit the About page text | **Pages → About → Content block** |
| Read customer enquiries | **Form Submissions** |
| Upload photos in bulk | **Media → Create New** |

---

## 14. Good habits & things to avoid

**Do:**
- Always add **Alt text** to photos.
- Set a product's **Section** and **Category** correctly — that's what makes it show in the right place.
- Use clear, similar-sized product photos for a tidy grid.
- **Publish** (not just Save Draft) when you want something to go live.
- Check **Form Submissions** regularly.

**Avoid:**
- **Don't change a product's Slug** once it's live unless necessary — it changes the product's link and can break shared links.
- **Don't delete a Category or Metal** that products are still using — those products will lose their filter. Reassign the products first.
- **Don't put "LKR" or commas in the Price** — just the number (e.g. `485000`).
- **Don't delete the Home page** or the core pages (Jewellery, Gems, Silver, Custom, Contact).
- If you're unsure, **Save as Draft** and preview before publishing.

---

*Questions or something not behaving as described? Contact your website developer.*
