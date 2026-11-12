// worker.js : runs the experiment sweep off the UI thread.
//
// Loads the wasm experiment core (same experiment_core.h as the native CLI) and drives the
// Cartesian product of the spec's parameter sweeps x seeds, posting one progress message per
// run and the full result set at the end. Keeping this in a Web Worker means a large sweep
// never freezes the page. The physics live in wasm; this file only orchestrates.

/* global createExperimentModule */
importScripts('shepherd_experiment_web.js');

let mod = null;          // resolved wasm Module
let api = null;          // cwrapped entry points
let paramIndex = null;   // spec param name -> config-vector slot
let defaults = null;     // Float32Array of the herding base, one slot per param

function ready() {
  return createExperimentModule().then((Module) => {
    mod = Module;
    api = {
      count:   Module.cwrap('exp_param_count', 'number', []),
      name:    Module.cwrap('exp_param_name', 'string', ['number']),
      index:   Module.cwrap('exp_param_index', 'number', ['string']),
      defs:    Module.cwrap('exp_defaults', null, ['number']),
      run:     Module.cwrap('exp_run', null, ['number', 'number', 'number', 'number']),
    };
    const n = api.count();
    // Read the herding base once; every combination is a copy of this with swept slots set.
    const defsPtr = mod._malloc(n * 4);
    api.defs(defsPtr);
    defaults = new Float32Array(n);
    defaults.set(mod.HEAPF32.subarray(defsPtr >> 2, (defsPtr >> 2) + n));
    mod._free(defsPtr);
    paramIndex = {};
    for (let i = 0; i < n; i++) paramIndex[api.name(i)] = i;
  });
}

// Cartesian product of the sweep value lists, as an array of index tuples.
function cartesian(sweeps) {
  let combos = [[]];
  for (const s of sweeps) {
    const next = [];
    for (const c of combos) for (let k = 0; k < s.values.length; k++) next.push(c.concat(k));
    combos = next;
  }
  return combos;
}

function runSweep(spec) {
  const { seeds, steps, sweeps } = spec;
  // Validate sweep param names against the curated set before spending any compute.
  for (const s of sweeps) {
    if (!(s.param in paramIndex)) {
      postMessage({ type: 'error', message: 'unknown sweep parameter "' + s.param + '"' });
      return;
    }
  }
  const n = defaults.length;
  const cfgPtr = mod._malloc(n * 4);
  const NM = 12;                       // metric-vector length (keep in sync with exp_wasm.cpp)
  const mPtr = mod._malloc(NM * 4);
  const combos = cartesian(sweeps);
  const total = combos.length * seeds.length;
  const rows = [];
  let runId = 0;

  for (const combo of combos) {
    // Resolve this combination's swept values (for both the config and the CSV columns).
    const swept = sweeps.map((s, k) => s.values[combo[k]]);
    for (const combSeed of seeds) {
      // cfg = defaults, then overlay swept slots.
      mod.HEAPF32.set(defaults, cfgPtr >> 2);
      sweeps.forEach((s, k) => { mod.HEAPF32[(cfgPtr >> 2) + paramIndex[s.param]] = swept[k]; });
      api.run(cfgPtr, combSeed, steps, mPtr);
      const m = mod.HEAPF32.subarray(mPtr >> 2, (mPtr >> 2) + NM);
      const row = {
        run_id: runId,
        sweptValues: swept.slice(),
        seed: combSeed,
        completion: Math.round(m[0]),
        gcm: m[1],
        cohesion: m[2],
        atGoal: m[3],
        steps: Math.round(m[4]),
        rg: m[5],
        nnd: m[6],
        meanPol: m[7],
        rot: m[8],
        lcf: m[9],
        straight: m[10],
        minGap: m[11],
      };
      rows.push(row);
      runId++;
      postMessage({ type: 'progress', done: runId, total: total, row: row });
    }
  }
  mod._free(cfgPtr);
  mod._free(mPtr);
  postMessage({ type: 'done', rows: rows });
}

onmessage = (e) => {
  const spec = e.data;
  const start = mod ? Promise.resolve() : ready();
  start.then(() => runSweep(spec)).catch((err) => {
    postMessage({ type: 'error', message: String(err && err.message ? err.message : err) });
  });
};
