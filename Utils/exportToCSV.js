export const exportToCSV = (data, fileName, headers) => {
  if (!data || !data.length) {
    console.error("No data provided for CSV export");
    return;
  }

  const csvRows = [];

  csvRows.push(headers.map((h) => `"${h}"`).join(","));

  data.forEach((row) => {
    const values = row.map(
      (val) => `"${String(val || "").replace(/"/g, '""')}"`
    );
    csvRows.push(values.join(","));
  });

  const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");

  const link = document.createElement("a");
  link.setAttribute("href", encodeURI(csvContent));
  link.setAttribute("download", `${fileName}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
