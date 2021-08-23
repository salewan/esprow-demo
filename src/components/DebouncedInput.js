import React from 'react';
import styled from 'styled-components';
import useDebounce from '../hooks/useDebounce';

const InputStyled = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 4px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`

const DebouncedInput = ({ value, onChange }) => {
  const [term, setTerm] = React.useState(value);
  const debouncedTerm = useDebounce(term, 500);

  React.useEffect(() => {
    onChange(debouncedTerm);
  }, [onChange, debouncedTerm])

  return (
    <InputStyled value={term} onChange={(e) => setTerm(e.target.value)}/>
  )
}

export default DebouncedInput;