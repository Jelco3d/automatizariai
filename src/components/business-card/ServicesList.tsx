import { Briefcase } from "lucide-react";

const services = [
  { title: "Workflow Optimization" },
  { title: "Lead Generation" },
  { title: "Process Automation" },
];

export const ServicesList = () => {
  return (
    <div className="grid gap-6">
      <h3 className="font-semibold text-xl text-purple-800">Services:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <div
            key={service.title}
            className="flex items-center gap-3 bg-purple-50 p-4 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <Briefcase className="w-6 h-6 text-purple-600 flex-shrink-0" />
            <span className="text-gray-700">{service.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};