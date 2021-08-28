import React, { useEffect, useReducer } from 'react';

import {
  AssignmentActionPayload,
  AssignmentActionType,
  AssignmentInitialState,
  AssignmentReducer
} from 'reducers/assignment';
import { DistributionAction, DistributionState } from 'reducers/distribution';
import { GUESTS_PER_TABLE, TABLE_NAMES } from 'utils/constants';

import { Guest } from '../../cli/controller/lib/classes';

export default function Mapper({ guests, useDistReducer }: MapperProps) {
  const [assignment, updateAssignment] = useReducer(
    AssignmentReducer,
    AssignmentInitialState
  );
  const [distribution, setDistribution] = useDistReducer;

  useEffect(() => {
    updatePreview();
  }, [assignment]);

  const onPositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, valueAsNumber } = e.target;
    updateAssignment({
      guest: name,
      payload: {
        position: valueAsNumber
      },
      type: AssignmentActionType.PARTIAL
    });
  };

  const onTableChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateAssignment({
      guest: name,
      payload: {
        table: parseInt(value)
      },
      type: AssignmentActionType.PARTIAL
    });
  };

  const updatePreview = () => {
    if (assignment.lastActionType === AssignmentActionType.CLEAR) {
      setDistribution({ type: 'clear' });
      return;
    }

    const newDistribution = Object.entries(assignment.data).reduce(
      (acc, [guestName, payload]) => {
        const { table: tableNumber, position } = payload;
        if (tableNumber && position) {
          const guests = acc[tableNumber];
          const guestIndex = guests.indexOf(guestName);
          if (guestIndex > -1) {
            guests.splice(guestIndex, 1, '-');
          }
          guests[position - 1] = guestName;
          acc[tableNumber] = guests;
        }
        return acc;
      },
      distribution
    );
    setDistribution({ payload: newDistribution, type: 'update' });
  };

  const randomiseDistribution = () => {
    const tableCount = TABLE_NAMES.length;
    const randomAssignment = guests
      .sort(() => (Math.random() > 0.5 ? 1 : -1))
      .reduce((acc, guest, i) => {
        const result = (i + 1) % tableCount;
        const tableNumber = result === 0 ? tableCount : result;
        const position = Math.ceil((i + 1) / tableCount);
        acc[guest.name] = {
          table: TABLE_NAMES[tableNumber - 1].id,
          position
        };
        return acc;
      }, assignment.data);

    updateAssignment({
      payload: randomAssignment,
      type: AssignmentActionType.FULL
    });
  };

  const clearDistribution = () => {
    updateAssignment({ type: AssignmentActionType.CLEAR });
  };

  return (
    <aside className={'mapper'}>
      <section className={'mapper-list'}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Table</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(assignment.data)
              .sort(([a], [b]) => (a > b ? 1 : -1))
              .map((entry, key) => {
                return (
                  <MapperGuestRow
                    guestEntry={entry}
                    onTableChange={onTableChange}
                    onPositionChange={onPositionChange}
                    key={key}
                  />
                );
              })}
          </tbody>
        </table>
      </section>
      <footer className={'mapper-footer'}>
        <button className={'mapper-button'} onClick={randomiseDistribution}>
          Random
        </button>
        <button className={'mapper-button'} onClick={clearDistribution}>
          Clear
        </button>
      </footer>
    </aside>
  );
}

function MapperGuestRow({
  guestEntry,
  onTableChange,
  onPositionChange
}: MapperGuestRowProps) {
  const [guestName, { table, position }] = guestEntry;
  return (
    <tr>
      <td className={'mapper-list-guest'}>{guestName}</td>
      <td>
        <select name={guestName} value={table} onChange={onTableChange}>
          <option>None</option>
          {TABLE_NAMES.map(({ id, name }, key) => {
            return (
              <option value={id} key={key}>
                {name}
              </option>
            );
          })}
        </select>
        <input
          type={'number'}
          name={guestName}
          min={0}
          max={GUESTS_PER_TABLE}
          value={position}
          onChange={onPositionChange}
        />
      </td>
    </tr>
  );
}

type MapperProps = {
  guests: Guest[];
  useDistReducer: [DistributionState, React.Dispatch<DistributionAction>];
};

type MapperGuestRowProps = {
  guestEntry: [string, AssignmentActionPayload];
  onTableChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onPositionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};