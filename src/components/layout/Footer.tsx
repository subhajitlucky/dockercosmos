import { Box, Github, Twitter, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    learn: [
      { label: 'What is a Container', href: '/concepts/what-is-a-container' },
      { label: 'Containers vs VMs', href: '/concepts/containers-vs-virtual-machines' },
      { label: 'Namespaces', href: '/concepts/pid-namespace' },
      { label: 'cgroups', href: '/concepts/cgroups' },
    ],
    lab: [
      { label: 'Container Lab', href: '/lab' },
      { label: 'Explore All Concepts', href: '/concepts' },
    ],
    resources: [
      { label: 'Docker Documentation', href: 'https://docs.docker.com', external: true },
      { label: 'Kubernetes', href: 'https://kubernetes.io', external: true },
      { label: 'OCI Specifications', href: 'https://opencontainers.org', external: true },
    ],
  }

  return (
    <footer className="border-t bg-secondary/20">
      <div className="container mx-auto max-w-6xl px-4 md:px-6 py-8 md:py-10">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-primary">
                <Box className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold">
                Docker<span className="text-primary">Cosmos</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Interactive visualizations to understand container isolation, namespaces, and cgroups.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com/docker"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com/docker"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://docs.docker.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <BookOpen className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Learn */}
          <div>
            <h4 className="mb-3 text-sm font-medium">Learn</h4>
            <ul className="space-y-2">
              {footerLinks.learn.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Lab */}
          <div>
            <h4 className="mb-3 text-sm font-medium">Lab</h4>
            <ul className="space-y-2">
              {footerLinks.lab.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-3 text-sm font-medium">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    {link.label}
                    {link.external && (
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                      </svg>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-6 md:mt-8 flex flex-col items-center justify-between gap-3 border-t border-border/50 pt-6 md:flex-row">
          <div className="flex flex-col md:flex-row items-center gap-2 text-xs md:text-sm text-muted-foreground">
            <span>&copy; {currentYear} DockerCosmos.</span>
            <span>Built by minimax m2.1</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-xs md:text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
              <span>Containers share the kernel</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0" />
              <span>No real Docker required</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
