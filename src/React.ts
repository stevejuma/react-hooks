export type Component = (props: any) => {
  render: (element: HTMLElement) => void;
};
type HookState = {
  hookStates: any[];
  hookIndex: number;
  component: Component;
  container: HTMLElement;
};

export const React = (function () {
  const componentsMap = new Map<Function, HookState>();
  let activeComponent: HookState | null;

  return {
    render(currentComponent: HookState) {
      setTimeout(
        () =>
          this.mount(currentComponent.component, currentComponent.container),
        0,
      );
    },

    mount(
      component: Component,
      container: HTMLElement,
      props: Record<string, any> = {},
    ) {
      if (!componentsMap.has(component)) {
        componentsMap.set(component, {
          hookStates: [],
          hookIndex: 0,
          component,
          container,
        });
      }

      activeComponent = componentsMap.get(component)!;
      activeComponent.hookIndex = 0;
      activeComponent.container = container;
      activeComponent.component = component;
      container.innerHTML = "";
      component(props).render(container);
      console.log(component.name, activeComponent.hookStates);
    },

    useState<T>(
      initialValue?: T,
    ): [T, (newValue: T | ((prevValue: T) => T)) => void] {
      if (!activeComponent)
        throw new Error("Hooks can only be called inside a component");
      const currentComponent = activeComponent!;
      const currentIndex = currentComponent.hookIndex;

      // Initialize the state if it's the first time this hook is run
      currentComponent.hookStates[currentIndex] =
        currentComponent.hookStates[currentIndex] ?? initialValue;

      // Update hook index for the next hook call
      currentComponent.hookIndex++;

      // Function to update state and re-render
      const setState = (newValue: T | ((prevValue: T) => T)) => {
        currentComponent.hookStates[currentIndex] =
          typeof newValue === "function"
            ? (newValue as (prevValue: T) => T)(
                currentComponent!.hookStates[currentIndex],
              )
            : newValue;
        React.render(currentComponent);
      };

      // exposing functions/values for external use
      return [currentComponent.hookStates[currentIndex], setState];
    },

    useEffect(callback: () => unknown, dependencies?: unknown[]) {
      if (!activeComponent)
        throw new Error("Hooks can only be called inside a component");
      const currentComponent = activeComponent!;
      const currentIndex = currentComponent.hookIndex;
      const previousDependencies = currentComponent.hookStates[
        currentIndex
      ] as { dependencies: unknown[]; cleanup: () => void };

      // Check if dependencies have changed
      let hasChanged = true;
      if (dependencies && previousDependencies) {
        hasChanged = dependencies.some(
          (dep, i) => dep !== previousDependencies.dependencies[i],
        );
      }

      if (hasChanged) {
        // Run cleanup function if it exists
        if (
          currentComponent.hookStates[currentIndex] &&
          currentComponent.hookStates[currentIndex].cleanup
        ) {
          currentComponent.hookStates[currentIndex].cleanup();
        }

        // Run the effect and store the cleanup function
        const cleanup = callback();
        currentComponent.hookStates[currentIndex] = { dependencies, cleanup };
      }
      currentComponent.hookIndex++;
    },

    useMemo<T>(factory: () => T, dependencies: any[]): T {
      if (!activeComponent)
        throw new Error("Hooks can only be called inside a component");
      const currentComponent = activeComponent!;
      const currentIndex = currentComponent.hookIndex;

      // Check if dependencies have changed
      const hasChanged = dependencies
        ? !dependencies.every(
            (dep, i) =>
              currentComponent!.hookStates[currentIndex]?.dependencies[i] ===
              dep,
          )
        : true;

      if (hasChanged) {
        // Recompute the value if dependencies have changed
        currentComponent.hookStates[currentIndex] = {
          value: factory(),
          dependencies,
        };
      }

      // Return the cached value
      const memoizedValue = currentComponent.hookStates[currentIndex].value;
      currentComponent.hookIndex++;
      return memoizedValue;
    },

    useRef<T>(initialValue: T) {
      if (!activeComponent)
        throw new Error("Hooks can only be called inside a component");
      const currentComponent = activeComponent!;
      const currentIndex = currentComponent.hookIndex;
      if (!currentComponent.hookStates[currentIndex]) {
        currentComponent.hookStates[currentIndex] = { current: initialValue };
      }

      currentComponent.hookIndex++;
      return currentComponent.hookStates[currentIndex];
    },
  };
})();

export const { useState, useEffect, useMemo, useRef, mount } = React;
