# useState

`useState` is a hook that allows you to add state to functional components. State is data that can
change over time, and when it changes, React re-renders the component.

## How it works:

- You call useState with an initial value.
- It returns an array with two things:
  - The current state value.
  - A function to update that state.

```typescript
import React, { useState } from 'react';

const Counter: React.FC = () => {
  // Declare a state variable called "count" with an initial value of 0
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      {/* Update the state when the button is clicked */}
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};

export default Counter;
```

## Explanation:

- `const [count, setCount] = useState<number>(0);`:
  - `count` is the current state value (starts at `0`).
  - `setCount` is the function to update count.

When the button is clicked, `setCount(count + 1)` updates the state, and React re-renders the component with the new value of count.

# useEffect

`useEffect` is a hook that lets you perform side effects in functional components. Side effects are things like fetching data, updating the DOM, or subscribing to events.

## How it works:

- You pass a function to `useEffect`. This function will run
  after the component renders.
- You can also specify a dependency array. If any value in the
  array changes, the effect will re-run.
  - An empty dependency array means the effect will only run once on mount
  - Not providing a dependency array means the effect will run everytime there
    is a change in the component.
- If the effect returns a function, then it will be executed everytime before the effect
  is run or when the component is unmounted.

```typescript
import React, { useState, useEffect } from 'react';

const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(0);

  // useEffect to update the timer every second
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []); // Empty dependency array means this effect runs only once (on mount)

  return (
    <div>
      <p>Timer: {seconds} seconds</p>
    </div>
  );
};

export default Timer;
```

## Explanation:

- `useEffect(() => { ... }, []);`:
  - The function inside useEffect runs after the component renders.
  - The empty dependency array `[]` means the effect runs only once
    (when the component mounts).
- `setInterval` updates the seconds state every second.

The cleanup function `() => clearInterval(interval)` ensures the interval is
cleared when the component unmounts, preventing memory leaks.

## `useMemo`

`useMemo` is a React hook that **memoizes** (caches) the result of a computation.
It helps optimize performance by avoiding expensive recalculations on every render.

#### Syntax:

```typescript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

- The first argument is a function that returns the computed value.
- The second argument is a dependency array. If any value in the array changes,
  the function re-runs. Otherwise, the cached value is returned.

## How React Tracks Hooks

React uses a **linked list of hooks** to associate state and effects with the correct component. Here’s how it works:

1. **First Render**:
   - React initialises the hooks list and assigns each hook a position in the list.
   - For example:
     `hooks = [useState1, useState2, useEffect1, useState3, ...]
2. **Subsequent Renders**:
   - React iterates through the hooks list in the same order as the first render.
   - This ensures that each hook call is associated with the correct state or effect.
3. **Re-rendering**:
   - When state changes, React re-renders the component and re-runs the hooks in the same order.
   - This ensures consistency between renders.

## Why Hook Order Matters

Since React relies on the order of hooks to associate them with the correct state or effect,
you **cannot call hooks conditionally**. For example:

```typescript
if (condition) {
  useState(0); // ❌ This breaks the hook order!
}
```

If the condition changes between renders, the hook order will be inconsistent, leading to bugs.
