import type { ActualState } from '../state/types'

type Props = {
  state: ActualState
}

export function ClusterView({ state }: Props) {
  return (
    <div style={{ display: 'flex', gap: 40 }}>
      {state.nodes.map(node => (
        <div
          key={node.id}
          style={{
            border: '2px solid black',
            padding: 10,
            width: 150,
            color: '#0f0f0f',
            backgroundColor:
              node.status === 'Down'
                ? '#e8757e'
                : '#5ebc92'
          }}
        >
          <strong>{node.id}</strong>
          <div>Status: {node.status}</div>
          <div>
            {node.pods.length}/{node.capacity} pods
          </div>

          <ul>
            {node.pods.map(podId => (
              <li key={podId}>
                Pod {podId.slice(0, 4)}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div>
        <strong>Pending Pods</strong>
        <ul>
          {state.pods
            .filter(p => p.status === 'Pending')
            .map(p => (
              <li key={p.id}>
                Pod {p.id.slice(0, 4)}
              </li>
            ))}
        </ul>
      </div>

      <div style={{ marginTop: 20 }}>
        <strong>Cluster Status</strong>
        <div>Total Pods: {state.pods.length}</div>
        <div>
          Running Pods:{' '}
          {state.pods.filter(p => p.status === 'Running').length}
        </div>
        <div>
          Pending Pods:{' '}
          {state.pods.filter(p => p.status === 'Pending').length}
        </div>
      </div>
    </div>
  )
}
