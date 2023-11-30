import { app } from '../../ComfyUI/web/scripts/app.js';
import { ComfyWidgets } from '../../ComfyUI/web/scripts/widgets.js';
import type { ComfyExtension } from '../../ComfyUI/web/types/comfy';
import type {
  IWidget,
  LGraphCanvas as LGraphCanvasType,
  LGraphNode,
} from '../../ComfyUI/web/types/litegraph.js';

function setupAnchors() {
  console.log(`%cSetting up ComfyUI-Anchors...`, 'color:green');
  const onAfterChange_ = LiteGraph.onAfterChange;
  LiteGraph.onAfterChange = () => {
    console.log('%cOn After Change...', 'color:red');
    onAfterChange_();
  };
  addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'w':
      case 'a':
      case 's':
      case 'd':
        console.log(event);
        console.log(findAllAnchors());
    }
  });
}

function findAllAnchors() {
  const anchors = app.graph.findNodesByClass(AnchorNode);
  return new Set<LGraphNode>(anchors);
}
class AnchorNode {
  static category = 'utils';

  color: string = LGraphCanvas.node_colors.black.color;
  bgcolor: string = LGraphCanvas.node_colors.yellow.bgcolor;
  groupcolor: string = LGraphCanvas.node_colors.purple.groupcolor;
  readonly horizontal = true;
  readonly serialize_widgets = true;
  readonly isVirtualNode = true;
  properties: { text: string } = { text: '' };
  constructor() {
    ComfyWidgets.STRING(
      this,
      'waypoint',
      ['', { default: this.properties.text, multiline: false }],
      app,
    );
    ComfyWidgets.INT(this, 'waypoint_x', ['', { default: 0 }], app);
    ComfyWidgets.INT(this, 'waypoint_y', ['', { default: 0 }], app);
  }
  onMouseMove(
    e: MouseEvent,
    [_mouseX, _mouseY]: [number, number],
    canvas: LGraphCanvasType,
  ): void {
    if (e.buttons < 1) {
      return;
    }
    const [x, y] = canvas.current_node?.pos ?? [0, 0];
    const widgets =
      (canvas.current_node as unknown as { widgets: IWidget[] | undefined })
        ?.widgets ?? [];
    const xWidget = widgets.find((w) => w.name === 'waypoint_x');
    const yWidget = widgets.find((w) => w.name === 'waypoint_y');
    xWidget && (xWidget.value = x);
    yWidget && (yWidget.value = y);
  }
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
