import React from "react";
import {
    FormControl,
    InputLabel,
    Select as MuiSelect,
    MenuItem,
} from "@material-ui/core";
import { Network } from "../../data/entities";

interface SelectProps {
    label: string;
    name: string;
    value: Network;
    onChange: (event: any) => void;
    options: Network[];
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
        <FormControl
            variant="outlined"
            fullWidth={fullWidth}
            required={required}
        >
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                value={value.id}
                onChange={onChange}
            >
                {options.map((item: Network) => (
                    <MenuItem
                        key={item.id}
                        value={item.id}
                        selected={item.id === value.id}
                    >
                        {item.name.replace("_", " ")}
                    </MenuItem>
                ))}
            </MuiSelect>
        </FormControl>
    );
};
