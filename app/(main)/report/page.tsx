import ReportResult from "@/components/report/ReportResult";

export default function Report() {
  return (
    <section>
      <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Report Product
      </h2>
      <div className="bg-white p-4 rounded-2xl shadow">
        <ReportResult />
      </div>
    </section>
  );
}
