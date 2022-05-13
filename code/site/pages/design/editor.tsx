import type { GetStaticProps, NextPage } from 'next';
import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProgressOverlay from 'components/progress';
import {
  AppDispatch,
  PageStatePayload,
  RootState,
  updateState,
} from 'constants/reducers';
import { GoogleFont } from 'constants/types';
import { GOOGLE_FONT_HOST } from 'constants/variables';
import LeftSidebar from 'fragments/LeftSidebar';
import Preview from 'fragments/Preview';
import RightSidebar from 'fragments/RightSidebar';
import TestData from 'test/test.json';

const DesignEditorPage: NextPage<DesignEditorProps> = ({ fonts }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const draggableRef = useRef<HTMLDivElement>(null);

  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();
  const setState = useCallback(
    (payload: PageStatePayload) => {
      dispatch(updateState(payload));
    },
    [dispatch],
  );

  // TODO: Remove (dev purposes only)
  useEffect(() => {
    setState({
      namesList: TestData.names,
      imageSrc: TestData.imageSource,
    });
  }, [setState]);

  // Called each time the image source changes.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !state.imageSrc) return;

    const ctx = canvas.getContext('2d')!;

    const img = new Image();
    img.src = state.imageSrc;
    img.onload = () => {
      ctx.canvas.width = img.width;
      ctx.canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const scaleX = canvas.width / canvas.clientWidth;
      const scaleY = canvas.height / canvas.clientHeight;
      const scale = (scaleX + scaleY) / 2;

      setState({
        canvasDimensions: {
          width: canvas.clientWidth,
          height: canvas.clientHeight,
        },
        imageDimensions: {
          width: img.width,
          height: img.height,
        },
        textStyle: {
          scale,
          scaleX,
          scaleY,
        },
      });
    };
  }, [setState, state.imageSrc]);

  // Toggle cursor type when color picker is visible.
  // Hide color picker if clicked outside of color picker.
  useEffect(() => {
    if (state.isColorPickerVisible) {
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = 'initial';
    }

    const hideColorPicker = (e: MouseEvent) => {
      if (!state.isColorPickerVisible) return;

      const isColorPicker = document
        .elementsFromPoint(e.pageX, e.pageY)
        .some((element) => {
          return element.classList.contains('color-picker');
        });

      if (!isColorPicker) {
        setState({
          isColorPickerVisible: false,
        });
      }
    };

    window.addEventListener('mousedown', hideColorPicker);
    return () => {
      window.removeEventListener('mousedown', hideColorPicker);
    };
  }, [setState, state.isColorPickerVisible]);

  // Load a new font on a new font family selection.
  useEffect(() => {
    import('webfontloader')
      .then((WebFont) => {
        const family = `${state.textStyle.fontFamily}:${state.textStyle.fontStyle}`;
        WebFont.load({
          google: {
            families: [family],
            text: state.selectedName,
          },
        });
      })
      .catch(console.error);
  }, [
    state.selectedName,
    state.textStyle.fontFamily,
    state.textStyle.fontStyle,
  ]);

  // Change selected name if the names list changes.
  useEffect(() => {
    setState({
      selectedName: state.namesList[0] || '',
    });
  }, [setState, state.namesList]);

  return (
    <main className={'design'}>
      <LeftSidebar fonts={fonts} canvasRef={canvasRef} />
      <Preview canvasRef={canvasRef} draggableRef={draggableRef} />
      <RightSidebar />
      <ProgressOverlay state={state} />
    </main>
  );
};

export const getStaticProps: GetStaticProps<DesignEditorProps> = async () => {
  const res = await fetch(GOOGLE_FONT_HOST);
  const fonts: GoogleFont[] = await res.json();

  return {
    props: {
      fonts: fonts
        .sort((a, b) => a.family.localeCompare(b.family))
        .map((font) => ({
          id: font.id,
          family: font.family,
          variants: font.variants,
        })),
    },
  };
};

export default DesignEditorPage;

interface DesignEditorProps {
  fonts: GoogleFont[];
}