import { lazy } from 'react';

/**
 * Enhanced lazy loading utility that handles errors
 * @param importFn - Dynamic import function
 * @param fallback - Optional fallback component if loading fails
 */
export function lazyLoad(
  importFn: () => Promise<any>,
  fallback?: React.ComponentType
) {
  const LazyComponent = lazy(() => {
    return importFn().catch(error => {
      console.error('Error loading component:', error);
      
      // If a fallback is provided, return it
      if (fallback) {
        return { default: fallback };
      }
      
      // Otherwise return a default error component
      return {
        default: () => (
          <div className="p-4 bg-red-50 text-red-500 rounded">
            Failed to load component. Please try refreshing the page.
          </div>
        )
      };
    });
  });

  return LazyComponent;
}
