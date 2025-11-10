import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-gray-200 text-foreground dark:bg-neutral-900 dark:text-white py-12 md:pl-64 border-t border-gray-300 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <h3 className="font-bold text-2xl mb-4 flex items-center">
              <span className="text-primary mr-1">karo</span>
              <span>Freelance</span>
            </h3>
            <p className="text-gray-400 mb-6">
              Connecting talented freelancers with amazing clients worldwide. Our platform makes it easy to find work,
              hire professionals, and collaborate effectively.
            </p>
            <div className="flex space-x-4 mb-6">
              <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-gray-400">
                <Mail className="h-4 w-4 mr-2" />
                <span>contact@karofreelance.com</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="h-4 w-4 mr-2" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin className="h-4 w-4 mr-2" />
                <span>123 Freelance Street, Digital City</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-200">For Freelancers</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/freelancer/projects" className="text-gray-400 hover:text-primary transition-colors">
                  Find Work
                </Link>
              </li>
              <li>
                <Link href="/freelancer/dashboard" className="text-gray-400 hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/resources/freelancers" className="text-gray-400 hover:text-primary transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="text-gray-400 hover:text-primary transition-colors">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="/freelancer/reviews" className="text-gray-400 hover:text-primary transition-colors">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-200">For Clients</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/client/post-project" className="text-gray-400 hover:text-primary transition-colors">
                  Post a Project
                </Link>
              </li>
              <li>
                <Link href="/client/dashboard" className="text-gray-400 hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/client/freelancers" className="text-gray-400 hover:text-primary transition-colors">
                  Find Talent
                </Link>
              </li>
              <li>
                <Link href="/resources/clients" className="text-gray-400 hover:text-primary transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/enterprise" className="text-gray-400 hover:text-primary transition-colors">
                  Enterprise Solutions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-200">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates and opportunities.</p>
            <div className="space-y-2">
              <Input
                placeholder="Your email address"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
              <Button className="w-full bg-primary hover:bg-primary/90">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} karoFreelance. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-sm text-gray-400 hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-gray-400 hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-sm text-gray-400 hover:text-primary transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
