import { useEffect } from "react";
import Header from "../components/Header";
export default function NotFound() {
  useEffect(() => {
    document.title = "404 Not Found!";
  }, []);
  return (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max w-screen-lg">
        <p className="text-center text-2xl">NOT FOUND!</p>
      </div>
    </div>
  );
}
