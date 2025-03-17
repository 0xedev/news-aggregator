import Link from "next/link";
import Image from "next/image";
import SearchBar from "../UI/SearchBar";

export default function Header() {
  const categories = [
    { name: "IPL", slug: "ipl" },
    { name: "Finance", slug: "finance" },
    { name: "Politics", slug: "politics" },
    { name: "Technology", slug: "technology" },
    { name: "Health", slug: "health" },
  ];

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.svg"
            alt="News App Logo"
            width={40}
            height={40}
          />
          <span className="ml-2 font-bold text-xl">NewsHub</span>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/category/${category.slug}`}
                  className="hover:text-blue-500 transition-colors"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <SearchBar />
      </div>
    </header>
  );
}
