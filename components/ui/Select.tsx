"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import * as Primitive from "@radix-ui/react-select";
import {
  Bed,
  Buildings,
  CaretDown,
  CaretUp,
  Check,
  CurrencyInr,
  MapPin,
} from "@phosphor-icons/react";
import styles from "./Select.module.css";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
interface SelectProps {
  options: readonly SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  icon?: string;
  label?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  variant?: "field" | "inline" | "compact";
}
const EMPTY_VALUE = "__dreamkey_empty__";
const subscribeHydration = () => () => {};
const icons = {
  location_on: MapPin,
  apartment: Buildings,
  bed: Bed,
  currency_rupee: CurrencyInr,
};

export default function Select({
  options,
  value,
  defaultValue = "",
  onChange,
  placeholder = "Select…",
  icon,
  label,
  ariaLabel,
  ariaDescribedBy,
  id: providedId,
  name,
  disabled,
  required,
  className = "",
  variant = "field",
}: SelectProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const native = useRef<HTMLSelectElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [internal, setInternal] = useState(defaultValue);
  const [invalid, setInvalid] = useState(false);
  const selected = value ?? internal;
  const hydrated = useSyncExternalStore(
    subscribeHydration,
    () => true,
    () => false,
  );
  const hasEmpty = options.some((option) => option.value === "");
  const selectedLabel =
    options.find((option) => option.value === selected)?.label ?? placeholder;
  const Icon = icon ? icons[icon as keyof typeof icons] : undefined;
  const update = (next: string) => {
    if (value === undefined) setInternal(next);
    setInvalid(false);
    onChange?.(next);
  };

  useEffect(() => {
    const form = native.current?.form;
    if (!form || value !== undefined) return;
    const reset = () => {
      setInternal(defaultValue);
      setInvalid(false);
    };
    form.addEventListener("reset", reset);
    return () => form.removeEventListener("reset", reset);
  }, [defaultValue, value]);

  return (
    <div
      className={`${styles.field} ${styles[variant]} ${className}`}
      data-enhanced={hydrated}
    >
      {label && (
        <label className={styles.label} htmlFor={id}>
          {Icon && <Icon size={15} aria-hidden="true" />}
          {label}
        </label>
      )}
      {/* This is the only named form control: preserve empty values, FormData and no-JS GET forms. */}
      <select
        ref={native}
        id={hydrated ? `${id}-native` : id}
        name={name}
        value={selected}
        onChange={(event) => update(event.target.value)}
        disabled={disabled}
        required={required}
        aria-label={ariaLabel ?? label}
        aria-describedby={ariaDescribedBy}
        aria-hidden={hydrated || undefined}
        tabIndex={hydrated ? -1 : undefined}
        className={styles.native}
        onInvalid={(event) => {
          if (!hydrated) return;
          event.preventDefault();
          setInvalid(true);
          trigger.current?.focus();
        }}
      >
        {!hasEmpty && selected === "" && (
          <option value="" hidden>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      {hydrated && (
        <Primitive.Root
          value={selected === "" && hasEmpty ? EMPTY_VALUE : selected}
          onValueChange={(next) => update(next === EMPTY_VALUE ? "" : next)}
          disabled={disabled}
          required={required}
        >
          <Primitive.Trigger
            ref={trigger}
            id={id}
            className={styles.trigger}
            aria-label={ariaLabel ?? label}
            aria-describedby={ariaDescribedBy}
            aria-invalid={invalid || undefined}
          >
            <Primitive.Value>{selectedLabel}</Primitive.Value>
            <Primitive.Icon className={styles.caret}>
              <CaretDown size={14} aria-hidden="true" />
            </Primitive.Icon>
          </Primitive.Trigger>
          <Primitive.Portal>
            <Primitive.Content
              className={styles.menu}
              position="popper"
              sideOffset={8}
              collisionPadding={12}
              align="start"
            >
              <Primitive.ScrollUpButton className={styles.scrollButton}>
                <CaretUp size={14} aria-hidden="true" />
              </Primitive.ScrollUpButton>
              <Primitive.Viewport className={styles.viewport}>
                {options.map((option) => (
                  <Primitive.Item
                    className={styles.option}
                    key={option.value}
                    value={option.value === "" ? EMPTY_VALUE : option.value}
                    disabled={option.disabled}
                  >
                    <Primitive.ItemText>{option.label}</Primitive.ItemText>
                    <Primitive.ItemIndicator className={styles.check}>
                      <Check size={16} weight="bold" aria-hidden="true" />
                    </Primitive.ItemIndicator>
                  </Primitive.Item>
                ))}
              </Primitive.Viewport>
              <Primitive.ScrollDownButton className={styles.scrollButton}>
                <CaretDown size={14} aria-hidden="true" />
              </Primitive.ScrollDownButton>
            </Primitive.Content>
          </Primitive.Portal>
        </Primitive.Root>
      )}
    </div>
  );
}
