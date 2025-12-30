import { motion } from 'framer-motion'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface NamespaceVisualizerProps {
  type: string
}

export function NamespaceVisualizer({ type }: NamespaceVisualizerProps) {
  const [isContainerRunning, setIsContainerRunning] = useState(false)
  const [processes, setProcesses] = useState<{ id: number; name: string; pid: number }[]>([])

  const namespaceTypes: Record<string, { label: string; color: string }> = {
    'pid-namespace': { label: 'PID Namespace', color: 'text-blue-500' },
    'mount-namespace': { label: 'Mount Namespace', color: 'text-green-500' },
    'network-namespace': { label: 'Network Namespace', color: 'text-purple-500' },
    'user-namespace': { label: 'User Namespace', color: 'text-orange-500' },
    'ipc-namespace': { label: 'IPC Namespace', color: 'text-pink-500' },
    'uts-namespace': { label: 'UTS Namespace', color: 'text-cyan-500' },
  }

  const config = namespaceTypes[type] || { label: 'Namespace', color: 'text-docker-blue' }

  const startContainer = () => {
    setIsContainerRunning(true)
    setProcesses([
      { id: 1, name: 'nginx', pid: 1 },
      { id: 2, name: 'sh', pid: 7 },
      { id: 3, name: 'nginx worker', pid: 12 },
    ])
  }

  const stopContainer = () => {
    setIsContainerRunning(false)
    setProcesses([])
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className={`font-semibold ${config.color}`}>{config.label}</h4>
          <p className="text-sm text-muted-foreground">
            Isolates {type.replace('-namespace', '')} resources
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={isContainerRunning ? 'destructive' : 'default'}
            onClick={isContainerRunning ? stopContainer : startContainer}
          >
            {isContainerRunning ? 'Stop Container' : 'Start Container'}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Host View */}
        <div className="space-y-3">
          <h5 className="text-sm font-medium text-muted-foreground">Host System View</h5>
          <motion.div
            animate={{
              borderColor: isContainerRunning ? 'rgb(36, 150, 237)' : 'rgb(100, 100, 100)',
              boxShadow: isContainerRunning ? '0 0 20px rgba(36, 150, 237, 0.3)' : 'none',
            }}
            className="rounded-lg border-2 border-dashed border-muted-foreground/30 bg-secondary/50 p-4"
          >
            <div className="mb-2 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-sm font-mono">host:~#</span>
            </div>

            <div className="space-y-1 font-mono text-xs">
              <div className="text-muted-foreground">PID TTY STAT TIME COMMAND</div>
              {isContainerRunning && (
                <>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-blue-400"
                  >
                    1234 ? S 0:00 nginx (container)
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-blue-400"
                  >
                    1245 ? S 0:00 nginx: worker (container)
                  </motion.div>
                </>
              )}
              <div className="text-green-400">1 ? Ss 0:01 /sbin/init</div>
              <div className="text-green-400">567 ? S 0:00 dockerd</div>
            </div>
          </motion.div>
        </div>

        {/* Container View */}
        <div className="space-y-3">
          <h5 className="text-sm font-medium text-muted-foreground">Container View</h5>
          <motion.div
            animate={{
              borderColor: isContainerRunning ? 'rgb(36, 150, 237)' : 'rgb(100, 100, 100)',
              opacity: isContainerRunning ? 1 : 0.5,
            }}
            className="rounded-lg border-2 border-primary bg-primary/5 p-4"
          >
            <div className="mb-2 flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${isContainerRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
              <span className="text-sm font-mono text-primary">container:~#</span>
            </div>

            <div className="space-y-1 font-mono text-xs">
              <div className="text-muted-foreground">PID TTY STAT TIME COMMAND</div>
              {isContainerRunning ? (
                processes.map((proc) => (
                  <motion.div
                    key={proc.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: proc.id * 0.1 }}
                    className="text-primary"
                  >
                    {proc.pid} ? S 0:00 {proc.name}
                  </motion.div>
                ))
              ) : (
                <div className="text-muted-foreground italic">Container not running</div>
              )}
            </div>

            {/* Namespace boundary indicator */}
            {isContainerRunning && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 rounded bg-primary/20 px-2 py-1 text-xs text-primary"
              >
                {config.label} Active - Isolated view
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Visual representation of namespace isolation */}
      <div className="rounded-lg bg-secondary/50 p-4">
        <h5 className="mb-3 text-sm font-medium">Namespace Isolation</h5>
        <div className="flex items-center justify-center gap-4">
          {/* Host kernel */}
          <div className="rounded-lg bg-secondary p-4 text-center text-foreground border">
            <div className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">Host</div>
            <div className="font-semibold">Kernel</div>
          </div>

          {/* Connection line */}
          <motion.div
            animate={{
              width: isContainerRunning ? 100 : 0,
              opacity: isContainerRunning ? 1 : 0,
            }}
            className="h-0.5 bg-primary"
          />

          {/* Container namespaces */}
          <motion.div
            animate={{
              scale: isContainerRunning ? 1 : 0.9,
              opacity: isContainerRunning ? 1 : 0.5,
            }}
            className="flex gap-2"
          >
            {['PID', 'Mount', 'Net', 'User', 'IPC', 'UTS'].map((ns, i) => (
              <motion.div
                key={ns}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: isContainerRunning ? 1 : 0.3,
                  y: 0,
                }}
                transition={{ delay: i * 0.1 }}
                className={`rounded border px-2 py-1 text-xs ${
                  isContainerRunning
                    ? 'border-primary bg-primary/20 text-primary'
                    : 'border-muted-foreground/30 text-muted-foreground'
                }`}
              >
                {ns}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
