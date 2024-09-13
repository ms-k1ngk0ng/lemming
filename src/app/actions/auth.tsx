import bcrypt from 'bcryptjs';
import { SignupFormSchema, FormState } from '@/lib/definitions'

export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    profilePic: formData.get('profilePic')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password, profilePic } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const response = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password: hashedPassword,
        profilePic,
      }),
    });

    const result = await response.json();

    if (response.ok && result) {
      return { success: true };
    } else {
      // If the API returns errors as non-array strings
      return {
        errors: { databaseError: [result.error || 'An error occurred while creating the user.'] },
      };
    }
  } catch (error) {
    console.error('Error during signup:', error);
    return {
      errors: { general: ['An error occurred while creating your account.'] },
    };
  }
}
