type DiagramNode = { id: string; label: string };
type DiagramEdge = { from: string; to: string };

function parseFlow(source: string) {
  const nodes = new Map<string, DiagramNode>();
  const edges: DiagramEdge[] = [];
  const pattern =
    /([A-Za-z0-9_]+)\[([^\]]+)\]\s*-->\s*([A-Za-z0-9_]+)(?:\[([^\]]+)\])?/g;

  for (const line of source.split("\n")) {
    pattern.lastIndex = 0;
    const match = pattern.exec(line);
    if (!match) continue;
    const fromId = match[1] ?? "";
    const fromLabel = match[2] ?? fromId;
    const toId = match[3] ?? "";
    const toLabel = match[4] ?? toId;
    nodes.set(fromId, { id: fromId, label: fromLabel });
    nodes.set(toId, { id: toId, label: toLabel });
    edges.push({ from: fromId, to: toId });
  }

  return { nodes: [...nodes.values()], edges };
}

function depths(nodes: DiagramNode[], edges: DiagramEdge[]) {
  const depth = new Map<string, number>();
  const incoming = new Map(nodes.map((node) => [node.id, 0]));
  for (const edge of edges) incoming.set(edge.to, (incoming.get(edge.to) ?? 0) + 1);

  const outgoing = new Map<string, string[]>();
  for (const edge of edges) {
    const list = outgoing.get(edge.from) ?? [];
    list.push(edge.to);
    outgoing.set(edge.from, list);
  }

  const queue = nodes.filter((node) => (incoming.get(node.id) ?? 0) === 0).map((node) => node.id);
  for (const id of queue) depth.set(id, 0);

  let cursor = 0;
  while (cursor < queue.length) {
    const id = queue[cursor];
    cursor += 1;
    if (!id) continue;
    const nextDepth = (depth.get(id) ?? 0) + 1;
    for (const next of outgoing.get(id) ?? []) {
      if (!depth.has(next)) {
        depth.set(next, nextDepth);
        queue.push(next);
      }
    }
  }

  for (const node of nodes) {
    if (!depth.has(node.id)) depth.set(node.id, 0);
  }

  return depth;
}

function labelLines(label: string) {
  if (label.length <= 16) return [label];
  const words = label.split(" ");
  if (words.length < 2) return [label];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

export function ArchitectureDiagram({ source }: { source: string }) {
  const { nodes, edges } = parseFlow(source);
  if (nodes.length === 0) return null;

  const depth = depths(nodes, edges);
  const columns = new Map<number, DiagramNode[]>();
  for (const node of nodes) {
    const column = depth.get(node.id) ?? 0;
    const list = columns.get(column) ?? [];
    list.push(node);
    columns.set(column, list);
  }

  const columnCount = Math.max(...columns.keys()) + 1;
  const rowCount = Math.max(...[...columns.values()].map((column) => column.length));
  const nodeWidth = 148;
  const nodeHeight = 64;
  const gapX = 56;
  const gapY = 18;
  const pad = 16;
  const width = pad * 2 + columnCount * nodeWidth + (columnCount - 1) * gapX;
  const height = pad * 2 + rowCount * nodeHeight + Math.max(0, rowCount - 1) * gapY;

  const positions = new Map<string, { x: number; y: number }>();
  for (const [columnIndex, column] of columns) {
    const columnHeight = column.length * nodeHeight + (column.length - 1) * gapY;
    const offsetY = (height - columnHeight) / 2;
    column.forEach((node, row) => {
      positions.set(node.id, {
        x: pad + columnIndex * (nodeWidth + gapX),
        y: offsetY + row * (nodeHeight + gapY),
      });
    });
  }

  const ordered = [...nodes].sort(
    (a, b) => (depth.get(a.id) ?? 0) - (depth.get(b.id) ?? 0),
  );

  return (
    <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Architecture diagram">
      <ol className="sr-only">
        {ordered.map((node) => (
          <li key={node.id}>{node.label}</li>
        ))}
      </ol>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-hidden="true"
        className="h-auto max-w-full"
      >
        <defs>
          <marker id="arch-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0 0 L8 4 L0 8 Z" fill="currentColor" />
          </marker>
        </defs>
        {edges.map((edge) => {
          const from = positions.get(edge.from);
          const to = positions.get(edge.to);
          if (!from || !to) return null;
          const x1 = from.x + nodeWidth;
          const y1 = from.y + nodeHeight / 2;
          const x2 = to.x - 8;
          const y2 = to.y + nodeHeight / 2;
          const mid = (x1 + x2) / 2;
          return (
            <path
              key={`${edge.from}-${edge.to}`}
              d={`M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              opacity="0.55"
              markerEnd="url(#arch-arrow)"
            />
          );
        })}
        {nodes.map((node) => {
          const position = positions.get(node.id);
          if (!position) return null;
          const lines = labelLines(node.label);
          return (
            <g key={node.id} transform={`translate(${position.x} ${position.y})`}>
              <rect
                width={nodeWidth}
                height={nodeHeight}
                rx="16"
                fill="currentColor"
                opacity="0.06"
                stroke="currentColor"
                strokeOpacity="0.28"
              />
              <text
                x={nodeWidth / 2}
                y={lines.length === 1 ? nodeHeight / 2 : nodeHeight / 2 - 8}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="currentColor"
                fontSize="13"
                fontFamily="ui-sans-serif, system-ui, sans-serif"
              >
                {lines.map((line, index) => (
                  <tspan key={line} x={nodeWidth / 2} dy={index === 0 ? 0 : 16}>
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
