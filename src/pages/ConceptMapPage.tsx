import { conceptGroups, getConceptsByCategory, concepts } from '@/data/concepts'
import { cn } from '@/utils/cn'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Box,
  Globe,
  Layers,
  Play,
  Network,
  Shield,
  FileCode,
  ArrowRight,
  Search,
  Zap,
} from 'lucide-react'

const groupIcons: Record<string, JSX.Element> = {
  'Container Fundamentals': <Box className="h-5 w-5" />,
  'Isolation Mechanisms': <Globe className="h-5 w-5" />,
  'Images & Filesystems': <Layers className="h-5 w-5" />,
  'Runtime & Execution': <Play className="h-5 w-5" />,
  'Networking': <Network className="h-5 w-5" />,
  'Security & Limits': <Shield className="h-5 w-5" />,
  'Docker Workflow': <FileCode className="h-5 w-5" />,
}

export function ConceptMapPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="border-b bg-secondary/20">
        <div className="container mx-auto max-w-5xl px-4 md:px-6 py-6 md:py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3">Explore Container Concepts</h1>
            <p className="text-muted-foreground mb-3 md:mb-4 max-w-2xl mx-auto text-sm md:text-base px-2">
              Learn how containers work through interactive visualizations and clear explanations.
              Master namespaces, cgroups, overlay filesystems, and more.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm">
              <Zap className="h-3 w-3 md:h-4 md:w-4 text-primary" />
              <span>{concepts.length} concepts across {conceptGroups.length} categories</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Search */}
      <div className="container mx-auto max-w-3xl px-4 md:px-6 py-4 md:py-6">
        <div className="relative">
          <Search className="absolute left-3 md:left-4 top-1/2 h-4 w-4 md:h-5 md:w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search concepts..."
            className="w-full rounded-lg md:rounded-xl border bg-background py-2.5 md:py-3 pl-10 md:pl-12 pr-4 text-sm md:text-base outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            onChange={(e) => {
              const term = e.target.value.toLowerCase()
              if (term) {
                const found = concepts.find(c =>
                  c.title.toLowerCase().includes(term) ||
                  c.shortDefinition.toLowerCase().includes(term)
                )
                if (found) navigate(`/concepts/${found.slug}`)
              }
            }}
          />
        </div>
      </div>

      {/* Concept Groups */}
      <div className="container mx-auto max-w-5xl px-4 md:px-6 pb-10 md:pb-16">
        <div className="space-y-8 md:space-y-12">
          {conceptGroups.map((group, groupIndex) => {
            const groupConcepts = getConceptsByCategory(group)
            if (groupConcepts.length === 0) return null

            return (
              <motion.div
                key={group}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: groupIndex * 0.1 }}
              >
                {/* Group Header */}
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                  <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-lg bg-primary text-white shrink-0">
                    {groupIcons[group]}
                  </div>
                  <div>
                    <h2 className="text-lg md:text-xl font-semibold">{group}</h2>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      {groupConcepts.length} concept{groupConcepts.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                {/* Concepts Grid */}
                <div className="grid gap-2 md:gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {groupConcepts.map((concept, conceptIndex) => (
                    <motion.div
                      key={concept.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: groupIndex * 0.1 + conceptIndex * 0.03 }}
                    >
                      <Card
                        className={cn(
                          'cursor-pointer transition-all duration-200 hover:shadow-md hover:border-primary/30 group h-full',
                          'hover:bg-secondary/30'
                        )}
                        onClick={() => navigate(`/concepts/${concept.slug}`)}
                      >
                        <CardContent className="p-3 md:p-4">
                          <div className="flex items-start justify-between gap-2">
                            <div className="space-y-1 flex-1 min-w-0">
                              <h3 className="font-semibold text-sm md:text-base group-hover:text-primary transition-colors truncate">
                                {concept.title}
                              </h3>
                              <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                                {concept.shortDefinition}
                              </p>
                            </div>
                            <ArrowRight className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 shrink-0 mt-0.5" />
                          </div>

                          {/* Tags */}
                          <div className="mt-2 md:mt-3 flex items-center gap-2">
                            {concept.visualizationType !== 'none' && (
                              <span className="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground">
                                <span className="h-1.5 w-1.5 rounded-full bg-primary mr-1.5" />
                                {concept.visualizationType}
                              </span>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 md:mt-12 rounded-lg md:rounded-xl border bg-secondary/30 p-4 md:p-6"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4">
            <div>
              <h3 className="font-semibold mb-0.5 md:mb-1 text-sm md:text-base">Ready to experiment?</h3>
              <p className="text-muted-foreground text-xs md:text-sm">
                Try the Container Lab to see isolation in action
              </p>
            </div>
            <Button onClick={() => navigate('/lab')} className="gap-2 whitespace-nowrap text-sm">
              <Zap className="h-3.5 w-3.5 md:h-4 md:w-4" />
              Open Container Lab
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
