import { faChevronLeft, faCrosshairs } from '@fortawesome/free-solid-svg-icons';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FontIcon from 'components/icon';
import * as Utils from 'constants/functions/utils';
import {
  AppDispatch,
  PageStatePayload,
  RootState,
  updateState,
} from 'constants/reducers';

const DesignSetupPage: NextPage = () => {
  const appState = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();
  const setAppState = useCallback(
    (payload: PageStatePayload) => {
      dispatch(updateState(payload));
    },
    [dispatch],
  );

  const [state, setState] = useState<DesignSetupState>({
    names: Utils.textFromNameList(appState.namesList),
    imageSrc: appState.imageSrc,
  });
  const router = useRouter();

  /**
   * Called on change to the name list.
   * @param e The change event.
   */
  function onNameListChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    setState((current) => ({ ...current, names: e.target.value }));
  }

  /**
   * Called on selection of a file to edit. Ensures only files below limit are
   * allowed
   * @param e The change event.
   */
  function onImageSelect(e: React.ChangeEvent<HTMLInputElement>): void {
    const { files } = e.target;
    if (!files || !files.length) return;

    const file = files[0];
    if (file.size > 10 * 1024 * 1024) {
      e.target.value = '';
      return alert('Maximum file size is 10MB');
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      setState((current) => ({
        ...current,
        imageSrc: fileReader.result as string,
      }));
    };
  }

  /**
   * Navigate back to homepage.
   */
  function onHomeClick() {
    void router.push('/');
  }

  /**
   * Save submission to app state and navigate to the design editor.
   */
  function onSubmit() {
    setAppState({
      namesList: Utils.nameListFromText(state.names),
      imageSrc: state.imageSrc,
    });
    void router.push('/design/editor');
  }

  return (
    <main className={'design-setup'}>
      <div className={'container'}>
        <section className={'name-list'}>
          <h2>Step 1: List The Names</h2>
          <p>
            Type out or paste the list of your guest names here. Separate each
            name with a new line.
          </p>
          <textarea
            id={'names-list'}
            onChange={onNameListChange}
            value={state.names}
            placeholder={'List each individual name...'}
            spellCheck={false}
            rows={10}
          />
          <small>{Utils.nameListFromText(state.names).length} names</small>
        </section>
        <section className={'image'}>
          <h2>Step 2: Select Your Image</h2>
          <div className={'file-selector-container'}>
            <label className={'file-selector'}>
              <input
                type={'file'}
                accept={'image/jpeg,image/png'}
                onChange={onImageSelect}
                hidden={true}
              />
              <span>Choose your image...</span>
            </label>
          </div>
          <small>
            * Supported formats are JPEG and PNG. Maximum image size is 10MB.
          </small>
          <div className={'image-preview'}>
            {state.imageSrc && (
              <Image
                src={state.imageSrc}
                layout={'fill'}
                objectFit={'contain'}
              />
            )}
          </div>
        </section>
      </div>
      <footer className={'design-setup'}>
        <button onClick={onHomeClick}>
          <FontIcon icon={faChevronLeft} space={true} />
          Back to Home
        </button>
        <button onClick={onSubmit}>
          <FontIcon icon={faCrosshairs} space={true} />
          Start Editing
        </button>
      </footer>
    </main>
  );
};

export default DesignSetupPage;

interface DesignSetupState {
  names: string;
  imageSrc: string | null;
}