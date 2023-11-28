# ComfyUI-Anchors

A ComfyUI extension to add spatial anchors/waypoints to better navigate large workflows.

## TODO

  - [ ] Nodes
  - [ ] Behavior
  - [ ] Documentation

## Development

- Clone the repo
- `pnpm install`
- `pnpm build`

No plans to have this library work outside of ComfyUI 

## Confessions

### Typing

To get the types working without extracting the JS code from ComfyUI, I have the development files (TS) reference Comfy as a sibling. So if you want TS hints and checks to work, you'll need to have a similar structure.

To get the JS to run properly, the relative path is swapped in the dist for a different relative path based on where the JS is copied on __init__.

Check out the `vite.config.ts` and `tsconfig.json` if you're interested. If you can find a cleaner/simpler way to do it, **please** tell me.
