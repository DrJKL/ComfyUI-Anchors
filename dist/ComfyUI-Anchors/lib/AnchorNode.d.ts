import type { LGraphCanvas as LGraphCanvasType } from '../../types/litegraph.js';
export declare class AnchorNode {
    static category: string;
    readonly horizontal = true;
    readonly serialize_widgets = true;
    readonly isVirtualNode = true;
    get color(): string;
    bgcolor: string;
    groupcolor: string;
    constructor();
    onMouseMove(e: MouseEvent, [_mouseX, _mouseY]: [number, number], canvas: LGraphCanvasType): void;
    onMouseUp(_e: MouseEvent, [_mouseX, _mouseY]: [number, number], _canvas: LGraphCanvasType): void;
}
