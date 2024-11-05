import Form from "./components/Form";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto pt-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Text Sharing Platform
        </h1>
        <Form />
      </div>
    </main>
  );
}
