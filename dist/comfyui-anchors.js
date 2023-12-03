var w = Object.defineProperty;
var I = (o, t, e) => t in o ? w(o, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : o[t] = e;
var s = (o, t, e) => (I(o, typeof t != "symbol" ? t + "" : t, e), e);
import { app as r } from "../../scripts/app.js";
import { ComfyWidgets as h } from "../../scripts/widgets.js";
const n = { node: null };
class l {
  constructor() {
    s(this, "horizontal", !0);
    s(this, "serialize_widgets", !0);
    s(this, "isVirtualNode", !0);
    s(this, "bgcolor", LGraphCanvas.node_colors.yellow.bgcolor);
    s(this, "groupcolor", LGraphCanvas.node_colors.purple.groupcolor);
    s(this, "titleInternal");
    h.STRING(
      this,
      "waypoint",
      ["", { default: "", multiline: !1 }],
      r
    ), h.INT(this, "waypoint_x", ["", { default: 0 }], r), h.INT(this, "waypoint_y", ["", { default: 0 }], r);
  }
  get color() {
    return n.node === this ? LGraphCanvas.node_colors.cyan.color : LGraphCanvas.node_colors.black.color;
  }
  get title() {
    return this.flags ? this.flags.collapsed ? "⚓" : this.titleInternal : this.titleInternal;
  }
  set title(t) {
    this.titleInternal = t;
  }
  onMouseMove(t, [e, i], a) {
    var y, m;
    if (t.buttons < 1)
      return;
    const [c, u] = ((y = a.current_node) == null ? void 0 : y.pos) ?? [0, 0], g = ((m = a.current_node) == null ? void 0 : m.widgets) ?? [], p = g.find((d) => d.name === "waypoint_x"), f = g.find((d) => d.name === "waypoint_y");
    p && (p.value = c), f && (f.value = u);
  }
  onMouseUp(t, [e, i], a) {
    n.node = this;
  }
}
s(l, "category", "utils");
function _() {
  return r.graph.findNodesByClass(l);
}
function x() {
  console.log("%cSetting up ComfyUI-Anchors...", "color:green"), n.node ?? (n.node = _()[0] ?? null), addEventListener("keydown", (o) => {
    const { target: t } = o;
    if (t && t instanceof Element) {
      const e = t.tagName.toLowerCase();
      if (e === "input" || e === "textarea")
        return;
    }
    switch (o.key) {
      case "a":
      case "d":
        const e = _();
        if (e.length < 2)
          return;
        const i = Math.max(
          0,
          e.findIndex((u) => u === n.node)
        ), a = o.key === "a" ? -1 : 1, c = (i + a + e.length) % e.length;
        if (c === i)
          return;
        n.node = e[c], r.canvas.centerOnNode(n.node), r.canvas.selectNode(n.node);
    }
  });
}
r.registerExtension({
  name: "drjkl.custom_nodes.anchors",
  async registerCustomNodes() {
    LiteGraph.registerNodeType(
      "⚓ Anchor",
      Object.assign(l, {
        title_mode: LiteGraph.NORMAL_TITLE,
        title: "⚓ Anchor",
        collapsable: !0
      })
    ), l.category = "utils";
  },
  async setup() {
    x();
  }
});
