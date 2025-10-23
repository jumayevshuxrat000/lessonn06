import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Pagination, Skeleton } from "antd";
import { Heart, ShoppingCart } from "lucide-react";

function PaginationComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(12);

  const getData = async (page, limit) => {
    const res = await axios.get(
      `https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`
    );
    return {
      data: res.data.products,
      total: res.data.total,
    };
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: [`products-${currentPage}-${currentLimit}`],
    queryFn: () => getData(currentPage, currentLimit),
  });

  const handleChange = (page, pageSize) => {
    setCurrentPage(page);
    setCurrentLimit(pageSize);
  };

  return (
    <div className="w-[60%] mx-auto py-10">
      {isLoading || isError ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {Array.from({ length: 12 }).map((_, ind) => (
            <Skeleton.Input className="w-full! h-[300px]!" active key={ind} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-6">
          {data?.data.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 overflow-hidden transition-all duration-200 relative group"
            >
              <button className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow-md hover:scale-110 transition">
                <Heart className="w-5 h-5 text-gray-500 hover:text-red-500" />
              </button>

              <div className="w-full h-[200px] overflow-hidden flex justify-center items-center bg-gray-50">
                <img
                  src={p.thumbnail}
                  alt={p.title}
                  className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-3">
                <h3 className="text-sm font-medium line-clamp-2 h-[40px]">
                  {p.title}
                </h3>
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[#7000ff] font-semibold text-lg">
                      ${p.price}
                    </span>
                    {p.discountPercentage > 0 && (
                      <span className="text-gray-400 line-through text-sm">
                        $
                        {(p.price / (1 - p.discountPercentage / 100)).toFixed(
                          0
                        )}
                      </span>
                    )}
                  </div>
                  {p.discountPercentage > 0 && (
                    <span className="text-green-500 text-xs font-semibold">
                      -{Math.round(p.discountPercentage)}%
                    </span>
                  )}
                </div>

                <button className="w-full mt-3 py-2 bg-[#7000ff] text-white text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-[#5b00cc] transition">
                  <ShoppingCart className="w-4 h-4" /> Savatga
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center mt-10">
        <Pagination
          current={currentPage}
          total={data?.total}
          onChange={handleChange}
          pageSize={currentLimit}
          showSizeChanger
        />
      </div>
    </div>
  );
}

export default PaginationComponent;
