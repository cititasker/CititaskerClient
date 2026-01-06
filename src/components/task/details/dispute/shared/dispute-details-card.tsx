import React from "react";
import { FileText, AlertCircle, Banknote } from "lucide-react";
import { DisputeType } from "@/lib/types/dispute.types";
import {
  formatCurrency,
  getProposalLabel,
  getReasonLabel,
} from "@/lib/utils/dispute-helpers";
import { Card } from "@/components/ui/card";

interface DisputeDetailsCardProps {
  dispute: DisputeType;
}

export default function DisputeDetailsCard({
  dispute,
}: DisputeDetailsCardProps) {
  const detailItems = [
    {
      icon: AlertCircle,
      label: "Task Status",
      value: dispute.task_status === "started" ? "Started" : "Not Started",
    },
    {
      icon: FileText,
      label: "Request",
      value: getProposalLabel(dispute.initial_proposal.request),
    },
    {
      icon: FileText,
      label: "Reason",
      value: getReasonLabel(dispute.reason_for_dispute),
    },
    {
      icon: Banknote,
      label: "Refund Amount",
      value: formatCurrency(dispute.initial_proposal.refund_amount),
    },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold text-neutral-900 mb-6">
        Dispute Details
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {detailItems.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="p-2 bg-neutral-100 rounded-lg shrink-0">
              <item.icon className="w-5 h-5 text-neutral-600" />
            </div>
            <div className="min-w-0">
              <p className="text-sm text-neutral-500 mb-1">{item.label}</p>
              <p className="text-sm font-medium text-neutral-900 break-words">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-neutral-200 pt-6">
        <p className="text-sm font-medium text-neutral-700 mb-2">Details:</p>
        <p className="text-sm text-neutral-600 mb-4 whitespace-pre-wrap">
          {dispute.initial_proposal.details}
        </p>

        {dispute.initial_proposal.documents.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-neutral-700">Attachments:</p>
            <div className="flex flex-wrap gap-2">
              {dispute.initial_proposal.documents.map((doc, index) => (
                <a
                  key={index}
                  href={doc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-lg text-sm text-neutral-700 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Document {index + 1}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
