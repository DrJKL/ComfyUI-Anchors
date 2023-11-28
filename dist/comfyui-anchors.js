var a = Object.defineProperty;
var i = (e, t, o) => t in e ? a(e, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : e[t] = o;
var r = (e, t, o) => (i(e, typeof t != "symbol" ? t + "" : t, o), o);
import { app as n } from "../../../scripts/app.js";
import { ComfyWidgets as p } from "../../../scripts/widgets.js";
function u() {
  console.log("%cSetting up ComfyUI-Anchors...", "color:green");
}
n.registerExtension({
  name: "drjkl.custom_nodes.anchors",
  async registerCustomNodes() {
    class e {
      constructor() {
        r(this, "color", LGraphCanvas.node_colors.yellow.color);
        r(this, "bgcolor", LGraphCanvas.node_colors.yellow.bgcolor);
        r(this, "groupcolor", LGraphCanvas.node_colors.yellow.groupcolor);
        r(this, "serialize_widgets", !0);
        r(this, "isVirtualNode", !0);
        r(this, "properties", { text: "" });
        p.STRING(
          this,
          "waypoint",
          ["", { default: this.properties.text, multiline: !1 }],
          n
        );
      }
      onMouseMove(o, [s, l], c) {
        console.table({ type: "mouseMove", e: o, x: s, y: l, canvas: c });
      }
      onMouseUp(o, [s, l], c) {
        console.table({ type: "mouseUp", e: o, x: s, y: l, canvas: c });
      }
    }
    r(e, "category", "utils"), LiteGraph.registerNodeType(
      "utils/⚓ Anchor",
      Object.assign(e, {
        title_mode: LiteGraph.NORMAL_TITLE,
        title: "⚓ Anchor",
        collapsable: !0
      })
    );
  },
  async setup() {
    u();
  }
});
