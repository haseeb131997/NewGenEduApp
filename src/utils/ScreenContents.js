
/*
 * * Â© Copyright 2017-2020 IBD Tecnologies Private Limited.
 * *                       3/506 Kannadhsan Street ,ShanmugaNagar,Porur
 * *                       Chennai - 600125.
 * *                       India
 * *
 * * This source is part of the General Framework and is copyrighted by
 * * IBD Technologies Private Limited.
 * *
 * * All rights reserved.  No part of this work may be reproduced, stored in a
 * * retrieval system, adopted or transmitted in any form or by any means,
 * * electronic, mechanical, photographic, graphic, optic recording or otherwise,
 * * translated in any language or computer language, without the prior written
 * * permission of IBD Technologies Private Limited.
 /**/
/**/
/**/

/* * * Change Tag:N0U-109
 Change Desc: Help instruction is added for video class room
 Changed By : Rajkumar Velusamy
 Date:08-02-2022


 */
 import { UiColor } from "../theme";



class ScreenContents { }


ScreenContents.showTooltipModal = false


ScreenContents.getHeaderScreenContents = function (serviceName,stateObject) {
  switch(serviceName){

    //N0U-101 fix starts
    case 'Notification':
      return [ {
        text:'Instant Notifications" to deliver instant notifications to a class/group.',
        color:UiColor.DRAK_GRAY_COLOR
      },
      {
        text:'Instant Notification Messages are the messages which will be delivered to parents on given delivery date.',
        color:UiColor.DRAK_GRAY_COLOR
      },
      {
        text:'You can send Holiday Declaration, Homework, Any appreciation, Disciplinary Action, Emergency messages, etc as instant messages.',
        color:UiColor.DRAK_GRAY_COLOR
      },
      {
        text:'You can deliver instant notifications easily by mentioning the assignee group, created email /SMS message template and the delivery date.',
        color:UiColor.DRAK_GRAY_COLOR
      },
      
      ]
      case 'NotificationTemplate':
        return [ {
          text:'A Template is a message format that is used for sending SMS/Email notifications to parents.',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'There are two types of notifications: Event-triggered notification messages for Exam schedule, Exam Assessments, ECircular, Video lesson, Softskill Assessment, Extra-curricular events, Attendance and Fees can be sent on a pre-determined schedule that can have only one template. For example, There can be only one template for exam schedule message type that will be used whenever the exam schedule is configured in the system.',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'Instant notifications messages for Homework, Disciplinary Action, Emergency, Holidays, Appreciation and others can be sent on given delivery date that can have multiple templates.',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'For example, you can have different templates for homework on different dates.                                                Here you can view default templates for every message type. You can click on "Edit" in the right corner of the record to edit the message if you want.',
          color:UiColor.DRAK_GRAY_COLOR
        },
        
        ]


    case 'UserRole':
    return [ {
      text:'By default, the system will provide roles to users based on their type. If the institute wants to introduce a specific role to an user, then this feature can be utilized',
      color:UiColor.DRAK_GRAY_COLOR
    },
    {
      text:'Once the new role is created it has to be assigned to the user in the screen "Home/User Management/Profile',
      color:UiColor.DRAK_GRAY_COLOR
    },
    ]
    case 'UserProfile':
    return [ {
      text:'User profiles will be created automatically when you create staff or student profile',
      color:UiColor.DRAK_GRAY_COLOR
    },
    {
      text:'You can reset the password here',
      color:UiColor.DRAK_GRAY_COLOR
    },
    ]
    case 'MarkRegisterReport':
      return [ {
        text:'Using this report you can track the marks of the students of the given class for the given exam. ',
        color:UiColor.DRAK_GRAY_COLOR
      },
      {
        text:'Mention the Class,Exam to view their Mark Register report.',
        color:UiColor.DRAK_GRAY_COLOR
      },
      ]
    case 'MarkRegisterReport':
    return [ {
      text:'Using this report you can track the marks of the students of the given class for the given exam. ',
      color:UiColor.DRAK_GRAY_COLOR
    },
    {
      text:'Mention the Class,Exam to view their Mark Register report.',
      color:UiColor.DRAK_GRAY_COLOR
    },
    ]
   case 'ClassLessonPlannerReport':
    return [ {
      text:'You can track the lesson planner for the given class by taking this report',
      color:UiColor.DRAK_GRAY_COLOR
    },
    ]
   case 'Class360DegreeReport' :
    return [ {
      text:'In Class report the following details about a corresponding class can be viewed: Class name, Number of students, Class Teacher, Attendance details, Exam performance, Grade wise summary, Mark analysis, Other activity summary.',
      color:UiColor.DRAK_GRAY_COLOR
    },
    {
      text:'Mention the Class to view its report',
      color:UiColor.DRAK_GRAY_COLOR
    },
  
  ]
   case 'FeeBusinessReport':
    return [ {
      text:'In the Fee report, the following details can be viewed: List of fees applicable, Student wise fee status.'
        ,
      color:UiColor.DRAK_GRAY_COLOR
    },
    {
      text:'If you want a fee report for a particular class, then mention the class in the filter',
      color:UiColor.DRAK_GRAY_COLOR
    },
    {
      text:'If you want a fee report for a particular fee type, mention the fee description in the filter',
      color:UiColor.DRAK_GRAY_COLOR
    },
  ]
   

   case 'GradeComparison':
    return [ {
      text:'In Exam Performance report the following details can be viewed: Gradewise comparison and Mark-wise comparison across all the classes comes under the given Year/Standard in the institute.',
      color:UiColor.DRAK_GRAY_COLOR
    },
    {
      text:' Mention the Year/Standard to view their Exam Performance report.',
      color:UiColor.DRAK_GRAY_COLOR
    },
    ]
   case 'AttendanceMonthlyReport':
    return [ {
      text:'Using this report you can track the attendance of the given class for the given month & year. Mention the Class, Month & Year to view their Monthly attendance report.',
      color:UiColor.DRAK_GRAY_COLOR
    },
    {
      text:'Mention the Class, Month & Year to view their Monthly attendance report.',
      color:UiColor.DRAK_GRAY_COLOR
    },
    ]
   case 'NotificationBusinessReport':
    return [ {
      text:'In the Notification report, the following details about the notifications sent between the given date range can be viewed: Date, Notification type, Student ID, Message, Notification status, Reference ID.',
      color:UiColor.DRAK_GRAY_COLOR
    },
    ]
   case 'PaymentBusinessReport':
    return [ {
      text:'In the Payment report, the following details about payments made between the given date range can be viewed: Payment ID, Date, Mode of payment, Fee, description, amount, Due date, Student Name & ID.',
      color:UiColor.DRAK_GRAY_COLOR
    },
    ]
   case 'StudentLessonPlannerReport':
    if(stateObject.state.userType == 'P'){
      return [ {
        text:'You can track the lesson planner for your kids by taking this report',
        color:UiColor.DRAK_GRAY_COLOR
      },]
    }
    if(stateObject.state.userType == 'S'){
      return [ {
        text:'You can track the lesson planner by taking this report',
        color:UiColor.DRAK_GRAY_COLOR
      },]
    }
    else
    return [ {
      text:'You can track the lesson planner for the given student by taking this report',
      color:UiColor.DRAK_GRAY_COLOR
    },]
   case 'StudentDetailsReport':
      return [ {
        text:'This report gives details about the students of the given class and given academic year. It shows you details about the Student Register.'   ,
        color:UiColor.DRAK_GRAY_COLOR
      },
      {
        text:'Mention the academic year to view the student register report.',
        color:UiColor.DRAK_GRAY_COLOR
      },
    ]

   case 'Student360DegreeReport':
    if(stateObject.state.userType == 'P'){
      return [ {
        text:'In the Student report the following details about your ward can be viewed-Personal details, Family details, Class details, Notes about the student, Attendance details, Exam performance, Other activity performance and Soft Skills performance'   ,
        color:UiColor.DRAK_GRAY_COLOR
      },
      {
        text:'Mention the student name and click generate report in order to view the student report where you can print or download the particular report.',
        color:UiColor.DRAK_GRAY_COLOR
      },]
    }
    if(stateObject.state.userType == 'S'){
      return [ {
        text:'In the Student report the following details about yourself can be viewed-Personal details, Family details, Class details, Notes about the student, Attendance details, Exam performance, Other activity performance and Soft Skills performance.'   ,
        color:UiColor.DRAK_GRAY_COLOR
      },
      {
        text:'Mention your name and click generate report in order to view the student report where you can print or download the particular report.',
        color:UiColor.DRAK_GRAY_COLOR
      },]
    }

   else
    return [ {
      text:'In the Student report, the following details about a student can be viewed-Personal details, Family details, Class details, Notes about the student, Attendance details, Exam performance, Other activity performance, Soft Skills performance'   ,
      color:UiColor.DRAK_GRAY_COLOR
    },
    {
      text:'Mention the student name and click generate report in order to view the student report where you can print or download the particular report.',
      color:UiColor.DRAK_GRAY_COLOR
    },]

   case 'TeacherLessonPlannerReport':
    return [ {
      text:'You can track the lesson planner for the given teacher by taking this report',
      color:UiColor.DRAK_GRAY_COLOR
    },]
 
   case 'TeacherReport':
    return [ {
      text:'In Staff report the following details about a corresponding staff can be viewed: Personal details, Attendance details, Exam performance, Grade wise summary, Mark analysis. '   ,
      color:UiColor.DRAK_GRAY_COLOR
    },
    {
      text:'Mention the staff name and date to view the report of teacher substitute on the given day, for the given staff',
      color:UiColor.DRAK_GRAY_COLOR
    },
  ]
   case 'SubstituteReport':
    return [ {
      text:'In Staff Substitute report the following details can be viewed: Periods allocated on the given date for the requested staff, a list of available staffs that handle the same class & staffs that handle other classes.'   ,
      color:UiColor.DRAK_GRAY_COLOR
    },
    {
      text:'Mention the staff name and date to view the report of teacher substitute on the given day, for the given staff',
      color:UiColor.DRAK_GRAY_COLOR
    },
  ]



    //N0U-108 fix starts
    case 'OnlineStaffMeetings':
      return [ {
        text:'Online Staff Meeting is a virtual meeting attended by the staff members to discuss various topics or issues related to an institution, Syllabus discussions, Result analysis, Staff Conferences, etc..'   ,
        color:UiColor.DRAK_GRAY_COLOR
      },
      {
        text:'You can schedule an online staff meeting(like 1 to 1 meeting, all teaching staff or non-teaching staff meeting) by simply mentioning details like topic/objective of meeting, date, time, duration and by pasting the meeting link of the Zoom or Microsoft Teams or other video apps',
        color:UiColor.DRAK_GRAY_COLOR
      },
    ]

    case 'OnlineParentMeetings':
      if(stateObject.state.userType == 'P'){
        return [ {
          text:'Online Parent/Student Meeting is a virtual meeting where the busiest teachers & the parents can be easily connected to share the progress of the child. You can view if there is any meeting arranged for you or your Kids here.'  ,
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'You can view if there is any meeting arranged for you or your Kid here. Click on "View Meetings" to view the parent/student meeting which has been scheduled for that particular month and year.',
          color:UiColor.DRAK_GRAY_COLOR
        },

      ]}
      else if(stateObject.state.userType == 'S'){

        return [ {
          text:'Online Parent/Student Meeting is a virtual meeting where you can easily connect the busiest teachers & the parents to share the progress of the child. '   ,
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'You can schedule an online parent/student meeting(like 1 to 1 meeting or group meeting) by simply mentioning details like topic/objective of meeting, student name/assignee group, date, time, duration and by pasting the meeting link of the Zoom,Microsoft Teams. or any other video call apps',
          color:UiColor.DRAK_GRAY_COLOR
        },]
        
      }
      else 
      {
      return [ {
        text:'Online Parent/Student Meeting is a virtual meeting where you can easily connect the busiest teachers & the parents to share the progress of the child. '   ,
        color:UiColor.DRAK_GRAY_COLOR
      },
      {
        text:'You can schedule an online parent/student meeting(like 1 to 1 meeting or group meeting) by simply mentioning details like topic/objective of meeting, student name/assignee group, date, time, duration and by pasting the meeting link of the Zoom,Microsoft Teams. or any other video call apps',
        color:UiColor.DRAK_GRAY_COLOR
      },
    ]
  }
  //N0U-108fix ends 
    //N0U-109 fix starts
      case 'OnlineClassroomService':
        if(stateObject.state.userType == 'P'){
          return [ {
            text:'Online Video Classroom is a logical representation of a classroom on an online platform where teaching and learning takes place between students and teachers where teachers can take class for the students. You can view the online classroom being scheduled and conducted for your kids.'  ,
            color:UiColor.DRAK_GRAY_COLOR
          },
          {
            text:'Your kids can join the online class here.Online Video Classrooms have been categorised based on the subject, month and year.Click on "View Classrooms" to view the online class for that corresponding subject, month and year',
            color:UiColor.DRAK_GRAY_COLOR
          },
  
        ]}
        else if(stateObject.state.userType == 'S'){
  
          return [ {
            text:'Online Video Classroom is a logical representation of a classroom on an online platform where teaching and learning takes place between students and teachers where teachers can take class for the students. You can view the online classroom being scheduled and conducted. '   ,
            color:UiColor.DRAK_GRAY_COLOR
          },
          {
            text:'You can join the online class here.Online Video Classrooms have been categorised based on the subject, month and year. Click on "View Classrooms" to view the online class for that corresponding subject, month and year',
            color:UiColor.DRAK_GRAY_COLOR
          },]
          
        }
        else 
        {

        return [ {
          text:'Video Classroom is a logical representation of a classroom on an online platform where teaching and learning takes place between students and teachers where teachers can take class for the students.'   ,
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'You can schedule an online classroom(like 1 to 1 or group classroom) by simply mentioning details like subject,topic, date, time, duration and by pasting the meeting link of the Zoom or Microsoft Teams or other video apps.',
          color:UiColor.DRAK_GRAY_COLOR
        },
      ]
    }
      case 'OnlineMeetingAttendanceService':

        if(stateObject.state.userType == 'P'){
          return [ {
            text:'You can check here your kids attendance of online video clasess/Meetings'  ,
            color:UiColor.DRAK_GRAY_COLOR
          },
          
        ]}
        else if(stateObject.state.userType == 'S'){
  
          return [ {
            text:'You can check here your attendance of online video clasess/Meetings'  ,
            color:UiColor.DRAK_GRAY_COLOR
          },
        ] 
        }
        else 
        {
      return [ {
        text:'You can view the list of particpants who have attended the meeting/online class here.'   ,
        color:UiColor.DRAK_GRAY_COLOR
      },
      {
        text:'You can view the participant names along with their joining time for each meeting type (online class/online parent meeting) conducted on a particular date and time.',
        color:UiColor.DRAK_GRAY_COLOR
      },
    ]}
    //N0U-109 fix ends 
//N0U-97 fix starts
    case 'TeacherTimeTable':

      return [ {
        text:'Timetable is a list that shows the day and time at which particular subjects are taught.'   ,
        color:UiColor.DRAK_GRAY_COLOR
      },
      {
        text:'You can see here time table or schedule for given staff or teacher',
        color:UiColor.DRAK_GRAY_COLOR
      },
    ]


//N0U-97 end

case 'NewStudentAssignment':
  if(!(stateObject.state.userType == 'P')||(stateObject.state.userType == 'S')){
    return [ {
      text:'You can track all the assignments assigned to a student here.'   ,
      color:UiColor.DRAK_GRAY_COLOR
    },
    {
      text:'Mention the student name to track the assignments of a particular student.',
      color:UiColor.DRAK_GRAY_COLOR
    },
  ]
  }
      return [ {
        text:'Assignments are the tasks given to students to complete in a defined time. Assignments can be worksheets or simple text questions or work case scenarios.'   ,
        color:UiColor.DRAK_GRAY_COLOR
      },
      {
        text:'You can view various assignments assigned here. The assignments shown below are categorised based on the subject, month and year. Click on the " Answer" button to answer the particular assignment.',
        color:UiColor.DRAK_GRAY_COLOR
      },
    ]
    break;
    case 'StudentAttendance':
      if(stateObject.state.userType == 'P'){
        return [ {
          text:'Attendance is a measure of the number of days a student was attending the class.'  ,
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'You can view your kids attendance by mentioning your kids name, Month & Year.You can view the attendance taken for each working day for that particular month and year as follows:  Green : Present Red : Absent, uninformed Yellow : Leave, Informed.  ',
          color:UiColor.DRAK_GRAY_COLOR
        },

      ]}
      else if(stateObject.state.userType == 'S'){
      return [ {
        text:'Attendance is a measure of the number of days a student was attending the class.'   ,
        color:UiColor.DRAK_GRAY_COLOR
      },
      {
        text:'You can view your attendance by mentioning your name, Month & Year.You can view the attendance taken for each working day for that particular month and year as follows:  Green : Present Red : Absent, uninformed Yellow : Leave, Informed.  ',
        color:UiColor.DRAK_GRAY_COLOR
      },
    ]}
    else{
      return [ {
        text:'You can track student attendance here',
        color:UiColor.DRAK_GRAY_COLOR
      },
      {
        text:'Mention the student name to track the attendance of a particular student.   ',
        color:UiColor.DRAK_GRAY_COLOR
      },
    ]
  }
    break;
    case 'StudentExamSchedule':
      if(stateObject.state.userType == 'P'){
        return [ {
          text:'Exam schedule is a plan that determines the day and time an exam is supposed to be held.'  ,
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'You can view the schedule for various examinations to be conducted which includes information like the date, subject, time, syllabus and soft skills to be assessed for that particular exam. ',
          color:UiColor.DRAK_GRAY_COLOR
        },

      ]}
      else if(stateObject.state.userType == 'S'){
        return [ {
          text:'Exam schedule is a plan that determines the day and time an exam is supposed to be held.'  ,
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'You can view the schedule for various examinations to be conducted which includes information like the date, subject, time, syllabus and soft skills to be assessed for that particular exam. ',
          color:UiColor.DRAK_GRAY_COLOR
        },

      ]
    }
     else{
      return [ {
        text:'You can track student exam schedules here',
        color:UiColor.DRAK_GRAY_COLOR
      },
      {
        text:'Mention the student name to track the exam schedule of a particular student.   ',
        color:UiColor.DRAK_GRAY_COLOR
      },
    ]

     } 
  
    break;
    case 'StudentFeeManagement':
      if(stateObject.state.userType == 'P'){
        return [ {
          text:'Fee is an amount collected by an institution for various purposes like tutions, exams, events, transport, coaching , etc.'  ,
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:' You can view various fees applicable for your kids here which includes fee details like fee description, fee type, due date and the fee amount along with the payment status that indicates as follows: Yellow color: Fee not paid      Green color: Fee Successfully paid       Red color: Fee not paid, due date has crossed  ',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'Click the "pay" button to pay the fees',
          color:UiColor.DRAK_GRAY_COLOR
        },

      ]}
      if(stateObject.state.userType == 'S'){
        return [ {
          text:'Fee is an amount collected by an institution for various purposes like tutions, exams, events, transport, coaching , etc.'  ,
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:' You can view various fees applicable for you here which includes fee details like fee description, fee type, due date and the fee amount along with the payment status that indicates as follows: Yellow color: Fee not paid      Green color: Fee Successfully paid       Red color: Fee not paid, due date has crossed  ',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'Click the "pay" button to pay the fees',
          color:UiColor.DRAK_GRAY_COLOR
        },

      ]}
      else{
        return [ {
          text:'You can track student Fee Status here',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'Mention the student name to track the Fee status of a particular student.   ',
          color:UiColor.DRAK_GRAY_COLOR
        },
      ]
    } 
  
    break;
    case 'StudentLessonPlannerService':
      if(stateObject.state.userType == 'P'){
        return [ {
          text:'Using the student lesson planner report you can track the progress of your kids self-study plan and teacher assigned daily tasks  '  ,
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'Mention your kids name and click generate report in order to view lesson planner report where you can print or download the particular report.',
          color:UiColor.DRAK_GRAY_COLOR
        },
        

      ]}
      if(stateObject.state.userType == 'S'){
        return [ {
          text:'Using the student lesson planner report you can track the progress of your self-study plan and teacher assigned daily tasks  '  ,
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'Mention your name and click generate report in order to view lesson planner report where you can print or download the particular report.',
          color:UiColor.DRAK_GRAY_COLOR
        },
        
      ]}
      else{
        return [ {
          text:'You can track student Lesson planner here',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'Mention the student name to track the Lesson planner of a particular student.   ',
          color:UiColor.DRAK_GRAY_COLOR
        },
      ]
    }
  
    break; 
    case 'StudentNotesService':
      if(stateObject.state.userType == 'S'){
        return [ {
          text:'  Students can take notes during classes or can create notes that will help them prepare and structure their further learning activities smoothly.',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'You can create notes by specifying details like date, your name and Subject.',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:' Click "View Notes" to view the notes for that particular subject.',
          color:UiColor.DRAK_GRAY_COLOR
        },

      ]}
      if(stateObject.state.userType == 'P'){
        return [ {
          text:'  Students can take notes during classes or can create notes that will help them prepare and structure their further learning activities smoothly.',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'You/Your Kid can create notes by specifying details like date,  name and Subject.',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:' Click "View Notes" to view the notes for that particular subject.',
          color:UiColor.DRAK_GRAY_COLOR
        },

      ]}
      else{
        return [ {
          text:'You can track student Notes here',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'Mention the student name to track the Notes of a particular student.   ',
          color:UiColor.DRAK_GRAY_COLOR
        },
      ]
    }
    break;
    case 'StudentNotification':
      if(stateObject.state.userType == 'P'){
        return [ {
          text:'Notification Messages are the messages which will be delivered to parents on a given delivery date.You can see messages related to Holiday Declaration, Homework, Any appreciation, Disciplinary Action, Emergency messages, etc as instant messages.',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'You can view the last one month notifications sent by clicking on the "View Message" button for the particular notification type (such as attendance, eCircular, homework, etc) which includes information like date, provided mail and phone number and the channel type.',
          color:UiColor.DRAK_GRAY_COLOR
        },
        
      ]}
      if(stateObject.state.userType == 'S'){
        return [ {
          text:'Notification Messages are the messages which will be delivered to parents on a given delivery date.You can see messages related to Holiday Declaration, Homework, Any appreciation, Disciplinary Action, Emergency messages, etc as instant messages.',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'You can view the last one month notifications sent by clicking on the "View Message" button for the particular notification type (such as attendance, eCircular, homework, etc) which includes information like date, provided mail and phone number and the channel type.',
          color:UiColor.DRAK_GRAY_COLOR
        },
        
      ]}
      else{
        return [ {
          text:'You can track student Notifications here',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'Mention the student name to track the Notifications of a particular student.   ',
          color:UiColor.DRAK_GRAY_COLOR
        },
      ]
    }
  
    break;
    case 'StudentPayment':
      if(stateObject.state.userType == 'P'){
        return [ {
          text:' A payment receipt is a document given to the parent/student as proof of full or partial payment made for the applicable fee.',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'You can view the receipt generated for each payment made. Click on "View Receipt" to view the payment receipt where you can print or download the particular receipt.       ',
          color:UiColor.DRAK_GRAY_COLOR
        },
        
      ]}
      if(stateObject.state.userType == 'S'){
        return [ {
          text:' A payment receipt is a document given to the parent/student as proof of full or partial payment made for the applicable fee.',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'You can view the receipt generated for each payment made. Click on "View Receipt" to view the payment receipt where you can print or download the particular receipt.       ',
          color:UiColor.DRAK_GRAY_COLOR
        },
        
      ]}
      else{
        return [ {
          text:'You can track student fee payments here',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'Mention the student name to track the Fee payments of a particular student.   ',
          color:UiColor.DRAK_GRAY_COLOR
        },
      ]
    }
    break;
    case 'StudentProgressCard':
      if(stateObject.state.userType == 'P'){
        return [ {
          text:' A progress card communicates a student performance for the examinations conducted.',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'You can view the total marks and rank for the various examinations conducted wherein you can also view the marks, grade and teacher feedback for each subject of the examination.',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'You can digitally sign the report card by clicking on the "Sign" button.    ',
          color:UiColor.DRAK_GRAY_COLOR
        },
        
      ]}
      if(stateObject.state.userType == 'S'){
        return [ {
          text:' A progress card communicates a student performance for the examinations conducted.',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'You can view the total marks and rank for the various examinations conducted wherein you can also view the marks, grade and teacher feedback for each subject of the examination.',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'You/Your Parent can digitally sign the report card by clicking on the "Sign" button.    ',
          color:UiColor.DRAK_GRAY_COLOR
        },
        
      ]}
      else if(stateObject.state.breadcrumb=='Menu / Classroom Activities / Parent Signature Tracking/Progress Card')
      {
        return [ {
          text:'You can track here Whether parent signed the progress card of the students for the given class'  ,
          color:UiColor.DRAK_GRAY_COLOR
        },
        
      ]
  
      }

      else{
        return [ {
          text:'You can track student Progress card here',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'Mention the student name to track the progress card of a particular student.   ',
          color:UiColor.DRAK_GRAY_COLOR
        },
      ]
    } 
  
    break;
    case 'StudentStudyMaterial':
      if(stateObject.state.userType == 'P'){
        return [ {
          text:'Study Materials are learning materials to elaborate on a particular topic that assist students in their learning process.',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'It can be Model question papers, any referral document, any use case scenarios, special notes or important content of the book.                                                                                         You can view various study material uploaded by the teachers which contains information like the subject, material description, lesson details and the attached study material.',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'Click on the "view icon" to open the study material in a new tab where you can print or download the particular material.                 ',
          color:UiColor.DRAK_GRAY_COLOR
        },
        
      ]
      
    }
   
      if(stateObject.state.userType == 'S'){
        return [ {
          text:'Study Materials are learning materials to elaborate on a particular topic that assist students in their learning process.',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'It can be Model question papers, any referral document, any use case scenarios, special notes or important content of the book.                                                                                         You can view various study material uploaded by the teachers which contains information like the subject, material description, lesson details and the attached study material.',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'Click on the "view icon" to open the study material in a new tab where you can print or download the particular material.                 ',
          color:UiColor.DRAK_GRAY_COLOR
        },
        
      ]}
      else{
        return [ {
          text:'You can track student study materials here',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'Mention the student name to track the study material of a particular student.   ',
          color:UiColor.DRAK_GRAY_COLOR
        },
      ]
    }
    break;

    case 'StudentTimeTable':
      if(stateObject.state.userType == 'P'){
        return [ {
          text:' Timetable is a list that shows the day and time at which particular subjects are taught.',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:' You can view the class timetable which includes the period details like the subject, period timings and the subject handler for each period of the week.',
          color:UiColor.DRAK_GRAY_COLOR
        },
      ]}
      if(stateObject.state.userType == 'S'){
        return [ {
          text:' Timetable is a list that shows the day and time at which particular subjects are taught.',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:' You can view the class timetable which includes the period details like the subject, period timings and the subject handler for each period of the week.',
          color:UiColor.DRAK_GRAY_COLOR
        },
      ]}
      else{
        return [ {
          text:'You can track student timetable here',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'Mention the student name to track the timetable of a particular student.   ',
          color:UiColor.DRAK_GRAY_COLOR
        },
      ]
    }
    break;
    case 'StudentAssignment':
      if(stateObject.state.userType == 'P'){
        return [ {
          text:'Video Lesson is a video that represents educational material for a topic uploaded by teachers which are to be learned by the students.',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'You can view various videos uploaded which contain information like the subject, video description and the uploaded video lesson.',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:' Click on the "view icon" to open the video lesson in a new tab where you can watch the video.',
          color:UiColor.DRAK_GRAY_COLOR
        },
      ]}
      if(stateObject.state.userType == 'S'){
        return [ {
          text:'Video Lesson is a video that represents educational material for a topic uploaded by teachers which are to be learned by the students.',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'You can view various videos uploaded which contain information like the subject, video description and the uploaded video lesson.',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:' Click on the "view icon" to open the video lesson in a new tab where you can watch the video.',
          color:UiColor.DRAK_GRAY_COLOR
        },
      ]}
      else{
        return [ {
          text:'You can track student assignments here',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'Mention the student name to track the assignments of a particular student.   ',
          color:UiColor.DRAK_GRAY_COLOR
        },
      ]
    }
    break;
    
    case 'StudentSoftSkill':
      if(stateObject.state.userType == 'P'){
        return [ {
          text:'Soft skills include any personal skills that support situational awareness and enhance an individuals ability. Soft skills can be leadership, communication, social being, etc.',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:' Soft-Skill Assessment is an evaluation of soft skills based on which ratings and feedback are given to the students.',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'You can view soft skills assessed for various examinations here.',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'Parent can digitally sign the soft skill assessments by clicking on the "Sign" button',
          color:UiColor.DRAK_GRAY_COLOR
        },
      ]}
      if(stateObject.state.userType == 'S'){
        return [ {
          text:'Soft skills include any personal skills that support situational awareness and enhance an individuals ability. Soft skills can be leadership, communication, social being, etc.',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:' Soft-Skill Assessment is an evaluation of soft skills based on which ratings and feedback are given to the students.',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'You can view soft skills assessed for various examinations here.',
          color:UiColor.DRAK_GRAY_COLOR
        },
      ]
    }
    else if(stateObject.state.breadcrumb=='Menu / Classroom Activities / Parent Signature Tracking/ Soft Skills')
    {
      return [ {
        text:'You can track here Whether parent signed the soft skill assesment of the students for the given class'  ,
        color:UiColor.DRAK_GRAY_COLOR
      },
      
    ]

    }
    
    else{
      return [ {
        text:'You can track student softskills here',
        color:UiColor.DRAK_GRAY_COLOR
      },
      {
        text:'Mention the student name to track the softskills of a particular student.   ',
        color:UiColor.DRAK_GRAY_COLOR
      },
    ]
  }
    break;           
    case 'StudentECircular':
      if(stateObject.state.userType == 'P'){
        return [ {
          text:'eCirculars are essentially in the form of documents containing some important information that is distributed among the parents/students in an institute.'  ,
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'Say for example meeting invitation, to update the dress policy for the whole institute, any announcements or reopening of institutes – a circular will be the best mode of communication for such purposes.',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'You can view various eCirculars uploaded for your kids. Click on the "view icon" to open the circular in a new tab where you can print or download the particular ecircular.',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'Parent can digitally sign the Ecircular by clicking on the "Sign" button.',
          color:UiColor.DRAK_GRAY_COLOR
        },

      ]}
      
      else if(stateObject.state.userType == 'S'){
        return [ {
          text:'eCirculars are essentially in the form of documents containing some important information that is distributed among the parents/students in an institute.'  ,
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'Say for example meeting invitation, to update the dress policy for the whole institute, any announcements or reopening of institutes – a circular will be the best mode of communication for such purposes.',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'You can view various eCirculars uploaded. Click on the "view icon" to open the circular in a new tab where you can print or download the particular ecircular.',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'You can digitally sign the Ecircular by clicking on the "Sign" button.',
          color:UiColor.DRAK_GRAY_COLOR
        },

      ]}
      else{
        return [ {
          text:'You can track student eCirculars here',
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:'Mention the student name to track the eCirculars of a particular student.   ',
          color:UiColor.DRAK_GRAY_COLOR
        },
      ]
    } 
    break;  
    case 'StudentOtherActivity':
      if((stateObject.state.userType == 'P')||(stateObject.state.userType == 'S')){
        return [ {
          text:'Event means any activity planned and conducted for the students.For example, Institute can conduct events like Sports events(such as throwball, Running, etc.) or Cultural events (such as Annual day, Sports day, Christmas celebration, etc.) or club events or special coaching classes'  ,
          color:UiColor.DRAK_GRAY_COLOR
        },
        {
          text:' You can view various activities/events organized by institutes which include event details, enrollment details and the result declaration once the event is completed. You can enroll in a particular event by clicking the "Enroll" button.',
          color:UiColor.DRAK_GRAY_COLOR
        },

      ]
    }
    else if(stateObject.state.heading=='Enroll Status Tracking')
    {
      return [ {
        text:'You can track here enrolled status of the students for the given class'  ,
        color:UiColor.DRAK_GRAY_COLOR
      },
      
    ]

    }
    else
    {
      return [ {
        text:'You can track student Event planner or extra curricular activities here',
        color:UiColor.DRAK_GRAY_COLOR
      },
      {
        text:'Mention the student name to track the Event planner or extra curricular activities of a particular student.   ',
        color:UiColor.DRAK_GRAY_COLOR
      },
    ]
    }
    break;
      case 'EducationPeriodConfiguration':
          return [ {
            text:'Academic year is an annual period of an institution during which the students attend classes. For example, \nYear : 2020 \nStart Date : 01 Sep 2020 \nEnd Date : 24 July 2021',
            color:UiColor.DRAK_GRAY_COLOR
          },
          {
            text:'You can configure an academic year by simply mentioning the start date and end date of an academic year.',
            color:UiColor.DRAK_GRAY_COLOR
          },
        ]
        break
        case 'HolidayMaintenance':
          
          return [ {
            text:'Institute Calendar is used to maintain the working and non-working days of an institute.',
            color:UiColor.DRAK_GRAY_COLOR
          },
          {
            text:'Holidays are maintained for all classes of an institute. If you want to maintain holiday for a specific class , then you can simply mention the particular class.',
            color:UiColor.DRAK_GRAY_COLOR
          },
        ]
        break
        case 'GroupMapping':
          return [ {
            text:'Assignee group is a group comprises a set of classes and/or a set of students clubbed under it. Groups are necessary to assign features (like fee, notification, assignment,e-circular etc.) to targeted students grouped',
            color:UiColor.DRAK_GRAY_COLOR
          },
          {
            text:'You can configure assignee group by mentioning group details, targeted class or students clubbed under a group.',
            color:UiColor.DRAK_GRAY_COLOR
          },
        ]
        break
        case 'ClassStudentRegister':
          return [ {
            text:'Student Register is used to enroll students in a particular class.',
            color:UiColor.DRAK_GRAY_COLOR
          },
          {
            text:'You can configure student register by simply mentioning the class, start date, end date and the names of the student that are to be assigned under the selected class.',
            color:UiColor.DRAK_GRAY_COLOR
          },
        ]
        break
        case 'StudyMaterial':
          return [ {
            text:'Study Materials are learning materials to elaborate on a particular topic that assist the students in their learning process. It can be Model question papers, any referral document, any use case scenarios, special notes or important content of the book.',
            color:UiColor.DRAK_GRAY_COLOR
          },
          {
            text:'You can upload study materials by simply mentioning details like year/standard,  subject and lesson details like lesson number, heading and its subheading. It should be uploaded in any of the following formats: .jpeg, .jpg, .png, .txt, .pdf, .doc, .docx, .ppt, .pptx, .xls, .xlsx & .mp4.',
            color:UiColor.DRAK_GRAY_COLOR
          },
          {
            text:'The study materials shown below are categorized based on the year/standard and subject. Click "View Materials" button to view the materials for that corresponsing year/standard & subject.',
            color:UiColor.DRAK_GRAY_COLOR
          },
          
        ]
        break
        case 'ClassTimeTable':
          return [ {
            text:'Timetable is a list that shows the day and time at which particular subjects are taught.',
            color:UiColor.DRAK_GRAY_COLOR
          },
          {
            text:'You can configure timetable by simply entering the subject with the corresponding subject handler for a particular class.',
            color:UiColor.DRAK_GRAY_COLOR
          },
  
          
        ]
        break
        case 'InstituteAssignment':
          return [ {
            text:'Video Lesson is a video which represents educational material for a topic which is to be learned.',
            color:UiColor.DRAK_GRAY_COLOR
          },
          {
            text:'You can upload video lessons by simply mentioning details like assignee group and subject.You can either upload a video from your device storage or can provide a youtube link of a video',
            color:UiColor.DRAK_GRAY_COLOR
          },
          {
            text:'The video lessons show below are categorized based on the subject & the assignee group. Click "View Video Lessons" button to view the video lessons for that corresponsing subject & assignee group.',
            color:UiColor.DRAK_GRAY_COLOR
          },
  
          
        ]
        break
        case 'ClassLevelConfiguration':
          return [ {
            text:'A class is a logical representation of a classroom in an institution (i.e) a body of students meeting regularly to study the same subject.',
            color:UiColor.DRAK_GRAY_COLOR
          },
          {
            text:'You can configure a class by mentioning the class details like year/standard, Section/Department, teacher name for a class and by mentioning the number of periods along with the timing for each period.',
            color:UiColor.DRAK_GRAY_COLOR
          }    
        ]
        break
        case 'InstituteFeeManagement':
          return [ {
            text:'Fee is an amount collected by an institution for various purposes like tution ,exams,events,transport,coaching , etc.',
            color:UiColor.DRAK_GRAY_COLOR
          },
          {
            text:'You can configure fee structure easily by mentioning the fee type(like tution,exam,etc.), the amount, due date and the assignee group.',
            color:UiColor.DRAK_GRAY_COLOR
          },
          {
            text:'The fees configurations show below are categorized based on the fee type & the assignee group. Click "View Breakup" button to view the fees configurations for that corresponsing fee type & assignee group',
            color:UiColor.DRAK_GRAY_COLOR
          }     
        ]
        break
        case 'TeacherLessonPlannerService':
          return [ {
            text:"A lesson plan refers to a teacher's plan for a particular lesson to be taught in the classroom. It will help teacher to plan, prepare and handle the lessons smoothly.",
            color:UiColor.DRAK_GRAY_COLOR
          },
          {
            text:'You can create lesson planner by specifying details like date and teacher name. Timetable details of the teacher for the given date appears by default where lesson plan can be added for particular period.',
            color:UiColor.DRAK_GRAY_COLOR
          },
          {
            text:"The Lesson Plans show below are categorized based on the staff, month & year. Click 'View Lesson Plans' button to view the lesson plans for that corresponsing staff, month & year.",
            color:UiColor.DRAK_GRAY_COLOR
          }     
        ]
        break
        case 'TeacherProfile':
          return [ {
            text:"Staff profile shows all the required information(like basic, family, address & other info) about the staff.",
            color:UiColor.DRAK_GRAY_COLOR
          },
          {
            text:'You can configure staff profile by simply entering the staff details like name, DOB, family details, address and role of the staff.',
            color:UiColor.DRAK_GRAY_COLOR
          },   
        ]
        break
        case 'StudentProfile':
          return [ {
            text:"Student profile shows all the required information(like general, family, address, class & other info) about the student.",
            color:UiColor.DRAK_GRAY_COLOR
          },
          {
            text:'You can configure student profile by simply entering the student details like name, DOB, family details, address and Contact info.',
            color:UiColor.DRAK_GRAY_COLOR
          },   
        ]
        break
        case 'StudentProfile_P':
          return [ {
            text:"Student profile shows all the required information(like general, family, address, class & other info) about the student.",
            color:UiColor.DRAK_GRAY_COLOR
          }  
        ]
        break
        case 'ClassAttendance':
          return [ {
            text:"Attendance is a measure of the number of students who attend classes and the amount of time they are present.",
            color:UiColor.DRAK_GRAY_COLOR
          },
          {
            text:'You can take attendance by simply mentioning the class, date and by easily toggling values between present, absent and leave.',
            color:UiColor.DRAK_GRAY_COLOR
          },  
          {
            text:'Based on the class, it can follow any one of the below attendance types: \nPeriod wise - Attendance is taken for each period \nDay wise - Attendance is taken only once a day \nNoon wise - Attendance is taken once in the forenoon and once in the afternoon',
            color:UiColor.DRAK_GRAY_COLOR
          }, 
        ]
        break
        case 'ClassAssignment':
          return [ {
            text:"Assignments are the tasks given to students to complete in a defined time.",
            color:UiColor.DRAK_GRAY_COLOR
          },
          {
            text:'Assignment can be worksheets or simple text questions or work case scenarios.',
            color:UiColor.DRAK_GRAY_COLOR
          },  
          {
            text:'You can create an assignment by simply mentioning class,subject,due date of the assignment and the assignment details like description and assignment type(like Q/A or worksheet).',
            color:UiColor.DRAK_GRAY_COLOR
          }, 
        ]
        break
        case 'ClassAssignmentAssessment':
          return [ {
            text:"Assignment Assessment is an evaluation of a completed assignment based on which marks and feedback are given to the students.",
            color:UiColor.DRAK_GRAY_COLOR
          },
          {
            text:'You can view the assignments submitted by the students of a particular class/subject and assess them by providing marks and feedback to each student.',
            color:UiColor.DRAK_GRAY_COLOR
          },  
       
        ]
        break
        case 'ClassExamSchedule':
          return [ {
            text:"An exam is a test of student's knowledge or skill in a particular subject.",
            color:UiColor.DRAK_GRAY_COLOR
          },
          {
            text:'You can configure an exam by mentioning details like class, subject, exam date, exam starting - ending time, exam hall, syllabus,maximum mark and grade details.',
            color:UiColor.DRAK_GRAY_COLOR
          },  
       
        ]
        break
        case 'ClassMark':
          return [ {
            text:"Exam Assessment is an evaluation of a completed exam based on which marks,grades and feedback are given to the students.",
            color:UiColor.DRAK_GRAY_COLOR
          },
          {
            text:'You can assess the exams by entering marks and feedback for each student.Grades will be allotted automatically by the system.',
            color:UiColor.DRAK_GRAY_COLOR
          },  
       
        ]
        break
        case 'ClassSoftSkill':
          return [ {
            text:"Soft skills include any personal skills that supports situational awareness and enhances an individual's ability. Soft skills can be leadership, communication, social being, etc.",
            color:UiColor.DRAK_GRAY_COLOR
          },
          {
            text:'Soft-Skill Assessment is an evaluation of soft-skills based on which rating and feedback are given to the students.',
            color:UiColor.DRAK_GRAY_COLOR
          }, 
          {
            text:'You can assess the soft-skills for a particular exam/term by simply providing assessment rating and feedback for each student.',
            color:UiColor.DRAK_GRAY_COLOR
          }, 
       
        ]
        break
        case 'TeacherLeaveManagement':
          
          return [ {
            text:"Staff Leave is used to manage holiday requests(like sick,planned,casual leave) from staffs in order to know when they are going to be away from work.",
            color:UiColor.DRAK_GRAY_COLOR
          },
          {
            text:'You can apply staff leave by simply mentioning details like staff name,from and to date with the leave options(like fullday leave/halfday leave) and the leave type(like sick,planned,casual leave) with the reason.',
            color:UiColor.DRAK_GRAY_COLOR
          }, 
       
        ]
        break
        case 'StudentLeaveManagement':
     
          if(stateObject.state.userType == 'P'){
            return [ {
              text:'Student Leave is used to manage holiday requests(like sick,planned,casual leave) from students in order to know when they are going to be away from their classes.'   ,
              color:UiColor.DRAK_GRAY_COLOR
            },
            {
              text:'You can apply leave for your kids by simply mentioning details like their name,from and to date with the leave options(like fullday leave/halfday leave) and the leave type(like sick,planned,casual leave) with the reason.',
              color:UiColor.DRAK_GRAY_COLOR
            },
    
          ]}
          else if(stateObject.state.userType == 'S'){
    
            return [ {
              text:'Student Leave is used to manage holiday requests(like sick,planned,casual leave) from students in order to know when they are going to be away from their classes.'   ,
              color:UiColor.DRAK_GRAY_COLOR
            },
            {
              text:'You can apply leave by simply mentioning details like your name,from and to date with the leave options(like fullday leave/halfday leave) and the leave type(like sick,planned,casual leave) with the reason.',
              color:UiColor.DRAK_GRAY_COLOR
            },]
            
          }
          else 
          {
          return [ {
            text:"Student Leave is used to manage holiday requests(like sick,planned,casual leave) from students in order to know when they are going to be away from their classes.",
            color:UiColor.DRAK_GRAY_COLOR
          },
          {
            text:'You can apply student leave by simply mentioning details like student name,from and to date with the leave options(like fullday leave/halfday leave) and the leave type(like sick,planned,casual leave) with the reason.',
            color:UiColor.DRAK_GRAY_COLOR
          }, 
       
        ]}
        break
        case 'ECircular':
          return [ {
            text:"Staff eCirculars are essentially in the form of documents containing some important information that is distributed among the staff of an institute.",
            color:UiColor.DRAK_GRAY_COLOR
          },
          {
            text:'Say for example you have to invite an entire department for a meeting, or update the dress policy for the whole institute – a circular will be the best mode of communication for such purposes.',
            color:UiColor.DRAK_GRAY_COLOR
          }, 
          {
            text:'You can easily upload e-circulars by mentioning details like circular message/file & date on which the circular is to be issued.',
            color:UiColor.DRAK_GRAY_COLOR
          },
        ]
        break
        case 'studentECircular':
          return [ {
            text:"Student eCirculars are essentially in the form of documents containing some important information that is distributed among the students of an institute.",
            color:UiColor.DRAK_GRAY_COLOR
          },
          {
            text:'Say for example you have to invite an entire department for a meeting, or update the dress policy for the whole institute – a circular will be the best mode of communication for such purposes.',
            color:UiColor.DRAK_GRAY_COLOR
          }, 
          {
            text:'You can easily upload e-circulars by mentioning details like circular message/file, assignee group and the date on which the circular is to be issued.',
            color:UiColor.DRAK_GRAY_COLOR
          },
        ]
        break
        case 'InstituteOtherActivity':
          return [ {
            text:"Event means any activity planned and conducted for the students.",
            color:UiColor.DRAK_GRAY_COLOR
          },
          {
            text:'For example,Institute can create events like Sports events(such as throwball, Running, etc.) or Cultural events (such as Annual day, Sports day, Christmas celebration,etc.)',
            color:UiColor.DRAK_GRAY_COLOR
          }, 
          {
            text:'You can easily create events by mentioning the assignee group , the event type and the event details.',
            color:UiColor.DRAK_GRAY_COLOR
          },
        ]
        break
        case 'GeneralSubjectConfiguration':
          return [ {
            text:"The set of all subjects that are handled in the institute are configured here.",
            color:UiColor.DRAK_GRAY_COLOR
          },
          {
            text:'The provided subjects will be available on corresponding menus, such as Institute->Video lesson, Class->Time Table, etc.',
            color:UiColor.DRAK_GRAY_COLOR
          }, 
          {
            text:"Based on your Institute's need, you can add, remove or edit the subjects at any point of time.",
            color:UiColor.DRAK_GRAY_COLOR
          },
        ]
        break
        case 'GeneralFeeConfiguration':
          return [ {
            text:"The various fee types that the institute follows are listed.",
            color:UiColor.DRAK_GRAY_COLOR
          },
          {
            text:'The provided fee types will be reflected on all the fee related processes, such as Institute->Fee Management, Institute->Fee Payment, etc.',
            color:UiColor.DRAK_GRAY_COLOR
          }, 
          {
            text:"Based on your Institute's need, you can add, remove or edit the fee types at any point of time.",
            color:UiColor.DRAK_GRAY_COLOR
          },
        ]
        break
        case 'GeneralLogoConfiguration':
          return [{
            text:"Institute Logo can be configured here. The uploaded logo will be shown in our application header section & will be mentioned in several arears such as, email notifications, reports, etc.",
            color:UiColor.DRAK_GRAY_COLOR
          },
          {
            text:'Preview of how your logo will look in the header is shown below. We have also mention prefered size of the logo that will suit better.',
            color:UiColor.DRAK_GRAY_COLOR
          }
        ]
        break
        case 'GeneralOtherConfiguration':
          return [{
            text:"The various details about the institute can be configured here. The provided configuration will be used throughout the application",
            color:UiColor.DRAK_GRAY_COLOR
          },
          {
            text:'Refer the help content near the each fields for more information',
            color:UiColor.DRAK_GRAY_COLOR
          }
        ]
        break
        case 'AutoAuthConfiguration':
          return [ {
            text:"When Auto Approval is enabled for a screen, then any operations performed under the screen do not require Admin's or Other staff's approval.",
            color:UiColor.DRAK_GRAY_COLOR
          },
          {
            text:'By default, we enable auto approval for all the screens except the following three screens, namely: Fee Configuration, Instant notification & eCircular.',
            color:UiColor.DRAK_GRAY_COLOR
          }, 
          {
            text:"Based on your Institute's need, you can enable or disable auto approval for any screens at any point of time.",
            color:UiColor.DRAK_GRAY_COLOR
          },
          {
            text:"Note: Admin users are super users. They always have auto approval without respect to this configuration.",
            color:UiColor.DRAK_GRAY_COLOR
          },
        ]
        break
        case 'TeacherNotesService':
          return [ {
            text:"The teacher can create notes about the lessons which will be taught by them in the classroom. It will help teacher to plan, prepare and handle the lessons smoothly.",
            color:UiColor.DRAK_GRAY_COLOR
          },
          {
            text:'You can create notes by specifying details like date and teacher name. Timetable details of the teacher for the given date appears by default where notes can be added for particular period.',
            color:UiColor.DRAK_GRAY_COLOR
          }
        ]
        break

    default :
    return []
  } 
}


