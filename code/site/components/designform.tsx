import React, { ReactElement, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { GoogleFont } from 'constants/types';
import { PageStatePayload, updateState } from 'reducers/slice';
import { RootState } from 'reducers/store';

export default function DesignForm({ fonts }: DesignFormProps): ReactElement {
  const state = useSelector(({ state }: RootState) => state);
  const dispatch = useDispatch();
  const setState = useCallback(
    (payload: PageStatePayload) => {
      dispatch(updateState(payload));
    },
    [dispatch],
  );

  const maxTop = useMemo(() => {
    return state.canvasDimensions.height - state.textStyle.height;
  }, [state.canvasDimensions.height, state.textStyle.height]);
  const maxLeft = useMemo(() => {
    return state.canvasDimensions.width - state.textStyle.width;
  }, [state.canvasDimensions.width, state.textStyle.width]);

  /**
   * Triggers on a new font family selection.
   * @param e The change event.
   */
  function onFontFamilyChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    setState({
      textStyle: {
        ...state.textStyle,
        fontFamily: e.target.value,
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

  return (
    <section className={'design-form'}>
      <FormField>
        <label>Font Family:</label>
        <select
          onChange={onFontFamilyChange}
          value={state.textStyle.fontFamily}>
          {fonts.map((font, key) => {
            return (
              <option value={font.family} key={key}>
                {font.family}
              </option>
            );
          })}
        </select>
      </FormField>
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
    </section>
  );
}

function FormField({ children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={'form-field'}>{children}</div>;
}

function NumberInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input type={'number'} autoComplete={'off'} {...props} />;
}

interface DesignFormProps {
  fonts: GoogleFont[];
}
