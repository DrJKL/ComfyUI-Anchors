import { app as o } from "../../../scripts/app";
function n() {
  console.log("%cSetting up ComfyUI-Anchors...", "color:green");
}
o.registerExtension({
  name: "drjkl.customnodes.anchors",
  async beforeRegisterNodeDef(e, r, c) {
    console.log(
      `%ccui-anchors_beforeRegisterNodeDef: ${e.type}`,
      "color:green"
    );
  },
  async nodeCreated(e) {
    console.log(
      `%ccui-anchors_nodeCreated: ${e.getTitle()}`,
      "color:green"
    );
  },
  async setup() {
    n();
  }
});
