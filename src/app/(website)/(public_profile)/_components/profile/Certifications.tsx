import React from "react";

interface IProps {
  certificates: { institution: string; year: string }[] | undefined;
}
export default function Certifications({ certificates }: IProps) {
  return (
    <div>
      {certificates && certificates?.length > 0 && (
        <section>
          <p className="text-sm font-bold mb-1">Certifications:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificates.map((cert, i) => (
              <div key={i} className="flex items-start gap-4">
                <img
                  src="/images/Certificate.svg"
                  alt="certificate"
                  width={40}
                  height={40}
                />
                <div className="text-sm">
                  <p className="font-medium">{cert?.institution}</p>
                  <p>Graduated {cert?.year}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