ScreenContents.getScreenBtnName = function (serviceName) {
  switch(serviceName){
    case 'InstituteFeeManagement':
      return{
        createCompletedMessage: "New Fees configured successfully",

        createViewMessage: "View Fees Configuration",
      
        createAgainMessage: "Create New Fees Configuration",
      
        newButtonText: "Configure Fee",
      
        customCreateModalHeading: "Configure New Fee",
      }
    break
    case 'TeacherLeaveManagement':
      return{
        createCompletedMessage: "New staff leave requested successfully",

        createViewMessage: "View staff leave request",
      
        createAgainMessage: "Create new staff leave request",
      
        newButtonText: "New",
      
        customCreateModalHeading: "New",
      }
    break
    case 'StudentLeaveManagement':
      return{
        createCompletedMessage: "New student leave requested successfully",

        createViewMessage: "View student leave request",
      
        createAgainMessage: "Create new student leave request",
      
        newButtonText: "New",
      
        customCreateModalHeading: "New",
      }
    break
    case 'NewStudentAssignment':
      return{
        createCompletedMessage: "Assignment answered successfully",

        createViewMessage: "View assignment",
      
        createAgainMessage: "Create assignment",
      
        newButtonText: "New",
      
        customCreateModalHeading: "New",
      }
    break
    case 'ClassAssignmentAssessment':
      return{
        createCompletedMessage: "Assignment assessed successfully",

        createViewMessage: "View assesment",
      
        createAgainMessage: "Do Assesment",
      
        newButtonText: "New",
      
        customCreateModalHeading: "New",
      }
    break
    default :
    return null
  } 
}


module.exports = {
    functions: ScreenContents
  };