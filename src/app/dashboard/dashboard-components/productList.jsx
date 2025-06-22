"use client";
import { useEffect, useState } from "react";
import { DotLoader } from "react-spinners";
import { productApi } from "@/lib/api-client/productApi";
import { brandApi } from "@/lib/api-client/brandApi";
import { categoryApi } from "@/lib/api-client/categoryApi";
import Link from "next/link";
import Pagination from "@/app/components/pagination";
import { Star, ChevronDown, Plus, Minus, X } from "lucide-react";
import {
  Dialog,
  Disclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  DisclosureButton,
  DisclosurePanel,
  DialogBackdrop,
  DialogPanel,
} from "@headlessui/react";

const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc" },
  { name: "Price: Low to High", sort: "price", order: "asc" },
  { name: "Price: High to Low", sort: "price", order: "desc" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductList() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [status, setStatus] = useState("idle");
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  // Fetch brands and categories once on mount
  useEffect(() => {
    const fetchBrandsAndCategories = async () => {
      try {
        const b = await brandApi.getAllBrands();
        const c = await categoryApi.getAllCategories();
        setBrands(b.brands);
        setCategories(c.categories);
      } catch (error) {
        console.error("Failed to fetch brands or categories", error);
      }
    };
    fetchBrandsAndCategories();
  }, []);

  // Fetch products whenever filter, sort or page changes
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setStatus("loading");

      try {
        // Prepare query params
        const query = {
          ...filter,
          ...sort,
          _page: page,
          _per_page: itemsPerPage,
        };

        const data = await productApi.filterProducts(query);

        setProducts(data.products);
        setTotalItems(data.totalItems ?? 0);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setStatus("idle");
      }
    };

    fetchFilteredProducts();
  }, [filter, sort, page]);

  // Reset page when filters or sort change
  useEffect(() => {
    setPage(1);
  }, [filter, sort]);

  // Handlers
  const handleFilter = (sectionId, optionValue) => {
    setFilter((prev) => ({
      ...prev,
      [sectionId]: [optionValue],
    }));
  };

  const handleSort = (option) => {
    setSort({ _sort: option.sort, _order: option.order });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const filters = [
    {
      id: "category",
      name: "Category",
      options: categories,
    },
    {
      id: "brand",
      name: "Brands",
      options: brands,
    },
  ];

  return (
    <div className="bg-white">
      <MobileFilter
        mobileFiltersOpen={mobileFiltersOpen}
        setMobileFiltersOpen={setMobileFiltersOpen}
        handleFilter={handleFilter}
        filters={filters}
        filter={filter}
      />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 p-7">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-2">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Our Products
          </h1>

          <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left">
              <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                Sort
                <ChevronDown className="-mr-1 ml-1 h-5 w-5 text-gray-400" />
              </MenuButton>
              <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {sortOptions.map((option) => (
                    <MenuItem key={option.name}>
                      {({ active }) => (
                        <div
                          onClick={() => handleSort(option)}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                          )}
                        >
                          {option.name}
                        </div>
                      )}
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Menu>
          </div>
        </div>

        <section className="pt-6 pb-24">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            <aside className="hidden lg:block">
              {filters.map((section) => (
                <Disclosure key={section.id}>
                  {({ open }) => (
                    <div className="border-b border-gray-200 py-6">
                      <DisclosureButton className="flex justify-between w-full text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        {open ? (
                          <Minus className="h-5 w-5" />
                        ) : (
                          <Plus className="h-5 w-5" />
                        )}
                      </DisclosureButton>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-4">
                          {section.options.map((option) => (
                            <div key={option.value} className="flex items-center">
                              <input
                                id={`${section.id}-${option.value}`}
                                name={section.id}
                                type="radio"
                                value={option.value}
                                checked={
                                  filter[section.id]?.includes(option.value) || false
                                }
                                onChange={() => handleFilter(section.id, option.value)}
                                className="h-4 w-4 border-gray-300 text-indigo-600"
                              />
                              <label
                                htmlFor={`${section.id}-${option.value}`}
                                className="ml-3 text-sm text-gray-600 cursor-pointer"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </div>
                  )}
                </Disclosure>
              ))}
            </aside>

            <div className="lg:col-span-3">
              {status === "loading" ? (
                <div className="flex justify-center items-center h-96">
                  <DotLoader size={100} />
                </div>
              ) : (
                <ProductGrid products={products} />
              )}
            </div>
          </div>
        </section>

        <Pagination
          page={page}
          setPage={handlePageChange}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
        />
      </main>
    </div>
  );
}

const MobileFilter = ({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handleFilter,
  filters,
  filter,
}) => (
  <Dialog
    open={mobileFiltersOpen}
    onClose={() => setMobileFiltersOpen(false)}
    className="relative z-40 lg:hidden"
  >
    <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-25" />
    <DialogPanel className="fixed inset-0 z-40 flex">
      <div className="relative ml-auto w-full max-w-xs bg-white py-4 pb-12 shadow-xl">
        <div className="flex items-center justify-between px-4">
          <h2 className="text-lg font-medium text-gray-900">Filters</h2>
          <button
            type="button"
            className="-mr-2 h-10 w-10 flex items-center justify-center rounded-md bg-white p-2 text-gray-400"
            onClick={() => setMobileFiltersOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form className="mt-4 border-t border-gray-200">
          {filters.map((section) => (
            <Disclosure
              as="div"
              key={section.id}
              className="border-b border-gray-200 px-4 py-6"
            >
              {({ open }) => (
                <>
                  <DisclosureButton className="flex w-full items-center justify-between text-gray-400">
                    <span className="font-medium text-gray-900">
                      {section.name}
                    </span>
                    {open ? (
                      <Minus className="h-5 w-5" />
                    ) : (
                      <Plus className="h-5 w-5" />
                    )}
                  </DisclosureButton>
                  <DisclosurePanel className="pt-6">
                    <div className="space-y-6">
                      {section.options.map((option) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            id={`mobile-${section.id}-${option.value}`}
                            name={section.id}
                            type="radio"
                            value={option.value}
                            checked={
                              filter[section.id]?.includes(option.value) || false
                            }
                            onChange={() => handleFilter(section.id, option.value)}
                            className="h-4 w-4 border-gray-300 text-indigo-600"
                          />
                          <label
                            htmlFor={`mobile-${section.id}-${option.value}`}
                            className="ml-3 text-sm text-gray-600"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          ))}
        </form>
      </div>
    </DialogPanel>
  </Dialog>
);

const ProductGrid = ({ products }) => (
  <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
    {products.map((product) => (
      <Link
        href={`/productDetail/${product.id ?? product._id}`}
        key={product.id ?? product._id}
        className="group"
      >
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
        <h3 className="mt-4 text-sm text-black">{product.title}</h3>
        <p className="mt-1 text-lg font-medium text-gray-700">${product.price}</p>
      </Link>
    ))}
  </div>
);
