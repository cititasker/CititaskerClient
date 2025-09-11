import { FilterSheetFooter } from "@/components/reusables/table/components/SheetFooter";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const filterSchema = z.object({});

type FilterFormValues = z.infer<typeof filterSchema>;

interface IProps {
  setColumnFilters: any;
  resetAll: () => void;
}

function Filter({ setColumnFilters, resetAll }: IProps) {
  const filterMethods = useForm<FilterFormValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {},
  });

  const onFilterSubmit = (data: FilterFormValues) => {
    // Convert form data to TanStack Table filters
    // const filters = Object.entries(data)
    //   .filter(([_, value]) => value && value.trim() !== "")
    //   .map(([key, value]) => ({ id: key, value }));
    // setColumnFilters(filters);
    // console.log("Applied filters:", filters);
  };

  const handleFilterReset = () => {
    filterMethods.reset();
    resetAll();
  };
  return (
    <FormProvider {...filterMethods}>
      <form
        onSubmit={filterMethods.handleSubmit(onFilterSubmit)}
        className="space-y-6"
      >
        <div className="space-y-4">Filter here</div>

        {/* Reusable Sheet Footer */}
        <FilterSheetFooter
          onReset={handleFilterReset}
          onApply={filterMethods.handleSubmit(onFilterSubmit)}
          isLoading={filterMethods.formState.isSubmitting}
        />
      </form>
    </FormProvider>
  );
}

export default Filter;
