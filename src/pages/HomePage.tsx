export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome</h1>
        <p className="text-gray-600 text-lg">Start building your amazing project here</p>
      </section>
      
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border rounded-lg hover:shadow-lg transition">
          <h2 className="text-xl font-bold mb-2">Section 1</h2>
          <p className="text-gray-600">Add your content here</p>
        </div>
        <div className="p-6 border rounded-lg hover:shadow-lg transition">
          <h2 className="text-xl font-bold mb-2">Section 2</h2>
          <p className="text-gray-600">Add your content here</p>
        </div>
        <div className="p-6 border rounded-lg hover:shadow-lg transition">
          <h2 className="text-xl font-bold mb-2">Section 3</h2>
          <p className="text-gray-600">Add your content here</p>
        </div>
      </section>
    </div>
  );
}
