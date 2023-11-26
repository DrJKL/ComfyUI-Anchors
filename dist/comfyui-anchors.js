import { app as o } from "../../../scripts/app.js";
function n() {
  console.log("Setting up ComfyUI-Anchors...");
}
o.registerExtension({
  name: "drjkl.customnodes.anchors",
  async beforeRegisterNodeDef(e, s, t) {
    console.log(`cui-anchors_beforeRegisterNodeDef: ${e.type}`);
  },
  async nodeCreated(e) {
    console.log(`cui-anchors_nodeCreated: ${e.getTitle()}`);
  },
  async setup() {
    n();
  }
});
