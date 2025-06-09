import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import {
  allowedYears,
  getAllowedMonths,
  getDaysInMonth,
} from "../../../../utils/dateValidator";
import type { FormDataProps } from "../../Collapsible";
import { GroupForm, Row, StyledLabel } from "../styles";
import Select from "../Select";

interface DatePeriodProps {
  formData: FormDataProps;
  setFormData: Dispatch<SetStateAction<FormDataProps>>;
}

const DatePeriod = ({ formData, setFormData }: DatePeriodProps) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const yearsStart = allowedYears(currentYear);
  const startYear = Number(formData.startDate.year);
  const yearsEnd = allowedYears(currentYear, startYear || 1900);
  const monthsStarted = formData.startDate.year
    ? getAllowedMonths(
        Number(formData.startDate.year),
        currentYear,
        currentMonth
      )
    : [];
  const monthsEnd = formData.endDate.year
    ? getAllowedMonths(
        Number(formData.endDate.year),
        currentYear,
        currentMonth,
        startYear,
        Number(formData.startDate.month)
      )
    : [];
  const daysStarted =
    formData.startDate.year && formData.startDate.month
      ? getDaysInMonth(
          Number(formData.startDate.month),
          Number(formData.startDate.year)
        )
      : [];
  const daysEnd =
    formData.endDate.month && formData.endDate.month
      ? getDaysInMonth(
          Number(formData.endDate.month),
          Number(formData.endDate.year),
          {
            year: startYear,
            month: Number(formData.startDate.month),
            day: Number(formData.startDate.day),
          }
        )
      : [];

  return (
    <Row flexColumn>
      <GroupForm flexColumn>
        <StyledLabel>Data de início: </StyledLabel>
        <Select
          items={yearsStart}
          value={formData.startDate.year}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setFormData((prev) => ({
              ...prev,
              startDate: { ...prev.startDate, year: e.target.value },
            }))
          }
        />
        <Select
          items={monthsStarted}
          value={formData.startDate.month}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setFormData((prev) => ({
              ...prev,
              startDate: { ...prev.startDate, month: e.target.value },
            }))
          }
        />
        <Select
          items={daysStarted}
          value={formData.startDate.day}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setFormData((prev) => ({
              ...prev,
              startDate: { ...prev.startDate, day: e.target.value },
            }))
          }
        />
      </GroupForm>
      <GroupForm flexColumn>
        <StyledLabel>Data de finalização: </StyledLabel>
        <Select
          items={yearsEnd}
          value={formData.endDate.year}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setFormData((prev) => ({
              ...prev,
              endDate: { ...prev.endDate, year: e.target.value },
            }))
          }
        />
        <Select
          items={monthsEnd}
          value={formData.endDate.month}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setFormData((prev) => ({
              ...prev,
              endDate: { ...prev.endDate, month: e.target.value },
            }))
          }
        />
        <Select
          items={daysEnd}
          value={formData.endDate.day}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setFormData((prev) => ({
              ...prev,
              endDate: { ...prev.endDate, day: e.target.value },
            }))
          }
        />
      </GroupForm>
    </Row>
  );
};

export default DatePeriod;
