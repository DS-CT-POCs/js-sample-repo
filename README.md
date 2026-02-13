# 🚀 YOLO Object Detection Web App

<div align="center">
<img src="./preview.png" width="60%" alt="YOLO Object Detection Preview">

<br>

[![ONNX Runtime Web](https://img.shields.io/badge/ONNX%20Runtime-Web-blue)](https://onnxruntime.ai/)
[![YOLO](https://img.shields.io/badge/YOLO-v11%2Fv12-green)](https://github.com/ultralytics/ultralytics)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

</div>

## 📖 Introduction

This web application, built on **ONNX Runtime Web**, brings the power of YOLO object detection directly to your browser. It supports full client-side inference without sending data to a server, offering privacy and low latency.

## ⚠️ WebGPU Prerequisites (Important)

To achieve the best performance using **WebGPU**, please ensure the following:

1.  **Browser**: Use a Chromium-based browser (Chrome, Edge, Brave).
2.  **Enable Flags**:
    - Type `chrome://flags` (or `edge://flags`) in your address bar.
    - Search for **"Unsafe WebGPU Support"** and set it to **Enabled**.
    - **(Linux / Android users)**: Search for **"Vulkan"** (`#enable-vulkan`) and set it to **Enabled**.
    - Relaunch your browser.

> 💡 **Note**: If WebGPU is not available, the app will automatically fall back to WASM (CPU), which is slower but universally compatible.

## ✨ Features

- 🔍 **Object Detection** - Precisely identify and locate various objects in real-time.
- ⚡ **High Performance** - Powered by WebGPU acceleration.
- 🔒 **Privacy First** - All processing happens locally on your device.

## 📹 Input Support

| Input Type         |  Format  | Use Case                                  |
| :----------------- | :------: | :---------------------------------------- |
| 📷 **Image**       | JPG, PNG | Single image analysis & batch processing. |
| 📹 **Video**       |   MP4    | Offline video analysis & content review.  |
| 📺 **Live Camera** |  Stream  | Real-time monitoring & interactive demos. |

## 📊 Supported Models

| Model        | Input Size | Params | Recommended For       |
| :----------- | :--------- | :----- | :-------------------- |
| **YOLO11-N** | 640        | 2.6M   | 📱 Mobile / Real-time |
| **YOLO11-S** | 640        | 9.4M   | 🖥️ High Accuracy      |
| **YOLO11-M** | 640        | 20.1M  | 🖥️ Higher Accuracy    |
| **YOLO12-N** | 640        | 2.6M   | 📱 Mobile / Real-time |
| **YOLO12-S** | 640        | 9.3M   | 🖥️ High Accuracy      |

_Models are licensed under [AGPL-3.0](./public/models/LICENSE.txt) via [Ultralytics](https://github.com/ultralytics/ultralytics)._

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/nomi30701/yolo-object-detection-onnxruntime-web.git
   ```

2. **Navigate to project directory**

   ```bash
   cd yolo-object-detection-onnxruntime-web
   ```

3. **Install dependencies**

   ```bash
   yarn install
   ```

4. **Run Development Server**

   ```bash
   yarn dev
   ```

5. **Build for Production**
   ```bash
   yarn build
   ```

## 🔧 Custom Models Guide

You can run your own YOLO models in this app.

### Step 1: Export to ONNX

Use Ultralytics to export your model. **Crucial:** Use `opset=12` for WebGPU compatibility.

```python
from ultralytics import YOLO

model = YOLO("path/to/your/model.pt")
# Export with opset=12 and dynamic shape
model.export(format="onnx", opset=12, dynamic=True)
```

### Step 2: Load your Model

You have two ways to load your model:

#### Option A: Quick Test (UI Upload)

Simply click the **"Add model"** button in the web interface to upload your `.onnx` file temporarily.

#### Option B: Permanent Integration (Code)

1. Copy your `.onnx` file to `./public/models/`.
2. Edit `App.jsx` to add your model to the list:

```jsx
<select name="model-selector">
  <option value="yolo11n">YOLO11n (2.6M)</option>
  <option value="your-custom-model">Your Custom Model</option>
</select>
```

### Step 3: Update Classes

If your model uses custom classes (not COCO), you need to update the class definitions:

- **UI Method**: Click **"Add Classes.json"** to upload a JSON file mapping class IDs to names.
- **Code Method**: Update `src/utils/yolo_classes.json`.

```json
{
  "class": {
    "0": "person",
    "1": "bicycle"
  }
}
```

## ⚙️ Configuration: Image Processing

You can control how images are pre-processed via the `imgsz_type` setting:

- **Dynamic (Default)**:
  - Uses the original image aspect ratio.
  - **Pros**: Best accuracy.
  - **Cons**: Slower on large images; inference time varies.
  - _Requires model exported with `dynamic=True`._

- **Zero Pad (Square)**:
  - Pads image to square and resizes to 640x640.
  - **Pros**: Consistent, faster speed suitable for real-time video.
  - **Cons**: Slight accuracy drop on small objects due to scaling.

## ⚙️ Technical Details: Coordinate System Handling

To ensure consistent bounding boxes across all devices, the following strategy is adopted:

1.  **Inference**: Input is resized to the model's tensor shape (e.g., 640x640).
2.  **Mapping**: Detected coordinates are projected back to the image's **intrinsic (natural) resolution** rather than the current HTML display size.
3.  **Rendering**: The overlay `<canvas>` is set to the source image's true resolution. Visual alignment is handled entirely via CSS, eliminating the need for complex resize event listeners and ensuring high-DPI clarity.

## 🧪 CodebaseRAG baseline questions

The CodebaseRAG project uses this repository as a reference JS codebase for ingestion and query tests. Typical baseline questions the RAG agent should be able to answer after ingesting this repo include:

- Where is the main React entry point (`root` render) defined, and how would you wrap it with an error boundary component?
- In which file is the ONNX model loaded and the session created, and how would you change the default model path?
- Where is the model selector implemented in `App.jsx`, and how would you add a new option for a custom YOLO model?
- Which module handles image preprocessing (resize/normalize) before inference, and how would you downscale images to 320×320 instead of 640×640?
- Where is the `imgsz_type` configuration read and applied, and how would you change the default from “Dynamic” to “Zero Pad (Square)”?
- Where is the WebGPU (or WASM) execution provider configured for `onnxruntime-web`, and how would you force the app to always use WASM for debugging?
- Which component starts and reads from the **webcam stream**, and how would you cap the frame rate to reduce CPU usage?
- Where are detection results converted to bounding boxes and drawn on the `<canvas>`, and how could you change the box color based on class?
- In which place can you change the **confidence threshold** or NMS settings, and how would you expose those as sliders in the UI?
- Where is the JSON file or mapping of class IDs to labels (e.g. `yolo_classes.json`) used, and how would you add a new custom label?
- How would you add a new UI control to toggle drawing of bounding boxes on and off without reloading the page?
- Where can you add logging or timing measurements to report **end‑to‑end inference latency** for each frame?
- Which file defines the keyboard or UI shortcuts (if any), and how would you add a shortcut to pause/resume detection?
- Where is application‑wide state (e.g. selected model, device, thresholds) managed, and how would you persist it across reloads?

### Baseline answers (for RAG comparison)

- **React entry point / error boundary**: `src/main.jsx` — `createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)`. Wrap `<App />` in a custom `<ErrorBoundary>` component that implements `componentDidCatch` (class component) or an error-boundary library.
- **ONNX model load / default path**: `src/utils/model-loader.js` — `InferenceSession.create(modelPath, { executionProviders: [backend] })`. Default model path is set in `App.jsx`: built from `modelConfigRef.current.model` as `${window.location.href}/models/${model}-${task}.onnx` (e.g. `yolo11n-detect.onnx`). Change default by setting `DEFAULT_MODEL_CONFIG.model` or the path used when calling `loadModel()`.
- **Model selector in App.jsx / add custom option**: `src/components/SettingsPanel.jsx` — `<select name="model-selector">` with options for yolo11n, yolo11s, etc. and `customModels.map()`. Add a new option: add another `<option value="mymodel">My Model</option>` and ensure the model file exists under `public/models/` with name `mymodel-detect.onnx`, or use the "Add model" UI to register a custom model.
- **Image preprocessing (resize/normalize) / 320×320**: `src/utils/img-preprocess.js` — `preProcessImage()`, `dynamicInputProcess()`, `zeroPadInputProcess()`. For 320×320: in `zeroPadInputProcess` change `modelDefaultInputSize` from `[640, 640]` to `[320, 320]`, and ensure callers pass `overlaySize: [320, 320]` (e.g. in `DEFAULT_MODEL_CONFIG` in `App.jsx` and `inputShape`).
- **imgsz_type default "Dynamic" → "Zero Pad"**: `src/components/SettingsPanel.jsx` — "Image Type" dropdown sets `modelConfigRef.current.imgsz_type`. Default is in `App.jsx` `DEFAULT_MODEL_CONFIG.imgszType: "dynamic"`. Change to `"zeroPad"` there, or set the default `<option>` in the select to `value="zeroPad"`.
- **WebGPU vs WASM / force WASM**: `src/utils/model-loader.js` — uses `executionProviders: [backend]`; backend is set in `SettingsPanel.jsx` (device-selector: "wasm" or "webgpu"). Default in `DEFAULT_MODEL_CONFIG` is `backend: "wasm"`. To force WASM for debugging, set backend to `"wasm"` or ensure the selector defaults to Wasm (CPU). Model loader imports from `onnxruntime-web/webgpu`; for WASM-only build, use `onnxruntime-web` and pass `"wasm"` as provider.
- **Webcam stream / cap frame rate**: `src/hooks/useWebcam.js` — `openCamera()` uses `navigator.mediaDevices.getUserMedia()`. The component that consumes the stream (e.g. in `App.jsx` or where frames are read for inference) controls frame rate. Cap by using `requestAnimationFrame` with a throttle, or `setInterval` with a longer ms (e.g. 100 ms for ~10 FPS), or only process every Nth frame.
- **Bounding boxes on canvas / box color by class**: `src/utils/render-overlay.js` — `renderOverlay()` and `draw_object_detection()`; colors from `Colors.getColor(Number(classId), alpha)`. To change box color by class: replace or wrap `Colors.getColor(classId, alpha)` with a custom map (e.g. `classIdToColor[classId]` or different alpha/border for specific classes).
- **Confidence threshold and NMS / sliders**: `src/utils/inference-pipeline.js` — `postProcess(..., scoreThreshold)` and `applyNMS(..., modelConfig.iouThreshold)`; config has `scoreThreshold` (default 0.45) and `iouThreshold` (0.35). In `App.jsx`, `DEFAULT_MODEL_CONFIG` holds these. Add two sliders in `SettingsPanel.jsx` (or a settings panel), update `modelConfigRef.current.scoreThreshold` and `iouThreshold` on change so the next inference uses them.
- **Class IDs to labels (yolo_classes.json) / add label**: Used in `App.jsx` — `import classes from "./utils/yolo_classes.json"` and `modelConfigRef.current.classes`. Rendered in `render-overlay.js` via `currentClasses.classes[predict.classIdx]`. Add a new label: edit `src/utils/yolo_classes.json` (add or change an entry under the `classes` object), or use the "Add Classes.json" UI to upload a custom mapping.
- **Toggle bounding boxes on/off**: Add state in `App.jsx` (e.g. `showBoxes`) and in the inference result callback conditionally call `renderOverlay()` only when `showBoxes` is true; add a checkbox or button in the UI to toggle `showBoxes`.
- **End-to-end inference latency**: `src/utils/inference-pipeline.js` — `performance.now()` around `session.run()`; result returned as `(end - start).toFixed(2)`. The worker posts `inferenceTime` in the message. Add `console.log` or send to a timing/analytics hook in `handleInferenceResult` in `App.jsx` to report per-frame latency.
- **Keyboard/UI shortcuts / pause–resume**: No dedicated shortcuts file; controls are in `App.jsx` and `ControlButtons.jsx`. Add: in `App.jsx` use `useEffect` with `window.addEventListener("keydown", handler)` to toggle a "paused" state that skips running inference on new frames.
- **Application state / persist across reloads**: `App.jsx` — state in `useState` and refs (`modelConfigRef`). Persist: on change of model/backend/thresholds, write to `localStorage`; on mount, read from `localStorage` and set initial state or `modelConfigRef.current`.
