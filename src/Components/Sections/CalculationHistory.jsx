import { useEffect, useState } from "react";
import Button from "../Controls/Button";
import StatusBadge from "../UI/StatusBadge";
import { formatNumber } from "../../../Utils/formatNumber";
import { exportToCSV } from "../../../Utils/exportToCSV";
import { toast } from "react-toastify";

const CalculationHistory = () => {
  const [history, setHistory] = useState([]);

  const loadHistory = () => {
    try {
      const data = JSON.parse(localStorage.getItem("calculationHistory")) || [];
      setHistory(data.slice(-5).reverse());
    } catch {
      setHistory([]);
    }
  };

  useEffect(() => {
    loadHistory();
    const handleStorageChange = () => loadHistory();
    window.addEventListener("storage", handleStorageChange);
    const interval = setInterval(loadHistory, 1000);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleExport = () => {
    if (!history.length) return toast.error("No data found");
    const headers = [
      "Type", "ASIN", "Title", "Buy Cost", "Selling Price", "Amazon Fee",
      "Referral Fee", "Profit", "ROI %", "Margin"
    ];

    const rows = history.map(item => [
      item.type,
      item.ASIN || "—",
      item.title,
      `$${formatNumber(item.buyCost)}`,
      `$${formatNumber(item.estimatedSellingPrice)}`,
      `$${formatNumber(item.amazonFee)}`,
      `${formatNumber(item.referralFeePercent)}% = $${formatNumber(item.referralFee)}`,
      `$${formatNumber(item.profit)}`,
      `${formatNumber(item.roiPercent)}%`,
      item.marginStatus
    ]);

    exportToCSV(rows, "calculation_history", headers);
  };

  return (
    <div id="calculation-history" className=" p-6 w-full bg-white  ">
      <div className="flex justify-between items-center ">
        <h1 className="text-[20px] md:text-[26px] font-bold py-5 ">Calculations History</h1>
        <Button action={handleExport} />
      </div>

      <div className="overflow-x-auto customScroll w-full">
        <table className="  min-w-full border border-gray-200 rounded-xl overflow-hidden *:text-nowrap">
          <thead className="bg-blue-50 text-gray-600 text-sm font-normal">
            <tr>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">ASIN</th>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-right">Buy Cost</th>
              <th className="py-3 px-4 text-right">Selling Price</th>
              <th className="py-3 px-4 text-right">Amazon Fee</th>
              <th className="py-3 px-4 text-right">Referral Fee</th>
              <th className="py-3 px-4 text-right">Profit</th>
              <th className="py-3 px-4 text-right">ROI %</th>
              <th className="py-3 px-4 text-center">Margin</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-normal">
            {history.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-10 text-center text-lg text-gray-400">
                  No Calculation History Found
                </td>
              </tr>
            ) : (
              history.map((item, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-200 hover:bg-blue-50 transition-colors duration-200"
                >
                  <td className="py-2 px-4">{item.type}</td>
                  <td className="py-2 px-4">{item.ASIN || "—"}</td>
                  <td className="py-2 px-4 truncate max-w-xs">{item.title}</td>
                  <td className="py-2 px-4 text-right">${formatNumber(item.buyCost)}</td>
                  <td className="py-2 px-4 text-right">${formatNumber(item.estimatedSellingPrice)}</td>
                  <td className="py-2 px-4 text-right">${formatNumber(item.amazonFee)}</td>
                  <td className="py-2 px-4 text-right">{formatNumber(item.referralFeePercent)}% = ${formatNumber(item.referralFee)}</td>
                  <td className="py-2 px-4 text-right">${formatNumber(item.profit)}</td>
                  <td className="py-2 px-4 text-right">{formatNumber(item.roiPercent)}%</td>
                  <td className="py-2 px-4 text-center">
                    <StatusBadge status={item.marginStatus} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default CalculationHistory;
