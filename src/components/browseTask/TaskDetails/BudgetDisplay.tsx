import FormButton from "@/components/forms/FormButton";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils";
import { Plus } from "lucide-react";

interface BudgetDisplayProps {
  budget: number;
  onIncrease: () => void;
  buttonText: string;
  loading?: boolean;
  handleButtonClick: () => void;
  isButtonDisabled: boolean;
  canIncreaseOffer: boolean;
}

const BudgetDisplay: React.FC<BudgetDisplayProps> = ({
  budget,
  onIncrease,
  buttonText,
  loading,
  handleButtonClick,
  isButtonDisabled,
  canIncreaseOffer,
}) => (
  <div className="rounded-[10px] p-4 bg-light-primary-1 text-center max-w-[170px] sm:max-w-[217px] w-full">
    <p className="text-dark-grey-2 text-xs sm:text-sm mb-1.5 sm:mb-4">
      Estimated Task Budget
    </p>
    <div className="space-y-2 sm:space-y-3">
      <div className="text-3xl sm:text-4xl font-bold text-primary-900">
        {formatCurrency({ value: budget, noFraction: true })}
      </div>
      {canIncreaseOffer && (
        <Button
          variant="outline"
          size="sm"
          onClick={onIncrease}
          className="w-full mb-3 bg-white/80 hover:bg-white border-primary-200 text-primary-700 hover:text-primary-800 transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Increase Price
        </Button>
      )}

      <FormButton
        onClick={handleButtonClick}
        className="text-sm sm:text-base font-normal w-full"
        disabled={isButtonDisabled}
        loading={loading}
        size="lg"
      >
        {buttonText}
      </FormButton>
    </div>
  </div>
);

export default BudgetDisplay;
