import { getConceptBySlug, concepts } from '@/data/concepts'
import { cn } from '@/utils/cn'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ChevronRight, Lightbulb, AlertCircle, Layers, Terminal, Box } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { NamespaceVisualizer } from '@/components/visualizations/NamespaceVisualizer'
import { CgroupVisualizer } from '@/components/visualizations/CgroupVisualizer'
import { FilesystemVisualizer } from '@/components/visualizations/FilesystemVisualizer'
import { LifecycleVisualizer } from '@/components/visualizations/LifecycleVisualizer'
import { ArchitectureVisualizer } from '@/components/visualizations/ArchitectureVisualizer'
import { ComparisonVisualizer } from '@/components/visualizations/ComparisonVisualizer'

export function ConceptPage() {
  const { slug } = useParams()
  const concept = getConceptBySlug(slug || '')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!concept) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Concept not found</h1>
          <Link to="/concepts" className="text-primary hover:underline">
            Return to Concept Map
          </Link>
        </div>
      </div>
    )
  }

  const currentIndex = concepts.findIndex(c => c.id === concept.id)
  const prevConcept = currentIndex > 0 ? concepts[currentIndex - 1] : null
  const nextConcept = currentIndex < concepts.length - 1 ? concepts[currentIndex + 1] : null

  const renderVisualizer = () => {
    switch (concept.visualizationType) {
      case 'namespace':
        return <NamespaceVisualizer type={concept.slug} />
      case 'cgroup':
        return <CgroupVisualizer />
      case 'filesystem':
        return <FilesystemVisualizer />
      case 'lifecycle':
        return <LifecycleVisualizer />
      case 'architecture':
        return <ArchitectureVisualizer />
      case 'comparison':
        return <ComparisonVisualizer />
      default:
        return null
    }
  }

  const getVisualizationIcon = () => {
    switch (concept.visualizationType) {
      case 'namespace':
        return Box
      case 'cgroup':
        return Terminal
      case 'filesystem':
      case 'lifecycle':
      case 'architecture':
      case 'comparison':
        return Layers
      default:
        return null
    }
  }

  const VisualizationIcon = getVisualizationIcon()

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Breadcrumb */}
      <div className="border-b bg-secondary/20">
        <div className="container mx-auto max-w-4xl px-4 md:px-6 py-3">
          <nav className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
            <Link to="/concepts" className="text-muted-foreground hover:text-foreground transition-colors">
              Concepts
            </Link>
            <ChevronRight className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
            <span className="text-foreground font-medium truncate">{concept.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 md:px-6 py-6 md:py-8">
        <div className="mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 md:mb-8"
          >
            <div className="flex items-center gap-2 mb-2 md:mb-3">
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs md:text-sm text-primary font-medium">
                {concept.category}
              </span>
              {VisualizationIcon && (
                <span className="flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-0.5 text-xs md:text-sm text-muted-foreground">
                  <VisualizationIcon className="h-3 w-3 md:h-3.5 md:w-3.5" />
                  Interactive
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">{concept.title}</h1>
            <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
              {concept.shortDefinition}
            </p>
          </motion.div>

          {/* Mental Model */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="mb-8 border-l-4 border-l-primary bg-secondary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  Mental Model
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {concept.mentalModel}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Code Example */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Terminal className="h-5 w-5 text-primary" />
                  Example
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="overflow-x-auto rounded-xl bg-secondary/50 p-4 text-sm font-mono">
                  <code className="text-foreground whitespace-pre">{concept.codeExample}</code>
                </pre>
              </CardContent>
            </Card>
          </motion.div>

          {/* Interactive Visualization */}
          {renderVisualizer() && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <Card className="overflow-hidden">
                <CardHeader className="bg-secondary/30">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Layers className="h-5 w-5 text-primary" />
                    Interactive Visualization
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {renderVisualizer()}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Common Misconceptions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <Card className="border-orange-200/50 bg-orange-50/50 dark:border-orange-900/30 dark:bg-orange-900/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-orange-600 dark:text-orange-400">
                  <AlertCircle className="h-5 w-5" />
                  Common Misconceptions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {concept.misconceptions.map((misconception, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-orange-500" />
                      <span className="text-muted-foreground">{misconception}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Related Concepts */}
          {concept.relatedConcepts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Related Concepts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {concept.relatedConcepts.map((relatedSlug) => {
                      const related = getConceptBySlug(relatedSlug)
                      if (!related) return null
                      return (
                        <Link key={relatedSlug} to={`/concepts/${relatedSlug}`}>
                          <Button variant="secondary" size="sm" className="gap-1.5">
                            {related.title}
                            <ArrowRight className="h-3 w-3" />
                          </Button>
                        </Link>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-between border-t pt-8"
          >
            {prevConcept ? (
              <Link to={`/concepts/${prevConcept.slug}`}>
                <Button variant="ghost" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  <div className="text-left">
                    <div className="text-xs text-muted-foreground">Previous</div>
                    <div className="font-medium">{prevConcept.title}</div>
                  </div>
                </Button>
              </Link>
            ) : (
              <div />
            )}

            <Link to="/concepts">
              <Button variant="outline" size="sm">
                All Concepts
              </Button>
            </Link>

            {nextConcept ? (
              <Link to={`/concepts/${nextConcept.slug}`}>
                <Button variant="ghost" className="gap-2">
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Next</div>
                    <div className="font-medium">{nextConcept.title}</div>
                  </div>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <div />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
