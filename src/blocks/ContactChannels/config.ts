import type { Block } from 'payload'

export const ContactChannels: Block = {
  slug: 'contactChannels',
  interfaceName: 'ContactChannelsBlock',
  labels: {
    singular: 'Contact Channels',
    plural: 'Contact Channels',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: "We'd Love to Hear From You",
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Contact Us',
    },
  ],
}
