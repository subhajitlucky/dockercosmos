import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Box,
  Terminal,
  Play,
  Square,
  Trash2,
  Plus,
  Cpu,
  Database,
  Layers,
  RefreshCw,
  Settings,
} from 'lucide-react'

interface Container {
  id: string
  name: string
  image: string
  status: 'running' | 'stopped' | 'paused'
  pid: number | null
  namespaces: {
    pid: boolean
    net: boolean
    mount: boolean
    user: boolean
    ipc: boolean
    uts: boolean
  }
  resources: {
    cpuLimit: number
    memoryLimit: number
  }
  processes: { pid: number; name: string; cmd: string }[]
}

interface Process {
  id: number
  name: string
  pid: number
}

export function LabPage() {
  const [containers, setContainers] = useState<Container[]>([])
  const [selectedContainer, setSelectedContainer] = useState<string | null>(null)
  const [hostProcesses, setHostProcesses] = useState<Process[]>([
    { id: 1, name: 'systemd', pid: 1 },
    { id: 2, name: 'dockerd', pid: 234 },
    { id: 3, name: 'containerd', pid: 456 },
  ])
  const [nextPid, setNextPid] = useState(1000)

  const createContainer = (image: string) => {
    const id = `container-${Date.now()}`
    const container: Container = {
      id,
      name: `elegant_${image.split(':')[0]}`,
      image,
      status: 'stopped',
      pid: null,
      namespaces: {
        pid: true,
        net: true,
        mount: true,
        user: false,
        ipc: true,
        uts: true,
      },
      resources: {
        cpuLimit: 50,
        memoryLimit: 256,
      },
      processes: [],
    }
    setContainers([...containers, container])
    setSelectedContainer(id)
  }

  const startContainer = (id: string) => {
    setContainers((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status: 'running' as const,
              pid: nextPid,
              processes: [
                { pid: 1, name: c.image.split(':')[0], cmd: `${c.image.split(':')[0]} daemon` },
                { pid: 2, name: 'sh', cmd: 'sh' },
              ],
            }
          : c
      )
    )
    setNextPid((prev) => prev + 10)
  }

  const stopContainer = (id: string) => {
    setContainers((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: 'stopped' as const, pid: null, processes: [] }
          : c
      )
    )
  }

  const toggleNamespace = (id: string, namespace: keyof Container['namespaces']) => {
    setContainers((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, namespaces: { ...c.namespaces, [namespace]: !c.namespaces[namespace] } }
          : c
      )
    )
  }

  const spawnProcess = (containerId: string, name: string) => {
    setContainers((prev) =>
      prev.map((c) =>
        c.id === containerId
          ? {
              ...c,
              processes: [...c.processes, { pid: c.processes.length + 2, name, cmd: name }],
            }
          : c
      )
    )
  }

  const deleteContainer = (id: string) => {
    setContainers((prev) => prev.filter((c) => c.id !== id))
    if (selectedContainer === id) {
      setSelectedContainer(null)
    }
  }

  const resetLab = () => {
    setContainers([])
    setSelectedContainer(null)
    setNextPid(1000)
  }

  const selected = containers.find((c) => c.id === selectedContainer)

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="container mx-auto max-w-6xl px-4 md:px-6 py-6 md:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 md:mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2 md:gap-3">
                <Terminal className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                Container Isolation Lab
              </h1>
              <p className="text-muted-foreground mt-1 md:mt-2 text-sm md:text-base">
                Create containers, toggle namespaces, and experiment with isolation
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={resetLab} className="gap-2 self-start sm:self-auto">
              <RefreshCw className="h-4 w-4" />
              Reset Lab
            </Button>
          </div>
        </motion.div>

        <div className="grid gap-4 md:gap-6 lg:grid-cols-4">
          {/* Left Panel - Create Container */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Create Container
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { image: 'nginx', icon: Box, color: 'text-green-500' },
                  { image: 'redis', icon: Database, color: 'text-red-500' },
                  { image: 'python:3.11', icon: Terminal, color: 'text-yellow-500' },
                  { image: 'node:18', icon: Layers, color: 'text-green-600' },
                ].map((item) => (
                  <Button
                    key={item.image}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => createContainer(item.image)}
                  >
                    <item.icon className={`mr-2 h-4 w-4 ${item.color}`} />
                    {item.image}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Host Processes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Cpu className="h-4 w-4" />
                  Host Processes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 font-mono text-xs">
                  {hostProcesses.map((proc) => (
                    <div key={proc.id} className="flex items-center gap-2">
                      <span className="text-green-500">{proc.pid}</span>
                      <span className="text-muted-foreground">{proc.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Center Panel - Container Visualization */}
          <div className="lg:col-span-2">
            <Card className="h-full min-h-[500px]">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Layers className="h-5 w-5 text-primary" />
                    Container Visualization
                  </span>
                  <span className="text-sm font-normal text-muted-foreground">
                    {containers.length} container{containers.length !== 1 ? 's' : ''}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {containers.length === 0 ? (
                  <div className="flex h-[400px] flex-col items-center justify-center text-center">
                    <div className="mb-4 rounded-full bg-secondary/50 p-6">
                      <Box className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <h3 className="mb-2 font-semibold">No containers yet</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Click a container image above to create your first container
                    </p>
                    <p className="text-xs text-muted-foreground">
                      All containers share the host kernel
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {containers.map((container) => (
                      <motion.div
                        key={container.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`cursor-pointer rounded-xl border-2 p-4 transition-all ${
                          selectedContainer === container.id
                            ? 'border-primary bg-primary/5 shadow-lg'
                            : 'border-border bg-secondary/20 hover:border-primary/50'
                        }`}
                        onClick={() => setSelectedContainer(container.id)}
                      >
                        <div className="mb-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-2.5 w-2.5 rounded-full ${
                                container.status === 'running'
                                  ? 'bg-green-500 animate-pulse'
                                  : container.status === 'paused'
                                  ? 'bg-yellow-500'
                                  : 'bg-gray-500'
                              }`}
                            />
                            <span className="font-mono text-sm font-medium">
                              {container.name}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {container.image}
                          </span>
                        </div>

                        {/* Process tree */}
                        <div className="font-mono text-xs">
                          {container.status === 'running' ? (
                            <div className="space-y-1">
                              <div className="text-blue-400">PID 1: {container.processes[0]?.name}</div>
                              {container.processes.slice(1).map((proc) => (
                                <div key={proc.pid} className="pl-4 text-blue-400/70">
                                  PID {proc.pid}: {proc.name}
                                </div>
                              ))}
                              {container.namespaces.pid && (
                                <div className="mt-2 rounded bg-primary/10 px-2 py-1 text-[10px] text-primary">
                                  PID namespace active
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="text-muted-foreground">Not running</div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="mt-3 flex gap-1">
                          {container.status === 'running' ? (
                            <Button
                              size="sm"
                              variant="destructive"
                              className="h-6 text-xs"
                              onClick={(e) => {
                                e.stopPropagation()
                                stopContainer(container.id)
                              }}
                            >
                              <Square className="h-3 w-3 mr-1" />
                              Stop
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              className="h-6 text-xs"
                              onClick={(e) => {
                                e.stopPropagation()
                                startContainer(container.id)
                              }}
                            >
                              <Play className="h-3 w-3 mr-1" />
                              Start
                            </Button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Inspector */}
          <div className="space-y-4">
            {selected ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Container Inspector
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Status */}
                    <div>
                      <div className="text-xs text-muted-foreground">Status</div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            selected.status === 'running'
                              ? 'bg-green-500'
                              : selected.status === 'paused'
                              ? 'bg-yellow-500'
                              : 'bg-gray-500'
                          }`}
                        />
                        <span className="font-mono text-sm capitalize">{selected.status}</span>
                      </div>
                    </div>

                    {/* PID */}
                    <div>
                      <div className="text-xs text-muted-foreground">
                        {selected.status === 'running' ? 'Container PID' : 'PID'}
                      </div>
                      <div className="font-mono text-sm">
                        {selected.status === 'running' ? 1 : '-'} (Host: {selected.pid || '-'})
                      </div>
                    </div>

                    {/* Resources */}
                    <div>
                      <div className="text-xs text-muted-foreground">CPU Limit</div>
                      <div className="text-sm">{selected.resources.cpuLimit}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Memory Limit</div>
                      <div className="text-sm">{selected.resources.memoryLimit} MB</div>
                    </div>

                    {/* Spawn Process */}
                    {selected.status === 'running' && (
                      <div>
                        <div className="mb-2 text-xs text-muted-foreground">Spawn Process</div>
                        <div className="flex flex-wrap gap-1">
                          {['bash', 'top', 'ps', 'sleep 10'].map((proc) => (
                            <Button
                              key={proc}
                              size="sm"
                              variant="secondary"
                              className="h-6 text-xs"
                              onClick={() => spawnProcess(selected.id, proc)}
                            >
                              {proc}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Delete */}
                    <Button
                      variant="destructive"
                      size="sm"
                      className="w-full gap-2"
                      onClick={() => deleteContainer(selected.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete Container
                    </Button>
                  </CardContent>
                </Card>

                {/* Namespaces */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Namespaces</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {[
                        { key: 'pid', label: 'PID' },
                        { key: 'net', label: 'Network' },
                        { key: 'mount', label: 'Mount' },
                        { key: 'user', label: 'User' },
                        { key: 'ipc', label: 'IPC' },
                        { key: 'uts', label: 'UTS' },
                      ].map(({ key, label }) => (
                        <label
                          key={key}
                          className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-secondary/50 transition-colors cursor-pointer"
                        >
                          <span className="text-sm font-medium">{label}</span>
                          <input
                            type="checkbox"
                            checked={selected.namespaces[key as keyof typeof selected.namespaces]}
                            onChange={() =>
                              toggleNamespace(selected.id, key as keyof typeof selected.namespaces)
                            }
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                        </label>
                      ))}
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground">
                      Toggle namespaces to see isolation effects
                    </p>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="flex h-[300px] items-center justify-center text-center">
                  <div className="text-sm text-muted-foreground">
                    <Settings className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    Select a container to inspect its configuration
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
