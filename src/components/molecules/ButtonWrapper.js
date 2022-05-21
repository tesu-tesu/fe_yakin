import React from 'react';
import Button from '@mui/material/Button';
import { useFormikContext } from 'formik';

export const ButtonWrapper = ({
  children,
  variant,
  color,
  fullWidth,
  size,
  ...otherProps
}) => {
  const { submitForm } = useFormikContext();

  const handleSubmit = () => {
    submitForm();
  }

  const configButton = {
    variant: variant,
    color: color,
    fullWidth: fullWidth,
    size: size,
    onClick: handleSubmit
  }

  return (
    <Button
      {...configButton}
    >
      {children}
    </Button>
  );
};
