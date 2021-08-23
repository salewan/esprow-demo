import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from './Modal';
import { addDays, toDate } from 'date-fns';
import { DateRangePicker } from 'react-date-range';
import Button from '../components/Button';

const ButtonBar = styled.div`
  margin-top: 0.5rem;
  text-align: center;
  button + button {
    margin-left: 0.5rem;
  }
`

const ClearButton = styled(Button)`
  background-color: #e7e7e7; 
  color: black;
`

const CancelButton = styled(Button)`
  background-color: #555555;
`

const FilterButton = styled(Button)`
  background-color: ${props => props.applied ? '#4CAF50' : '#e7e7e7'};
  color: ${props => props.applied ? 'white' : 'black'}
`

const Filter = ({ minDate, maxDate, startDate, endDate, onChange, onOk, applied }) => {
  const [isOpen, setOpen] = React.useState(false);

  const selection = React.useMemo(() => {
    return {
      startDate: startDate ? toDate(startDate) : new Date(),
      endDate: endDate ? toDate(endDate) : null,
      key: 'selection'
    }
  }, [startDate, endDate]);

  const onClear = () => onChange({
    startDate: undefined,
    endDate: undefined
  });

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  const onApplyFilter = () => {
    if (selection.startDate && selection.endDate) {
      onOk();
    }
    onClose();
  }

  return (
    <>
      <FilterButton onClick={onOpen} applied={applied}>filter</FilterButton>
      <Modal open={isOpen} onClose={onClose}>
        <DateRangePicker
          onChange={item => {
            onChange({
              startDate: item.selection.startDate?.getTime(),
              endDate: item.selection.endDate?.getTime()
            })
          }}
          months={1}
          minDate={toDate(minDate)}
          maxDate={toDate(maxDate)}
          direction="vertical"
          scroll={{ enabled: true }}
          ranges={[selection]}
        />

        <ButtonBar>
          <ClearButton onClick={onClear}>Clear</ClearButton>
          <Button onClick={onApplyFilter}>Ok</Button>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
        </ButtonBar>
      </Modal>
    </>
  )
}

Filter.defaultProps = {
  minDate: addDays(new Date(), -900).getTime(),
  maxDate: new Date().getTime(),
  onChange: () => {},
  onOk: () => {}
}

Filter.propTypes = {
  minDate: PropTypes.number,
  maxDate: PropTypes.number,
  onChange: PropTypes.func,
  startDate: PropTypes.number,
  endDate: PropTypes.number,
  onOk: PropTypes.func,
  applied: PropTypes.bool
}

export default Filter;