import React from "react";
import { Button } from "@mantine/core";

interface CertificationProps {
  data: {
    name: string;
    issuer: string;
    issueDate: string;
    certificateId?: string;
    logo?: string;
    credentialUrl?: string;
  };
}

const CertificationCard = ({ data }: CertificationProps) => {
  return (
    <div className="flex flex-col gap-2 pb-6">
      {/* Header */}
      <div className="flex gap-3 items-start">
        <div className="p-2 bg-mine-shaft-800 rounded-lg">
          <img
            src={data.logo || "/assets/cert-placeholder.png"}
            className="h-10 w-10 object-contain"
            alt="Certification logo"
          />
        </div>
        <div>
          <div className="font-semibold text-base text-white">{data.name}</div>
          <div className="text-sm text-mine-shaft-300">{data.issuer}</div>
          <div className="text-xs text-mine-shaft-400">Issued {data.issueDate}</div>
          {data.certificateId && (
            <div className="text-xs text-mine-shaft-500">
              Credential ID {data.certificateId}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificationCard;
