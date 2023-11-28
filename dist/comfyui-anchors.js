var l = Object.defineProperty;
var c = (o, e, t) => e in o ? l(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t;
var r = (o, e, t) => (c(o, typeof e != "symbol" ? e + "" : e, t), t);
import { app as s } from "../../../scripts/app.js";
import { ComfyWidgets as i } from "../../../scripts/widgets.js";
function a() {
  console.log("%cSetting up ComfyUI-Anchors...", "color:green");
}
s.registerExtension({
  name: "drjkl.custom_nodes.anchors",
  async registerCustomNodes() {
    class o {
      constructor() {
        r(this, "color", LGraphCanvas.node_colors.yellow.color);
        r(this, "bgcolor", LGraphCanvas.node_colors.yellow.bgcolor);
        r(this, "groupcolor", LGraphCanvas.node_colors.yellow.groupcolor);
        r(this, "serialize_widgets", !0);
        r(this, "isVirtualNode", !0);
        r(this, "properties", { text: "" });
        i.STRING(
          this,
          "",
          ["", { default: this.properties.text, multiline: !1 }],
          s
        );
      }
    }
    r(o, "category", "utils"), LiteGraph.registerNodeType(
      "⚓ Anchor",
      Object.assign(o, {
        title_mode: LiteGraph.NORMAL_TITLE,
        title: "⚓ Anchor",
        collapsable: !0
      })
    ), o.category = "utils";
  },
  async setup() {
    a();
  }
});
