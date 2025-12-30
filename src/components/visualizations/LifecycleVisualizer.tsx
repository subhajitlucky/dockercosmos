import { motion } from 'framer-motion'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function LifecycleVisualizer() {
  const [containerState, setContainerState] = useState<'created' | 'running' | 'paused' | 'stopped'>('stopped')

  const states = [
    { key: 'created', label: 'Created', color: 'bg-blue-500' },
    { key: 'running', label: 'Running', color: 'bg-green-500' },
    { key: 'paused', label: 'Paused', color: 'bg-yellow-500' },
    { key: 'stopped', label: 'Stopped', color: 'bg-gray-500' },
  ] as const

  const transitions: Record<string, string[]> = {
    created: ['running', 'stopped'],
    running: ['paused', 'stopped'],
    paused: ['running', 'stopped'],
    stopped: ['created'],
  }

  const nextState = (next: string) => {
    setContainerState(next as typeof containerState)
  }

  const currentState = states.find((s) => s.key === containerState)

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold text-primary">Container Lifecycle</h4>
        <p className="text-sm text-muted-foreground">
          Containers transition between states through Docker commands
        </p>
      </div>

      {/* State Machine Visualization */}
      <div className="relative flex items-center justify-center gap-4 py-8">
        {/* Connecting line */}
        <div className="absolute left-1/2 top-1/2 h-0.5 w-3/4 -translate-x-1/2 -translate-y-1/2 bg-secondary" />

        {states.map((state, index) => {
          const isCurrent = containerState === state.key
          const canTransition = transitions[containerState].includes(state.key)

          return (
            <motion.button
              key={state.key}
              whileHover={canTransition ? { scale: 1.1 } : undefined}
              whileTap={canTransition ? { scale: 0.95 } : undefined}
              onClick={() => canTransition && nextState(state.key)}
              disabled={!canTransition}
              className={`relative z-10 flex flex-col items-center gap-2 ${
                isCurrent ? '' : canTransition ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
              }`}
            >
              <motion.div
                animate={{
                  scale: isCurrent ? [1, 1.2, 1] : 1,
                  boxShadow: isCurrent
                    ? '0 0 20px rgba(34, 197, 94, 0.5)'
                    : '0 0 0px rgba(0, 0, 0, 0)',
                }}
                transition={{ duration: 0.5, repeat: isCurrent ? Infinity : 0, repeatDelay: 1 }}
                className={`flex h-16 w-16 items-center justify-center rounded-full ${state.color} ${
                  isCurrent ? 'text-white' : 'text-white/70'
                }`}
              >
                {state.key === 'running' && (
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    {state.key === 'running' ? '▶' : state.key[0].toUpperCase()}
                  </motion.div>
                )}
                {state.key === 'paused' && '⏸'}
                {state.key === 'stopped' && '⏹'}
                {state.key === 'created' && '📦'}
              </motion.div>
              <div
                className={`text-xs font-medium ${
                  isCurrent ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {state.label}
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Commands */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Current State Info */}
        <div className="rounded-lg bg-secondary/50 p-4">
          <h5 className="mb-2 text-sm font-medium">Current State</h5>
          <div className="space-y-2 font-mono text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Status:</span>
              <span className={currentState?.color.replace('bg-', 'text-')}>
                {currentState?.label.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">PID:</span>
              <span>{containerState === 'running' ? '1234' : '-'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Uptime:</span>
              <span>
                {containerState === 'running' ? '2d 3h 45m' : '-'}
              </span>
            </div>
          </div>
        </div>

        {/* Available Actions */}
        <div className="rounded-lg bg-secondary/50 p-4">
          <h5 className="mb-2 text-sm font-medium">Available Actions</h5>
          <div className="flex flex-wrap gap-2">
            {transitions[containerState].map((next) => (
              <motion.div
                key={next}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => nextState(next)}
                  className="gap-1"
                >
                  {next === 'running' && '▶'}
                  {next === 'paused' && '⏸'}
                  {next === 'stopped' && '⏹'}
                  {next === 'created' && '📦'}
                  {next.charAt(0).toUpperCase() + next.slice(1)}
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Command reference */}
          <div className="mt-3 space-y-1 text-xs text-muted-foreground">
            <div>docker create → created</div>
            <div>docker start → running</div>
            <div>docker pause → paused</div>
            <div>docker stop → stopped</div>
          </div>
        </div>
      </div>

      {/* Process Tree */}
      <div className="rounded-lg bg-secondary/50 p-4">
        <h5 className="mb-3 text-sm font-medium">Process Tree</h5>
        <div className="font-mono text-sm">
          {containerState === 'stopped' ? (
            <div className="text-muted-foreground">No processes running</div>
          ) : (
            <div className="space-y-1">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-green-500"
              >
                ├── nginx(1) [master process]
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="pl-4 text-green-500/70"
              >
                └── nginx(7) [worker process]
              </motion.div>
              {containerState === 'running' && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="pl-4 text-blue-500/70"
                >
                  └── sh(12) [shell]
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
