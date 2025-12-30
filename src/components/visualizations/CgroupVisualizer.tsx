import { motion } from 'framer-motion'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function CgroupVisualizer() {
  const [cpuLimit, setCpuLimit] = useState(50)
  const [memoryLimit, setMemoryLimit] = useState(256)
  const [containerLoad, setContainerLoad] = useState(0)
  const [hostLoad, setHostLoad] = useState(30)

  // Simulate load changes
  useState(() => {
    const interval = setInterval(() => {
      setContainerLoad(Math.max(0, Math.min(100, containerLoad + (Math.random() - 0.5) * 20)))
      setHostLoad(Math.max(0, Math.min(100, hostLoad + (Math.random() - 0.5) * 10)))
    }, 1000)
    return () => clearInterval(interval)
  })

  const isOverLimit = containerLoad > cpuLimit

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold text-primary">cgroup Resource Limits</h4>
        <p className="text-sm text-muted-foreground">
          Control Groups limit CPU, memory, and I/O usage
        </p>
      </div>

      {/* CPU Visualization */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h5 className="text-sm font-medium">CPU Limit</h5>
          <span className="text-sm font-mono">{cpuLimit}%</span>
        </div>
        <input
          type="range"
          min="10"
          max="100"
          value={cpuLimit}
          onChange={(e) => setCpuLimit(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex gap-4 text-xs text-muted-foreground">
          <span>10%</span>
          <span className="flex-1 text-center">Adjust container CPU allocation</span>
          <span>100%</span>
        </div>
      </div>

      {/* Memory Visualization */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h5 className="text-sm font-medium">Memory Limit</h5>
          <span className="text-sm font-mono">{memoryLimit} MB</span>
        </div>
        <input
          type="range"
          min="64"
          max="512"
          step="64"
          value={memoryLimit}
          onChange={(e) => setMemoryLimit(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex gap-4 text-xs text-muted-foreground">
          <span>64 MB</span>
          <span className="flex-1 text-center">Adjust container memory allocation</span>
          <span>512 MB</span>
        </div>
      </div>

      {/* Resource Usage Bars */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Container Usage */}
        <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
          <h5 className="mb-3 text-sm font-medium text-primary">Container Usage</h5>

          {/* CPU bar */}
          <div className="mb-3 space-y-1">
            <div className="flex justify-between text-xs">
              <span>CPU</span>
              <span className={isOverLimit ? 'text-red-500' : 'text-green-500'}>
                {containerLoad.toFixed(1)}% / {cpuLimit}%
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-secondary">
              <motion.div
                animate={{
                  width: `${Math.min(containerLoad, 100)}%`,
                  backgroundColor: isOverLimit ? 'rgb(239, 68, 68)' : 'rgb(34, 197, 94)',
                }}
                className="h-full rounded-full"
              />
            </div>
            {isOverLimit && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-500"
              >
                ⚠ CPU throttled!
              </motion.div>
            )}
          </div>

          {/* Memory bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Memory</span>
              <span>{Math.round(containerLoad * 2.56)} MB / {memoryLimit} MB</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-secondary">
              <motion.div
                animate={{
                  width: `${Math.min(containerLoad, 100)}%`,
                  backgroundColor: containerLoad > memoryLimit * 0.9 ? 'rgb(239, 68, 68)' : 'rgb(34, 197, 94)',
                }}
                className="h-full rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Host System */}
        <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
          <h5 className="mb-3 text-sm font-medium text-green-500">Host System</h5>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs">
                <span>Total CPU Usage</span>
                <span>{hostLoad.toFixed(1)}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <motion.div
                  animate={{ width: `${hostLoad}%` }}
                  className="h-full rounded-full bg-green-500"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <div className="flex-1 rounded bg-secondary/50 p-2 text-center">
                <div className="text-lg font-bold text-docker-blue">8</div>
                <div className="text-xs text-muted-foreground">Cores</div>
              </div>
              <div className="flex-1 rounded bg-secondary/50 p-2 text-center">
                <div className="text-lg font-bold text-green-500">16 GB</div>
                <div className="text-xs text-muted-foreground">RAM</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* cgroup Hierarchy */}
      <div className="rounded-lg bg-secondary/50 p-4">
        <h5 className="mb-3 text-sm font-medium">cgroup Hierarchy</h5>
        <div className="flex items-center justify-center gap-2 text-sm">
          <div className="rounded border bg-background px-3 py-2">/sys/fs/cgroup</div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <div className="rounded border bg-background px-3 py-2">docker</div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <div className="rounded border border-primary bg-primary/10 px-3 py-2 font-mono">
            {Math.random().toString(36).substring(7)}
          </div>
        </div>
        <div className="mt-3 text-xs text-muted-foreground">
          Files: memory.limit_in_bytes, cpu.shares, pids.max, blkio.weight
        </div>
      </div>
    </div>
  )
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}
