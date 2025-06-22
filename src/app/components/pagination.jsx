import { ChevronLeft, ChevronRight } from "lucide-react";
import { Item_per_page } from "../common/constatnt";

export default function Pagination({ page, setPage, totalItems }) {
    const totalPages = Math.ceil(totalItems / Item_per_page);

    const onPageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <div
                    onClick={() => onPageChange(page - 1)}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                    Previous
                </div>
                <div
                    onClick={() => onPageChange(page + 1)}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                    Next
                </div>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing{' '}
                        <span className="font-medium">
                            {(page - 1) * Item_per_page + 1}
                        </span>{' '}
                        to{' '}
                        <span className="font-medium">
                            {page * Item_per_page > totalItems
                                ? totalItems
                                : page * Item_per_page}
                        </span>{' '}
                        of <span className="font-medium">{totalItems}</span> results
                    </p>
                </div>
                <div>
                    <nav
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                        aria-label="Pagination"
                    >
                        <div
                            onClick={() => onPageChange(page - 1)}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                        </div>
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <div
                                onClick={() => onPageChange(index + 1)}
                                key={index}
                                aria-current="page"
                                className={`relative cursor-pointer z-10 inline-flex items-center ${
                                    index + 1 === page
                                        ? 'bg-indigo-600 text-white'
                                        : 'text-gray-400'
                                } px-4 py-2 text-sm font-semibold focus:z-20  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                            >
                                {index + 1}
                            </div>
                        ))}
                        <div
                            onClick={() => onPageChange(page + 1)}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRight className="h-5 w-5" aria-hidden="true" />
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
}
