# react_stuff

A collection of react utilities. To install:

Using bun:
```bash
bun add github:triggernz/react_stuff
```

Using npm:
```bash
npm install github:triggernz/react_stuff
# or
npm install triggernz/react_stuff
```

Using yarn:
```bash
yarn add github:triggernz/react_stuff
# or
yarn add triggernz/react_stuff
```

You can also install directly from GitHub using the full URL:
```bash
# npm
npm install https://github.com/triggernz/react_stuff

# yarn
yarn add https://github.com/triggernz/react_stuff
```

# Usage

## State Management Evolution

Here's an example of how to evolve state management in a React component, from multiple useState calls to a more organized approach using `useDerivedStateField`.

### 1. Initial Implementation with Multiple useState

```tsx
import React, { useState } from 'react';

interface UserFormState {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
}

const UserForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ firstName, lastName, email, age });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
      />
      <input
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
        placeholder="Age"
      />
      <button type="submit">Submit</button>
    </form>
  );
};
```

### 2. Refactored with useDerivedStateField

```tsx
import React from 'react';
import { useDerivedStateField } from 'react_stuff';

interface UserFormState {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
}

const UserForm = () => {
  const [state, setState] = React.useState<UserFormState>({
    firstName: '',
    lastName: '',
    email: '',
    age: 0
  });

  const [firstName, setFirstName] = useDerivedStateField(state, 'firstName', setState);
  const [lastName, setLastName] = useDerivedStateField(state, 'lastName', setState);
  const [email, setEmail] = useDerivedStateField(state, 'email', setState);
  const [age, setAge] = useDerivedStateField(state, 'age', setState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(state);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
      />
      <input
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
        placeholder="Age"
      />
      <button type="submit">Submit</button>
    </form>
  );
};
```

### 3. Lifted State with Custom Hook

```tsx
import React from 'react';
import { useDerivedStateField } from 'react_stuff';

interface UserFormState {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
}

// Custom hook to manage form state
const useUserForm = (initialState: UserFormState = {
  firstName: '',
  lastName: '',
  email: '',
  age: 0
}) => {
  const [state, setState] = React.useState<UserFormState>(initialState);

  const [firstName, setFirstName] = useDerivedStateField(state, 'firstName', setState);
  const [lastName, setLastName] = useDerivedStateField(state, 'lastName', setState);
  const [email, setEmail] = useDerivedStateField(state, 'email', setState);
  const [age, setAge] = useDerivedStateField(state, 'age', setState);

  return {
    state,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    age,
    setAge
  };
};

// Parent component that manages the state
const UserFormContainer = () => {
  const form = useUserForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form.state);
  };

  return <UserForm form={form} onSubmit={handleSubmit} />;
};

// Presentational component
const UserForm = ({ 
  form, 
  onSubmit 
}: { 
  form: ReturnType<typeof useUserForm>;
  onSubmit: (e: React.FormEvent) => void;
}) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        value={form.firstName}
        onChange={(e) => form.setFirstName(e.target.value)}
        placeholder="First Name"
      />
      <input
        value={form.lastName}
        onChange={(e) => form.setLastName(e.target.value)}
        placeholder="Last Name"
      />
      <input
        value={form.email}
        onChange={(e) => form.setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="number"
        value={form.age}
        onChange={(e) => form.setAge(Number(e.target.value))}
        placeholder="Age"
      />
      <button type="submit">Submit</button>
    </form>
  );
};
```

This example demonstrates:
1. Starting with multiple `useState` calls for each field
2. Refactoring to use a single state object with `useDerivedStateField` for type-safe field access
3. Lifting the state management into a custom hook for reusability and separation of concerns

The final version provides several benefits:
- Type-safe state management
- Centralized state logic in a custom hook
- Separation of concerns between state management and presentation
- Reusable form logic that can be shared across components
- Easier testing and maintenance



