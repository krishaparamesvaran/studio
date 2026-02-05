'use server';

/**
 * @fileOverview Generates personalized feature explanations based on the user's business type.
 *
 * - `generatePersonalizedFeatureExplanations` - A function that generates tailored explanations of key features.
 * - `PersonalizedFeatureExplanationsInput` - The input type for the `generatePersonalizedFeatureExplanations` function.
 * - `PersonalizedFeatureExplanationsOutput` - The return type for the `generatePersonalizedFeatureExplanations` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BusinessType = z.enum(['ecommerce', 'saas', 'marketing', 'other']);

const PersonalizedFeatureExplanationsInputSchema = z.object({
  email: z.string().email().describe('The user email address.'),
  featureName: z.string().describe('The name of the feature to explain.'),
});
export type PersonalizedFeatureExplanationsInput = z.infer<typeof PersonalizedFeatureExplanationsInputSchema>;

const PersonalizedFeatureExplanationsOutputSchema = z.object({
  explanation: z.string().describe('A personalized explanation of the feature.'),
});
export type PersonalizedFeatureExplanationsOutput = z.infer<typeof PersonalizedFeatureExplanationsOutputSchema>;

export async function generatePersonalizedFeatureExplanations(
  input: PersonalizedFeatureExplanationsInput
): Promise<PersonalizedFeatureExplanationsOutput> {
  return personalizedFeatureExplanationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedFeatureExplanationsPrompt',
  input: {schema: PersonalizedFeatureExplanationsInputSchema},
  output: {schema: PersonalizedFeatureExplanationsOutputSchema},
  prompt: `You are an expert at explaining software features in a way that is easy to understand for different types of businesses.\n  Given the user's email and the feature name, generate a personalized explanation of the feature that highlights its benefits for their specific business type.\n
  Email: {{{email}}}
  Feature Name: {{{featureName}}}

  Business Type: {{businessType}}\n\n  Explanation:`, // Removed the curly braces around the entire Explanation since that is not how it is used.
  // Adding safety settings to moderate hate speech, dangerous content, harassment and sexually explicit content.
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const personalizedFeatureExplanationsFlow = ai.defineFlow(
  {
    name: 'personalizedFeatureExplanationsFlow',
    inputSchema: PersonalizedFeatureExplanationsInputSchema,
    outputSchema: PersonalizedFeatureExplanationsOutputSchema,
  },
  async input => {
    const domain = input.email.split('@')[1];
    let businessType: BusinessType = 'other';

    if (domain.includes('gmail.com') || domain.includes('yahoo.com')) {
      businessType = 'other';
    } else if (domain.includes('shopify.com') || domain.includes('etsy.com')) {
      businessType = 'ecommerce';
    } else if (domain.includes('salesforce.com') || domain.includes('hubspot.com')) {
      businessType = 'saas';
    } else if (domain.includes('mailchimp.com') || domain.includes('pardot.com')) {
      businessType = 'marketing';
    }

    const {output} = await prompt({...input, businessType});
    return output!;
  }
);
