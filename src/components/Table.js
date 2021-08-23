import styled from 'styled-components';

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`

export const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`

export const Th = styled(Td)`
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04AA6D;
  color: white;
`

export const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
  &:hover {
    background-color: #ddd;
  }
`