// app/actions/login.ts
'use me';
'use server';

import { signIn } from '@/lib/auth';
import { AuthError } from 'next-auth';

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Please provide both email and password.' };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/admin/farms', // Redirect URL after successful login
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid email or password.' };
        default:
          return { error: 'Something went wrong. Please try again.' };
      }
    }
    // Re-throw redirect response errors (required by Next.js navigation)
    throw error;
  }
}