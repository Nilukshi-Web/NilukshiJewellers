import type { RequiredDataFromCollectionSlug } from 'payload'

import type { Form, Media } from '@/payload-types'

import { heading, paragraph, richText } from './amare-data'

export const homePage = (args: {
  heroImages: Media[]
  metaImage: Media
}): RequiredDataFromCollectionSlug<'pages'> => ({
  title: 'Home',
  slug: 'home',
  _status: 'published',
  hero: { type: 'none' },
  layout: [
    {
      blockType: 'heroCarousel',
      eyebrow: 'Est. Colombo',
      heading: 'Jewellery for every chapter of your story',
      subheading: 'Yellow, white and rose gold — handcrafted, gem-set, made to keep.',
      slides: args.heroImages.map((image) => ({ image: image.id })),
      links: [
        {
          link: {
            type: 'custom',
            url: '/jewellery',
            label: 'Explore Jewellery',
            appearance: 'default',
          },
        },
        {
          link: {
            type: 'custom',
            url: '/custom',
            label: 'Start a Custom Piece',
            appearance: 'outline',
          },
        },
      ],
    },
    {
      blockType: 'metalShowcase',
      ctaLabel: 'Shop now',
    },
    {
      blockType: 'featuredProducts',
      eyebrow: 'Handpicked',
      title: "This Season's Edit",
      populateBy: 'featured',
      limit: 6,
    },
    {
      blockType: 'promoStrip',
      heading: 'Natural Diamonds & Precious Stones',
      text: 'GIA-certified stones, set in-house or sold loose.',
      links: [
        {
          link: {
            type: 'custom',
            url: '/gems',
            label: 'View Gems',
            appearance: 'outline',
          },
        },
      ],
    },
  ],
  // Meta titles are seeded without the brand name — generateMeta() appends
  // " | NILUKSHI Jewellers" to every page title.
  meta: {
    title: 'Fine Jewellery Handcrafted in Colombo',
    description:
      'Fine jewellery crafted in Colombo. Yellow, white and rose gold, Ceylon gems, silver articles and custom commissions, made to order in our atelier.',
    image: args.metaImage.id,
  },
})

export const jewelleryPage = (args: {
  metaImage: Media
}): RequiredDataFromCollectionSlug<'pages'> => ({
  title: 'Jewellery',
  slug: 'jewellery',
  _status: 'published',
  hero: { type: 'none' },
  layout: [
    {
      blockType: 'productCatalog',
      section: 'jewellery',
      title: 'Jewellery',
      emptyStateText: 'No pieces here yet — check back soon.',
    },
  ],
  meta: {
    title: 'Gold Jewellery — Rings & Necklaces',
    description:
      'Handcrafted 18k and 22k gold jewellery in yellow, white and rose tones — rings, necklaces, bangles, earrings and pendants, gem-set in Colombo.',
    image: args.metaImage.id,
  },
})

export const gemsPage = (args: { metaImage: Media }): RequiredDataFromCollectionSlug<'pages'> => ({
  title: 'Gems',
  slug: 'gems',
  _status: 'published',
  hero: { type: 'none' },
  layout: [
    {
      blockType: 'productCatalog',
      section: 'gems',
      title: 'Gems',
      intro:
        'Natural diamonds, precious and semi-precious stones — GIA-certified, set in-house or sold loose.',
      emptyStateText: 'No stones here yet — check back soon.',
    },
  ],
  meta: {
    title: 'Ceylon Gems & Natural Diamonds',
    description:
      'Natural diamonds, Ceylon sapphires and precious and semi-precious stones — GIA-certified, sold loose or set in-house by our Colombo goldsmiths.',
    image: args.metaImage.id,
  },
})

