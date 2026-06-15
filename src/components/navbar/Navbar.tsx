export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 top-0 z-50">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Logo</h1>
        <ul className="flex gap-6">
          <li><a href="/" className="hover:text-gray-300">Home</a></li>
          <li><a href="#" className="hover:text-gray-300">About</a></li>
          <li><a href="#" className="hover:text-gray-300">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}
