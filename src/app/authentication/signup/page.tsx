'use client';

import { signup } from '@/app/actions/auth';
import React, { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Box, Button, TextField, Typography, CircularProgress } from '@mui/material';
import ProfileCropper from './profileCropper';
import { useRouter } from 'next/navigation';

export function SignupForm() {
  const { pending } = useFormStatus();
  const [state, action] = useFormState(signup, undefined);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
  const [croppedImage, setCroppedImage] = React.useState<string | null>(null);
  const router = useRouter(); // Hook to handle redirection

  useEffect(() => {
    if (state?.success) {
      router.push('/home'); // Redirect to home page on success
    } else if (state?.errors) {
      setErrors(state.errors);
    }
  }, [state?.success, state?.errors, router]);

  return (
    <Box sx={{ width: '100%', height: '100vh' }}>
      <Box
        component="form"
        action={action}
        sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 3, border: '1px solid #ddd', borderRadius: 2, backgroundColor: 'white' }}
      >
        <Typography fontFamily="LibreCaslon" fontWeight="900" letterSpacing="0.09em" fontSize="1.7rem" align="center" gutterBottom>
          Sign Up
        </Typography>

        {/* Display errors at the top of the form */}
        {Object.keys(errors).length > 0 && (
          <Box mb={2}>
            <Typography variant="body1" color="error">
              {Object.entries(errors).filter(([key, _message]) => ["databaseError", "general"].includes(key)).map(([key, message]) => (
                <div key={key}>
                  <Typography variant="body2" color="error" fontWeight="bold">
                    {key}:
                  </Typography>
                  <Typography variant="body2" color="error">
                    {message}
                  </Typography>
                </div>
              ))}
            </Typography>
          </Box>
        )}

        <Box mb={2}>
          <Typography variant="body1" fontFamily="LibreCaslon" fontSize="1.1rem" component="label" htmlFor="name" gutterBottom>
            Name
          </Typography>
          <TextField
            fullWidth
            id="name"
            name="name"
            placeholder="Name"
            error={!!errors.name}
            helperText={errors.name}
            disabled={pending} // Disable field while pending
          />
        </Box>

        <Box mb={2}>
          <Typography variant="body1" fontFamily="LibreCaslon" fontSize="1.1rem" component="label" htmlFor="email" gutterBottom>
            Email
          </Typography>
          <TextField
            fullWidth
            id="email"
            name="email"
            placeholder="Email"
            error={!!errors.email}
            helperText={errors.email}
            disabled={pending} // Disable field while pending
          />
        </Box>

        <Box mb={2}>
          <Typography variant="body1" fontFamily="LibreCaslon" fontSize="1.1rem" component="label" htmlFor="password" gutterBottom>
            Password
          </Typography>
          <TextField
            fullWidth
            id="password"
            name="password"
            type="password"
            error={!!errors.password}
            helperText={errors.password}
            disabled={pending} // Disable field while pending
          />
        </Box>

        <ProfileCropper croppedImage={croppedImage} setCroppedImage={setCroppedImage} />

        {/* Hidden input field for cropped image data */}
        <input type="hidden" id="profilePic" name="profilePic" value={croppedImage || ''} />

        <Button
          fullWidth
          variant="contained"
          disabled={pending} // Disable button while pending
          type="submit"
          sx={{ mt: 2, position: 'relative' }}
        >
          {pending && <CircularProgress size={24} sx={{ position: 'absolute', left: '50%', top: '50%', marginLeft: '-12px', marginTop: '-12px' }} />}
          Sign Up
        </Button>
      </Box>
    </Box>
  );
}

export default SignupForm;
