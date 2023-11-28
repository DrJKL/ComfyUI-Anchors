var c = Object.defineProperty;
var i = (r, o, t) => o in r ? c(r, o, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[o] = t;
var e = (r, o, t) => (i(r, typeof o != "symbol" ? o + "" : o, t), t);
import { LiteGraph as l, LGraphCanvas as s } from "../../../lib/litegraph.core.js";
import { app as n } from "../../../scripts/app.js";
import { ComfyWidgets as a } from "../../../scripts/widgets.js";
function p() {
  console.log("%cSetting up ComfyUI-Anchors...", "color:green");
}
n.registerExtension({
  name: "drjkl.custom_nodes.anchors",
  async registerCustomNodes(r) {
    class o {
      constructor() {
        e(this, "color", s.node_colors.yellow.color);
        e(this, "bgcolor", s.node_colors.yellow.bgcolor);
        e(this, "groupcolor", s.node_colors.yellow.groupcolor);
        e(this, "serialize_widgets", !0);
        e(this, "isVirtualNode", !0);
        e(this, "properties", { text: "" });
        a.STRING(
          this,
          "",
          ["", { default: this.properties.text, multiline: !1 }],
          r
        );
      }
    }
    e(o, "category", "utils"), l.registerNodeType(
      "Anchor",
      Object.assign(o, {
        title_mode: l.NORMAL_TITLE,
        title: "⚓",
        collapsable: !0
      })
    );
  },
  async setup() {
    p();
  }
});
