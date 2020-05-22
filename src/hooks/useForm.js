import { useState, useEffect } from 'react';

export const useForm = (callback, shape) => {
  const initialValues = Object.entries(shape).reduce((acc, [key, field]) => {
    return { ...acc, [key]: field.default };
  }, {});
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked, type  } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setValues((prevState) => ({ ...prevState, [name]: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    callback(values);
  };

  const validate = () => {
    setErrors([]);
    let errors = [];

    const addError = ({ path, message }) => {
      return [...errors.filter((e) => e.path !== path), { path, message }];
    };

    Object.entries(shape).forEach(([key, field]) => {
      const { validate, message } = field;

      if (validate) {
        Object.entries(validate).forEach(([k, v]) => {
       
          if (k === 'type') {
            if (v === 'number' && isNaN(values[key])) {
              errors = addError({ path: key, message });
            }
            if (v === 'string' && !isNaN(values[key])) {
              errors = addError({ path: key, message });
            }
          }
  
          if (k === 'required') {
            if (v === true && !values[key].length) {
              errors = addError({ path: key, message });
            }
          }
  
          if (k === 'lte') {
            if (parseFloat(values[key]) > parseFloat(values[v])) {
              errors = addError({ path: key, message });
            }
          }
  
          if (k === 'gte') {
            if (parseFloat(values[key]) < parseFloat(values[v])) {
              errors = addError({ path: key, message });
            }
          }
        });
     
      }
    });
    setErrors(errors);
  };

  useEffect(() => {
    validate();
  }, [values]); // eslint-disable-line react-hooks/exhaustive-deps

  return { values, handleChange, handleSubmit, errors, isSubmitted };
};
