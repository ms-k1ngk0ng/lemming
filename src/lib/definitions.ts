import { date, z } from 'zod';

// Define the schema for the signup form
export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
  profilePic: z
    .string()
    .optional() // Make profilePicture optional
    .refine((dataUrl) => {

       if (dataUrl !== undefined) return true;

      // Validate the base64 data URL format
      const base64Regex = /^data:image\/[a-zA-Z]+;base64,[a-zA-Z0-9+/=]+$/;
      return base64Regex.test(dataUrl || '');
    }, { message: 'Invalid image format or data.' })
    .refine((dataUrl) => {

       if (dataUrl !== undefined) return true;

      // Check size of image (client-side validation, may need server-side check)
      const base64Data = (dataUrl || '').split(',')[1];
      const imageSize = (base64Data.length * 3) / 4 - (base64Data.endsWith('==') ? 2 : base64Data.endsWith('=') ? 1 : 0);
      return imageSize <= 2 * 1024 * 1024; // Max 2MB
    }, { message: 'File size must be less than 2MB.' })
});

// Update the form state type to include profile picture errors
export type FormState =
  | {
      errors?: {
        name?: string;
        email?: string;
        password?: string;
        profilePic?: string;
        databaseError?: string; // For handling specific user creation errors
        general?: string; // For handling general errors
      };
      message?: string;
    }
  | undefined;