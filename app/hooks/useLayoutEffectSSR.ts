import React from 'react';

// UTIL
import { canUseDOM } from 'utils/utils.client';

// "Custom hook" for SSR
export const useLayoutEffect = canUseDOM ? React.useLayoutEffect : () => {};