export const silverPage = (args: { metaImage: Media }): RequiredDataFromCollectionSlug<'pages'> => ({
  title: 'Silver Articles',
  slug: 'silver',
  _status: 'published',
  hero: { type: 'none' },
  layout: [
    {
      blockType: 'productCatalog',
      section: 'silver',
      title: 'Silver Articles',
      intro:
        'Our silversmiths continue a long tradition of ceremonial silver articles, hand-made in our workshop.',
      emptyStateText: 'No pieces here yet — check back soon.',
    },
  ],
  meta: {
    title: 'Ceremonial Silver Articles',
    description:
      'Hand-made ceremonial silver, from betel trays to keepsake gifts — crafted in our Colombo workshop by silversmiths continuing a long tradition.',
    image: args.metaImage.id,
  },
})

export const customPage = (args: {
  enquiryForm: Form
  metaImage: Media
}): RequiredDataFromCollectionSlug<'pages'> => ({
  title: 'Custom Jewellery',
  slug: 'custom',
  _status: 'published',
  hero: { type: 'none' },
  layout: [
    {
      blockType: 'customCommission',
      eyebrow: 'Made to Order',
      title: 'Custom Jewellery',
      lede: 'Bring us a sketch, an heirloom stone, or just an idea. Our designers will turn it into a piece made only for you — from first drawing to final polish.',
      ctaLabel: 'Start on WhatsApp',
      recentTitle: 'Recent Custom Work',
      limit: 8,
    },
    {
      blockType: 'formBlock',
      form: args.enquiryForm,
      enableIntro: true,
      introContent: richText([heading('Or send us your idea', 'h3')]),
    },
  ],
  meta: {
    title: 'Custom Jewellery & Commissions',
    description:
      'Bring us a sketch, an heirloom stone or just an idea. Our designers craft one-of-a-kind pieces from first drawing to final polish, made only for you.',
    image: args.metaImage.id,
  },
})

export const aboutPage = (args: { metaImage: Media }): RequiredDataFromCollectionSlug<'pages'> => ({
  title: 'About Us',
  slug: 'about',
  _status: 'published',
  hero: { type: 'none' },
  layout: [
    {
      blockType: 'content',
      columns: [
        {
          size: 'twoThirds',
          richText: richText([
            heading('About NILUKSHI', 'h2'),
            paragraph(
              'NILUKSHI began as a small goldsmithing workshop in Colombo and has grown into a three-generation family atelier. We design and hand-finish every piece ourselves — from loose Ceylon gems to the finished ring, necklace or bangle you wear.',
            ),
            paragraph(
              'We work in 18k and 22k gold across yellow, white and rose tones, alongside a dedicated gem room for natural diamonds and precious and semi-precious stones. Alongside fine jewellery, our silversmiths continue a long tradition of ceremonial silver articles. For anything one-of-a-kind, our custom jewellery studio takes commissions from first sketch to final polish.',
            ),
            paragraph(
              'Fine jewellery crafted in Colombo, worn everywhere. Each piece is made to order by our in-house goldsmiths.',
            ),
          ]),
        },
      ],
    },
  ],
  meta: {
    title: 'About Our Colombo Atelier',
    description:
      'A three-generation family atelier in Colombo. We design and hand-finish every piece ourselves, from loose Ceylon gems to the ring you wear.',
    image: args.metaImage.id,
  },
})

export const contactPage = (args: {
  contactForm: Form
  metaImage: Media
}): RequiredDataFromCollectionSlug<'pages'> => ({
  title: 'Contact',
  slug: 'contact',
  _status: 'published',
  hero: { type: 'none' },
  layout: [
    {
      blockType: 'contactChannels',
      eyebrow: "We'd Love to Hear From You",
      title: 'Contact Us',
    },
    {
      blockType: 'formBlock',
      form: args.contactForm,
      enableIntro: true,
      introContent: richText([heading('Send us a message', 'h3')]),
    },
  ],
  meta: {
    title: 'Contact & Showroom in Colombo 07',
    description:
      'Visit our showroom at 24 Ward Place, Colombo 07, or reach us by phone and WhatsApp. Open Monday to Saturday, 10am to 7pm.',
    image: args.metaImage.id,
  },
})
