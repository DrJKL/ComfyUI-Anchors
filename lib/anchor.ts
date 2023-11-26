// @ts-ignore
import { app } from '../../../scripts/app.js';

import type { ComfyExtension } from './../types/comfy.d';

function setupAnchors() {
  console.log(`Setting up ComfyUI-Anchors...`);
}

app.registerExtension({
  name: 'drjkl.customnodes.anchors',
  async beforeRegisterNodeDef(_nodeType, _nodeData, _app) {
    console.log(`cui-anchors_beforeRegisterNodeDef: ${_nodeType.type}`);
  },
  async nodeCreated(_node) {
    console.log(`cui-anchors_nodeCreated: ${_node.getTitle()}`);
  },
  async setup() {
    setupAnchors();
  },
} satisfies Partial<ComfyExtension>);
