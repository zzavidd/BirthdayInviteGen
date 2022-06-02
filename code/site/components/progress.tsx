import type { ReactElement } from 'react';
import React from 'react';

import type { AppState } from 'constants/types';
import DesignEditor from 'styles/pages/design/DesignEditor.styles';

export default function ProgressOverlay({
  state,
}: ProgressOverlayProps): ReactElement | null {
  if (!state.downloadInProgress) return null;
  return (
    <DesignEditor.ProgressOverlay>Loading...</DesignEditor.ProgressOverlay>
  );
}

interface ProgressOverlayProps {
  state: AppState;
}
