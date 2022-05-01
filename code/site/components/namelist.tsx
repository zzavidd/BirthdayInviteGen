import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateState } from 'reducers/slice';
import { RootState } from 'reducers/store';

export default function NameList() {
  const state = useSelector(({ state }: RootState) => state);
  const dispatch = useDispatch();

  function onNameClick(name: string) {
    dispatch(
      updateState({
        selectedName: name,
      }),
    );
  }

  return (
    <aside className={'namelist'}>
      {state.namesList.map((name, key) => {
        return (
          <button
            onClick={() => onNameClick(name)}
            className={'name-button'}
            key={key}>
            <span className={'index'}>#{key + 1}</span>
            <span className={'name'}>{name}</span>
          </button>
        );
      })}
    </aside>
  );
}