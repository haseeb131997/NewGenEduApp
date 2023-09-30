
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView ,Image} from 'react-native';
import AppStyles from "../../AppStyles/AppStyles";
import { Caption, Text, } from 'react-native-paper';
import CalendarStrip from 'react-native-calendar-strip';
import { UiColor } from '../../theme';
import moment from "moment";


export default class CustomCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datesBlacklist:this.props.datesBlacklist,
      dateswhitelist:this.props.dateswhitelist,
      startingDate:this.props.startingDate,
      selectedDate:this.props.selectedDate
    }
  }

  onWeekChanged(start,end)
  {
    const {maxDate,minDate,datesBlacklist,dateswhitelist } = this.props;
    
console.log('start-->',start )
console.log('end-->',end )
//var lastDate = end
      var startDate = moment(start, 'DD-MM-YYYY')
      var enddate = moment(end, 'DD-MM-YYYY')
      console.log('enddate-->',end )
      var calenderEndDate = moment(maxDate, 'DD-MM-YYYY')
      var Difference_In_date = moment.duration(enddate.diff(startDate)).asDays() + 1;
      console.log('Difference_In_date-->',Difference_In_date )
      var new_date = startDate
      for (var i = 0; i < Difference_In_date; i++) {
        new_date = moment(startDate, 'DD-MM-YYYY').add(i, 'days');
        //if (dataModelDate.indexOf(new_date) !== -1) {
          console.log('new_date',new_date)
          console.log('maxDate',calenderEndDate)
          console.log('moment(new_date).isAfter(maxDate)',moment(new_date).isAfter(calenderEndDate))
          if (moment(new_date).isAfter(calenderEndDate,'day')) {
          datesBlacklist.push(moment(new_date, "DD-MM-YYYY"))
        }
      }
      console.log('datesBlacklist-->',datesBlacklist)
this.setState({
  datesBlacklist: datesBlacklist,
  startingDate:startDate,
      selectedDate:startDate
  })

  }


  render() {
    const {selectedDate,onDateSelected,maxDate,minDate,datesBlacklist,dateswhitelist,startingDate } = this.props;
    return (
      <CalendarStrip
      onDateSelected={date => {
        onDateSelected(date)
      }}
      onWeekChanged={(start,end) => this.onWeekChanged(start,end)} 
      selectedDate={this.state.selectedDate}
     // startingDate={this.state.selectedDate}
      calendarAnimation={{ type: 'sequence', duration: 30 }}
      daySelectionAnimation={{ type: 'background', duration: 300, highlightColor: UiColor.SKYBLUE, }}
      calendarHeaderStyle={AppStyles.calendarHeaderStyle}
      maxDate={maxDate}
      minDate={minDate}
      startingDate={this.state.startingDate}
      datesBlacklist={datesBlacklist}
      dateswhitelist={dateswhitelist}
      disabledDateOpacity={0.3}
      disabledDateNameStyle={{ color: UiColor.LIGHT_TEXT_COLOR }}
      disabledDateNumberStyle={{ color: UiColor.LIGHT_TEXT_COLOR }}
      // showMonth={true}
      useIsoWeekday={false}
      numDaysInWeek={7}
      calendarColor={UiColor.WHITE}
      dateNumberStyle={{ color: UiColor.SKYBLUE }}
      dateNameStyle={{ color: UiColor.SKYBLUE }}
      // iconContainer={{ flex: 0.1, }}
      // customDatesStyles={customDatesStyle}
    />
  
    )
  }
}


