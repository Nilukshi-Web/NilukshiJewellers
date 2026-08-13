// NILUKSHI Jewellers seed data, migrated from the original single-file demo app.

export const metalSeeds = [
  { name: 'Yellow Gold', slug: 'yellow-gold', swatchColor: '#C9A24B', order: 0 },
  { name: 'White Gold', slug: 'white-gold', swatchColor: '#D8D6CE', order: 1 },
  { name: 'Rose Gold', slug: 'rose-gold', swatchColor: '#C48A79', order: 2 },
]

export const categorySeeds = [
  { title: 'Earrings', slug: 'earrings', section: 'jewellery', order: 0 },
  { title: 'Bracelets', slug: 'bracelets', section: 'jewellery', order: 1 },
  { title: 'Rings', slug: 'rings', section: 'jewellery', order: 2 },
  { title: 'Necklaces', slug: 'necklaces', section: 'jewellery', order: 3 },
  { title: 'Pendants', slug: 'pendants', section: 'jewellery', order: 4 },
  { title: 'Natural Diamonds', slug: 'natural-diamonds', section: 'gems', order: 0 },
  { title: 'Precious Stones', slug: 'precious-stones', section: 'gems', order: 1 },
  { title: 'Semi Precious Stones', slug: 'semi-precious-stones', section: 'gems', order: 2 },
  { title: 'Silver Articles', slug: 'silver-articles', section: 'silver', order: 0 },
  { title: 'Custom Jewellery', slug: 'custom-jewellery', section: 'custom', order: 0 },
] as const

export const heroImageSeeds = [
  {
    url: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1600&q=80',
    alt: 'Gold jewellery on display',
    filename: 'amare-hero-1.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1600&q=80',
    alt: 'Handcrafted rings close-up',
    filename: 'amare-hero-2.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1600&q=80',
    alt: 'Bridal necklace with sapphires',
    filename: 'amare-hero-3.jpg',
  },
]

type ProductSeed = {
  name: string
  slug: string
  section: 'jewellery' | 'gems' | 'silver' | 'custom'
  metal: string | null // metal slug
  category: string // category slug
  imageUrl: string
  price: number | null
  available: boolean
  featured: boolean
  description: string
  story: string
  specs: Partial<Record<SpecKey, string>>
}

type SpecKey = 'material' | 'stoneType' | 'stoneColor' | 'cut' | 'count' | 'carat' | 'size'

/**
 * Labels used when the seed's keyed spec objects are flattened into the
 * repeatable `specs` rows the Products collection now stores. Editors are free
 * to add any label they like once a product exists — this only seeds sensible
 * defaults, and controls the row order.
 */
const specLabels: { key: SpecKey; label: string }[] = [
  { key: 'material', label: 'Material' },
  { key: 'stoneType', label: 'Stone' },
  { key: 'stoneColor', label: 'Stone Colour' },
  { key: 'cut', label: 'Cut' },
  { key: 'count', label: 'Count' },
  { key: 'carat', label: 'Carat' },
  { key: 'size', label: 'Size' },
]

export const toSpecRows = (specs: ProductSeed['specs']): { label: string; value: string }[] =>
  specLabels
    .filter(({ key }) => specs[key])
    .map(({ key, label }) => ({ label, value: specs[key]! }))

