/****
 *
 * Create a custom DatePicker for DOB
 *
 */

import React from 'react';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const DatePickerComponent = ({
  modalVisible,
  setOpen,
  onDateChange,
  mode,
}: any) => {
  const currentDate = moment();

  return (
    <>
      <DatePicker
        modal
        open={modalVisible}
        date={currentDate.toDate()}
        mode={mode}
        minimumDate={mode === 'date' ? new Date() : undefined}
        onConfirm={date => {
          console.log('Onconfirm date: ', moment(date).format('YYYY-MM-DD'));
          setOpen(false);
          var formatedDate = moment(date).format('DD-MM-YYYY');
          if (mode === 'time') {
            formatedDate = moment(date).format('hh:mm A');
          }

          onDateChange(formatedDate);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default DatePickerComponent;
