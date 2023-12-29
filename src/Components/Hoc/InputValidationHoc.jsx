import React from "react";
// Function to validate input fields
const validateInputs = (data) => {
  const errors = {};

  // Validation for AccountName: Should not be empty and allow only alphabets
  if (!data.AccountName) {
    errors.AccountName = "Account Name is required.";
  } else if (!/^[A-Za-z]+$/.test(data.AccountName)) {
    errors.AccountName = "Invalid Formate.";
  }

  // Validation for Vpa: Should not be empty and should match a specific pattern (adjust pattern as needed)
  if (!data.Vpa) {
    errors.Vpa = "VPA is required.";
  } else if (!/^[a-zA-Z0-9.@_-]+$/.test(data.Vpa)) {
    errors.Vpa = "Invalid VPA format.";
  }

  // Validation for Default: Should not be empty
  if (!data.Default) {
    errors.Default = "Default value is required.";
  }

  return errors;
};

// Higher Order Component (HOC) for input validation
const InputValidationHoc = (ReuseComponent) => {
  const ReusableInputValidation = (props) => {
    const [upiFundAccountInputErrors, setupiFundAccountInputErrors] =
      React.useState({});

    // Handler function to perform input validations
    const HandleInputUpi = (UpiFundFrominputData) => {
      // Validate input fields
      const errors = validateInputs(UpiFundFrominputData);

      // Update the state with validation errors
      setupiFundAccountInputErrors(errors);

      // Return whether the form is valid based on the errors object
      return Object.keys(errors).length === 0;
    };

    return (
      <ReuseComponent
        {...props}
        upiFundAccountInputErrors={upiFundAccountInputErrors}
        HandleInputUpi={HandleInputUpi}
      />
    );
  };

  return React.memo(ReusableInputValidation);
};

export default InputValidationHoc;
