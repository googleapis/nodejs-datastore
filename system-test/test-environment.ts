import {describe, it} from 'mocha';
import {Datastore} from '../src';

describe.only('datastore outages repro', () => {
  const datastore = new Datastore();

  /**
   * Pauses the execution of an async function for a specified duration.
   * This function is non-blocking.
   *
   * @param {number} ms - The number of milliseconds to sleep (pause).
   * @returns {Promise<void>} A Promise that resolves after the specified time has elapsed.
   */
  function sleep(ms: any) {
    // Input validation (optional but good practice)
    if (typeof ms !== 'number' || ms < 0) {
      console.warn(
        'sleep function called with invalid duration:',
        ms,
        '- defaulting to 0ms'
      );
      ms = 0;
    }
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  it('test', async () => {
    // require('./logger-setup.js'); // Run the logger setup first!

    async function write(
      docKey: string
      // docToWrite: any // sync.ISyncDocument | undefined
    ) {
      const key = datastore.key(['sync_document', docKey]);

      const transaction = datastore.transaction();

      try {
        await transaction.run();

        const [datastoreDoc] = await transaction.get(key, {});

        // const toWrite = mergeDocs(datastoreDoc, docToWrite);
        //
        //
        //
        // if (!toWrite) {
        //
        //   await transaction.rollback();
        //
        //   return undefined;
        //
        // }

        transaction.save({
          key,
          data: {
            metadata: [
              {
                name: 'some-string',
                value: 'some-value',
              },
            ],
          },

          excludeFromIndexes: ['instance', 'instance.*'],
        });

        await transaction.commit();

        // return toWrite;
      } catch (e) {
        await transaction.rollback();

        throw e;
      }
    }
    for (let i = 0; i < 1000000; i++) {
      console.log(`writing ${i}`);
      await sleep(50);
      await write('key');
    }
  });
});
