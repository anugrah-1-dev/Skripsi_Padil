import ReactFlow, { Background, Controls } from "reactflow";
// @ts-ignore
import "reactflow/dist/style.css";
import * as htmlToImage from "html-to-image";
import { useRef } from "react";

 let nodeId = 0;

function buildTreeLayout(
  tree: any,
  depth = 0,
  index = 0,
  nodes: any[] = [],
  edges: any[] = []
) {
  // 🔥 HANDLE NULL
  if (!tree) return null;

  const id = `${nodeId++}`;

  const x = index * 200;
  const y = depth * 120;

  nodes.push({
    id,
    data: {
      label: tree.label
        ? `🎯 ${tree.label}`
        : `📊 ${tree.attribute}`,
    },
    position: { x, y },
    style: {
      background: tree.label ? "#22c55e" : "#3b82f6",
      color: "white",
      padding: 10,
      borderRadius: 8,
      textAlign: "center",
      fontWeight: "bold",
    },
  });

  if (tree.branches) {
    let childIndex = index - 1;

    Object.entries(tree.branches).forEach(([key, child]: any) => {
      // 🔥 SKIP kalau null
      if (!child) return;

      const childId = buildTreeLayout(
        child,
        depth + 1,
        childIndex,
        nodes,
        edges
      );

      // 🔥 VALIDASI
      if (!childId) return;

      edges.push({
        id: `${id}-${childId}`,
        source: id,
        target: childId,
        label: key === "tinggi" ? "Ya" : "Tidak",
      });

      childIndex += 2;
    });
  }

  return id;
}

 export default function TreeDiagram({ tree }: any) {
  if (!tree) return <div>Tidak ada tree</div>;

  const nodes: any[] = [];
  const edges: any[] = [];
  nodeId = 0;

  buildTreeLayout(tree, 0, 2, nodes, edges);

  return (
    <div style={{ width: "100%", height: "600px" }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}