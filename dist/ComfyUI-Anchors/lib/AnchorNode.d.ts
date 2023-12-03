import type { LGraphCanvas as LGraphCanvasType } from '../../types/litegraph.js';
export declare class AnchorNode {
    static category: string;
    static title: string;
    static collabsable: boolean;
    static title_mode: any;
    flags: {
        collapsed?: boolean;
    };
    readonly horizontal = true;
    readonly serialize_widgets = true;
    readonly isVirtualNode = true;
    get color(): string;
    bgcolor: string;
    groupcolor: string;
    private titleInternal?;
    get title(): string | undefined;
    set title(newTitle: string | undefined);
    readonly widgets: never[];
    constructor();
    onMouseMove(e: MouseEvent, [_mouseX, _mouseY]: [number, number], canvas: LGraphCanvasType): void;
    onMouseUp(_e: MouseEvent, [_mouseX, _mouseY]: [number, number], _canvas: LGraphCanvasType): void;
}
