import type { ActualState, Node, Pod } from '../types'

type Props = {
  state: ActualState
}

export function ClusterView({ state }: Props) {
  return (
    <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 gap-4 md:gap-6 max-w-full">
        {/* Nodes Section */}
        <div className="space-y-4">
          <h2 className="text-lg md:text-xl font-semibold text-accent">Nodes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {state.nodes.map((node) => (
              <div
                key={node.id}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  node.status === 'Down'
                    ? 'border-gray-500 bg-gray-900/20'
                    : node.pods.length >= node.capacity
                    ? 'border-amber-500 bg-amber-900/20'
                    : 'border-accent bg-card/50 hover:bg-card'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-sm md:text-base capitalize">{node.id}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded font-semibold ${
                      node.status === 'Down'
                        ? 'bg-gray-500/20 text-gray-400'
                        : node.pods.length >= node.capacity
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-accent/20 text-accent'
                    }`}
                  >
                    {node.status === 'Down' ? 'DOWN' : node.pods.length >= node.capacity ? 'FULL' : 'Ready'}
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Pods: {node.pods.length}/{node.capacity}
                  </p>

                  {/* Pod slots visualization */}
                  <div className="flex flex-wrap gap-1">
                    {Array.from({ length: node.capacity }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-6 h-6 md:w-7 md:h-7 rounded border-2 flex items-center justify-center text-xs font-semibold transition-all ${
                          i < node.pods.length
                            ? 'bg-primary/30 border-primary text-primary'
                            : 'border-border bg-transparent'
                        }`}
                      >
                        {i < node.pods.length ? '●' : ''}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Pods Section */}
        <div className="space-y-4">
          <h2 className="text-lg md:text-xl font-semibold text-accent">Pending Pods</h2>
          <div className="p-4 rounded-lg border-2 border-border bg-card/30">
            {state.pods.filter((p: Pod) => p.status === 'Pending').length === 0 ? (
              <p className="text-sm text-muted-foreground italic">No pending pods</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {state.pods
                  .filter((p: Pod) => p.status === 'Pending')
                  .map((pod: Pod) => (
                    <div
                      key={pod.id}
                      className="px-3 py-1 bg-secondary/20 border border-secondary text-secondary rounded text-xs font-semibold"
                    >
                      {pod.id.slice(0, 8)}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Cluster Status */}
        <div className="space-y-4">
          <h2 className="text-lg md:text-xl font-semibold text-accent">Cluster Status</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 md:gap-3">
            <div className="p-3 md:p-4 rounded-lg bg-card border border-border text-center">
              <p className="text-xs text-muted-foreground mb-1">Total Pods</p>
              <p className="text-lg md:text-xl font-bold text-accent">{state.pods.filter((p) => p.status !== 'Failed').length}</p>
            </div>
            <div className="p-3 md:p-4 rounded-lg bg-card border border-border text-center">
              <p className="text-xs text-muted-foreground mb-1">Running</p>
              <p className="text-lg md:text-xl font-bold text-primary">
                {state.pods.filter((p: Pod) => p.status === 'Running').length}
              </p>
            </div>
            <div className="p-3 md:p-4 rounded-lg bg-card border border-border text-center">
              <p className="text-xs text-muted-foreground mb-1">Pending</p>
              <p className="text-lg md:text-xl font-bold text-secondary">
                {state.pods.filter((p: Pod) => p.status === 'Pending').length}
              </p>
            </div>
            <div className="p-3 md:p-4 rounded-lg bg-card border border-border text-center">
              <p className="text-xs text-muted-foreground mb-1">Failed</p>
              <p className="text-lg md:text-xl font-bold text-destructive">
                {state.pods.filter((p: Pod) => p.status === 'Failed').length}
              </p>
            </div>
            <div className="p-3 md:p-4 rounded-lg bg-card border border-border text-center">
              <p className="text-xs text-muted-foreground mb-1">Nodes Ready</p>
              <p className="text-lg md:text-xl font-bold text-accent">
                {state.nodes.filter((n: Node) => n.status === 'Ready').length}/{state.nodes.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}