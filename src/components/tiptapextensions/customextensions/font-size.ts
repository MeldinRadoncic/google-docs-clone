"use client";

import { Extension } from "@tiptap/core";
import { TextStyle } from "@tiptap/extension-text-style";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (
        size: string,
      ) => ReturnType;
      unsetFontSize: () => ReturnType;
    };
  }
}

export const FontSize =
  Extension.create({
    name: "fontSize",

    // The addOptions method is used to add options to the extension.
    addOptions() {
      return {
        types: ["textStyle"],
      };
    },

    // The addGlobalAttributes method is used to add global attributes to the extension.
    addGlobalAttributes() {
      return [
        {
          types: this.options.types,
          attributes: {
            fontSize: {
              default: null,
              parseHTML: (element) =>
                element.style
                  .fontSize || null,
              renderHTML: (
                attributes,
              ) => {
                if (
                  !attributes.fontSize
                )
                  return {};
                return {
                  style: `font-size: ${attributes.fontSize}`,
                };
              },
            },
          },
        },
      ];
    },
    // The addCommands method is used to add commands to the extension.
    addCommands() {
      return {
        // The setFontSize command is used to set the font size of the selected text.
        setFontSize:
          (size) =>
          ({ chain }) => {
            return chain()
              .setMark("textStyle", {
                fontSize: size,
              })
              .run();
          },
        // The unsetFontSize command is used to unset the font size of the selected text.
        unsetFontSize:
          () =>
          ({ chain }) => {
            return chain()
              .setMark("textStyle", {
                fontSize: null,
              })
              .removeEmptyTextStyle()
              .run();
          },
      };
    },
  }).extend(TextStyle); // The extend method is used to extend the TextStyle extension with the FontSize extension.
