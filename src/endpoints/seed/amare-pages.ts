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
  meta: {
    title: 'AMARÉ Jewellers — Fine Jewellery, Colombo',
    description:
      'Fine jewellery crafted in Colombo. Yellow, white and rose gold, Ceylon gems, silver articles and custom commissions.',
    image: args.metaImage.id,
  },
})

export const jewelleryPage = (): RequiredDataFromCollectionSlug<'pages'> => ({
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
})

export const gemsPage = (): RequiredDataFromCollectionSlug<'pages'> => ({
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
})

export const silverPage = (): RequiredDataFromCollectionSlug<'pages'> => ({
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
})

export const customPage = (args: {
  enquiryForm: Form
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
})

export const aboutPage = (): RequiredDataFromCollectionSlug<'pages'> => ({
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
            heading('About AMARÉ', 'h2'),
            paragraph(
              'AMARÉ began as a small goldsmithing workshop in Colombo and has grown into a three-generation family atelier. We design and hand-finish every piece ourselves — from loose Ceylon gems to the finished ring, necklace or bangle you wear.',
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
})

export const contactPage = (args: {
  contactForm: Form
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
})
