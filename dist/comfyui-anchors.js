var w = Object.defineProperty;
var x = (t, o, e) => o in t ? w(t, o, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[o] = e;
var n = (t, o, e) => (x(t, typeof o != "symbol" ? o + "" : o, e), e);
import { app as r } from "../../../scripts/app.js";
import { ComfyWidgets as h } from "../../../scripts/widgets.js";
let s = null;
function A() {
  console.log("%cSetting up ComfyUI-Anchors...", "color:green");
  const t = r.graph.onAfterChange;
  r.graph.onAfterChange = () => {
    console.log("%cOn After Change...", "color:red"), t == null || t();
  }, s ?? (s = _()[0] ?? null), addEventListener("keydown", (o) => {
    switch (o.key) {
      case "a":
      case "d":
        const e = _();
        if (e.length < 1)
          return;
        const c = e.findIndex((d) => d === s);
        if (c < 0)
          return;
        const a = o.key === "a" ? -1 : 1, i = (c + a + e.length) % e.length;
        i !== c && (s = e[i], r.canvas.centerOnNode(s));
    }
  });
}
function _() {
  return r.graph.findNodesByClass(l);
}
class l {
  constructor() {
    n(this, "bgcolor", LGraphCanvas.node_colors.yellow.bgcolor);
    n(this, "groupcolor", LGraphCanvas.node_colors.purple.groupcolor);
    n(this, "horizontal", !0);
    n(this, "serialize_widgets", !0);
    n(this, "isVirtualNode", !0);
    n(this, "properties", { text: "" });
    h.STRING(
      this,
      "waypoint",
      ["", { default: this.properties.text, multiline: !1 }],
      r
    ), h.INT(this, "waypoint_x", ["", { default: 0 }], r), h.INT(this, "waypoint_y", ["", { default: 0 }], r);
  }
  get color() {
    return s === this ? LGraphCanvas.node_colors.cyan.color : LGraphCanvas.node_colors.black.color;
  }
  onMouseMove(o, [e, c], a) {
    var f, m;
    if (o.buttons < 1)
      return;
    const [i, d] = ((f = a.current_node) == null ? void 0 : f.pos) ?? [0, 0], p = ((m = a.current_node) == null ? void 0 : m.widgets) ?? [], g = p.find((u) => u.name === "waypoint_x"), y = p.find((u) => u.name === "waypoint_y");
    g && (g.value = i), y && (y.value = d);
  }
}
n(l, "category", "utils");
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
    A();
  }
});
