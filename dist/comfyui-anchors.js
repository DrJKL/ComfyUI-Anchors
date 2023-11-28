var s = Object.defineProperty;
var l = (r, o, t) => o in r ? s(r, o, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[o] = t;
var e = (r, o, t) => (l(r, typeof o != "symbol" ? o + "" : o, t), t);
import { app as c } from "../../../scripts/app.js";
import { ComfyWidgets as i } from "../../../scripts/widgets.js";
function a() {
  console.log("%cSetting up ComfyUI-Anchors...", "color:green");
}
c.registerExtension({
  name: "drjkl.custom_nodes.anchors",
  async registerCustomNodes(r) {
    class o {
      constructor() {
        e(this, "color", LGraphCanvas.node_colors.yellow.color);
        e(this, "bgcolor", LGraphCanvas.node_colors.yellow.bgcolor);
        e(this, "groupcolor", LGraphCanvas.node_colors.yellow.groupcolor);
        e(this, "serialize_widgets", !0);
        e(this, "isVirtualNode", !0);
        e(this, "properties", { text: "" });
        i.STRING(
          this,
          "",
          ["", { default: this.properties.text, multiline: !1 }],
          r
        );
      }
    }
    e(o, "category", "utils"), LiteGraph.registerNodeType(
      "Anchor",
      Object.assign(o, {
        title_mode: LiteGraph.NORMAL_TITLE,
        title: "⚓",
        collapsable: !0
      })
    );
  },
  async setup() {
    a();
  }
});
