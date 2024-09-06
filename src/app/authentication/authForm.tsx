// components/AuthForm.tsx
"use client";

import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

type AuthFormProps = {
  type: 'login' | 'signup';
  onSubmit: (email: string, password: string, name?: string, photo?: File) => void;
};

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState<File | undefined>();
  const [photoName, setPhotoName] = useState<string>(''); // For displaying the photo name

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password, name, photo);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhoto(e.target.files[0]);
      setPhotoName(e.target.files[0].name); // Update the displayed photo name
    }
  };

  return (
    <Container maxWidth="xs">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          {type === 'login' ? 'Login' : 'Signup'}
        </Typography>
        {type === 'signup' && (
          <>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ mt: 2 }}
            >
              Upload Photo
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
              />
            </Button>
            {photoName && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected: {photoName}
              </Typography>
            )}
          </>
        )}
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth
          sx={{ mt: 2 }}
        >
          {type === 'login' ? 'Login' : 'Signup'}
        </Button>
      </Box>
    </Container>
  );
};

export default AuthForm;
