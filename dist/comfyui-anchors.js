var x = Object.defineProperty;
var w = (t, o, e) => o in t ? x(t, o, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[o] = e;
var r = (t, o, e) => (w(t, typeof o != "symbol" ? o + "" : o, e), e);
import { app as n } from "../../../scripts/app.js";
import { ComfyWidgets as h } from "../../../scripts/widgets.js";
let s = null;
function A() {
  console.log("%cSetting up ComfyUI-Anchors...", "color:green");
  const t = n.graph.onAfterChange;
  n.graph.onAfterChange = () => {
    console.log("%cOn After Change...", "color:red"), t == null || t();
  }, s ?? (s = m()[0] ?? null), addEventListener("keydown", (o) => {
    switch (o.key) {
      case "a":
      case "d":
        const e = m();
        if (e.length < 2)
          return;
        const c = Math.max(
          0,
          e.findIndex((d) => d === s)
        ), a = o.key === "a" ? -1 : 1, i = (c + a + e.length) % e.length;
        i !== c && (s = e[i], n.canvas.centerOnNode(s), n.canvas.selectNode(s));
    }
  });
}
function m() {
  return n.graph.findNodesByClass(l);
}
class l {
  constructor() {
    r(this, "bgcolor", LGraphCanvas.node_colors.yellow.bgcolor);
    r(this, "groupcolor", LGraphCanvas.node_colors.purple.groupcolor);
    r(this, "horizontal", !0);
    r(this, "serialize_widgets", !0);
    r(this, "isVirtualNode", !0);
    r(this, "properties", { text: "" });
    h.STRING(
      this,
      "waypoint",
      ["", { default: this.properties.text, multiline: !1 }],
      n
    ), h.INT(this, "waypoint_x", ["", { default: 0 }], n), h.INT(this, "waypoint_y", ["", { default: 0 }], n);
  }
  get color() {
    return s === this ? LGraphCanvas.node_colors.cyan.color : LGraphCanvas.node_colors.black.color;
  }
  onMouseMove(o, [e, c], a) {
    var f, _;
    if (o.buttons < 1)
      return;
    const [i, d] = ((f = a.current_node) == null ? void 0 : f.pos) ?? [0, 0], p = ((_ = a.current_node) == null ? void 0 : _.widgets) ?? [], g = p.find((u) => u.name === "waypoint_x"), y = p.find((u) => u.name === "waypoint_y");
    g && (g.value = i), y && (y.value = d);
  }
  onMouseUp(o, [e, c], a) {
    s = this;
  }
}
r(l, "category", "utils");
n.registerExtension({
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
    A();
  }
});
