import { app } from '../../ComfyUI/web/scripts/app.js';
import { ComfyWidgets } from '../../ComfyUI/web/scripts/widgets.js';
import type {
  LGraphCanvas as LGraphCanvasType,
  IWidget,
} from '../../ComfyUI/web/types/litegraph.js';
import { selectedNode } from './selectedNode';

export class AnchorNode {
  static category = 'utils';

  readonly horizontal = true;
  readonly serialize_widgets = true;
  readonly isVirtualNode = true;

  get color(): string {
    return selectedNode.node === this
      ? LGraphCanvas.node_colors.cyan.color
      : LGraphCanvas.node_colors.black.color;
  }
  bgcolor: string = LGraphCanvas.node_colors.yellow.bgcolor;
  groupcolor: string = LGraphCanvas.node_colors.purple.groupcolor;

  constructor() {
    ComfyWidgets.STRING(
      this,
      'waypoint',
      ['', { default: '', multiline: false }],
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
  onMouseUp(
    _e: MouseEvent,
    [_mouseX, _mouseY]: [number, number],
    _canvas: LGraphCanvasType,
  ): void {
    selectedNode.node = this;
  }
}