export const productSeeds: ProductSeed[] = [
  {
    name: 'Vasanti Bridal Necklace',
    slug: 'vasanti-bridal-necklace',
    section: 'jewellery',
    metal: 'yellow-gold',
    category: 'necklaces',
    imageUrl:
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80',
    price: 485000,
    available: true,
    featured: true,
    description:
      'A statement bridal necklace with a cascading floral motif, hand-set with Ceylon sapphires.',
    story:
      'Designed after the temple flowers strung for Kandyan weddings, reimagined in 18k gold for a modern bride.',
    specs: {
      material: '18k yellow gold',
      stoneType: 'Ceylon Blue Sapphire',
      stoneColor: 'Cornflower blue',
      cut: 'Oval mixed cut',
      count: '1 centre + 24 accent',
      carat: '6.2ct total',
      size: 'Length 42cm, adjustable to 46cm',
    },
  },
  {
    name: 'Ariya Halo Ring',
    slug: 'ariya-halo-ring',
    section: 'jewellery',
    metal: 'white-gold',
    category: 'rings',
    imageUrl:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80',
    price: 265000,
    available: true,
    featured: true,
    description:
      'A classic halo engagement ring in polished white gold with a brilliant-cut centre stone.',
    story:
      "Named for the Sinhala word for 'light' — the halo setting is designed to throw maximum sparkle.",
    specs: {
      material: '18k white gold',
      stoneType: 'Natural Diamond',
      stoneColor: 'F colour, VS1',
      cut: 'Round brilliant',
      count: '1 centre + 16 halo',
      carat: '0.9ct total',
      size: 'Ring size 52 (adjustable)',
    },
  },
  {
    name: 'Ruvina Drop Earrings',
    slug: 'ruvina-drop-earrings',
    section: 'jewellery',
    metal: 'rose-gold',
    category: 'earrings',
    imageUrl:
      'https://images.unsplash.com/photo-1608042314453-ae338d80c427?auto=format&fit=crop&w=900&q=80',
    price: 142000,
    available: true,
    featured: true,
    description:
      'Delicate drop earrings in warm rose gold, finished with a brushed matte texture.',
    story: 'Inspired by the soft pink of a Colombo sunset over the Galle Face promenade.',
    specs: {
      material: '18k rose gold',
      stoneType: 'Morganite',
      stoneColor: 'Peach pink',
      cut: 'Pear cut',
      count: '2',
      carat: '1.4ct total',
      size: 'Drop length 3.2cm',
    },
  },
  {
    name: 'Sisira Bangle',
    slug: 'sisira-bangle',
    section: 'jewellery',
    metal: 'yellow-gold',
    category: 'bracelets',
    imageUrl:
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=80',
    price: 198000,
    available: false,
    featured: true,
    description: 'A solid hinged bangle with a hand-engraved lattice pattern.',
    story: 'The lattice is drawn from the wood-carved window screens of old Galle Fort homes.',
    specs: {
      material: '22k yellow gold',
      size: 'Inner diameter 6cm',
    },
  },
  {
    name: 'Devindi Pendant',
    slug: 'devindi-pendant',
    section: 'jewellery',
    metal: 'white-gold',
    category: 'pendants',
    imageUrl:
      'https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=900&q=80',
    price: 176000,
    available: true,
    featured: true,
    description:
      'A single solitaire pendant on a fine cable chain, designed for everyday wear.',
    story:
      'Our best-selling silhouette — simple enough for the office, luminous enough for evening.',
    specs: {
      material: '18k white gold',
      stoneType: 'Natural Diamond',
      stoneColor: 'G colour, VS2',
      cut: 'Round brilliant',
      count: '1',
      carat: '0.5ct',
      size: 'Chain length 45cm',
    },
  },
  {
    name: 'Kanchana Tennis Bracelet',
    slug: 'kanchana-tennis-bracelet',
    section: 'jewellery',
    metal: 'rose-gold',
    category: 'bracelets',
    imageUrl:
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=900&q=80',
    price: 610000,
    available: true,
    featured: true,
    description:
      'A line of graduated round stones set in rose gold, secured with a hidden box clasp.',
    story: "A modern take on a house classic first made for a client's 25th wedding anniversary.",
    specs: {
      material: '18k rose gold',
      stoneType: 'Natural Diamond',
      stoneColor: 'G-H colour, VS',
      cut: 'Round brilliant',
      count: '38',
      carat: '4.1ct total',
      size: 'Length 17.5cm',
    },
  },
  {
    name: 'Loose Natural Diamond — 1.02ct',
    slug: 'loose-natural-diamond-1-02ct',
    section: 'gems',
    metal: null,
    category: 'natural-diamonds',
    imageUrl:
      'https://images.unsplash.com/photo-1600267175161-cfaa711b4a81?auto=format&fit=crop&w=900&q=80',
    price: 890000,
    available: true,
    featured: false,
    description:
      'GIA-certified loose diamond, sold with certificate, available to set in any of our mountings.',
    story: 'Sourced through our long-standing Antwerp partner and cut for maximum brilliance.',
    specs: {
      material: 'Unset',
      stoneType: 'Natural Diamond',
      stoneColor: 'F colour, VS1',
      cut: 'Round brilliant',
      count: '1',
      carat: '1.02ct',
      size: 'Diameter 6.5mm',
    },
  },
  {
    name: 'Ceylon Blue Sapphire — 3.4ct',
    slug: 'ceylon-blue-sapphire-3-4ct',
    section: 'gems',
    metal: null,
    category: 'precious-stones',
    imageUrl:
      'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=900&q=80',
    price: 720000,
    available: true,
    featured: false,
    description:
      'An unheated Ceylon sapphire in a rich cornflower blue, with a GIA origin report.',
    story:
      'Cut in Ratnapura from rough mined in the same region — a stone that never left Sri Lanka.',
    specs: {
      material: 'Unset',
      stoneType: 'Ceylon Sapphire',
      stoneColor: 'Cornflower blue',
      cut: 'Cushion cut',
      count: '1',
      carat: '3.4ct',
      size: '9.8 x 8.1mm',
    },
  },
  {
    name: 'Amethyst Cluster Earrings',
    slug: 'amethyst-cluster-earrings',
    section: 'gems',
    metal: null,
    category: 'semi-precious-stones',
    imageUrl:
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=900&q=80',
    price: 64000,
    available: true,
    featured: false,
    description:
      'Playful cluster earrings set with faceted amethyst in a bright white gold setting.',
    story: 'Part of our colour capsule, designed to be worn stacked with our gold hoops.',
    specs: {
      material: '18k white gold',
      stoneType: 'Amethyst',
      stoneColor: 'Deep violet',
      cut: 'Mixed brilliant',
      count: '12',
      carat: '3.8ct total',
      size: '1.6cm diameter',
    },
  },
  {
    name: 'Hammered Silver Cuff',
    slug: 'hammered-silver-cuff',
    section: 'silver',
    metal: null,
    category: 'silver-articles',
    imageUrl:
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=80',
    price: 28500,
    available: true,
    featured: false,
    description: 'A hand-hammered sterling silver cuff with a matte brushed finish.',
    story: 'Made in-house on the same benches our goldsmiths have used for three generations.',
    specs: {
      material: '925 sterling silver',
      size: 'Adjustable, one size',
    },
  },
  {
    name: 'Silver Betel Leaf Tray',
    slug: 'silver-betel-leaf-tray',
    section: 'silver',
    metal: null,
    category: 'silver-articles',
    imageUrl:
      'https://images.unsplash.com/photo-1600180546523-4c1a0c7d7a4a?auto=format&fit=crop&w=900&q=80',
    price: 46000,
    available: true,
    featured: false,
    description:
      'A traditional silver bulath tray, hand-repoussé with a betel leaf border, for ceremonies and gifting.',
    story: "A shape passed down from our founder's original silversmithing workshop in Pettah.",
    specs: {
      material: '925 sterling silver',
      size: '18cm diameter',
    },
  },
  {
    name: 'Bespoke Design Consultation',
    slug: 'bespoke-design-consultation',
    section: 'custom',
    metal: null,
    category: 'custom-jewellery',
    imageUrl:
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=900&q=80',
    price: null,
    available: true,
    featured: false,
    description:
      'Sit with our designers to create a one-of-a-kind piece, from sketch to finished jewel.',
    story:
      'Every custom commission starts with your story — an heirloom stone, a proposal, a milestone.',
    specs: {
      material: 'Your choice',
      stoneType: 'Your choice',
      size: 'Made to your measurements',
    },
  },
]

/* ------------------------------------------------------------------ */
/*  Lexical rich text helpers                                          */
/* ------------------------------------------------------------------ */

export const textNode = (text: string) => ({
  type: 'text',
  detail: 0,
  format: 0,
  mode: 'normal',
  style: '',
  text,
  version: 1,
})

export const paragraph = (text: string) => ({
  type: 'paragraph',
  children: [textNode(text)],
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  textFormat: 0,
  version: 1,
})

export const heading = (text: string, tag: 'h2' | 'h3' | 'h4' = 'h2') => ({
  type: 'heading',
  children: [textNode(text)],
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  tag,
  version: 1,
})

export const richText = (nodes: unknown[]) =>
  ({
    root: {
      type: 'root',
      children: nodes,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
    // Cast: seed-authored lexical JSON matches the runtime shape
  }) as any // eslint-disable-line @typescript-eslint/no-explicit-any
