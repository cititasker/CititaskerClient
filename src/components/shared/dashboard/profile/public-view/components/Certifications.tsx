import React from "react";
import { Award } from "lucide-react";

interface Certificate {
  name: string;
  institution: string;
  year: string;
}

interface CertificationsProps {
  certificates?: Certificate[];
  className?: string;
}

const CertificateCard = ({ certificate }: { certificate: Certificate }) => (
  <div className="flex items-start gap-4 p-4 bg-neutral-50 rounded-xl border border-neutral-200 hover:border-neutral-300 transition-colors">
    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
      <Award className="w-5 h-5 text-primary" />
    </div>
    <div className="min-w-0 flex-1">
      <h4 className="font-semibold text-neutral-900 text-sm mb-1 line-clamp-2">
        {certificate.name}
      </h4>
      <p className="text-neutral-600 text-sm mb-0.5">
        {certificate.institution}
      </p>
      <p className="text-neutral-500 text-xs">Completed {certificate.year}</p>
    </div>
  </div>
);

export default function Certifications({
  certificates,
  className = "",
}: CertificationsProps) {
  if (!certificates?.length) return null;

  return (
    <section className={`space-y-4 ${className}`}>
      <h3 className="text-sm font-semibold text-neutral-900">Certifications</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {certificates.map((certificate, index) => (
          <CertificateCard key={index} certificate={certificate} />
        ))}
      </div>
    </section>
  );
}
