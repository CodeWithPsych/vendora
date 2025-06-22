'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Star } from 'lucide-react';
import { productApi } from '@/lib/api-client/productApi';
import toast from 'react-hot-toast';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!params?.id) return;

    productApi
      .fetchProductById(params.id)
      .then((res) => setProduct(res))
      .catch((err) => {
        console.error('Error fetching product:', err);
        toast.error('Failed to load product');
      });
  }, [params?.id]);

  // const discountedPrice = (product) => {
  //   if (!product) return '';
  //   return product.price - (product.discountPercentage / 100) * product.price;
  // };

  return (
    <div className="bg-white">
      {product && (
        <div className="pt-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb">
            <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              {product.breadcrumbs?.map((breadcrumb) => (
                <li key={breadcrumb.id}>
                  <div className="flex items-center">
                    <span className="mr-2 text-sm font-medium text-gray-900">
                      {breadcrumb.name}
                    </span>
                    <svg
                      className="h-5 w-4 text-gray-300"
                      viewBox="0 0 16 20"
                      fill="currentColor"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </li>
              ))}
              <li className="text-sm">
                <span className="font-medium text-gray-500 hover:text-gray-600">
                  {product.title}
                </span>
              </li>
            </ol>
          </nav>

          {/* Image Gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
              <img
                src={product.images[0]}
                alt={product.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              {[1, 2].map((i) => (
                <div key={i} className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                  <img
                    src={product.images[i] || product.images[0]}
                    alt={product.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
            <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
              <img
                src={product.images[3] || product.images[0]}
                alt={product.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.title}
              </h1>
            </div>

            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                Rs {product.price}
              </p>

              <div className="mt-6">
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <Star
                        key={rating}
                        className={classNames(
                          product.rating > rating
                            ? 'text-gray-900'
                            : 'text-gray-200',
                          'h-5 w-5'
                        )}
                      />
                    ))}
                  </div>
                  <div className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    {product.rating} Rating
                  </div>
                </div>
              </div>

              <form className="mt-10">
                <button
                  type="button"
                  className={`mt-10 w-full rounded-md border border-transparent px-8 py-3 text-base font-medium text-white ${
                    product.stock !== 0
                      ? 'bg-indigo-600 hover:bg-indigo-700'
                      : 'bg-gray-400 hover:bg-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                >
                  {product.stock !== 0 ? 'Add to cart' : 'Out of Stock'}
                </button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              <div>
                <h3 className="sr-only">Description</h3>
                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
