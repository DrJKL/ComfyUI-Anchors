import { AnchorNode } from './AnchorNode';
import { app } from '../../ComfyUI/web/scripts/app.js';
import { selectedNode } from './selectedNode';

function changeSelectedNode(newNode: AnchorNode | null) {
  selectedNode.node = newNode;
  app.canvas.centerOnNode(selectedNode.node);
  app.canvas.selectNode(selectedNode.node);
}

function currentSelectedNodeIdx(anchors: AnchorNode[]) {
  return Math.max(
    0,
    anchors.findIndex((n) => n === selectedNode.node),
  );
}

export function findAllAnchors(): AnchorNode[] {
  const anchors = app.graph.findNodesByClass(AnchorNode);
  return anchors;
}

export function handleKeydownAnchor(event: KeyboardEvent) {
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
      if (anchors.length < 1) {
        // Allow for 'recentering' with a single Anchor.
        return;
      }
      const currentAnchorIdx = currentSelectedNodeIdx(anchors);

      const dir = event.key === 'a' ? -1 : 1;
      const nextAnchorIdx =
        (currentAnchorIdx + dir + anchors.length) % anchors.length;
      changeSelectedNode(anchors[nextAnchorIdx]);
  }
}
