import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils";

interface BudgetDisplayProps {
  budget: number;
  onIncrease: () => void;
}

const BudgetDisplay: React.FC<BudgetDisplayProps> = ({
  budget,
  onIncrease,
}) => (
  <div className="rounded-[10px] p-[17px] bg-light-primary-1 text-center max-w-[217px] w-full">
    <p className="text-dark-grey-2 text-sm mb-5">Estimated Task Budget</p>
    <div className="space-y-3">
      <h2 className="text-[2rem] font-semibold text-black-2">
        {formatCurrency({ value: budget, noFraction: true })}
      </h2>
      <Button
        variant="outline"
        size="sm"
        className="max-w-[175px] hover:bg-white border-none w-full mx-auto text-secondary text-xs font-medium rounded-20"
        onClick={onIncrease}
      >
        + Increase Price
      </Button>
    </div>
  </div>
);

export default BudgetDisplay;
