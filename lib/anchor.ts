import { app } from '../../ComfyUI/web/scripts/app.js';
import { ComfyWidgets } from '../../ComfyUI/web/scripts/widgets.js';
import { type ComfyExtension } from '../../ComfyUI/web/types/comfy';

declare global {
  // TODO: Oh god... What have I gotten myself into...?
  // Nah, this'll be fun.
  const LiteGraph: any;
  const LGraphCanvas: any;
}

function setupAnchors() {
  console.log(`%cSetting up ComfyUI-Anchors...`, 'color:green');
}

app.registerExtension({
  name: 'drjkl.custom_nodes.anchors',
  async registerCustomNodes(app) {
    class AnchorNode {
      static readonly category = 'utils';

      color = LGraphCanvas.node_colors.yellow.color;
      bgcolor = LGraphCanvas.node_colors.yellow.bgcolor;
      groupcolor = LGraphCanvas.node_colors.yellow.groupcolor;
      readonly serialize_widgets = true;
      readonly isVirtualNode = true;
      properties: { text: string } = { text: '' };
      constructor() {
        ComfyWidgets.STRING(
          this,
          '',
          ['', { default: this.properties.text, multiline: false }],
          app,
        );
      }
    }

    // Load default visibility

    LiteGraph.registerNodeType(
      'Anchor',
      Object.assign(AnchorNode, {
        title_mode: LiteGraph.NORMAL_TITLE,
        title: '⚓',
        collapsable: true,
      }),
    );
  },
  async setup() {
    setupAnchors();
  },
} satisfies Partial<ComfyExtension>);
