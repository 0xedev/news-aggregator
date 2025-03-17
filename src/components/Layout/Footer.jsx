import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">NewsHub</h3>
            <p className="text-gray-300">
              Your trusted source for the latest breaking news, updates, and
              in-depth stories.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/category/ipl"
                  className="text-gray-300 hover:text-white"
                >
                  IPL
                </Link>
              </li>
              <li>
                <Link
                  href="/category/finance"
                  className="text-gray-300 hover:text-white"
                >
                  Finance
                </Link>
              </li>
              <li>
                <Link
                  href="/category/politics"
                  className="text-gray-300 hover:text-white"
                >
                  Politics
                </Link>
              </li>
              <li>
                <Link
                  href="/category/technology"
                  className="text-gray-300 hover:text-white"
                >
                  Technology
                </Link>
              </li>
              <li>
                <Link
                  href="/category/health"
                  className="text-gray-300 hover:text-white"
                >
                  Health
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-300 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>© {new Date().getFullYear()} NewsHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
