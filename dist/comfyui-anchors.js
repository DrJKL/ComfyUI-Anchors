var x = Object.defineProperty;
var w = (o, e, t) => e in o ? x(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t;
var s = (o, e, t) => (w(o, typeof e != "symbol" ? e + "" : e, t), t);
import { app as r } from "../../../scripts/app.js";
import { ComfyWidgets as p } from "../../../scripts/widgets.js";
let a = null;
function N() {
  console.log("%cSetting up ComfyUI-Anchors...", "color:green");
  const o = r.graph.onAfterChange;
  r.graph.onAfterChange = () => {
    console.log("%cOn After Change...", "color:red"), o == null || o();
  }, a ?? (a = _()[0] ?? null), addEventListener("keydown", (e) => {
    const { target: t } = e;
    if (t && t instanceof Element) {
      const n = t.tagName.toLowerCase();
      if (n === "input" || n === "textarea")
        return;
    }
    switch (e.key) {
      case "a":
      case "d":
        const n = _();
        if (n.length < 2)
          return;
        const c = Math.max(
          0,
          n.findIndex((l) => l === a)
        ), d = e.key === "a" ? -1 : 1, i = (c + d + n.length) % n.length;
        i !== c && (a = n[i], r.canvas.centerOnNode(a), r.canvas.selectNode(a));
    }
  });
}
function _() {
  return r.graph.findNodesByClass(u);
}
class u {
  constructor() {
    s(this, "bgcolor", LGraphCanvas.node_colors.yellow.bgcolor);
    s(this, "groupcolor", LGraphCanvas.node_colors.purple.groupcolor);
    s(this, "horizontal", !0);
    s(this, "serialize_widgets", !0);
    s(this, "isVirtualNode", !0);
    s(this, "properties", { text: "" });
    p.STRING(
      this,
      "waypoint",
      ["", { default: this.properties.text, multiline: !1 }],
      r
    ), p.INT(this, "waypoint_x", ["", { default: 0 }], r), p.INT(this, "waypoint_y", ["", { default: 0 }], r);
  }
  get color() {
    return a === this ? LGraphCanvas.node_colors.cyan.color : LGraphCanvas.node_colors.black.color;
  }
  onMouseMove(e, [t, n], c) {
    var y, m;
    if (e.buttons < 1)
      return;
    const [d, i] = ((y = c.current_node) == null ? void 0 : y.pos) ?? [0, 0], l = ((m = c.current_node) == null ? void 0 : m.widgets) ?? [], g = l.find((h) => h.name === "waypoint_x"), f = l.find((h) => h.name === "waypoint_y");
    g && (g.value = d), f && (f.value = i);
  }
  onMouseUp(e, [t, n], c) {
    a = this;
  }
}
s(u, "category", "utils");
r.registerExtension({
  name: "drjkl.custom_nodes.anchors",
  async registerCustomNodes() {
    LiteGraph.registerNodeType(
      "⚓ Anchor",
      Object.assign(u, {
        title_mode: LiteGraph.NORMAL_TITLE,
        title: "⚓ Anchor",
        collapsable: !0
      })
    ), u.category = "utils";
  },
  async setup() {
    N();
  }
});
