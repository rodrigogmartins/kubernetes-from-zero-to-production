type Props = {
  addPod: () => void
  killNode: (nodeId: string) => void
  activeTaskId?: string
}

export function Controls({
  addPod,
  killNode,
  activeTaskId
}: Props) {
  return (
    <div style={{ marginBottom: 20 }}>
      <button
        onClick={addPod}
        disabled={activeTaskId === 'node-failure'}
      >
        Create Pod
      </button>
      
      <button
        style={{ marginLeft: 10 }}
        onClick={() => killNode('node-1')}
        disabled={activeTaskId !== 'node-failure'}
      >
        Kill Node 1
      </button>

      <button
        style={{ marginLeft: 10 }}
        onClick={() => killNode('node-2')}
        disabled={activeTaskId !== 'node-failure'}
      >
        Kill Node 2
      </button>
    </div>
  )
}
