import { app } from '../../ComfyUI/web/scripts/app.js';
import { ComfyExtension } from '../../ComfyUI/web/types/comfy';

function setupAnchors() {
  console.log(`%cSetting up ComfyUI-Anchors...`, 'color:green');
}

app.registerExtension({
  name: 'drjkl.customnodes.anchors',
  async beforeRegisterNodeDef(_nodeType, _nodeData, _app) {
    console.log(
      `%ccui-anchors_beforeRegisterNodeDef: ${_nodeType.type}`,
      'color:green',
    );
  },
  async nodeCreated(_node) {
    console.log(
      `%ccui-anchors_nodeCreated: ${_node.getTitle()}`,
      'color:green',
    );
  },
  async setup() {
    setupAnchors();
  },
} satisfies Partial<ComfyExtension>);
