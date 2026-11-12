# Shepherding v2 viewer (published build)

Self-contained WebAssembly build of the single C++ viewer (`viewer/viewer_main.cpp`),
the same source that builds the native window. It drives the physics through
`SimBuilder(SimConfig)` and renders a live herding run with a whole-field arena, a zoomed
detail lens (per-agent interaction rings and decomposed forces), a density heatmap,
global per-force-type overlays, an agent inspector, manual stepping, a fine speed control,
and one-click export of a run to a standalone replay HTML.

## Run it

WebAssembly must be served over HTTP (not opened as a `file://`). From the repository root:

```
python3 -m http.server 8000 --directory docs/viewer
```

then open <http://localhost:8000/>. When this branch is served by GitHub Pages, the viewer
is available at `<pages-root>/viewer/`.

## Rebuild

```
source ~/emsdk/emsdk_env.sh
emcmake cmake -S . -B build-wasm -DCMAKE_BUILD_TYPE=Release
cmake --build build-wasm --target shepherd_viewer -j
cp build-wasm/shepherd_viewer.html docs/viewer/index.html
cp build-wasm/shepherd_viewer.js   docs/viewer/
cp build-wasm/shepherd_viewer.wasm docs/viewer/
```
