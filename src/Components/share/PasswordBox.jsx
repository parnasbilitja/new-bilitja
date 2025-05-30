import React, { useMemo } from 'react';

const PasswordBox = ({ value, valueLength, onChange }) => {
  const RE_DIGIT = new RegExp(/^\d+$/);
  const valueItems = useMemo(() => {
    const valueArray = value.split('');
    const items = [];

    for (let i = 0; i < valueLength; i++) {
      const char = valueArray[i];

      if (RE_DIGIT.test(char)) {
        items.push(char);
      } else {
        items.push('');
      }
    }

    return items;
  }, [value, valueLength]);
  const inputOnChange = (e,idx) => {
    const target = e.target;
    let targetValue = target.value;
    const isTargetValueDigit = RE_DIGIT.test(targetValue);

    if (!isTargetValueDigit && targetValue !== '') {
      return;
    }

    targetValue = isTargetValueDigit ? targetValue : ' ';

    const newValue =
      value.substring(0, idx) + targetValue + value.substring(idx + 1);

    onChange(newValue);

    if (!isTargetValueDigit) {
      return;
    }

    const nextElementSibling =
      target.nextElementSibling;

    if (nextElementSibling) {
      nextElementSibling.focus();
    }
  };

  const inputOnKeyDown = (e) => {
    const target = e.target

    if (e.key !== 'Backspace' || target.value !== '') {
      return;
    }

    const previousElementSibling =
      target.previousElementSibling

    if (previousElementSibling) {
      previousElementSibling.focus();
    }
  };
    return (
      <div className="otp-group">
      {valueItems.map((digit, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="\d{1}"
          maxLength={valueLength}
          className="otp-input"
          value={digit}
          onChange={(e) => inputOnChange(e, idx)}
          onKeyDown={inputOnKeyDown}
        />
      ))}
    </div>
    );
};

export default PasswordBox;