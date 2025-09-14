import FormButton from "@/components/forms/FormButton";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils";

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
      <h2 className="text-xl sm:text-[2rem] font-semibold text-black-2">
        {formatCurrency({ value: budget, noFraction: true })}
      </h2>
      {canIncreaseOffer && (
        <Button
          variant="outline"
          size="sm"
          className="max-w-[175px] hover:bg-white border-none w-full mx-auto text-secondary text-xs font-medium rounded-20"
          onClick={onIncrease}
        >
          + Increase Price
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
