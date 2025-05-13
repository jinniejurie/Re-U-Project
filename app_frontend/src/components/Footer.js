export default function Footer() {
  return (
    <footer className="bg-reu-pink text-reu-brown py-16">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold mb-4">Re:U</h2>
            <p className="text-sm max-w-md mb-4">
            Every item has a story and at Re:U, we keep those stories going. Buy less, waste less, and connect more with fellow TU students through conscious campus shopping.
            </p>
          </div>

          {/* Site map */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Site Map</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-reu-red transition-colors">Home</a></li>
              <li><a href="/products" className="hover:text-reu-red transition-colors">Products</a></li>
              <li><a href="/dashboard" className="hover:text-reu-red transition-colors">Dashboard</a></li>

            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-reu-brown/20 my-8"></div>

        {/* Bottom Footer */}
        <div className="text-center text-sm">
          <p className="mb-2">CN334 Web Development Final Project</p>
          <p className="mb-2">Re:U — Re you at University</p>
          <p className="text-reu-brown/70">Used2BeCool Group.</p>
        </div>
      </div>
    </footer>
  );
} 