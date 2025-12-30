import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Box,
  Layers,
  Cpu,
  Network,
  Shield,
  Terminal,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Globe,
  Database,
} from 'lucide-react'

export function HomePage() {
  const navigate = useNavigate()

  const features = [
    {
      icon: Layers,
      title: 'Overlay Filesystem',
      description: 'Understand how image layers stack and how copy-on-write works.',
    },
    {
      icon: Cpu,
      title: 'cgroups & Limits',
      description: 'Visualize CPU, memory, and I/O limits in real-time.',
    },
    {
      icon: Network,
      title: 'Network Namespaces',
      description: 'See how containers get their own network stack.',
    },
    {
      icon: Shield,
      title: 'Process Isolation',
      description: 'Understand PID, mount, user, and IPC namespaces.',
    },
  ]

  const quickLinks = [
    { title: 'What is a Container?', path: '/concepts/what-is-a-container', icon: Box },
    { title: 'Containers vs VMs', path: '/concepts/containers-vs-virtual-machines', icon: Terminal },
    { title: 'Docker Architecture', path: '/concepts/docker-architecture', icon: Globe },
    { title: 'Image Layers', path: '/concepts/image-layers', icon: Layers },
    { title: 'Container Lifecycle', path: '/concepts/container-lifecycle', icon: Database },
    { title: 'Resource Limits', path: '/concepts/resource-limits', icon: Cpu },
  ]

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto text-center"
          >
            <div className="mb-6 inline-flex items-center justify-center">
              <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-lg bg-primary">
                <Box className="h-6 w-6 md:h-7 md:w-7 text-primary-foreground" />
              </div>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
            >
              Containers Demystified
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 md:mb-8 text-base md:text-lg text-muted-foreground px-4"
            >
              Learn how containers actually work. No magic, no buzzwords —
              just interactive visualizations of isolation, namespaces, and cgroups.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-3 sm:flex-row sm:justify-center px-4"
            >
              <Button size="lg" onClick={() => navigate('/concepts')} className="gap-2">
                <Layers className="h-4 w-4" />
                Start Learning
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/lab')} className="gap-2">
                <Terminal className="h-4 w-4" />
                Open Lab
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-6 md:py-8 border-y bg-secondary/30">
        <div className="container mx-auto max-w-5xl px-4 md:px-6">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {quickLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
              >
                <button
                  onClick={() => navigate(link.path)}
                  className="group flex w-full items-center gap-3 rounded-lg border bg-card px-4 py-3 text-left transition-all hover:bg-secondary/50"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-secondary shrink-0">
                    <link.icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <span className="flex-1 text-sm font-medium">{link.title}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 shrink-0" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Concept - VM vs Container */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-5xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto"
          >
            <h2 className="mb-6 md:mb-8 text-center text-xl md:text-2xl font-bold">The Fundamental Difference</h2>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* VM */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-4 md:p-5">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary shrink-0">
                        <Terminal className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Virtual Machine</h3>
                        <p className="text-sm text-muted-foreground">Full OS virtualization</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="rounded bg-secondary/50 p-3">
                        <div className="text-sm font-medium">App A / B / C</div>
                        <div className="text-xs text-muted-foreground">Your application code</div>
                      </div>
                      <div className="rounded bg-secondary/50 p-3">
                        <div className="text-sm font-medium">Guest Operating System</div>
                        <div className="text-xs text-muted-foreground">Full Linux/Windows kernel</div>
                      </div>
                      <div className="rounded bg-secondary p-3">
                        <div className="text-sm font-medium">Hypervisor</div>
                        <div className="text-xs text-muted-foreground">VMware, Hyper-V, KVM</div>
                      </div>
                      <div className="rounded border border-dashed p-3 text-center">
                        <div className="text-sm text-muted-foreground">Host Hardware</div>
                      </div>
                    </div>

                    <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-foreground/40 shrink-0" />
                        <span>Each VM has its own OS kernel</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-foreground/40 shrink-0" />
                        <span>Heavy overhead (GBs of RAM)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-foreground/40 shrink-0" />
                        <span>Slow boot (15-40 seconds)</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Container */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-4 md:p-5">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                        <Box className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Container</h3>
                        <p className="text-sm text-muted-foreground">OS-level isolation</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="grid grid-cols-3 gap-2">
                        <div className="rounded bg-secondary/50 p-2 text-center">
                          <div className="text-sm font-medium">App A</div>
                        </div>
                        <div className="rounded bg-secondary/50 p-2 text-center">
                          <div className="text-sm font-medium">App B</div>
                        </div>
                        <div className="rounded bg-secondary/50 p-2 text-center">
                          <div className="text-sm font-medium">App C</div>
                        </div>
                      </div>
                      <div className="rounded bg-secondary/50 p-3">
                        <div className="text-sm font-medium">Container Engine</div>
                        <div className="text-xs text-muted-foreground">Docker, containerd, runc</div>
                      </div>
                      <div className="rounded bg-secondary/30 p-3 text-center">
                        <div className="text-sm font-medium">Shared Host Kernel</div>
                        <div className="text-xs text-muted-foreground">Linux / Windows Server</div>
                      </div>
                      <div className="rounded border border-dashed p-3 text-center">
                        <div className="text-sm text-muted-foreground">Host Hardware</div>
                      </div>
                    </div>

                    <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        <span>Share host kernel</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        <span>Lightweight (MBs of RAM)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        <span>Instant start (&lt;100ms)</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 md:py-16 border-t bg-secondary/20">
        <div className="container mx-auto max-w-5xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto"
          >
            <h2 className="mb-6 md:mb-8 text-center text-xl md:text-2xl font-bold">What You'll Learn</h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full transition-all hover:bg-secondary/50">
                    <CardContent className="p-5 text-center">
                      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                        <feature.icon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <h3 className="mb-1.5 font-medium">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-3xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto"
          >
            <Card className="overflow-hidden">
              <CardContent className="p-6 md:p-8">
                <div className="text-center">
                  <h2 className="mb-3 text-xl md:text-2xl font-bold">Ready to Experiment?</h2>
                  <p className="mb-6 text-muted-foreground">
                    Open the Container Lab to create simulated containers, toggle namespaces,
                    and see how isolation actually works.
                  </p>
                  <Button size="lg" onClick={() => navigate('/lab')} className="gap-2">
                    <Terminal className="h-4 w-4" />
                    Launch Container Lab
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Key Takeaways */}
      <section className="py-10 md:py-12 border-t bg-secondary/20">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          <div className="mx-auto">
            <h2 className="mb-6 text-center text-lg md:text-xl font-bold">Core Truths About Containers</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {[
                'Containers share the host kernel',
                'Isolation is provided by namespaces',
                'Resource limits are enforced by cgroups',
                'Images are immutable layer stacks',
                'Containers are processes, not machines',
                'Containers start instantly (no boot)',
              ].map((truth, index) => (
                <motion.div
                  key={truth}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -10 : 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2 rounded-lg bg-secondary/30 px-3 py-2"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm">{truth}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
