import React, { createContext, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import posthog from 'posthog-js';

interface PostHogContextType {
  posthog: typeof posthog | null;
}

const PostHogContext = createContext<PostHogContextType>({ posthog: null });

interface PostHogProviderProps {
  apiKey: string;
  options?: {
    host?: string;
    [key: string]: any;
  };
  children: ReactNode;
}

export const PostHogProvider: React.FC<PostHogProviderProps> = ({
  apiKey,
  options = {},
  children,
}) => {
  useEffect(() => {
    if (apiKey) {
      posthog.init(apiKey, {
        api_host: options.host || 'https://app.posthog.com',
        ...options,
        loaded: () => {
          if (import.meta.env.DEV) {
            console.log('PostHog initialized');
          }
        },
      });
    } else {
      console.warn('PostHog key not found. Analytics will not be tracked.');
    }

    // Cleanup on unmount - PostHog handles cleanup automatically
    // No explicit cleanup needed
  }, [apiKey, options.host]);

  return (
    <PostHogContext.Provider value={{ posthog }}>
      {children}
    </PostHogContext.Provider>
  );
};

export const usePostHog = () => {
  const context = useContext(PostHogContext);
  if (!context.posthog) {
    console.warn('usePostHog must be used within PostHogProvider');
    // Return a no-op posthog object to prevent errors
    return {
      capture: () => {},
      identify: () => {},
      reset: () => {},
    } as unknown as typeof posthog;
  }
  return context.posthog;
};
