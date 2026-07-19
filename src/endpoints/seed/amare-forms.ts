import type { RequiredDataFromCollectionSlug } from 'payload'

import { heading, paragraph, richText } from './amare-data'

export const contactFormSeed: RequiredDataFromCollectionSlug<'forms'> = {
  title: 'Contact Form',
  confirmationType: 'message',
  confirmationMessage: richText([
    heading('Thank you — we’ve received your message.', 'h2'),
    paragraph('Our team will get back to you within one working day.'),
  ]),
  fields: [
    {
      blockType: 'text',
      name: 'name',
      label: 'Name',
      required: true,
      width: 50,
    },
    {
      blockType: 'email',
      name: 'email',
      label: 'Email',
      required: true,
      width: 50,
    },
    {
      blockType: 'text',
      name: 'phone',
      label: 'Phone / WhatsApp',
      required: false,
      width: 100,
    },
    {
      blockType: 'textarea',
      name: 'message',
      label: 'Message',
      required: true,
      width: 100,
    },
  ],
  submitButtonLabel: 'Send Message',
}

export const customEnquiryFormSeed: RequiredDataFromCollectionSlug<'forms'> = {
  title: 'Custom Commission Enquiry',
  confirmationType: 'message',
  confirmationMessage: richText([
    heading('Thank you — your commission enquiry is with us.', 'h2'),
    paragraph('One of our designers will contact you to arrange a consultation.'),
  ]),
  fields: [
    {
      blockType: 'text',
      name: 'name',
      label: 'Name',
      required: true,
      width: 50,
    },
    {
      blockType: 'text',
      name: 'phone',
      label: 'Phone / WhatsApp',
      required: true,
      width: 50,
    },
    {
      blockType: 'email',
      name: 'email',
      label: 'Email',
      required: false,
      width: 50,
    },
    {
      blockType: 'text',
      name: 'budget',
      label: 'Approximate Budget (LKR)',
      required: false,
      width: 50,
    },
    {
      blockType: 'textarea',
      name: 'idea',
      label: 'Tell us about your piece',
      required: true,
      width: 100,
    },
  ],
  submitButtonLabel: 'Send Enquiry',
}
