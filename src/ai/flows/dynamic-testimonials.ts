'use server';
/**
 * @fileOverview Dynamically generates testimonials based on user context.
 *
 * - generateDynamicTestimonials - A function that generates testimonials.
 * - GenerateDynamicTestimonialsInput - The input type for the generateDynamicTestimonials function.
 * - GenerateDynamicTestimonialsOutput - The return type for the generateDynamicTestimonials function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDynamicTestimonialsInputSchema = z.object({
  industry: z.string().describe('The industry of the potential customer.'),
  useCase: z.string().describe('The specific use case of the product for the customer.'),
});
export type GenerateDynamicTestimonialsInput = z.infer<typeof GenerateDynamicTestimonialsInputSchema>;

const GenerateDynamicTestimonialsOutputSchema = z.object({
  testimonial1: z.string().describe('A dynamically generated testimonial.'),
  testimonial2: z.string().describe('A dynamically generated testimonial.'),
  testimonial3: z.string().describe('A dynamically generated testimonial.'),
});
export type GenerateDynamicTestimonialsOutput = z.infer<typeof GenerateDynamicTestimonialsOutputSchema>;

export async function generateDynamicTestimonials(input: GenerateDynamicTestimonialsInput): Promise<GenerateDynamicTestimonialsOutput> {
  return generateDynamicTestimonialsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDynamicTestimonialsPrompt',
  input: {schema: GenerateDynamicTestimonialsInputSchema},
  output: {schema: GenerateDynamicTestimonialsOutputSchema},
  prompt: `You are an expert at writing compelling customer testimonials for a SaaS product.  The testimonials should sound authentic and highlight the value of the product for the customer.

  Generate three different testimonials based on the following information:

  Industry: {{{industry}}}
  Use Case: {{{useCase}}}

  Testimonial 1:
  Testimonial 2:
  Testimonial 3:`,
});

const generateDynamicTestimonialsFlow = ai.defineFlow(
  {
    name: 'generateDynamicTestimonialsFlow',
    inputSchema: GenerateDynamicTestimonialsInputSchema,
    outputSchema: GenerateDynamicTestimonialsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
