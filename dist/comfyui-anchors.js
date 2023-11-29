var d = Object.defineProperty;
var h = (o, e, r) => e in o ? d(o, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : o[e] = r;
var t = (o, e, r) => (h(o, typeof e != "symbol" ? e + "" : e, r), r);
import { app as n } from "../../../scripts/app.js";
import { ComfyWidgets as i } from "../../../scripts/widgets.js";
function y() {
  console.log("%cSetting up ComfyUI-Anchors...", "color:green");
  const o = LiteGraph.onAfterChange;
  LiteGraph.onAfterChange = () => {
    console.log("%cOn After Change...", "color:red"), o();
  };
}
n.registerExtension({
  name: "drjkl.custom_nodes.anchors",
  async registerCustomNodes() {
    class o {
      constructor() {
        t(this, "color", LGraphCanvas.node_colors.yellow.color);
        t(this, "bgcolor", LGraphCanvas.node_colors.yellow.bgcolor);
        t(this, "groupcolor", LGraphCanvas.node_colors.yellow.groupcolor);
        t(this, "serialize_widgets", !0);
        t(this, "isVirtualNode", !0);
        t(this, "properties", { text: "" });
        i.STRING(
          this,
          "waypoint",
          ["", { default: this.properties.text, multiline: !1 }],
          n
        ), i.INT(this, "waypoint_x", ["", { default: 0 }], n), i.INT(this, "waypoint_y", ["", { default: 0 }], n);
      }
      onMouseMove(r, [f, _], a) {
        if (r.buttons < 1)
          return;
        const [c, p] = a.current_node.pos, l = a.current_node.widgets, u = l.find(
          (s) => s.name === "waypoint_x"
        ), g = l.find(
          (s) => s.name === "waypoint_y"
        );
        u.value = c, g.value = p;
      }
    }
    t(o, "category", "utils"), LiteGraph.registerNodeType(
      "⚓ Anchor",
      Object.assign(o, {
        title_mode: LiteGraph.NORMAL_TITLE,
        title: "⚓ Anchor",
        collapsable: !0
      })
    ), o.category = "utils";
  },
  async setup() {
    y();
  }
});
