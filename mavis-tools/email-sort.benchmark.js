const { performance } = require('perf_hooks');

const measureOriginal = async (batch) => {
  const start = performance.now();
  // Simulate the original code behavior
  // const rest = ids.slice(i + 1, i + 101);
  for (const t of batch) {
    // await k.req('POST', `https://gmail.googleapis.com/gmail/v1/users/me/threads/${t}/modify`,
    //   { addLabelIds: [lab], removeLabelIds: ['INBOX', 'UNREAD'] });
    await new Promise(r => setTimeout(r, 10)); // simulate network delay
  }
  return performance.now() - start;
};

const measureOptimized = async (batch) => {
  const start = performance.now();
  // Simulate the optimized code behavior
  // await Promise.all(batch.map(t =>
  //   k.req('POST', `https://gmail.googleapis.com/gmail/v1/users/me/threads/${t}/modify`,
  //     { addLabelIds: [lab], removeLabelIds: ['INBOX', 'UNREAD'] })
  // ));
  await Promise.all(batch.map(t => new Promise(r => setTimeout(r, 10))));
  return performance.now() - start;
};

(async () => {
  const batchSize = 100;
  const dummyBatch = Array.from({ length: batchSize }, (_, i) => `msg_${i}`);

  console.log(`Running benchmark with batch size: ${batchSize}`);

  const originalTime = await measureOriginal(dummyBatch);
  console.log(`Original sequential loop time: ${originalTime.toFixed(2)} ms`);

  const optimizedTime = await measureOptimized(dummyBatch);
  console.log(`Optimized Promise.all time: ${optimizedTime.toFixed(2)} ms`);

  const improvement = originalTime / optimizedTime;
  console.log(`Improvement factor: ${improvement.toFixed(2)}x faster`);
})();
