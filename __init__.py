ANCHOR_VERSION = "0.1.0"

NODE_CLASS_MAPPINGS = {}

__all__ = ["NODE_CLASS_MAPPINGS"]

import os, shutil
import folder_paths

module_js_directory = os.path.join(os.path.dirname(os.path.realpath(__file__)), "dist")
application_root_directory = os.path.dirname(folder_paths.__file__)
extension_web_extensions_directory = os.path.join(
    application_root_directory, "web", "extensions", "anchor"
)

shutil.copytree(
    module_js_directory, extension_web_extensions_directory, dirs_exist_ok=True
)
