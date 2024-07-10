import { translation } from "@/features/settings/language.js";

function Copied() {
  return (
    <span className="absolute bottom-0 background-color-darker px-6 py-1 left-2/4 -translate-x-2/4 z-20">
      {translation.CopiedToClipBoard}
    </span>
  );
}

export default Copied;
