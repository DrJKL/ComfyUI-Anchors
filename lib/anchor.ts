import { AnchorNode } from './AnchorNode';
import { app } from '../../ComfyUI/web/scripts/app.js';
import type { ComfyExtension } from '../../ComfyUI/web/types/comfy';
import { selectedNode } from './selectedNode';
import { findAllAnchors, handleKeydownAnchor } from './anchor_utils';

function setupAnchors() {
  console.log(`%cSetting up ComfyUI-Anchors...`, 'color:green');
  selectedNode.node ??= findAllAnchors()[0] ?? null;
  addEventListener('keydown', handleKeydownAnchor);
}

app.registerExtension({
  name: 'drjkl.custom_nodes.anchors',
  async registerCustomNodes() {
    LiteGraph.registerNodeType('⚓ Anchor', AnchorNode);
    AnchorNode.category = 'utils'; // Necessary
  },
  async setup() {
    setupAnchors();
  },
} satisfies Partial<ComfyExtension>);
