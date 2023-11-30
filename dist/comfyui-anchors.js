var f = Object.defineProperty;
var _ = (e, o, r) => o in e ? f(e, o, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[o] = r;
var t = (e, o, r) => (_(e, typeof o != "symbol" ? o + "" : o, r), r);
import { app as s } from "../../../scripts/app.js";
import { ComfyWidgets as c } from "../../../scripts/widgets.js";
function m() {
  console.log("%cSetting up ComfyUI-Anchors...", "color:green");
  const e = LiteGraph.onAfterChange;
  LiteGraph.onAfterChange = () => {
    console.log("%cOn After Change...", "color:red"), e();
  }, addEventListener("keydown", (o) => {
    switch (o.key) {
      case "w":
      case "a":
      case "s":
      case "d":
        console.log(o), console.log(w());
    }
  });
}
function w() {
  const e = s.graph.findNodesByClass(n);
  return new Set(e);
}
class n {
  constructor() {
    t(this, "color", LGraphCanvas.node_colors.black.color);
    t(this, "bgcolor", LGraphCanvas.node_colors.yellow.bgcolor);
    t(this, "groupcolor", LGraphCanvas.node_colors.purple.groupcolor);
    t(this, "horizontal", !0);
    t(this, "serialize_widgets", !0);
    t(this, "isVirtualNode", !0);
    t(this, "properties", { text: "" });
    c.STRING(
      this,
      "waypoint",
      ["", { default: this.properties.text, multiline: !1 }],
      s
    ), c.INT(this, "waypoint_x", ["", { default: 0 }], s), c.INT(this, "waypoint_y", ["", { default: 0 }], s);
  }
  onMouseMove(o, [r, A], i) {
    var d, g;
    if (o.buttons < 1)
      return;
    const [h, y] = ((d = i.current_node) == null ? void 0 : d.pos) ?? [0, 0], l = ((g = i.current_node) == null ? void 0 : g.widgets) ?? [], u = l.find((a) => a.name === "waypoint_x"), p = l.find((a) => a.name === "waypoint_y");
    u && (u.value = h), p && (p.value = y);
  }
}
t(n, "category", "utils");
s.registerExtension({
  name: "drjkl.custom_nodes.anchors",
  async registerCustomNodes() {
    LiteGraph.registerNodeType(
      "⚓ Anchor",
      Object.assign(n, {
        title_mode: LiteGraph.NORMAL_TITLE,
        title: "⚓ Anchor",
        collapsable: !0
      })
    ), n.category = "utils";
  },
  async setup() {
    m();
  }
});
