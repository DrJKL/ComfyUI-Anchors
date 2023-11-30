import { AnchorNode } from './AnchorNode';
import { app } from '../../ComfyUI/web/scripts/app.js';
import type { ComfyExtension } from '../../ComfyUI/web/types/comfy';
import { selectedNode } from './selectedNode';

function findAllAnchors(): AnchorNode[] {
  const anchors = app.graph.findNodesByClass(AnchorNode);
  return anchors;
}

function setupAnchors() {
  console.log(`%cSetting up ComfyUI-Anchors...`, 'color:green');
  selectedNode.node ??= findAllAnchors()[0] ?? null;

  addEventListener('keydown', (event) => {
    const { target } = event;
    if (target && target instanceof Element) {
      const tag = target.tagName.toLowerCase();
      if (tag === 'input' || tag === 'textarea') {
        return;
      }
    }
    switch (event.key) {
      case 'a':
      case 'd':
        const anchors = findAllAnchors();
        if (anchors.length < 2) {
          return;
        }

        const currentAnchorIdx = Math.max(
          0,
          anchors.findIndex((n) => n === selectedNode.node),
        );
        const dir = event.key === 'a' ? -1 : 1;
        const nextAnchorIdx =
          (currentAnchorIdx + dir + anchors.length) % anchors.length;
        if (nextAnchorIdx === currentAnchorIdx) {
          return;
        }

        selectedNode.node = anchors[nextAnchorIdx];
        app.canvas.centerOnNode(selectedNode.node);
        app.canvas.selectNode(selectedNode.node);
    }
  });
}

app.registerExtension({
  name: 'drjkl.custom_nodes.anchors',
  async registerCustomNodes() {
    LiteGraph.registerNodeType(
      '⚓ Anchor',
      Object.assign(AnchorNode, {
        title_mode: LiteGraph.NORMAL_TITLE,
        title: '⚓ Anchor',
        collapsable: true,
      }),
    );
    AnchorNode.category = 'utils';
  },
  async setup() {
    setupAnchors();
  },
} satisfies Partial<ComfyExtension>);
