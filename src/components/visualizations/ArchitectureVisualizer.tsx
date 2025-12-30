import { motion } from 'framer-motion'
import { useState } from 'react'

export function ArchitectureVisualizer() {
  const [activeComponent, setActiveComponent] = useState<string | null>(null)

  const components = [
    {
      id: 'client',
      name: 'Docker CLI',
      description: 'Command-line interface that sends commands to the daemon',
      commands: ['docker build', 'docker run', 'docker push'],
      position: 'top',
    },
    {
      id: 'daemon',
      name: 'Docker Daemon',
      description: 'Background service that builds, runs, and manages containers',
      responsibilities: ['Image management', 'Container lifecycle', 'Network & volumes'],
      position: 'center',
    },
    {
      id: 'registry',
      name: 'Registry',
      description: 'Storage and distribution of Docker images',
      examples: ['Docker Hub', 'GHCR', 'Private registries'],
      position: 'right',
    },
    {
      id: 'containerd',
      name: 'containerd',
      description: 'Industry-standard container runtime',
      role: 'Pulls images, creates containers, manages low-level operations',
      position: 'bottom',
    },
  ]

  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold text-primary">Docker Architecture</h4>
        <p className="text-sm text-muted-foreground">
          Docker uses a client-server architecture with a daemon managing containers
        </p>
      </div>

      {/* Interactive Diagram */}
      <div className="relative rounded-xl bg-secondary/20 p-4 md:p-6 border overflow-hidden">
        {/* Central Hub - Daemon */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          onHoverStart={() => setActiveComponent('daemon')}
          onHoverEnd={() => setActiveComponent(null)}
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer rounded-xl bg-secondary border-2 border-primary p-3 md:p-4 text-center shadow-lg transition-all ${
            activeComponent === 'daemon' || activeComponent === null
              ? 'opacity-100'
              : 'opacity-60'
          }`}
          style={{ width: 'clamp(120px, 35vw, 180px)' }}
        >
          <div className="text-sm md:text-base font-semibold">{components[1].name}</div>
          <div className="text-xs text-muted-foreground">dockerd</div>
        </motion.div>

        {/* Client - Top Left */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          onHoverStart={() => setActiveComponent('client')}
          onHoverEnd={() => setActiveComponent(null)}
          className={`absolute left-4 md:left-8 top-3 md:top-6 z-10 cursor-pointer rounded-lg bg-background border border-primary/50 p-2.5 md:p-3 text-center shadow transition-all ${
            activeComponent === 'client' || activeComponent === null
              ? 'opacity-100'
              : 'opacity-40'
          }`}
          style={{ width: 'clamp(80px, 25vw, 110px)' }}
        >
          <div className="text-xs md:text-sm font-semibold">{components[0].name}</div>
          <div className="text-[10px] md:text-xs text-muted-foreground">CLI</div>
        </motion.div>

        {/* Registry - Right */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          onHoverStart={() => setActiveComponent('registry')}
          onHoverEnd={() => setActiveComponent(null)}
          className={`absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 cursor-pointer rounded-lg bg-background border border-primary/50 p-2.5 md:p-3 text-center shadow transition-all ${
            activeComponent === 'registry' || activeComponent === null
              ? 'opacity-100'
              : 'opacity-40'
          }`}
          style={{ width: 'clamp(70px, 22vw, 100px)' }}
        >
          <div className="text-xs md:text-sm font-semibold">{components[2].name}</div>
          <div className="text-[10px] md:text-xs text-muted-foreground">Hub</div>
        </motion.div>

        {/* containerd - Bottom Left */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          onHoverStart={() => setActiveComponent('containerd')}
          onHoverEnd={() => setActiveComponent(null)}
          className={`absolute left-8 md:left-16 bottom-3 md:bottom-6 z-10 cursor-pointer rounded-lg bg-background border border-primary/50 p-2.5 md:p-3 text-center shadow transition-all ${
            activeComponent === 'containerd' || activeComponent === null
              ? 'opacity-100'
              : 'opacity-40'
          }`}
          style={{ width: 'clamp(80px, 25vw, 110px)' }}
        >
          <div className="text-xs md:text-sm font-semibold">{components[3].name}</div>
          <div className="text-[10px] md:text-xs text-muted-foreground">Runtime</div>
        </motion.div>

        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {/* Client to Daemon */}
          <motion.path
            d="M calc(clamp(80px, 25vw, 110px) / 2 + 4px) calc(clamp(80px, 25vw, 110px) / 2 + 3px) L 50% 50%"
            fill="none"
            stroke="rgba(36, 150, 237, 0.4)"
            strokeWidth="1.5"
            strokeDasharray="4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          />
          {/* Registry to Daemon */}
          <motion.path
            d="M calc(100% - clamp(70px, 22vw, 100px) / 2 - 4px) 50% L 50% 50%"
            fill="none"
            stroke="rgba(36, 150, 237, 0.4)"
            strokeWidth="1.5"
            strokeDasharray="4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          />
          {/* containerd to Daemon */}
          <motion.path
            d="M calc(clamp(80px, 25vw, 110px) / 2 + 8px) calc(100% - clamp(80px, 25vw, 110px) / 2 - 3px) L 50% 50%"
            fill="none"
            stroke="rgba(36, 150, 237, 0.4)"
            strokeWidth="1.5"
            strokeDasharray="4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          />
        </svg>
      </div>

      {/* Component Details */}
      <div className="grid gap-3 sm:grid-cols-2">
        {components.map((comp) => (
          <motion.div
            key={comp.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: activeComponent === comp.id || activeComponent === null ? 1 : 0.5,
              y: 0,
            }}
            transition={{ duration: 0.2 }}
            className={`rounded-lg border p-3 md:p-4 transition-all ${
              activeComponent === comp.id
                ? 'border-primary bg-primary/5'
                : 'bg-secondary/20'
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-primary shrink-0" />
              <h5 className="font-semibold text-sm">{comp.name}</h5>
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">{comp.description}</p>

            {comp.commands && (
              <div className="mt-2 flex flex-wrap gap-1">
                {comp.commands.map((cmd) => (
                  <span
                    key={cmd}
                    className="rounded bg-background px-1.5 py-0.5 text-[10px] md:text-xs font-mono"
                  >
                    {cmd}
                  </span>
                ))}
              </div>
            )}

            {comp.responsibilities && (
              <ul className="mt-2 space-y-0.5">
                {comp.responsibilities.map((resp) => (
                  <li key={resp} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="h-1 w-1 rounded-full bg-primary shrink-0" />
                    <span className="truncate">{resp}</span>
                  </li>
                ))}
              </ul>
            )}

            {comp.examples && (
              <div className="mt-1.5 text-xs text-muted-foreground truncate">
                {comp.examples.join(', ')}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Data Flow */}
      <div className="rounded-lg bg-secondary/30 p-3 md:p-4">
        <h5 className="mb-2 text-sm font-medium">Typical Data Flow</h5>
        <div className="space-y-1.5 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">docker run nginx</span>
            <span className="text-muted-foreground">CLI sends to Daemon</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">dockerd</span>
            <span className="text-muted-foreground">Checks cache, pulls from Registry</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">containerd</span>
            <span className="text-muted-foreground">Creates container, sets up namespaces & cgroups</span>
          </div>
        </div>
      </div>
    </div>
  )
}
