// shim.d.ts

import type { AttributifyAttributes } from "@unocss/preset-attributify";

type shortcuts = "input" | "logos" | "labels" | "link";

declare module "solid-js" {
  namespace JSX {
    interface HTMLAttributes<T>
      extends AttributifyAttributes,
        Partial<Record<shortcuts, string | boolean>> {}
  }
}
