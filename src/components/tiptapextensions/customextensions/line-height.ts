"use client";

import { Extension } from "@tiptap/core";
import { TextStyle } from "@tiptap/extension-text-style";

// Line Height Extension
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    lineHeight: {
      setLineHeight: (
        height: string,
      ) => ReturnType;
      unsetLineHeight: () => ReturnType;
    };
  }
}

export const LineHeight =
  Extension.create({
    name: "lineHeight",
    // The addOptions method is used to add options to the extension.
    addOptions() {
      return {
        types: ["paragraph", "heading"],
        defaultLineHeight: "normal",
      };
    },

    // The addGlobalAttributes method is used to add global attributes to the editor.
    addGlobalAttributes() {
      return [
        {
          types: this.options.types,
          attributes: {
            lineHeight: {
              default:
                this.options
                  .defaultLineHeight,
              parseHTML: (element) =>
                element.style
                  .lineHeight ||
                this.options
                  .defaultLineHeight,
              renderHTML: (
                attributes,
              ) => {
                if (
                  !attributes.lineHeight
                )
                  return {};
                return {
                  style: `line-height: ${attributes.lineHeight}`,
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
        setLineHeight:
          (lineHeight: string) =>
          ({ tr, state, dispatch }) => {
            const { from, to } =
              state.selection;
            let updated = false;

            state.doc.nodesBetween(
              from,
              to,
              (node, pos) => {
                if (
                  this.options.types.includes(
                    node.type.name,
                  )
                ) {
                  tr.setNodeMarkup(
                    pos,
                    undefined,
                    {
                      ...node.attrs,
                      lineHeight,
                    },
                  );
                  updated = true;
                }
              },
            );
            // The dispatch method is used to dispatch a transaction to the editor.
            if (updated && dispatch) {
              dispatch(tr);
            }

            return updated;
          },
        // The unsetLineHeight method is used to remove the line height attribute from the selected nodes.
        unsetLineHeight:
          () =>
          ({ tr, state, dispatch }) => {
            const { from, to } =
              state.selection;
            let updated = false;

            state.doc.nodesBetween(
              from,
              to,
              (node, pos) => {
                if (
                  this.options.types.includes(
                    node.type.name,
                  )
                ) {
                  const newAttrs = {
                    ...node.attrs,
                  };
                  delete newAttrs.lineHeight; // Properly remove attribute
                  tr.setNodeMarkup(
                    pos,
                    undefined,
                    newAttrs,
                  );
                  updated = true;
                }
              },
            );
            // The dispatch method is used to dispatch a transaction to the editor.
            if (updated && dispatch) {
              dispatch(tr);
            }

            return updated;
          },
      };
    },
  }).extend(TextStyle); // The LineHeight extension extends the TextStyle extension.
