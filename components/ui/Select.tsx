'use client';
import React, { useState, useRef, useEffect, useId } from 'react';
import { motion } from 'motion/react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  icon?: string;
  label?: string;
  className?: string;
}

export default function Select({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  icon,
  label,
  className = '',
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<SelectOption | null>(
    value ? options.find((o) => o.value === value) || null : null
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const id = useId();

  // Two-step visibility for smooth CSS transition (no AnimatePresence needed)
  const openDropdown = () => {
    setIsOpen(true);
    requestAnimationFrame(() => setVisible(true));
  };

  const closeDropdown = () => {
    setVisible(false);
    timerRef.current = setTimeout(() => setIsOpen(false), 160);
  };

  const toggle = () => (isOpen ? closeDropdown() : openDropdown());

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        closeDropdown();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isOpen]);

  const handleSelect = (option: SelectOption) => {
    setSelected(option);
    onChange?.(option.value);
    closeDropdown();
  };

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="font-label-ui text-label-ui text-[#1a1c15] flex items-center gap-1 cursor-pointer select-none"
          onClick={toggle}
        >
          {icon && (
            <span className="material-symbols-outlined text-sm" style={{ color: 'var(--color-primary)' }}>
              {icon}
            </span>
          )}
          {label}
        </label>
      )}

      <div ref={containerRef} className="relative" id={id}>
        {/* Trigger */}
        <button
          type="button"
          onClick={toggle}
          className={`
            w-full flex items-center justify-between gap-2
            bg-[#f3f5e9] hover:bg-[#eeefe3]
            text-[#1a1c15] rounded-lg px-3 py-2.5
            font-body-default text-body-default
            border transition-all duration-150
            focus:outline-none
            ${isOpen ? 'border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/20 bg-white shadow-sm' : 'border-transparent'}
          `}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className={selected ? 'text-[#1a1c15]' : 'text-[#5a5f62]'}>
            {selected ? selected.label : placeholder}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="material-symbols-outlined text-[18px] flex-shrink-0"
            style={{ color: isOpen ? 'var(--color-primary)' : '#5a5f62' }}
          >
            expand_more
          </motion.span>
        </button>

        {/* Dropdown — CSS transition only, zero flicker */}
        {isOpen && (
          <div
            className="absolute z-[500] left-0 right-0 top-[calc(100%+6px)]
              bg-white border border-[#e2e4d8] rounded-xl
              shadow-[0_8px_32px_rgba(0,0,0,0.13)] overflow-hidden"
            style={{
              transition: 'opacity 0.15s ease, transform 0.15s ease',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(-6px)',
            }}
            role="listbox"
          >
            <div className="py-1.5 max-h-56 overflow-y-auto">
              {options.map((option) => {
                const isSelected = selected?.value === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(option)}
                    className={`
                      w-full flex items-center justify-between gap-2
                      px-4 py-2.5 text-left
                      font-body-default text-body-default
                      transition-colors duration-100
                      ${isSelected
                        ? 'text-[var(--color-primary)] font-semibold bg-[#fdf0ee]'
                        : 'text-[#1a1c15] hover:bg-[#f3f5e9]'
                      }
                    `}
                  >
                    <span>{option.label}</span>
                    {isSelected && (
                      <span
                        className="material-symbols-outlined text-[16px] flex-shrink-0"
                        style={{ color: 'var(--color-primary)' }}
                      >
                        check
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
