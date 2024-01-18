'use client';

import { testAction } from '~/server/actions/test';

export function Test() {
  return (
    <div>
      <button
        onClick={() => {
          void testAction('Hello World');
        }}
      >
        test
      </button>
    </div>
  );
}
