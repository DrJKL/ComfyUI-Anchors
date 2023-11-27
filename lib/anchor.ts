import { app } from '../../ComfyUI/web/scripts/app';
import { ComfyExtension } from '../../ComfyUI/web/types/comfy';

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
