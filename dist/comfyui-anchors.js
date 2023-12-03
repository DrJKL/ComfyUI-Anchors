var w = Object.defineProperty;
var I = (n, t, e) => t in n ? w(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var o = (n, t, e) => (I(n, typeof t != "symbol" ? t + "" : t, e), e);
import { app as a } from "../../scripts/app.js";
import { ComfyWidgets as u } from "../../scripts/widgets.js";
const s = { node: null };
class r {
  constructor() {
    o(this, "horizontal", !0);
    o(this, "serialize_widgets", !0);
    o(this, "isVirtualNode", !0);
    o(this, "bgcolor", LGraphCanvas.node_colors.yellow.bgcolor);
    o(this, "groupcolor", LGraphCanvas.node_colors.purple.groupcolor);
    o(this, "titleInternal");
    o(this, "widgets", []);
    u.STRING(
      this,
      "waypoint",
      ["", { default: "", multiline: !1 }],
      a
    ), u.INT(this, "waypoint_x", ["", { default: 0 }], a), u.INT(this, "waypoint_y", ["", { default: 0 }], a);
  }
  get color() {
    return s.node === this ? LGraphCanvas.node_colors.cyan.color : LGraphCanvas.node_colors.black.color;
  }
  get title() {
    return this.flags ? this.flags.collapsed ? "⚓" : this.titleInternal : this.titleInternal;
  }
  set title(t) {
    this.titleInternal = t;
  }
  onMouseMove(t, [e, c], i) {
    var f, y;
    if (t.buttons < 1)
      return;
    const [l, _] = ((f = i.current_node) == null ? void 0 : f.pos) ?? [0, 0], h = ((y = i.current_node) == null ? void 0 : y.widgets) ?? [], g = h.find((d) => d.name === "waypoint_x"), p = h.find((d) => d.name === "waypoint_y");
    g && (g.value = l), p && (p.value = _);
  }
  onMouseUp(t, [e, c], i) {
    s.node = this;
  }
}
o(r, "category", "utils"), o(r, "title", "⚓ Anchor"), o(r, "collabsable", !0), o(r, "title_mode", LiteGraph.NORMAL_TITLE);
function x(n) {
  s.node = n, a.canvas.centerOnNode(s.node), a.canvas.selectNode(s.node);
}
function L(n) {
  return Math.max(
    0,
    n.findIndex((t) => t === s.node)
  );
}
function m() {
  return a.graph.findNodesByClass(r);
}
function C(n) {
  const { target: t } = n;
  if (t && t instanceof Element) {
    const e = t.tagName.toLowerCase();
    if (e === "input" || e === "textarea")
      return;
  }
  switch (n.key) {
    case "a":
    case "d":
      const e = m();
      if (e.length < 1)
        return;
      const c = L(e), i = n.key === "a" ? -1 : 1, l = (c + i + e.length) % e.length;
      x(e[l]);
  }
}
function N() {
  console.log("%cSetting up ComfyUI-Anchors...", "color:green"), s.node ?? (s.node = m()[0] ?? null), addEventListener("keydown", C);
}
a.registerExtension({
  name: "drjkl.custom_nodes.anchors",
  async registerCustomNodes() {
    LiteGraph.registerNodeType("⚓ Anchor", r), r.category = "utils";
  },
  async setup() {
    N();
  }
});
