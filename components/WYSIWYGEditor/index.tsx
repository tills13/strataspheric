"use client";

import * as styles from "./styles.css";

import { useRef, useState } from "react";
import { uuidv7 } from "uuidv7";

import { Button } from "../Button";
import { Group } from "../Group";

type Node = {
  $__type: string;
  uuid: string;
  children: Array<string | Node>;
};

type EditorState = {
  insertMode: "p" | "i" | "b";
  nodes: Node[];
};

function renderNode(node: Node, idx: number) {
  switch (node.$__type) {
    case "p": {
      return (
        <p key={idx} data-id={node.uuid}>
          {node.children.map((child, mIdx) =>
            typeof child === "string" ? child : renderNode(child, mIdx),
          )}
        </p>
      );
    }
    case "b": {
      return (
        <b key={idx} data-id={node.uuid}>
          {node.children.map((child, mIdx) =>
            typeof child === "string" ? child : renderNode(child, mIdx),
          )}
        </b>
      );
    }
    default: {
      return null;
    }
  }
}

function newNode(
  insertMode: EditorState["insertMode"],
  ...children: Node["children"]
): Node {
  const uuid = uuidv7();
  return { $__type: insertMode, uuid, children };
}

export function WYSIWYGEditor() {
  const nodeMap = useRef(new Map());
  const [editorState, setEditorState] = useState<EditorState>({
    insertMode: "p",
    nodes: [],
  });

  console.log({ editorState });

  function onKeyDown(e: React.KeyboardEvent) {
    const { key } = e;
    const selection = document.getSelection();

    if (!selection) {
      return;
    }

    const selectionOffset = selection.anchorOffset;
    const node = selection.anchorNode?.parentElement;
    const selectedNodeId = node?.getAttribute("data-id");

    console.log(
      key,
      "pressed at",
      selectionOffset,
      "parent id",
      selectedNodeId,
    );

    if (key === "Meta" || key === "Shift" || key.startsWith("Arrow")) {
      return;
    } else if (e.metaKey) {
      if (e.key === "b") {
        setEditorState((prevState) => ({
          ...prevState,
          insertMode: prevState.insertMode === "b" ? "p" : "b",
        }));
      } else if (e.key === "i") {
        setEditorState((prevState) => ({
          ...prevState,
          insertMode: prevState.insertMode === "i" ? "p" : "i",
        }));
      }

      return;
    }

    e.preventDefault();

    setEditorState((prevState) => {
      const nextState = JSON.parse(JSON.stringify(prevState)) as EditorState;

      function recurse(n: Node) {
        if (n.uuid === selectedNodeId) {
          const child = n.children[0];

          if (typeof child !== "string") {
            throw new Error("asd");
          }

          const before = child.slice(0, selectionOffset);
          const after = child.slice(selectionOffset);

          if (editorState.insertMode === n.$__type) {
            n.children[0] = before + key + after;
          } else {
            const node = newNode(editorState.insertMode, key);

            n.children.splice(
              0,
              1,
              before,
              node,
              ...(after.length ? [after] : []),
            );
          }

          return;
        }

        for (const child of n.children) {
          if (typeof child === "string") {
            continue;
          }

          recurse(child);
        }
      }

      if (prevState.nodes.length === 0) {
        const node = newNode(editorState.insertMode, key);
        nodeMap.current.set(node.uuid, node);
        nextState.nodes.push(node);
        return nextState;
      }

      for (const node of nextState.nodes) {
        recurse(node);
      }

      return nextState;
    });
  }

  return (
    <div className={styles.wysiwygEditorContainer}>
      <Group justify="start">
        <Button
          size="small"
          color="primary"
          style={editorState.insertMode === "b" ? "primary" : "tertiary"}
          type="button"
        >
          B
        </Button>
        <Button
          size="small"
          color="primary"
          style={editorState.insertMode === "i" ? "primary" : "tertiary"}
          type="button"
        >
          I
        </Button>
      </Group>
      <div
        className={styles.wysiwygEditor}
        contentEditable="true"
        onKeyDown={onKeyDown}
        suppressContentEditableWarning
      >
        {editorState.nodes.map(renderNode)}
      </div>
    </div>
  );
}
