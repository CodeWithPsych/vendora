import { getSession } from "../../lib/getSession";
import Navbar from "../components/ui/navbar";
import { redirect } from "next/navigation";
import ProductList from "./dashboard-components/productList";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/signin");
  }

  return (
    <div>
      <Navbar session={session} />
      <div className="p-6 text-white">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <ProductList />
      </div>
    </div>
  );
}
