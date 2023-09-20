import {
  useController,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import { FormLabel, FormControl } from "@chakra-ui/react";
import { Select, Props as SelectProps, GroupBase } from "chakra-react-select";
import { RenderIf } from "@/components/RenderIf";
import { OnChangeValue, ActionMeta } from "react-select";
import { ChangeEvent } from "react";


interface ControlledSelectProps<
  FormValues extends FieldValues = FieldValues,
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>
  extends Omit<SelectProps<Option, IsMulti, Group>, "name" | "defaultValue">,
    UseControllerProps<FormValues> {
  label?: string;
  onChange?: (selectedOption: OnChangeValue<Option, IsMulti>, action: ActionMeta<Option>) => void;
  isMulti?: IsMulti;
}

/**
 * An attempt to make a reusable chakra-react-select form component
 *
 * @param props - The combined props of the chakra-react-select component and the useController hook
 */
export function  ControlledSelect<
  FormValues extends FieldValues = FieldValues,
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  name,
  label,
  options,
  control,
  rules,
  shouldUnregister,
  onChange,
  isMulti,
  ...selectProps
}: ControlledSelectProps<FormValues, Option, IsMulti, Group>) {
  const {
    field,
  } = useController<FormValues>({
    name,
    control,
    rules,
    shouldUnregister,
  });

  return (
    <FormControl label={label} id={name}>
      <RenderIf conditional={!!label}>
        <FormLabel
          color="gray.700" 
          fontWeight="semibold" 
          fontSize="sm" 
          marginBottom="0.25rem"
        >
          {label}
        </FormLabel>
      </RenderIf>

      <Select<Option, IsMulti, Group>
        variant="filled"
        options={options}
        isMulti={isMulti}
        {...selectProps}
        {...field}
        onChange={(selectedOption) => {
          // Call the field.onChange function provided by useController
          //selectedOption as unknown as ChangeEvent<HTMLSelectElement | Element>
          field.onChange(selectedOption as unknown as ChangeEvent<HTMLSelectElement | Element>);
          // If the ControlledSelect component has its own onChange prop, call it as well
          if (onChange) {
            onChange(selectedOption, {} as ActionMeta<Option>);
          }
        }}
      />
    </FormControl>
  );
}