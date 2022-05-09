import { TinyColor } from '@ctrl/tinycolor';
import classnames from 'classnames';
import React, { ReactElement, useCallback, useMemo, useState } from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import { useDispatch, useSelector } from 'react-redux';

import {
  AppDispatch,
  PageStatePayload,
  RootState,
  updateState,
} from 'constants/reducers';
import { GoogleFont } from 'constants/types';
import { DEFAULT_FILENAME_TEMPLATE, FONT_VARIANTS } from 'constants/variables';

export default function DesignForm({ fonts }: DesignFormProps): ReactElement {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();
  const setState = useCallback(
    (payload: PageStatePayload) => {
      dispatch(updateState(payload));
    },
    [dispatch],
  );

  // Memoises the draggable top and left limits for the number inputs.
  const maxTop = useMemo(() => {
    return state.canvasDimensions.height - state.textStyle.height;
  }, [state.canvasDimensions.height, state.textStyle.height]);
  const maxLeft = useMemo(() => {
    return state.canvasDimensions.width - state.textStyle.width;
  }, [state.canvasDimensions.width, state.textStyle.width]);

  // Memoises the list of font variants for the selected font family.
  const fontVariants = useMemo(() => {
    const font = fonts.find(
      (font) => font.family === state.textStyle.fontFamily,
    )!;
    return font.variants.sort((a, b) => {
      if (FONT_VARIANTS[a] < FONT_VARIANTS[b]) return -1;
      if (FONT_VARIANTS[a] > FONT_VARIANTS[b]) return 1;
      return 0;
    });
  }, [fonts, state.textStyle.fontFamily]);

  // Memoises the font preview text and color.
  const { fontPreviewText, fontPreviewTextColor } = useMemo(() => {
    const color = new TinyColor(state.textStyle.color);
    return {
      fontPreviewText: color.toString('hex3').toUpperCase(),
      fontPreviewTextColor: color.isLight() ? '#000' : '#fff',
    };
  }, [state.textStyle.color]);

  /**
   * Triggers on a new font color selection.
   * @param color The result color.
   */
  function onFontColorChange(color: ColorResult): void {
    setState({
      textStyle: {
        color: color.hex,
      },
    });
  }

  /**
   * Triggers on a new font family selection.
   * @param e The change event.
   */
  function onSelectChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    setState({
      textStyle: {
        [e.target.name]: e.target.value,
      },
    });
  }

  /**
   * Triggers on any of the number input changes using the name as the property
   * to change and the minimum and maximum values as bounds.
   * @param e The change event.
   */
  function onNumberInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const min = parseInt(e.target.min);
    const max = parseInt(e.target.max);
    const value = e.target.valueAsNumber || min;
    setState({
      textStyle: {
        ...state.textStyle,
        [e.target.name]: Math.max(min, Math.min(value, max)),
      },
    });
  }

  function onFileNameTemplateChange(
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ): void {
    setState({
      fileNameTemplate: e.target.value,
    });
  }

  /**
   * Shows the color picker.
   */
  function showColorPicker() {
    setState({
      isColorPickerVisible: true,
    });
  }

  return (
    <section className={'design-form'}>
      <FormField>
        <label>Font Family:</label>
        <select
          onChange={onSelectChange}
          name={'fontFamily'}
          value={state.textStyle.fontFamily}>
          {fonts.map((font) => {
            return (
              <option value={font.family} key={font.id}>
                {font.family}
              </option>
            );
          })}
        </select>
      </FormField>
      <FormField>
        <label>Font Style:</label>
        <select
          onChange={onSelectChange}
          name={'fontStyle'}
          className={'font-style'}
          disabled={fontVariants.length < 2}
          value={state.textStyle.fontStyle}>
          {fontVariants.map((variantKey) => {
            return (
              <option value={variantKey} key={variantKey}>
                {FONT_VARIANTS[variantKey]}
              </option>
            );
          })}
        </select>
      </FormField>
      <FormField>
        <label>Font Color:</label>
        <button
          className={'color-thumbnail'}
          onClick={showColorPicker}
          style={{
            backgroundColor: state.textStyle.color,
            color: fontPreviewTextColor,
          }}>
          {fontPreviewText}
        </button>
        {state.isColorPickerVisible && (
          <ChromePicker
            color={state.textStyle.color}
            onChange={onFontColorChange}
            className={'color-picker'}
            styles={{
              default: {
                picker: {
                  borderRadius: '20px',
                  cursor: 'pointer',
                },
              },
            }}
          />
        )}
      </FormField>
      <FormFieldRow>
        <FormField>
          <label>Font Size:</label>
          <NumberInput
            name={'fontSize'}
            min={2}
            max={144}
            step={1}
            onChange={onNumberInputChange}
            value={state.textStyle.fontSize}
          />
        </FormField>
        <FormField>
          <label>Line Height:</label>
          <NumberInput
            name={'lineHeight'}
            min={2}
            max={150}
            step={2}
            onChange={onNumberInputChange}
            value={state.textStyle.lineHeight}
          />
        </FormField>
      </FormFieldRow>
      <FormFieldRow>
        <FormField>
          <label>Top:</label>
          <NumberInput
            name={'top'}
            min={0}
            max={maxTop}
            step={1}
            onChange={onNumberInputChange}
            value={state.textStyle.top}
          />
        </FormField>
        <FormField>
          <label>Left:</label>
          <NumberInput
            name={'left'}
            min={0}
            max={maxLeft}
            step={1}
            onChange={onNumberInputChange}
            value={state.textStyle.left}
          />
        </FormField>
      </FormFieldRow>
      <FormField>
        <label>File Name Template:</label>
        <textarea
          onChange={onFileNameTemplateChange}
          value={state.fileNameTemplate}
          rows={2}
          placeholder={DEFAULT_FILENAME_TEMPLATE}
          maxLength={128}
        />
      </FormField>
    </section>
  );
}

function FormFieldRow({ children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={'form-field-row'}>{children}</div>;
}

function FormField({ children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={'form-field'}>{children}</div>;
}

function NumberInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const [isFocused, setIsFocused] = useState(false);

  const suffixClasses = classnames('number-suffix', {
    'number-suffix--focus': isFocused,
  });
  return (
    <div className={'number-input'}>
      <input
        type={'number'}
        className={'number'}
        autoComplete={'off'}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      <input
        type={'text'}
        className={suffixClasses}
        value={'px'}
        readOnly={true}
      />
    </div>
  );
}

interface DesignFormProps {
  fonts: GoogleFont[];
}
