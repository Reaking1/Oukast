import { useContext } from 'react';
import { EventContext } from './EventContextProps';
import type { EventContextType } from './EventContextProps';

/**
 * Custom hook to access the EventContext.
 * Ensures the context is used within the appropriate provider.
 *
 * @throws Will throw an error if used outside the EventProvider.
 * @returns The EventContextType with all context values and methods.
 */
export const useEventContext = (): EventContextType => {
  const context = useContext(EventContext);

  if (!context) {
    throw new Error('useEventContext must be used within an EventProvider.');
  }

  return context;
};
