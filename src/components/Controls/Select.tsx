import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from "@material-ui/core";
import React from "react";
import { isPhoneNumber, Network, PhoneNumber } from "../../data/entities";

interface SelectProps {
  label: string;
  name: string;
  value: Network | PhoneNumber | undefined;
  onChange: (event: any) => void;
  options: Network[] | PhoneNumber[];
  fullWidth?: boolean;
  required?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  fullWidth,
  required,
}) => {
  return (
    <FormControl variant="outlined" fullWidth={fullWidth} required={required}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        label={label}
        name={name}
        value={value !== undefined ? value.id : undefined}
        onChange={onChange}
      >
        {options.map((item: Network | PhoneNumber) => (
          <MenuItem
            key={item.id}
            value={item.id}
            selected={value !== undefined ? item.id === value.id : false}
          >
            {isPhoneNumber(item)
              ? `${item.network.name} - ${item.number}`
              : item.name.replace("_", " ")}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};
