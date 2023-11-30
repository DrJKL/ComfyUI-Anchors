var w = Object.defineProperty;
var x = (n, e, o) => e in n ? w(n, e, { enumerable: !0, configurable: !0, writable: !0, value: o }) : n[e] = o;
var r = (n, e, o) => (x(n, typeof e != "symbol" ? e + "" : e, o), o);
import { app as s } from "../../../scripts/app.js";
import { ComfyWidgets as h } from "../../../scripts/widgets.js";
const t = { node: null };
class l {
  constructor() {
    r(this, "horizontal", !0);
    r(this, "serialize_widgets", !0);
    r(this, "isVirtualNode", !0);
    r(this, "bgcolor", LGraphCanvas.node_colors.yellow.bgcolor);
    r(this, "groupcolor", LGraphCanvas.node_colors.purple.groupcolor);
    h.STRING(
      this,
      "waypoint",
      ["", { default: "", multiline: !1 }],
      s
    ), h.INT(this, "waypoint_x", ["", { default: 0 }], s), h.INT(this, "waypoint_y", ["", { default: 0 }], s);
  }
  get color() {
    return t.node === this ? LGraphCanvas.node_colors.cyan.color : LGraphCanvas.node_colors.black.color;
  }
  onMouseMove(e, [o, c], a) {
    var f, m;
    if (e.buttons < 1)
      return;
    const [i, d] = ((f = a.current_node) == null ? void 0 : f.pos) ?? [0, 0], p = ((m = a.current_node) == null ? void 0 : m.widgets) ?? [], g = p.find((u) => u.name === "waypoint_x"), y = p.find((u) => u.name === "waypoint_y");
    g && (g.value = i), y && (y.value = d);
  }
  onMouseUp(e, [o, c], a) {
    t.node = this;
  }
}
r(l, "category", "utils");
function _() {
  return s.graph.findNodesByClass(l);
}
function L() {
  console.log("%cSetting up ComfyUI-Anchors...", "color:green"), t.node ?? (t.node = _()[0] ?? null), addEventListener("keydown", (n) => {
    const { target: e } = n;
    if (e && e instanceof Element) {
      const o = e.tagName.toLowerCase();
      if (o === "input" || o === "textarea")
        return;
    }
    switch (n.key) {
      case "a":
      case "d":
        const o = _();
        if (o.length < 2)
          return;
        const c = Math.max(
          0,
          o.findIndex((d) => d === t.node)
        ), a = n.key === "a" ? -1 : 1, i = (c + a + o.length) % o.length;
        if (i === c)
          return;
        t.node = o[i], s.canvas.centerOnNode(t.node), s.canvas.selectNode(t.node);
    }
  });
}
s.registerExtension({
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
    L();
  }
});
