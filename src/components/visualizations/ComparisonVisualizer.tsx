import { motion } from 'framer-motion'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function ComparisonVisualizer() {
  const [activeTab, setActiveTab] = useState<'comparison' | 'resource' | 'isolation'>('comparison')

  const metrics = [
    { category: 'Startup Time', vm: '15-40s', container: '< 250ms', winner: 'container' },
    { category: 'Memory Overhead', vm: '100-500 MB', container: '10-30 MB', winner: 'container' },
    { category: 'Disk Space', vm: 'GBs (full OS)', container: 'MBs (layers)', winner: 'container' },
    { category: 'Isolation Level', vm: 'Hardware (strong)', container: 'OS (weaker)', winner: 'vm' },
    { category: 'Density', vm: 'Few per host', container: 'Hundreds per host', winner: 'container' },
    { category: 'Boot Required', vm: 'Yes (full boot)', container: 'No (instant)', winner: 'container' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold text-primary">Containers vs Virtual Machines</h4>
        <p className="text-sm text-muted-foreground">
          Understanding the fundamental differences
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2">
        {(['comparison', 'resource', 'isolation'] as const).map((tab) => (
          <Button
            key={tab}
            size="sm"
            variant={activeTab === tab ? 'default' : 'outline'}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Button>
        ))}
      </div>

      {activeTab === 'comparison' && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* VM Visualization */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <svg className="h-5 w-5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8" />
                  <path d="M12 17v4" />
                </svg>
              </div>
              <h5 className="font-semibold">Virtual Machine</h5>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-lg border border-orange-500/30 bg-orange-500/5 p-4"
            >
              <div className="space-y-3">
                {/* Application Layer */}
                <div className="rounded bg-orange-500/20 p-3 text-sm">
                  <div className="font-medium text-orange-500">Application</div>
                </div>

                {/* Guest OS Layer */}
                <div className="rounded bg-orange-500/20 p-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-orange-500">Guest OS</span>
                    <span className="text-xs text-muted-foreground">Full Linux/Windows</span>
                  </div>
                </div>

                {/* Hypervisor */}
                <div className="rounded bg-gray-600/50 p-3 text-sm">
                  <div className="font-medium">Hypervisor</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    VMware, Hyper-V, KVM, etc.
                  </div>
                </div>

                {/* Hardware */}
                <div className="rounded border border-dashed border-muted-foreground/30 p-3 text-center text-sm">
                  <div className="text-muted-foreground">Host Hardware</div>
                </div>
              </div>

              <div className="mt-3 text-xs text-muted-foreground">
                4 separate OS instances running simultaneously
              </div>
            </motion.div>
          </div>

          {/* Container Visualization */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M9 3v18" />
                </svg>
              </div>
              <h5 className="font-semibold">Container</h5>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-lg border border-primary/30 bg-primary/5 p-4"
            >
              <div className="space-y-3">
                {/* Applications (stacked) */}
                <div className="grid grid-cols-3 gap-2">
                  {['App A', 'App B', 'App C'].map((app) => (
                    <div key={app} className="rounded bg-primary/20 p-2 text-center text-xs">
                      <div className="font-medium text-primary">{app}</div>
                    </div>
                  ))}
                </div>

                {/* Container Engine */}
                <div className="rounded bg-purple-500/20 p-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-purple-500">Container Engine</span>
                    <span className="text-xs text-muted-foreground">Docker, containerd</span>
                  </div>
                </div>

                {/* Shared Kernel */}
                <div className="rounded border border-primary/30 bg-primary/10 p-3 text-center text-sm">
                  <div className="font-medium text-primary">Shared Host Kernel</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Linux, Windows Server
                  </div>
                </div>

                {/* Hardware */}
                <div className="rounded border border-dashed border-muted-foreground/30 p-3 text-center text-sm">
                  <div className="text-muted-foreground">Host Hardware</div>
                </div>
              </div>

              <div className="mt-3 text-xs text-muted-foreground">
                3 processes sharing the same kernel
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {activeTab === 'resource' && (
        <div className="space-y-4">
          <h5 className="text-sm font-medium">Resource Comparison</h5>
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary/50">
                  <th className="p-3 text-left font-medium">Metric</th>
                  <th className="p-3 text-center font-medium">VM</th>
                  <th className="p-3 text-center font-medium">Container</th>
                  <th className="p-3 text-center font-medium">Winner</th>
                </tr>
              </thead>
              <tbody>
                {metrics.map((metric, index) => (
                  <motion.tr
                    key={metric.category}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-t"
                  >
                    <td className="p-3">{metric.category}</td>
                    <td className="p-3 text-center font-mono text-muted-foreground">
                      {metric.vm}
                    </td>
                    <td className="p-3 text-center font-mono text-muted-foreground">
                      {metric.container}
                    </td>
                    <td className="p-3 text-center">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          metric.winner === 'container'
                            ? 'bg-primary/20 text-primary'
                            : 'bg-orange-500/20 text-orange-500'
                        }`}
                      >
                        {metric.winner === 'container' ? '🏆 Container' : '🏆 VM'}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'isolation' && (
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-lg border border-orange-500/30 bg-orange-500/5 p-4">
            <h5 className="mb-3 flex items-center gap-2 font-semibold text-orange-500">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              VM Isolation (Hardware)
            </h5>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-orange-500">✓</span>
                <span>Complete hardware virtualization</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500">✓</span>
                <span>Can run different OS than host</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500">✓</span>
                <span>Stronger security boundary</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500">✓</span>
                <span>Hypervisor prevents escape</span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
            <h5 className="mb-3 flex items-center gap-2 font-semibold text-primary">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a10 10 0 0 1 0 20" />
                <path d="M2 12h20" />
              </svg>
              Container Isolation (OS)
            </h5>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>Namespaces isolate resources</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>cgroups limit resource usage</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>Must run same kernel as host</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                <span>Kernel vulnerabilities can affect all</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Key Takeaway */}
      <div className="rounded-lg border bg-secondary/30 p-4">
        <h5 className="mb-2 font-semibold">Key Takeaway</h5>
        <p className="text-sm text-muted-foreground">
          Containers are not lightweight VMs. They are isolated processes that share the host kernel.
          VMs virtualize hardware and run full OS instances. Choose VMs for strong isolation
          (multi-tenant, different OS), containers for density and speed (microservices, CI/CD).
        </p>
      </div>
    </div>
  )
}
