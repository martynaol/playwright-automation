import test from '@playwright/test';

function serialize(...args: any[]): string {
  const argsList = args
    .map((arg) =>
      JSON.stringify(arg, (key, value) => {
        if (value === undefined) {
          return 'undefined';
        }
        if (value === null) {
          return 'null';
        }
        return value;
      })
    )
    .join(', ');
  return argsList;
}

export function step(stepName?: string) {
  return function decorator(target: Function) {
    return function replacementMethod(...args: any) {
      const argsListSerialized = serialize(...args);
      const argsList = argsListSerialized.length
        ? `(${argsListSerialized})`
        : '';
      const name = stepName
        ? `${stepName}${argsList}`
        : `${this.constructor.name}::${target.name}${argsList}`;
      return test.step(name, async () => {
        await target.call(this, ...args);
      });
    };
  };
}
