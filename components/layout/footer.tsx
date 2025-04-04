import Link from "next/link"
import { Github, Linkedin, Twitter, DiscIcon as Discord } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#111827] border-t border-gray-800">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-cyan-400">
                <span className="text-cyan-400">&lt;/&gt;</span> DevBlog
              </span>
            </Link>
            <p className="text-gray-400 text-sm">
              A technical blog for developers, by developers. Stay updated with the latest in programming and
              technology.
            </p>
            <div className="flex space-x-4">
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5 text-gray-400 hover:text-cyan-400 transition-colors" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5 text-gray-400 hover:text-cyan-400 transition-colors" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5 text-gray-400 hover:text-cyan-400 transition-colors" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://discord.com" target="_blank" rel="noopener noreferrer">
                <Discord className="h-5 w-5 text-gray-400 hover:text-cyan-400 transition-colors" />
                <span className="sr-only">Discord</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4 text-white">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categories/frontend" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Frontend
                </Link>
              </li>
              <li>
                <Link href="/categories/backend" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Backend
                </Link>
              </li>
              <li>
                <Link href="/categories/devops" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  DevOps
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/machine-learning"
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  Machine Learning
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4 text-white">Connect With Us</h3>
            <div className="flex space-x-3">
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-6 w-6 text-gray-400 hover:text-cyan-400 transition-colors" />
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-6 w-6 text-gray-400 hover:text-cyan-400 transition-colors" />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-6 w-6 text-gray-400 hover:text-cyan-400 transition-colors" />
              </Link>
              <Link href="https://discord.com" target="_blank" rel="noopener noreferrer">
                <Discord className="h-6 w-6 text-gray-400 hover:text-cyan-400 transition-colors" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} DevBlog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

