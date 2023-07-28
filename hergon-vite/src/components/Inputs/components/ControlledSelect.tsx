import {
  useController,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import { FormLabel, FormControl } from "@chakra-ui/react";
import { Select, Props as SelectProps, GroupBase } from "chakra-react-select";
import { RenderIf } from "@/components/RenderIf";

interface ControlledSelectProps<
  FormValues extends FieldValues = FieldValues,
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>
  extends Omit<SelectProps<Option, IsMulti, Group>, "name" | "defaultValue">,
    UseControllerProps<FormValues> {
  label?: string;
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
  ...selectProps
}: ControlledSelectProps<FormValues, Option, IsMulti, Group>) {
  const {
    field,
    fieldState: { error },
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
        {...selectProps}
        {...field}
        onChange={(selectedOption) => {
          // Call the field.onChange function provided by useController
          field.onChange(selectedOption);
          // If the ControlledSelect component has its own onChange prop, call it as well
          if (selectProps.onChange) {
            selectProps.onChange(selectedOption);
          }
        }}
      />
    </FormControl>
  );
}






